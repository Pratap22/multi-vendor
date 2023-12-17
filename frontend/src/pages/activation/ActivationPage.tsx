import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activateUserAsync } from "../../redux/actions/user";
import { AppDispatch } from "../../redux/store";

const ActivationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      const sendRequest = async () => {
        try {
          await dispatch(activateUserAsync(token));
          toast.success("User Successfully Activated!");
          navigate("/");
        } catch (error) {
          const axiosError = error as AxiosError;
          setError("An error occurred while activating user");
          toast.error(
            axiosError.message || "An error occurred while activating user"
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
      <p>{error || "User Activation Page"}</p>
    </div>
  );
};

export default ActivationPage;
