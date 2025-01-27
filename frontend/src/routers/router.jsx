import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
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
      ],
    },
  
  ]);
  
  export default router;