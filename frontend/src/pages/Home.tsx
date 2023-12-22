import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";

const Home = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
