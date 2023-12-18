import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/auth/user/Login";
import Register from "./pages/auth/user/Register";
import ActivationPage from "./pages/activation/ActivationPage";
import Home from "./pages/Home";
import ShopLogin from "./pages/auth/shop/ShopLogin";
import ShopRegister from "./pages/auth/shop/ShopRegister";
import ShopActivationPage from "./pages/activation/ShopActivationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activation/:token" element={<ActivationPage />} />

        <Route path="/shop-login" element={<ShopLogin />} />
        <Route path="/shop-register" element={<ShopRegister />} />
        <Route
          path="/shop-activation/:token"
          element={<ShopActivationPage />}
        />
        <Route path="/" index element={<Home />} />
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
