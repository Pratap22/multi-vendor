import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";

import { CartProduct } from "../type/product";
import { useState } from "react";
import lwpStyles from "../styles";

interface CartCardProps {
  product: CartProduct;
  quantityChangeHandler: (cartProduct: CartProduct) => void;
  removeFromCartHandler: (cartProduct: CartProduct) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  product,
  quantityChangeHandler,
  removeFromCartHandler,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const totalPrice =
    (product.discountPrice || product.originalPrice) * quantity;

  const increment = () => {
    if (product.stock <= quantity) {
      toast.error("Product stock limited!");
    } else {
      setQuantity(quantity + 1);
      const updateCartData = { ...product, quantity: quantity + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
    const updateCartData = {
      ...product,
      quantity: quantity === 1 ? 1 : quantity - 1,
    };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${lwpStyles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment()}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{product.quantity}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement()}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <div className="pl-[5px]">
          <h1>{product.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${product.discountPrice || product.originalPrice} * {quantity}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(product)}
        />
      </div>
    </div>
  );
};

export default CartCard;
