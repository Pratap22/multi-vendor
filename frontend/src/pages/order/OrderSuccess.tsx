import Lottie from "lottie-react";
import animationData from "../../assets/success.json";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const OrderSuccess = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          width={300}
          height={300}
        />
        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
          Your order is successful 😍
        </h5>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
