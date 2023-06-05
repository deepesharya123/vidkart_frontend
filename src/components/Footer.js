import React from "react";

import "./Footer.css";

import Facebook from "../images/gg_facebook.png";
import Instagram from "../images/ri_instagram-fill.png";
import Twitter from "../images/twitter.png";

function Footer() {
  return (
    <div className="footer">
      <div className="left">
        <div className="footer_title">Vidkart</div>
        <div className="tag_line">We help you find your usefull product</div>
        <div className="social_icons">
          <img src={Facebook} className="circle" />
          <img src={Instagram} className="circle" />
          <img src={Twitter} className="circle" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
