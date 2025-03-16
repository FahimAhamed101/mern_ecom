import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authRoutes/authRoutesSlice.js";
import authRoutesApi from "./features/authRoutes/authRoutesApi.js";
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewsApi";
import cartReducer from "./features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authRoutesApi.reducerPath]: authRoutesApi.reducer,  [reviewApi.reducerPath]: reviewApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authRoutesApi.middleware,
      productsApi.middleware, reviewApi.middleware,
    ),
});