import React from "react";
import "./Header.css";

import Cart from "../images/Cart.png";
import Person from "../images/Person.png";
import Line from "../images/Line 1.png";
import Vector from "../images/Vector.png";

function Header() {
  return (
    <div>
      <header>
        <nav className="left_nav">
          <ul>
            <li className="title">Vidkart</li>
            <li className="home">Home</li>
            <li className="products">Products</li>
            <li className="contacts">Contacts</li>
          </ul>
          <ul className="right_nav">
            <li className="cart">
              <img src={Cart}></img>
            </li>
            <li className="person">
              <img src={Person}></img>
            </li>
            <li className="line">
              <img src={Line}></img>
            </li>
            <li className="vector">
              <img src={Vector}></img>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
