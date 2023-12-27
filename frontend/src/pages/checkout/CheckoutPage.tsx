import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Checkout from "./Checkout";
import CheckoutSteps from "./CheckoutSteps";

const CheckoutPage = () => {
  console.log("Checkout page");
  return (
    <div>
      <Header activeHeading={1} />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
