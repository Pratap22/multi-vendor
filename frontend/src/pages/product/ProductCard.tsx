import { useState } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import lwpStyles from "../../styles";
import ProductDetailsCard from "./ProductDetailsCard";
import { Product } from "../../type/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [open, setOpen] = useState(false);

  const addToCartHandler = (id: string) => {
    //
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product._id}`}>
          <p>Image Here</p>
        </Link>
        <Link to={`/product/${product._id}`}>
          <h4 className="pb-3 font-[500]">
            {product.name.length > 40
              ? product.name.slice(0, 40) + "..."
              : product.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${lwpStyles.productDiscountPrice}`}>
                {product.originalPrice === 0
                  ? product.originalPrice
                  : product.discountPrice}
                $
              </h5>
              <h4 className={`${lwpStyles.price}`}>
                {product.originalPrice ? product.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">sold</span>
          </div>
        </Link>

        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(product._id!)}
            color="#444"
            title="Add to cart"
          />
          {open ? (
            <ProductDetailsCard setOpen={setOpen} product={product} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
