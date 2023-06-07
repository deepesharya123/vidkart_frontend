import React, { useEffect, useState } from "react";

import "./DemoProducts.css";
import axios from "axios";

const ShowProduct = (props) => {
  const { category, description, id, image, price, rating, title } = props;

  console.log({
    category,
    description,
    id,
    image,
    price,
    rating,
    title,
  });
  return (
    <div className="demo_product">
      <img src={image} className="image_demo" />
      <div className="title_demo">{title} </div>
      <div className="price_rating">
        <div className="original_price">Rs. {price * 80}</div>
        <div className="discount_price">
          Rs. {price * 80 + 0.2 * (price * 80)}
        </div>
      </div>
      <button className="add_to_cart">
        <div className="cart_text">Add to Cart</div>
      </button>
    </div>
  );
};

function DemoProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("inside useEffect");
    const getData = async () => {
      await axios
        .get("https://fakestoreapi.com/products/category/electronics?limit=5")
        .then((res) => {
          console.log("res", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <div className="demo">
      {data.length > 0 &&
        data.map((item) => (
          <ShowProduct
            category={item.category}
            description={item.description}
            id={item.id}
            image={item.image}
            price={item.price}
            title={item.title}
          />
        ))}
    </div>
  );
}
export default DemoProducts;