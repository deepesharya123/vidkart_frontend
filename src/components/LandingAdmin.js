import React, { useContext, useEffect, useState } from "react";

import Search from "../images/Search.png";
import "./LandingCustomer.css";
import "./LandingAdmin.css";

import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import { BackendContext } from "../App";

const Header = (props) => {
  const backend = useContext(BackendContext);

  const { user, setSearchData } = props;
  const [search, SetSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const location = useLocation();
  const userData = location.state;
  // console.log("userData from landing page", userData);
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
          // console.log(
          //   "res.data.items to be searched form admin",
          //   res.data.items
          // );
        })
        .catch((err) => {
          // console.log(err)
        });
      setFoundSearchProduct(true);
    };
    if (search.length > 0) getData();
    else Toast("Please search valid product!", 400);
    // alert("Please search valid product");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await axios
        .post(`${backend}/admin/logout`, userDetails)
        .then((res) => {
          if (res.status != 200)
            throw new Error("There is some error during logging out");
          removeCookie("auth_token");
          localStorage.clear();
          navigate("/");
        })
        .catch((err) => {
          // alert("Error", err);
          Toast("Some error occured during logout", 400);
          // alert("Some error occured during logout");
          // console.log("handling the error logout of seller ", err);
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
          {userDetails.adminEmail.slice(0, userDetails.adminEmail.indexOf("@"))}
          !
        </div>
      </div>
    </div>
  );
};

function LandingAdmin(props) {
  const backend = useContext(BackendContext);

  const { user } = props;
  const [searchedProduct, setSearchedItems] = useState([]);
  const [allItem, showAllItem] = useState([]);
  const location = useLocation();
  const userData = location.state;
  // console.log("userData from landing page main compo", userData);

  useEffect(() => {
    const getAllItems = async () => {
      const data = { token: userData.token, adminEmail: userData.adminEmail };
      // console.log("Get all items");
      await axios
        .post(`${backend}/admin/allitems`, data)
        .then((res) => {
          showAllItem(res.data);
          // console.log("From all items,", res.data);
        })
        .catch((err) => {
          // console.log("err occure", err);
        });
    };
    getAllItems();
  }, []);

  const setSearchData = (items) => {
    setSearchedItems([, ...items]);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handleDeleteItem = (id) => {
    const data = { id, token: cookies.auth_token };
    // console.log("Item to be added", data);
    const itemsincart = async () => {
      await axios
        .post(`${backend}/admin/deletethisItem`, data)
        .then((res) => {
          Toast("Deleted item successfully!", 400);
          // alert("Deleted item successfully!");
          searchedProduct.filter((item) => item._id != id);
          // console.log("Delete the item for seller", res);
        })
        .catch((err) => {
          Toast(err.response.data.message, 400);
          // alert(err.response.data.message);
          // console.log("error during the deleting the item", err);
        });
    };
    itemsincart();
  };

  // console.log("allItem", allItem);
  return (
    <div>
      <Header user={user} setSearchData={setSearchData} />
      {allItem.length > 0 && (
        <div className="searched_product_land">
          <h1 className="showing_all_items">Showing all items </h1>

          {allItem?.length > 0 &&
            allItem.map((product) => {
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
                      onClick={() => handleDeleteItem(_id)}
                    >
                      Delete item
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {searchedProduct.length > 0 && (
        <div className="searched_product_land">
          <h1>Showing searched results </h1>
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
                      onClick={() => handleDeleteItem(_id)}
                    >
                      Delete item
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

export default LandingAdmin;
