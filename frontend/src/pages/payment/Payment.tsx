import React, { FormEventHandler, useState } from "react";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { LWPState } from "../../redux/store";
import lwpStyles from "../../styles";
import { OrderData, PaymentData } from "../../type/order";
import { User } from "../../type/user";
import lwpAxios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../redux/reducers/user";

const Payment = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elements = useElements();
  const [orderData, setOrderData] = useState<OrderData>();
  const { user } = useSelector((state: LWPState) => state.user);

  useEffect(() => {
    const orderData = JSON.parse(
      localStorage.getItem("latestOrder") || ""
    ) as OrderData;
    setOrderData(orderData);
  }, []);

  const paymentHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const paymentData = {
      amount: Math.round(Number(orderData!.totalPrice) * 100),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await lwpAxios.post(
      "/payment/process",
      paymentData,
      config
    );

    await stripe.confirmCardPayment(response.data.client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!,
      },
    });
    const data: PaymentData = {
      userId: user!._id,
      cart: orderData!.cart,
      totalPrice: orderData!.totalPrice,
      shippingAddress: orderData!.shippingAddress,
      paymentInfo: {
        id: Date.now().toString(),
        status: "success",
        type: "CARD",
      },
    };

    await lwpAxios.post("/order", data, {
      withCredentials: true,
    });
    dispatch(emptyCart());
    navigate("/order/success");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo user={user} paymentHandler={paymentHandler} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData!} />
        </div>
      </div>
    </div>
  );
};

interface PaymentInfoProps {
  user: User | null;
  paymentHandler: FormEventHandler | undefined;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ user, paymentHandler }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>
        <div className="w-full flex border-b">
          <form className="w-full" onSubmit={paymentHandler}>
            <div className="w-full flex pb-3">
              <div className="w-[50%]">
                <label className="block pb-2">Name On Card</label>
                <input
                  required
                  placeholder={user!.name}
                  className={`${lwpStyles.input} !w-[95%] text-[#444]`}
                  value={user!.name}
                />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Exp Date</label>
                <CardExpiryElement
                  className={`${lwpStyles.input}`}
                  options={{
                    style: {
                      base: {
                        fontSize: "19px",
                        lineHeight: "1.5",
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="w-full flex pb-3">
              <div className="w-[50%]">
                <label className="block pb-2">Card Number</label>
                <CardNumberElement
                  className={`${lwpStyles.input} !h-[35px] !w-[95%]`}
                  options={{
                    style: {
                      base: {
                        fontSize: "19px",
                        lineHeight: "1.5",
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">CVV</label>
                <CardCvcElement
                  className={`${lwpStyles.input} !h-[35px]`}
                  options={{
                    style: {
                      base: {
                        fontSize: "19px",
                        lineHeight: "1.5",
                        color: "#444",
                      },
                      empty: {
                        color: "#3a120a",
                        backgroundColor: "transparent",
                        "::placeholder": {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className={`${lwpStyles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

interface CartDataProps {
  orderData: OrderData;
}

const CartData: React.FC<CartDataProps> = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
