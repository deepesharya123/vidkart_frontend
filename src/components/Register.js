import React, { useState } from "react";
import { useParams } from "react-router";

import "./Register.css";
import image from "../images/register_image.png";
import { NavLink } from "react-router-dom";

function Register(props) {
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user = useParams().id;

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const { value, name } = e.target;
    SetFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata is", formData);
  };

  console.log("user is ", user);
  return (
    <div className="register_container">
      <div className="register_left">
        <div id="heading_register_left">
          I am here{" "}
          {user == "seller" ? " for selling my product" : "  to buy  product"}
        </div>
        <img src={image} id="image" />
      </div>
      <div className="register_right">
        <div className="create_account">Create Account</div>
        <form onSubmit={handleSubmit} className="form_style">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="register_name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="password"
          />
          <button className="submit">Create Account</button>
        </form>
        <div className="register_bottom">
          <div className="have_an_account">Already have an account ? </div>
          <div className="account_login">
            <NavLink to={`/login/${user}`}>Log in</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
