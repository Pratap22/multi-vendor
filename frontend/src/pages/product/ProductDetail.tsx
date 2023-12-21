import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import lwpStyles from "../../styles";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { LWPState } from "../../redux/store";
import { Product } from "../../type/product";

const ProductDetails = () => {
  const { products } = useSelector((state: LWPState) => state.product);
  const [count, setCount] = useState(1);

  const { id } = useParams();
  const [data, setData] = useState<Product | undefined>(undefined);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setData(products.find((product) => product._id === id));
  }, [products, id]);

  return (
    <div>
      <Header activeHeading={1} />
      <div className="bg-white">
        {data ? (
          <div className={`${lwpStyles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${lwpStyles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${lwpStyles.productDiscountPrice}`}>
                      {data.discountPrice}$
                    </h4>
                    <h3 className={`${lwpStyles.price}`}>
                      {data.originalPrice ? data.originalPrice + "$" : null}
                    </h3>
                  </div>

                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${lwpStyles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => {}}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data.shopId}`}>
                      <p>Shop Logo</p>
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shopId}`}>
                        <h3 className={`${lwpStyles.shop_name} pb-1 pt-1`}>
                          Name of the Shop
                        </h3>
                      </Link>
                    </div>
                    <div
                      className={`${lwpStyles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                      onClick={() => {}}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
