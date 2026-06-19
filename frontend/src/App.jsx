import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/Admin/AddProduct";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminOrders from "./pages/Admin/AdminOrder";
import ShowUserOrder from "./pages/Admin/ShowUserOrder";
import AdminUser from "./pages/Admin/AdminUser";
import UserInfo from "./pages/Admin/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import AdminSales from "./pages/Admin/AdminSales";
import AddressForm from "./pages/AddressForm";
import OrderSuccess from "./pages/OrderSuccess";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Product />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/address",
    element: (
      <ProtectedRoute>
        <AddressForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-success",
    element: (
      <ProtectedRoute>
        <OrderSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <Order />
      </ProtectedRoute>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        {" "}
        <Navbar /> <Dashboard />{" "}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "sales",
        element: (
          <>
            <AdminSales />
          </>
        ),
      },
      {
        path: "add-product",
        element: (
          <>
            <AddProduct />
          </>
        ),
      },
      {
        path: "products",
        element: (
          <>
            <AdminProduct />
          </>
        ),
      },
      {
        path: "orders",
        element: (
          <>
            <AdminOrders />
          </>
        ),
      },
      {
        path: "users/orders/:userId",
        element: (
          <>
            <ShowUserOrder />
          </>
        ),
      },
      {
        path: "users",
        element: (
          <>
            <AdminUser />
          </>
        ),
      },
      {
        path: "users/:id",
        element: (
          <>
            <UserInfo />
          </>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
