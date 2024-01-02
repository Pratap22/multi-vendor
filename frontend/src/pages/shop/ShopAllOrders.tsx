import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import ShopHeader from "./Header";
import ShopSideBar from "./SideBar";
import { LWPState } from "../../redux/store";
import Loader from "../../components/Loader";
import { PaymentData } from "../../type/order";

const ShopAllOrders = () => {
  const dispatch = useDispatch();
  const { shop, loading, orders } = useSelector(
    (state: LWPState) => state.shop
  );

  useEffect(() => {}, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: () => {
        return "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  return (
    <div>
      <ShopHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          {loading ? (
            <Loader />
          ) : (
            <div className="w-full mx-8 pt-1 mt-10 bg-white">
              <DataGrid
                rows={orders.map((item: PaymentData) => ({
                  id: item._id,
                  itemsQty: item.cart.length,
                  total: "US$ " + item.totalPrice,
                  status: item.paymentInfo.status,
                }))}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
