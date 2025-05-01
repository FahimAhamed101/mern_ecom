import { BASE_URL } from "../utils/baseURL.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Order from "./order.model.js";
import stripePackage from "stripe";
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const makePaymentRequest = async (req, res) => {
  const { products } = req.body;
  
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
    });

    return successResponse(res, 200, "Payment session created", { id: session.id });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create payment session", error);
  }
};

export const confirmPayment = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"]
    });
    
    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity
      }));

      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: session.amount_total / 100,
        email: session.customer_details.email,
        status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });
    } else {
      order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";
    }

    await order.save();
    return successResponse(res, 200, "Order confirmed successfully", order);

  } catch (error) {
    return errorResponse(res, 500, "Failed to confirm payment", error);
  }
};

export const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    
    if (!orders.length) {
      return errorResponse(res, 404, "No orders found for this email");
    }

    return successResponse(res, 200, "Orders fetched successfully", orders);
  } catch (error) {
    return errorResponse(res, 500, "Failed to get orders", error);
  }
};

export const getOrdersByOrderId = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    return successResponse(res, 200, "Order fetched successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "Failed to get order", error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    if (!orders.length) {
      return errorResponse(res, 404, "No orders found");
    }

    return successResponse(res, 200, "Orders fetched successfully", orders);
  } catch (error) {
    return errorResponse(res, 500, "Failed to get all orders", error);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return errorResponse(res, 400, "Status is required");
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return errorResponse(res, 404, "Order not found");
    }

    return successResponse(res, 200, "Order status updated successfully", updatedOrder);
  } catch (error) {
    return errorResponse(res, 500, "Failed to update order status", error);
  }
};

export const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    
    if (!deletedOrder) {
      return errorResponse(res, 404, "Order not found");
    }

    return successResponse(res, 200, "Order deleted successfully", deletedOrder);
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete order", error);
  }
};

export default {
  makePaymentRequest,
  confirmPayment,
  getOrdersByEmail,
  getOrdersByOrderId,
  getAllOrders,
  updateOrderStatus,
  deleteOrderById
};