import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { activateShopAsync } from "../../redux/actions/shop";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ShopActivationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      const sendRequest = async () => {
        try {
          await dispatch(activateShopAsync(token));
          toast.success("Shop Successfully Activated!");
          navigate("/shop-login");
        } catch (error) {
          const axiosError = error as AxiosError;
          setError("An error occurred while activating shop");
          toast.error(
            axiosError.message || "An error occurred while activating shop"
          );
        }
      };
      sendRequest();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{error || "Shop Activation Page"}</p>
    </div>
  );
};

export default ShopActivationPage;
