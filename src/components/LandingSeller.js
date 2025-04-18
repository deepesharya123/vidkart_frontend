import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./LandingSeller.css";

import { useCookies } from "react-cookie";
import { BackendContext } from "../App";
import Search from "../images/Search.png";
import Customer from "../images/customer.png";
import Order from "../images/order.png";
import PreviousItem from "../images/previous_item.png";
import Sales from "../images/sales.png";
import Sold from "../images/sold.png";
import AuthContext from "./AuthContext/AuthContext";
import Toast from "./Toast";

const Header = (props) => {
  const backend = useContext(BackendContext);
  const { user, setSearchData } = props;

  const [search, SetSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const location = useLocation();
  const userData = location.state;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const [foundSearchProduct, setFoundSearchProduct] = useState(false);

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
          if (res.data.items.length > 0) setSearchData(res.data.items);
          else
            Toast(
              "This product is not available, please try something else",
              400
            );
        })
        .catch((err) => {
          // console.log(err)
        });
      setFoundSearchProduct(true);
    };
    if (search.length > 0) getData();
    else Toast("Please search valid product!", 400);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await axios
        .post(`${backend}/${"users"}/logout`, userDetails)
        .then((res) => {
          if (res.status != 200) throw new Error("Something went wrong");
          removeCookie("auth_token");
          navigate("/");
          localStorage.clear();
        })
        .catch((err) => {
          Toast("Some error occured during logout!", 400);
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
          {userDetails?.sellername || userDetails?.selleremail}!
        </div>
      </div>
    </div>
  );
};

const Squareinfo = (props) => {
  const { image, count, description, modifications, color: color } = props.item;
  const allPreviousItems = props.allPreviousItems;
  const backend = useContext(BackendContext);

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handlePreviousItems = () => {
    const getPreviousItems = async () => {
      await axios
        .post(`${backend}/users/previousItem`, { token: cookies.auth_token })
        .then((res) => {
          allPreviousItems(res.data);
        })
        .catch((err) => {
          console.log("Some error occured during fetching previous items", err);
        });
    };
    getPreviousItems();
  };

  return (
    <div className="squares">
      <img src={image} className="image_seller_dashboard" />
      <div className="information_seller_land">
        <div>{count}</div>
        {
          <div className="show_button">
            <div>{description}</div>
            {description === "Previous Items" && (
              <button
                className="previous_items_seller "
                onClick={handlePreviousItems}
              >
                Click me
              </button>
            )}
          </div>
        }
        <div style={{ color: color }}>{modifications}</div>
      </div>
    </div>
  );
};

const UploadItem = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const backend = useContext(BackendContext);

  const [itemData, setItemData] = useState({
    title: "",
    college: "",
    description: "",
    price: "",
    ProductUpload: "",
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
    if (e.target.type == "file") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage({ [name]: reader.result });
        setItemData({ ...itemData, ProductUpload: reader.result });
      };
      reader.onerror = (err) => {
        console.log("err", err);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadItem = async () => {
      itemData.token = cookies.auth_token;

      await axios
        .post(`${backend}/users/uploadItem`, itemData, {})
        .then((res) => {
          if (res.status !== 200) throw new Error("Please try again!");
          Toast(res.data.message, 200);
        })
        .catch((err) => {
          Toast(
            "Something went wrong while product uploading!,Please try again!",
            400
          );
        });
    };

    uploadItem();

    setItemData({
      title: "",
      college: "",
      description: "",
      price: "",
      ProductUpload: "",
    });
  };

  return (
    <div className="upload_section">
      <div className="form_upload">
        <form
          onChange={handleChange}
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
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
            placeholder="Enter description, at least 50 letters"
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
      {/* show uploading item data */}
      {/* {itemData.ProductUpload != "" && itemData.ProductUpload && (
        <img src={itemData.ProductUpload} />
      )} */}
    </div>
  );
};

const ShowItems = (props) => {
  const {
    college,
    description,
    imagePath,
    owner,
    phoneNumber,
    price,
    title,
    _id,
  } = props.item;
  const backend = useContext(BackendContext);

  const [cookie, setCookie] = useCookies();

  const handleItemDelete = (id) => {
    // e.preventDefault();
    const token = cookie.auth_token;
    const formData = { token, id };
    const deleteitem = async () => {
      await axios
        .post(`${backend}/users/deletethisItem`, formData)
        .then((res) => {
          Toast("Item deleted successfully", 200);
        })
        .catch((err) => {
          // console.log("Error Occured while deleting the item", err)
        });
    };
    deleteitem();
  };

  return (
    <div className="previous_item">
      <img src={imagePath} className="item_image" />
      <div className="item_info">
        {" "}
        <div className="title_item">{title}</div>
        <div>Buy @ Only{price}</div>
        <button
          type="submit"
          onClick={() => handleItemDelete(_id)}
          className="delete_item"
        >
          Delete this item
        </button>
      </div>
    </div>
  );
};

function LandingSeller(props) {
  const { user } = useContext(AuthContext);

  const [previousItems, setPreviousItems] = useState([]);
  const allPreviousItems = (allitems) => {
    setPreviousItems(allitems);
  };
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

  const [searchedProduct, setSearchedItems] = useState([]);
  const setSearchData = (items) => {
    setSearchedItems([...searchedProduct, ...items]);
  };
  return (
    <div>
      <Header user={user} setSearchData={setSearchData} />
      <div className="square_container">
        <h1 className="today_data">Today's Data</h1>
        <div className="square_padding">
          {data.map((item) => {
            return (
              <Squareinfo item={item} allPreviousItems={allPreviousItems} />
            );
          })}
        </div>
      </div>
      <UploadItem />
      <div className="previous_items_list">
        {previousItems?.length > 0 &&
          previousItems.map((item) => {
            return <ShowItems item={item} />;
          })}
      </div>
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
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default LandingSeller;
