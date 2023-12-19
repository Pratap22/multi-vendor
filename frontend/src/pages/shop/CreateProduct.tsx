import CreateProduct from "../../components/CreateProduct";
import ShopHeader from "./Header";
import ShopSideBar from "./SideBar";

const ShopCreateProduct = () => {
  return (
    <div>
      <ShopHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
