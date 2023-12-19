import ShopHeader from "./Header";
import ShopHero from "./Hero";
import ShopSideBar from "./SideBar";

const ShopDashboard = () => {
  return (
    <div>
      <ShopHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSideBar active={1} />
        </div>
        <ShopHero />
      </div>
    </div>
  );
};

export default ShopDashboard;
