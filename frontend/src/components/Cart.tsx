import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lwpStyles from "../styles";
import { AppDispatch, LWPState } from "../redux/store";
import CartCard from "./CartCard";
import { CartProduct } from "../type/product";
import { addToCart, removeFromCart } from "../redux/reducers/user";

interface CartProps {
  setOpenCart: (val: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setOpenCart }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: LWPState) => state.user);

  const removeFromCartHandler = (data: CartProduct) => {
    dispatch(removeFromCart(data._id));
  };

  const quantityChangeHandler = (data: CartProduct) => {
    dispatch(addToCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.quantity * (item.discountPrice || item.originalPrice),
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${lwpStyles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart.map((cartItem) => (
                  <CartCard
                    key={cartItem._id}
                    product={cartItem}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
