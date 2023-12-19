import Lottie from "lottie-react";
import animationData from "../assets/ecommerce-animation.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
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
    </div>
  );
};

export default Loader;
