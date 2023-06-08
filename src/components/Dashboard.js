import React from "react";

import Header from "./Header";
import Banner from "./Banner";
import About from "./About";
import Review from "./Review";
import Footer from "./Footer";
import DemoProducts from "./DemoProducts";

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
