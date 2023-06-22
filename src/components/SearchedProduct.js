import React from "react";

import "./SearchedProduct.css";
import { useCookies } from "react-cookie";

function SearchedProduct(props) {
  const { searchedProduct } = props;
  const [cookie, setCookie] = useCookies();

  const handleAddToCart = () => {
    if (!cookie.auth_token) alert("Please login!");
  };

  console.log("props from searchedProduct", searchedProduct);
  return (
    <div className="searched_product">
      {searchedProduct?.length > 0 &&
        searchedProduct.map((product) => {
          const { imagePath, college, phonenumber, description, price, title } =
            product;
          return (
            <div className="display_items_container">
              <img src={imagePath} className="searched_image" />
              <div className="show_product">
                <div>
                  <h1>{title}</h1>
                </div>
                <div className="mr">
                  {description.length < 100
                    ? description
                    : description.substr(0, 100)}
                </div>
                <div className="mr">{college}</div>
                <div className="mr">Buy @ {price}</div>{" "}
                <button className="add_to_cart_search">
                  <div className="cart_text" onClick={handleAddToCart}>
                    Add to Cart
                  </div>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SearchedProduct;
