import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

import Cart from "../images/Cart.png";
import Person from "../images/Person.png";
import Line from "../images/Line 1.png";
import Vector from "../images/Vector.png";

const RegisterComponent = () => {
  return (
    <div class="dropdown_head">
      <div class="register">Register</div>
      <div class="dropdown_content">
        <NavLink to="/register/seller">
          <div href="#" className="seller">
            Seller
          </div>
        </NavLink>
        <NavLink to="/register/customer">
          <div href="#" className="customer">
            Customer
          </div>
        </NavLink>
      </div>
    </div>
  );
};

const LoginComponent = () => {
  console.log("Login");
  return (
    <div class="dropdown_head">
      <div class="login">Login</div>
      <div class="dropdown_content">
        <NavLink to="/login/seller">
          <div href="#" className="seller">
            Seller
          </div>
        </NavLink>
        <NavLink to="/login/customer">
          <div href="#" className="customer">
            Customer
          </div>
        </NavLink>
      </div>
    </div>
  );
};

function Header() {
  return (
    <div>
      <header>
        <nav className="left_nav">
          <ul>
            <li className="title">Vidkart</li>
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              <li className="home">Home</li>
            </NavLink>
            <li className="products">Products</li>
            <li className="contacts">Contacts</li>
            <RegisterComponent />
            <LoginComponent />
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
