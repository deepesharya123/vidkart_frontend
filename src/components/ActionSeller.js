import React from "react";

import { useParams } from "react-router";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function ActionSeller() {
  const action = useParams().action;
  return (
    <div>
      {action == "register" ? (
        <RegisterPage user="seller" />
      ) : (
        <LoginPage user="seller" />
      )}
    </div>
  );
}

export default ActionSeller;
