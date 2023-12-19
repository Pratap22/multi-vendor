import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { ReactNode } from "react";
import { LWPState } from "../redux/store";

interface ShopProtectedRouteProps {
  children: ReactNode;
}

const ShopProtectedRoute: React.FC<ShopProtectedRouteProps> = ({
  children,
}) => {
  const { loading, isAuthenticated, shop } = useSelector(
    (state: LWPState) => state.shop
  );
  if (loading === "pending") {
    return <Loader />;
  } else {
    if (!shop || !isAuthenticated) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default ShopProtectedRoute;
