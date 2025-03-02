import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/manageProduct";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,

        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          ),
          children: [
        
      
            //admin routes (only accessible by admin Todo: include role fields)
           
            {
              path: "add-product",
              element: (
                <PrivateRoute role="admin">
                  <AddProduct />
                </PrivateRoute>
              ),
            },
            {
              path: "manage-products",
              element: (
                <PrivateRoute role="admin">
                  <ManageProduct />
                </PrivateRoute>
              ),
            },
            
            
          ],
        }
      ],
    },
  
  ]);
  
  export default router;