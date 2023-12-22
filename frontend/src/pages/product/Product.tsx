import { useSelector } from "react-redux";
import { LWPState } from "../../redux/store";
import ProductCard from "./ProductCard";
import lwpStyles from "../../styles";
import Loader from "../../components/Loader";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const Products = () => {
  const { products, loading } = useSelector((state: LWPState) => state.product);

  return (
    <>
      {loading === "pending" ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${lwpStyles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            {products && products.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Products;
