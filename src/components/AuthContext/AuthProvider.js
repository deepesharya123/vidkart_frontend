import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import Toast from "../Toast";
import { useCookies } from "react-cookie";

const AuthProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const { children } = props;
  const [user, setUser] = useState(null);
  const [authSeller, setAuthSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const loginSeller = async (url, formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(url, formData);
      if (res.status !== 200) throw new Error("Try again");

      formData.token = res.data.token;
      setUser("seller");
      setCookie("auth_token", JSON.stringify(res.data.token));

      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("isLoggedIn", JSON.stringify(res.data.token));
      localStorage.setItem("userDetails", JSON.stringify(res.data.seller));

      setAuthSeller(res.data.seller);
      setUser(res.data.seller);

      return res;
    } catch (e) {
      Toast("Plese ensure , you are using correct credentials", 400);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutSeller = async () => {};

  const isSellerAuthenticated = !!authSeller;

  return (
    <AuthContext.Provider
      value={{
        authSeller,
        isLoading,
        user,
        setUser,
        error,
        loginSeller,
        logoutSeller,
        isSellerAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
