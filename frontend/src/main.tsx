import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import ManageTravel from "./pages/ManageTravel/ManageTravel";
import ManageUser from "./pages/ManageUser/ManageUser";
import ManageOrder from "./pages/ManageOrder/ManageOrder";

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
