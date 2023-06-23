import { toFormData } from "axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastCalled = (message, status) => {
  const Success = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const Error = (message) => {
    console.log("Error method");
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  if (status === 200) Success(message);
  else Error(message);
};

function Toast(message, status) {
  console.log({ message, status });
  toastCalled(message, status);
}

export default Toast;
