import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

import "./Login.css";
import image from "../images/register_image.png";
import Toast from "./Toast";
import { BackendContext } from "../App";
import AuthContext from "./AuthContext/AuthContext";

function LoginPage(props) {
  const { user } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const backend = useContext(BackendContext);
  const { loginSeller } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, SetFormData] = useState({
    [user + "email"]: "",
    [user + "password"]: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    SetFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const login = async () => {
    const url = `${backend}/${user === "seller" ? "users" : "customer"}/login`;
    console.log("hit url  ", { url, user });

    if (user === "seller") {
      console.log("call the seller of authcontext ");
      const response = await loginSeller(url, formData);
      console.log(response);
      console.log("from last of ");
      formData.token = response.data.token;
      setCookie("auth_token", response.data.token);
      navigate(`/${user === "seller" ? "seller" : "customer"}/landing`, {
        state: formData,
      });
    } else
      await axios
        .post(url, formData)
        .then((res) => {
          if (res.status !== 200) throw new Error("Try again");
          // dashboard after login
          formData.token = res.data.token;
          // setting cookie
          setCookie("auth_token", res.data.token);
          navigate(`/${user === "seller" ? "seller" : "customer"}/landing`, {
            state: formData,
          });
        })
        .catch((err) => {
          console.log("Error occures during login", err);
          Toast("Plese ensure , you are using correct credentials", 400);
        });
    console.log("last um last ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="register_container">
      <div className="register_left">
        <div id="heading_register_left">
          I am here
          {user === "seller" ? " for selling my product" : "  to buy  product"}
        </div>
        <img
          src={image}
          id="image"
          alt="Image is not supported in your browser."
        />
      </div>
      <div className="register_right">
        <div className="create_account">Login </div>
        <form onSubmit={handleSubmit} className="form_style">
          <input
            type="email"
            name={`${user}email`}
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="email"
          />
          <input
            type="password"
            name={`${user}password`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="password"
          />
          <button className="submit">Log In</button>
        </form>
        <div className="register_bottom">
          <div className="have_an_account">Don't have an account ? </div>
          <div className="account_login">
            <NavLink to={`/${user}/register`}>Register</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
