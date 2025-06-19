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
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";

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
        path: "search",
        element: <Search />,
      },
      {
        path: "detail/:travelId",
        element: <Detail />,
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
