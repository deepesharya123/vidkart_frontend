import React, { useEffect, useState } from "react";

import Search from "../images/Search.png";
import "./LandingCustomer.css";
import Watch from "../images/watch.png";
import Cart from "../images/Buy.png";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
// const backend = "http://localhost:8080";
const backend = "https://vidkart.onrender.com";

const Header = (props) => {
  const { user, setSearchData, getcartItem } = props;
  const [search, SetSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const location = useLocation();
  const userData = location.state;
  const [userDetails, setUserDetails] = useState(userData);
  const navigate = useNavigate();
  const [foundSearchProduct, setFoundSearchProduct] = useState(false);
  useEffect(() => {
    setUserDetails(!userDetails ? userData : userDetails);
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    SetSearch(value);
  };

  const searchProduct = async () => {
    const getData = async () => {
      await axios
        .get(`${backend}/customer/product/${search}`)
        .then((res) => {
          // setSearchedProduct(res.data.items);
          setSearchData(res.data.items);
        })
        .catch((err) => {
          // console.log(err)
        });
      setFoundSearchProduct(true);
    };
    if (search.length > 0) getData();
    else Toast("Please search valid product", 400);
    // alert("Please search valid product");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await axios
        .post(
          `${backend}/${user === "seller" ? "users" : "customer"}/logout`,
          userDetails
        )
        .then((res) => {
          if (res.status != 200)
            throw new Error("There is some error during logging out");
          removeCookie("auth_token");
          navigate("/");
        })
        .catch((err) => {
          Toast("Some error occured during logout", 400);
          // alert("Some error occured during logout");
          // console.log("handling the error logout of seller ", err);
        });
    };
    logout();
  };

  const handleShowCart = (e) => {
    // console.log("userDetails cart item of", userDetails);
    const getAllItems = async () => {
      await axios
        .post(`${backend}/customer/previousItem`, userDetails)
        .then((res) => {
          // console.log("Add to cart item list", res);
          // setShowCartItem(res.data);
          getcartItem(res.data);
        })
        .catch((err) => {
          // console.log("Erro occured during fetching cart items", err);
        });
    };
    getAllItems();
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
        <div className="cart_container" onClick={handleShowCart}>
          <img src={Cart} className="cart_image" />
          <div className="cart_text_land">My Cart</div>
        </div>
        <div className="seller_email">
          Hi,
          {userDetails.customeremail.slice(
            0,
            userDetails.customeremail.indexOf("@")
          )}
          !
        </div>
      </div>
    </div>
  );
};

const Advertisement = () => {
  return (
    <div className="advertisement_container">
      <div className="ad_text">
        <div className="ad_top_text">Best Deal Online on smart watches</div>
        <div className="ad_mid_text">SMART WEARABLE.</div>
        <div className="ad_bottom_text">UP to 80% OFF</div>
        <img src={Watch} />
      </div>
      <div className="right_ad">
        <div className="top_circle"></div>
        {/* <div className="top_circle_container">
        </div> */}
        <div className="bottom_circle"></div>
      </div>
    </div>
  );
};

function LandingCustomer(props) {
  const { user } = props;
  const [searchedProduct, setSearchedItems] = useState([]);

  const setSearchData = (items) => {
    setSearchedItems([, ...items]);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [showCartItem, setShowCartItem] = useState([]);
  const getcartItem = (items) => {
    setShowCartItem([...showCartItem, ...items]);
  };
  // console.log("showCartItem is", showCartItem);
  const handleAddtoCart = (id) => {
    const data = { id, token: cookies.auth_token };
    // console.log("Item to be added", data);
    const itemsincart = async () => {
      await axios
        .post(`${backend}/customer/loggedin/addtocart`, data)
        .then((res) => {
          // console.log("add to cart for customer", res);
        })
        .catch((err) => {
          Toast(err.response.data.message, 400);
          // alert(err.response.data.message);
          // console.log("error during the add to cart", err);
        });
    };
    itemsincart();
  };

  const handleDeleteFromCart = (id) => {
    const data = { id, token: cookies.auth_token };
    const deleteItem = async () => {
      await axios
        .post(`${backend}/customer/deletethisItem`, data)
        .then((res) => {
          // console.log("Item is delete and in then block", res);
        })
        .catch((err) => {
          // console.log("Error occured during deletion of item", err);
        });
    };
    deleteItem();
    // console.log("Delete this item from cart", id);
  };

  return (
    <div>
      <Header
        user={user}
        setSearchData={setSearchData}
        getcartItem={getcartItem}
      />
      <Advertisement />
      {searchedProduct.length > 0 && (
        <div className="searched_product_land">
          {searchedProduct?.length > 0 &&
            searchedProduct.map((product) => {
              const {
                imagePath,
                college,
                phonenumber,
                description,
                price,
                title,
                _id,
              } = product;
              return (
                <div className="display_items_container_seller_land">
                  <img src={imagePath} className="searched_image_seller_land" />
                  <div className="show_product_seller_land">
                    <div>
                      <h1>{title}</h1>
                    </div>
                    <div className="mr_seller_land">
                      {description.length < 100
                        ? description
                        : description.substr(0, 100)}
                    </div>
                    <div className="mr_seller_land">{college}</div>
                    <div className="mr_seller_land">Buy @ {price}</div>{" "}
                    <div
                      className="add_to_cart_customer"
                      onClick={() => handleAddtoCart(_id)}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {showCartItem.length > 0 && (
        <div className="searched_product_land">
          {showCartItem?.length > 0 &&
            showCartItem.map((product) => {
              const {
                imagePath,
                college,
                phonenumber,
                description,
                price,
                title,
                _id,
              } = product;
              return (
                <div className="display_items_container_seller_land">
                  <img src={imagePath} className="searched_image_seller_land" />
                  <div className="show_product_seller_land">
                    <div>
                      <h1>{title}</h1>
                    </div>
                    <div className="mr_seller_land">
                      {description.length < 100
                        ? description
                        : description.substr(0, 100)}
                    </div>
                    <div className="mr_seller_land">{college}</div>
                    <div className="mr_seller_land">Buy @ {price}</div>{" "}
                    <div
                      className="add_to_cart_customer"
                      onClick={() => handleDeleteFromCart(_id)}
                    >
                      Delete from Cart
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default LandingCustomer;
