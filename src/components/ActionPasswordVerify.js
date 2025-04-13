import React, { useContext, useState } from "react";
import axios from "axios";

import "./ActionPasswordVerify.css";
import image from "../images/register_image.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { BackendContext } from "../App";

function ActionPasswordVerify(props) {
  const { user } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const backend = useContext(BackendContext);

  const [token, setToken] = useState({ [user + "TokenActivation"]: "" });
  const formData = location.state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setToken({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getVerified = async () => {
      const userDetails = { [user + "email"]: formData.email, token };

      await axios
        .post(
          `${backend}/${user === "seller" ? "users" : "customer"}/${
            user === "seller" ? "sverify" : "cverify"
          }`,
          userDetails
        )
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          Toast("Please check your credentials", 400);
        });
    };
    getVerified();
  };

  return (
    <div className="register_container">
      <div className="register_left">
        <div id="heading_register_left">
          I am here
          {user == "seller" ? " for selling my product" : "  to buy  product"}
        </div>
        <img src={image} id="image" />
      </div>
      <div className="register_right">
        <div className="create_account">Create Account</div>
        <form onSubmit={handleSubmit} className="form_style">
          <input
            type="text"
            name={`${user}TokenActivation`}
            value={token.TokenActivation}
            onChange={handleChange}
            placeholder="Please enter your token"
            className="register_name"
          />

          <button className="submit">Verify {user} Account</button>
        </form>
        <div className="register_bottom">
          <div className="have_an_account">Already have an account ? </div>
          <div className="account_login">
            <NavLink to={`/${user}/login`}>Log in</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionPasswordVerify;
