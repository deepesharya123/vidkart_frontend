import React from "react";
import { useParams } from "react-router-dom";
function Login() {
  const users = useParams();
  console.log("users from login", users);
  return <div>Login</div>;
}

export default Login;
