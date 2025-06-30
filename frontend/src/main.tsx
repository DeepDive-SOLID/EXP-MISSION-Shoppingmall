import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/home/Home";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ManageProduct from "./pages/admin/manageProduct/ManageProduct";
import ManageTravel from "./pages/admin/manageTravel/ManageTravel";
import ManageUser from "./pages/admin/manageUser/ManageUser";
import ManageOrder from "./pages/admin/manageOrder/ManageOrder";
import SignUp from "./pages/login/signUp/SignUp";
import SignIn from "./pages/login/signIn/SignIn";
import FindId from "./pages/login/findPw/FindId";
import FindPw from "./pages/login/findPw/FindPw";
import SignInFromPayment from "./pages/login/signIn/SignInFromPayment";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import PaySuccess from "./pages/payresult/PaySuccess";
import PayFail from "./pages/payresult/PayFail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "login/fromPayment",
        element: <SignInFromPayment />,
      },
      {
        path: "find-id",
        element: <FindId />,
      },
      {
        path: "find-pw",
        element: <FindPw />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/payresult/success",
        element: <PaySuccess />,
      },
      {
        path: "order/payresult/fail",
        element: <PayFail />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "manage-travel",
        element: <ManageTravel />,
      },
      {
        path: "manage-user",
        element: <ManageUser />,
      },
      {
        path: "manage-order",
        element: <ManageOrder />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
