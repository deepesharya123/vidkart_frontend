import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "./Register.css";
import image from "../images/register_image.png";

const backend = "http://localhost:8080";

function RegisterPage(props) {
  const { user } = props;
  const navigate = useNavigate();
  console.log("user from register page ", user);
  const [formData, SetFormData] = useState({
    [user + "name"]: "",
    [user + "email"]: "",
    [user + "password"]: "",
    [user + "phonenumber"]: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const { value, name } = e.target;
    SetFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saveData = async () => {
      const userDetails = { email: formData?.[user + "email"] };
      console.log("Sending user details to verification page", userDetails);
      axios
        .post(
          `${backend}/${user === "seller" ? "users" : "customer"}/register`,
          formData
        )
        .then((res) => {
          console.log("Sent object to backend for registration", {
            formData,
            res,
          });
        })
        .catch((err) => {
          console.log(
            "Some error occured during sending object to backedn",
            err
          );
        });
      navigate(`/${user}/sverify/`, { state: userDetails });
    };
    saveData();
    console.log("formdata is", formData);
  };

  console.log("user is ", user);
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
            name={`${user}name`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="register_name"
          />
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
          <input
            type="text"
            name={`${user}phonenumber`}
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="phonenumber"
          />
          <button className="submit">Create Account</button>
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

export default RegisterPage;
