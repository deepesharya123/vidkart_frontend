import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./Banner.css";
import Line from "../images/Line 2.png";
import Search from "../images/Search.png";
import Arrow1 from "../images/arrow_1_Vector 186.png";
import Arrow2 from "../images/arrow_2_Vector 187.png";
import Hand from "../images/hand.png";
import SearchedProduct from "./SearchedProduct";
import Toast from "./Toast";

// const backend = "http://localhost:8080";
const backend = "https://vidkart.onrender.com";

function Banner() {
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [search, SetSearch] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    SetSearch(value);
  };

  const searchProduct = async () => {
    // console.log("i am searching the product", search);
    const getData = async () => {
      await axios
        .get(`${backend}/customer/product/${search}`)
        .then((res) => {
          if (res.data.items.length > 0) setSearchedProduct(res.data.items);
          else Toast("Sorry, We don't have this item!");
          // console.log("response form backend is", res);
        })
        .catch((err) => {
          // console.log(err)
        });
    };
    if (search.length > 0) getData();
    else {
      Toast("Please search valid product", 400);
    }
  };

  return (
    <div>
      <div className="banner">
        <div className="heading">Buy Your Usefull Stuff</div>
      </div>
    <div className="info_search">
      <div className="info">
        <div className="left_info">
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

      <div className="search" onChange={handleSearch}>
        <input
          className="product_search"
          type="text"
          value={search}
          name="search"
          placeholder="     What are you looking for?"
        />
        <button className="search_icon" onClick={searchProduct}>
          <img src={Search} className="search_icon_2" />
        </button>
      </div>
      </div>
      <img src={Arrow1} className="arrow_1" />

      <div className="black_area">
        <img src={Hand} className="hand" />
      </div>
      <img src={Arrow2} className="arrow_2" />
      {searchedProduct.length > 0 && (
        <SearchedProduct searchedProduct={searchedProduct} />
      )}
    </div>
  );
}

export default Banner;
