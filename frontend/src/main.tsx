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
import SignUp from "./pages/login/signUp/SignUp";
import SignIn from "./pages/login/signIn/SignIn";
import FindId from "./pages/login/findPw/FindId";
import FindPw from "./pages/login/findPw/FindPw";
import SignInFromPayment from "./pages/login/signIn/SignInFromPayment";
import OrderList from "./pages/mypage/orderList/OrderList";
import EditProfile from "./pages/mypage/editProfile/EditProfile";
import CardInfo from "./pages/mypage/cardInfo/cardInfo/CardInfo";
import CardAdd from "./pages/mypage/cardInfo/cardAdd/CardAdd";
import AddComplete from "./pages/mypage/cardInfo/addComplete/AddComplete";
import AddFail from "./pages/mypage/cardInfo/addFail/AddFail";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
        path: "dashboard",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-product",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <ManageProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-travel",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <ManageTravel />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <ManageOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/order-list",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/edit-profile",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/card-info",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <CardInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/card-add",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <CardAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/card-add/complete",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <AddComplete />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypage/card-add/fail",
        element: (
          <ProtectedRoute requireAuth={true} requireAdmin={false}>
            <AddFail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
