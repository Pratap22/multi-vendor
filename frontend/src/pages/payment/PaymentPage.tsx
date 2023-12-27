import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import CheckoutSteps from "../checkout/CheckoutSteps";
import Payment from "./Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header activeHeading={1} />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
