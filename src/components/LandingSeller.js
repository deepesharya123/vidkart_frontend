import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./LandingSeller.css";

import Search from "../images/Search.png";
import Sales from "../images/sales.png";
import Order from "../images/order.png";
import Sold from "../images/sold.png";
import Customer from "../images/customer.png";
import PreviousItem from "../images/previous_item.png";
const backend = "http://localhost:8080";

const Header = (props) => {
  const { user } = props;
  const [search, SetSearch] = useState("");
  const location = useLocation();
  const userDetails = location.state;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    SetSearch(value);
  };

  const searchProduct = async () => {
    const getData = async () => {
      await axios
        .get(`${backend}/customer/product/${search}`)
        .then((res) => {
          console.log("response form seller  is", res);
        })
        .catch((err) => console.log(err));
    };
    if (search.length > 0) getData();
    else alert("Please search valid product");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await axios
        .post(
          `${backend}/${user === "seller" ? "users" : "customer"}/logout`,
          userDetails,
          {
            credentials: "include",
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.status != 200)
            throw new Error("There is some error during logging out");
          navigate("/");
        })
        .catch((err) => {
          // alert("Error", err);
          console.log("handling the error logout of seller ", err);
        });
    };
    logout();
  };

  return (
    <div className="header_land">
      <div className="title_land">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Vidkart
        </Link>
      </div>
      <div className="search_land">
        <input
          onChange={handleSearch}
          className="product_search_land"
          type="text"
          value={search}
          name="search"
          placeholder="What are you looking for?"
        />
        <button className="search_icon_land" onClick={searchProduct}>
          <img src={Search} className="search_icon_2_land" />
        </button>
      </div>
      <div className="right_nav_seller">
        <form onSubmit={handleLogout}>
          <button className="logout_seller">Log out</button>
        </form>
        <div className="seller_email">
          Hi,
          {userDetails.selleremail.slice(
            0,
            userDetails.selleremail.indexOf("@")
          )}
          !
        </div>
      </div>
    </div>
  );
};

const Squareinfo = (props) => {
  const { image, count, description, modifications, color: color } = props.item;
  return (
    <div className="squares">
      <img src={image} className="image_seller_dashboard" />
      <div className="information_seller_land">
        <div>{count}</div>
        {
          <div className="show_button">
            <div>{description}</div>
            {description === "Previous Items" && (
              <button className="previous_items_seller ">Clcik me</button>
            )}
          </div>
        }
        <div style={{ color: color }}>{modifications}</div>
      </div>
    </div>
  );
};

const UploadItem = (props) => {
  const [itemData, setItemData] = useState({
    title: "",
    college: "",
    description: "",
    price: "",
    ProductUpload: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log({ name, value, len: value.length });
    setItemData({ ...itemData, [name]: value });
  };

  console.log(itemData);

  return (
    <div className="upload_section">
      <div className="form_upload">
        <form onChange={handleChange}>
          <input
            type="text"
            required
            name="title"
            value={itemData.title}
            placeholder="Enter title of the item"
            className="common_item_input"
          />
          <input
            type="text"
            required
            name="college"
            value={itemData.college}
            placeholder="Enter your college name"
            className="common_item_input"
          />{" "}
          <textarea
            type="text"
            required
            name="description"
            value={itemData.description}
            placeholder="Enter description, at keast 50 letters"
            className="common_item_input"
          />
          <input
            type="text"
            required
            name="price"
            value={itemData.price}
            placeholder="Enter price"
            className="common_item_input"
          />
          <input
            type="file"
            required
            name="ProductUpload"
            className="common_item_input file_upload"
          />
          <button className="common_item_input button_upload">
            Upload Item
          </button>
        </form>
      </div>
    </div>
  );
};

function LandingSeller(props) {
  const { user } = props;
  const data = [
    {
      image: Sales,
      count: 5000,
      description: "Total Sales",
      modifications: "+5% from yesterday",
      color: "#FEB95A",
    },
    {
      image: Order,
      count: 8,
      description: "Total Order",
      modifications: "+10% from yesterday",
      color: "#A9DFD8",
    },
    {
      image: Sold,
      count: 9,
      description: "Product Sold",
      modifications: "+5% from yesterday",
      color: "#F2C8ED",
    },
    {
      image: Customer,
      count: 3,
      description: "New Customer",
      modifications: "+50% from yesterday",
      color: "#20AEF3",
    },
    {
      image: PreviousItem,
      count: 0,
      description: "Previous Items",
      modifications: "+0 from yesterday",
      color: "#86959E",
    },
  ];
  return (
    <div>
      <Header user={user} />
      <div className="square_container">
        <h1 className="today_data">Today's Data</h1>
        <div className="square_padding">
          {data.map((item) => {
            return <Squareinfo item={item} />;
          })}
        </div>
      </div>
      <UploadItem />
    </div>
  );
}

export default LandingSeller;
