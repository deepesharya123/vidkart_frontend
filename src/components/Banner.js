import React from "react";

import "./Banner.css";
import Line from "../images/Line 2.png";
import Search from "../images/Search.png";
import Arrow1 from "../images/arrow_1_Vector 186.png";
import Arrow2 from "../images/arrow_2_Vector 187.png";
import Hand from "../images/hand.png";

function Banner() {
  return (
    <div>
      <div className="banner">
        <div className="heading">Buy Your Usefull Stuff</div>
      </div>

      <div className="info">
        <div className="left">
          <div className="info_left_top">5+</div>
          <div className="info_left_bottom">UseFull Items</div>
        </div>
        <div>
          <img src={Line} className="line_info"></img>
        </div>
        <div className="right">
          <div className="info_right_top">10+</div>
          <div className="info_right_bottom">Customers</div>
        </div>
      </div>

      <div className="search">
        <input
          className="product_search"
          type="text"
          placeholder="What are you looking for?"
        />
        <div className="search_icon">
          <img src={Search} className="search_icon_2" />
        </div>
      </div>

      <img src={Arrow1} className="arrow_1" />

      <div className="black_area">
        <img src={Hand} className="hand" />
      </div>
      <img src={Arrow2} className="arrow_2" />
    </div>
  );
}

export default Banner;
