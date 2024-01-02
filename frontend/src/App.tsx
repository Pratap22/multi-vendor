import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import Login from "./pages/auth/user/Login";
import Register from "./pages/auth/user/Register";
import ActivationPage from "./pages/activation/ActivationPage";
import Home from "./pages/Home";
import ShopLogin from "./pages/auth/shop/ShopLogin";
import ShopRegister from "./pages/auth/shop/ShopRegister";
import ShopActivationPage from "./pages/activation/ShopActivationPage";
import ShopProtectedRoute from "./routes/ShopProtectedRoute";
import ShopDashboard from "./pages/shop/Dashboard";
import ShopCreateProduct from "./pages/shop/CreateProduct";
import NotFound from "./components/NotFound";
import ShopAllProducts from "./pages/shop/AllProducts";
import ProductDetails from "./pages/product/ProductDetail";
import Products from "./pages/product/Product";
import BestSelling from "./pages/product/BestSelling";
import TestSocket from "./pages/TestSocket";
import ProtectedRoute from "./routes/ProtectedRoute";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { useEffect, useState } from "react";
import lwpAxios from "./config/axiosConfig";
import PaymentPage from "./pages/payment/PaymentPage";
import OrderSuccess from "./pages/order/OrderSuccess";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await lwpAxios.get(`/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/payment"
          element={
            stripeApikey ? (
              <Elements stripe={loadStripe(stripeApikey)}>
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              </Elements>
            ) : (
              <NotFound />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activation/:token" element={<ActivationPage />} />

        <Route path="/shop-login" element={<ShopLogin />} />
        <Route path="/shop-register" element={<ShopRegister />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/test-socket" element={<TestSocket />} />

        <Route
          path="/shop-activation/:token"
          element={<ShopActivationPage />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashboard />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProduct />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />
        <Route path="/" index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
