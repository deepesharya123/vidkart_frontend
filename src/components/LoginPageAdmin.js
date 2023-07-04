import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

import "./Login.css";
import image from "../images/register_image.png";
import Toast from "./Toast";

// const backend = "http://localhost:8080";

const backend = "https://vidkart.onrender.com";

function LoginPage(props) {
  const { user } = props;
  // console.log("user from login page", user);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const [formData, SetFormData] = useState({
    [user + "Email"]: "",
    [user + "Password"]: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    SetFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      await axios
        .post(`${backend}/admin/login`, formData)
        .then((res) => {
          console.log("login admin page", res.data);
          if (res.status !== 200) throw new Error("Try again");
          // dashboard after login
          formData.token = res.data.token;
          // setting cookie
          setCookie("auth_token", res.data.token);
          navigate(`/admin/landing`, {
            state: formData,
          });
        })
        .catch((err) => {
          // console.log("Error occures during login", err);
          Toast("Plese ensure , you are using correct credentials", 400);
          // alert("Plese ensure , you are using correct credentials");
        });
    };
    login();
  };

  return (
    <div className="register_container">
      <div className="register_left">
        <div id="heading_register_left">Welcome Admin!</div>
        <img src={image} id="image" />
      </div>
      <div className="register_right">
        <div className="create_account">Login for Admin </div>
        <form onSubmit={handleSubmit} className="form_style">
          <input
            type="email"
            name={`${user}Email`}
            value={formData.Email}
            onChange={handleChange}
            placeholder="E-mail"
            className="email"
          />
          <input
            type="password"
            name={`${user}Password`}
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
            className="password"
          />
          <button className="submit">Log In</button>
        </form>
        <div className="register_bottom">
          <div className="have_an_account">Don't have an account ? </div>
          <div className="account_login">
            <NavLink to={`/admin/register`}>Register</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
