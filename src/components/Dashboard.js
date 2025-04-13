import React from "react";

import About from "./About/About";
import Banner from "./Banner";
import DemoProducts from "./DemoProducts";
import Footer from "./Footer";
import Header from "./Header/Header";
import Review from "./Review";

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <DemoProducts />
      <About />
      <Review />
      <Footer />
    </div>
  );
}

export default Home;
