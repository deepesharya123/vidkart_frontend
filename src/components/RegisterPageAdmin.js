import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "./Register.css";
import image from "../images/register_image.png";
import Toast from "./Toast";
import { BackendContext } from "../App";

function RegisterPage(props) {
  const { user } = props;
  const backend = useContext(BackendContext);

  // console.log("user is ", user);
  const navigate = useNavigate();
  const [formData, SetFormData] = useState({
    [user + "Name"]: "",
    [user + "Email"]: "",
    [user + "Password"]: "",
    [user + "Phonenumber"]: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    SetFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow only vidkart4u@gmail.com as admin
    // if (formData?.[user + "Email"] !== "vidkart4u@gmail.com") {
    //   console.log("formData.Email", formData?.[user + "Email"]);
    //   alert("You are not authorized to login!");
    //   navigate("/");
    //   return;
    // }
    const saveData = async () => {
      const userDetails = { email: formData?.[user + "Email"] };
      // console.log("Sending user details to verification page", userDetails);
      axios
        .post(`${backend}/admin/register`, formData)
        .then((res) => {
          // console.log("Sent object to backend for registration", {
          //   formData,
          //   res,
          // });
        })
        .catch((err) => {
          if (err.reponse === 409) Toast("User is already registered", 400);
          // alert("User is already registered");
          else Toast("Something went wrong, during registration!", 400);
          // alert("Something went wrong, during registration!");
          // console.log(
          //   "Some error occured during sending object to backedn",
          //   err
          // );
        });
      navigate(`/admin/login/`, {
        state: userDetails,
      });
    };

    saveData();
    // console.log("formdata is", formData);
  };

  return (
    <div className="register_container">
      <div className="register_left">
        <div id="heading_register_left">
          {user === "admin"
            ? "Welcome Admin!"
            : user === "seller"
            ? " I am here for selling my product"
            : "  I am here to buy  product"}
        </div>
        <img src={image} id="image" />
      </div>
      <div className="register_right">
        <div className="create_account">Create Account</div>
        <form onSubmit={handleSubmit} className="form_style">
          <input
            type="text"
            name={`${user}Name`}
            value={formData.Name}
            onChange={handleChange}
            placeholder="Full Name"
            className="register_name"
          />
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
          <input
            type="text"
            name={`${user}Phonenumber`}
            value={formData.Phonenumber}
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
