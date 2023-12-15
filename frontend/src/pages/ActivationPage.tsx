import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      const sendRequest = async () => {
        await axios
          .post(`/user/activation`, {
            token,
          })
          .then((res) => {
            // Success -> Home
          })
          .catch(() => {
            setError(true);
          });
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
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
