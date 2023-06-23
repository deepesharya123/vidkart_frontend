import React from "react";
import { useParams } from "react-router";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function ActionCustomer() {
  const action = useParams().action;
  // console.log("action", action);
  return (
    <div>
      {action == "register" ? (
        <RegisterPage user="customer" />
      ) : (
        <LoginPage user="customer" />
      )}
    </div>
  );
}

export default ActionCustomer;
