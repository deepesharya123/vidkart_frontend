import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Dashboard";
import ActionCustomer from "./components/ActionCustomer";
import ActionSeller from "./components/ActionSeller";
import ActionPasswordVerify from "./components/ActionPasswordVerify";
import LandingSeller from "./components/LandingSeller";
import LandingCustomer from "./components/LandingCustomer";
import ActionAdmin from "./components/ActionAdmin";
import LoginPageAdmin from "./components/LoginPageAdmin";
import LandingAdmin from "./components/LandingAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";

// const backend = "http://localhost:8000";
const backend = "https://vidkart.onrender.com";

export const BackendContext = createContext();

function App() {
  return (
    <div className="app">
      <BackendContext.Provider value={backend}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/seller/sverify"
            element={<ActionPasswordVerify user="seller" />}
          />
          <Route
            path="/customer/cverify"
            element={<ActionPasswordVerify user="customer" />}
          />
          <Route path="/customer/:action" element={<ActionCustomer />} />
          <Route path="/seller/:action" element={<ActionSeller />} />
          <Route path="/admin/:action" element={<ActionAdmin />} />
          <Route
            path="/admin/login"
            element={<LoginPageAdmin user="admin" />}
          />
          <Route
            path="/seller/landing"
            element={<LandingSeller user="seller" />}
          />
          <Route
            path="/customer/landing"
            element={<LandingCustomer user="customer" />}
          />
          <Route
            path="/admin/landing"
            element={<LandingAdmin user="admin" />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BackendContext.Provider>
    </div>
  );
}

export default App;
