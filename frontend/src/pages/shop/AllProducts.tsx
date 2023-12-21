import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import ShopHeader from "./Header";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import ShopSideBar from "./SideBar";
import { AppDispatch, LWPState } from "../../redux/store";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { deletelProductAsync } from "../../redux/actions/product";

const ShopAllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: LWPState) => state.product);
  const { shop } = useSelector((state: LWPState) => state.shop);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      flex: 1.4,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 180,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                dispatch(deletelProductAsync(params.id.toString()));
              }}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <ShopHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          {loading === "pending" ? (
            <Loader />
          ) : (
            <div className="w-full mx-8 pt-1 mt-10 bg-white">
              <DataGrid
                rows={products
                  .filter((product) => product.shopId === shop?._id)
                  .map((product) => ({
                    id: product._id!,
                    name: product.name,
                    price: "US$ " + product.discountPrice,
                    Stock: product.stock,
                  }))}
                columns={columns}
                pageSize={100}
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

export default ShopAllProducts;
