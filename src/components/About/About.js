import React from "react";

import About1 from "../../images/Group 1.png";
import About2 from "../../images/Group 2.png";
import "./About.css";

const AboutDetails = (props) => {
  const { image, heading, description } = props;
  return (
    <div>
      <div className="image_heading">
        <img src={image} />
        <div className="heading_about">{heading}</div>
      </div>
      <div className="description">{description}</div>
    </div>
  );
};

function About() {
  return (
    <div className="about">
      <div className="about_us">About Us</div>
      <div className="about_info">Order now and enjoy the savings, </div>
      <div className="about_details">
        <AboutDetails
          image={About1}
          heading={"Large Assortment"}
          description="we offer many different types of products with fewer variations in each category."
        />
        <AboutDetails
          image={About2}
          heading={"Fast & Free Shipping"}
          description="4-day or less delivery time, free shipping and an expedited delivery option."
        />
        <AboutDetails
          image={About1}
          heading={"24/7 Support"}
          description="answers to any business related inquiry 24/7 and in real-time."
        />
      </div>
    </div>
  );
}

export default About;
