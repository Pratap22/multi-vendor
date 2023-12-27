import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LWPState } from "../../redux/store";
import lwpStyles from "../../styles";

const Checkout = () => {
  const { user, cart } = useSelector((state: LWPState) => state.user);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) =>
      acc + item.quantity * (item.discountPrice || item.originalPrice),
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500]">Shipping Address</h5>
            <br />
            <form>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    value={user!.name}
                    required
                    className={`${lwpStyles.input} !w-[95%]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    value={user!.email}
                    required
                    className={`${lwpStyles.input}`}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    required
                    value={"Phone nUmber"}
                    className={`${lwpStyles.input} !w-[95%]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    className={`${lwpStyles.input}`}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Country</label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option className="block pb-2" value="">
                      Choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">City</label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option className="block pb-2" value="">
                      Choose your City
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Address1</label>
                  <input
                    type="address"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className={`${lwpStyles.input} !w-[95%]`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Address2</label>
                  <input
                    type="address"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    required
                    className={`${lwpStyles.input}`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div
        className={`${lwpStyles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

interface CartDataProps {
  totalPrice: string;
  shipping: number;
  subTotalPrice: number;
}

const CartData: React.FC<CartDataProps> = ({
  totalPrice,
  shipping,
  subTotalPrice,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
    </div>
  );
};

export default Checkout;
