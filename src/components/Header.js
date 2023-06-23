import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

import Cart from "../images/Cart.png";
import Person from "../images/Person.png";
import Line from "../images/Line 1.png";
import Vector from "../images/Vector.png";
import { useCookies } from "react-cookie";
import Toast from "./Toast";

const SellerComponent = () => {
  return (
    <div className="dropdown_head">
      <div className="register">Seller</div>
      <div className="dropdown_content">
        <NavLink to="/seller/register">
          <div href="#" className="seller">
            Register
          </div>
        </NavLink>
        <NavLink to="/seller/login">
          <div href="#" className="customer">
            Log in
          </div>
        </NavLink>
      </div>
    </div>
  );
};

const CustomerComponent = () => {
  return (
    <div className="dropdown_head">
      <div className="login">Customer</div>
      <div className="dropdown_content">
        <NavLink to="/customer/register">
          <div href="#" className="seller">
            Register
          </div>
        </NavLink>
        <NavLink to="/customer/login">
          <div href="#" className="customer">
            Login
          </div>
        </NavLink>
      </div>
    </div>
  );
};

const AdminComponent = () => {
  return (
    <div className="dropdown_head">
      <div className="login">Admin</div>
      <div className="dropdown_content">
        <NavLink to="/admin/register">
          <div href="#" className="seller">
            Register
          </div>
        </NavLink>
        <NavLink to="/admin/login">
          <div href="#" className="customer">
            Login
          </div>
        </NavLink>
      </div>
    </div>
  );
};

function Header() {
  const [cookie, setCookies, removeCookie] = useCookies("auth_token");

  const handleCart = (e) => {
    e.preventDefault();
    // console.log("clicking from cart", cookie.auth_token);
    if (cookie.auth_token === null || !cookie.auth_token)
      Toast("Please login!", 400);
    // alert("Please login!");
  };

  return (
    <div>
      <header>
        <nav className="left_nav">
          <ul>
            <li className="title">Vidkart</li>
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              <li className="home">Home</li>
            </NavLink>
            <li className="contacts">Contacts</li>
            <CustomerComponent />
            <SellerComponent />
            <AdminComponent />
          </ul>
          <ul className="right_nav" onClick={handleCart}>
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
