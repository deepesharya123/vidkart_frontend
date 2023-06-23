import React from "react";

import { useParams } from "react-router";
import RegisterPageAdmin from "./RegisterPageAdmin";
import LoginPage from "./LoginPage";

function ActionAdmin() {
  const action = useParams().action;
  console.log("From action admin", action);
  return (
    <div>
      {action == "register" ? (
        <RegisterPageAdmin user="admin" />
      ) : (
        <LoginPage user="admin" />
      )}
    </div>
  );
}

export default ActionAdmin;
