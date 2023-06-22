import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Dashboard";
import ActionCustomer from "./components/ActionCustomer";
import ActionSeller from "./components/ActionSeller";
import ActionPasswordVerify from "./components/ActionPasswordVerify";
import LandingSeller from "./components/LandingSeller";
import LandingCustomer from "./components/LandingCustomer";
const backend = "http://localhost:8080/";

function App() {
  return (
    <div className="app">
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
        <Route
          path="/seller/landing"
          element={<LandingSeller user="seller" />}
        />
        <Route
          path="/customer/landing"
          element={<LandingCustomer user="customer" />}
        />
      </Routes>
    </div>
  );
}

export default App;
