import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Dashboard";
import ActionCustomer from "./components/ActionCustomer";
import ActionSeller from "./components/ActionSeller";
import ActionPasswordVerify from "./components/ActionPasswordVerify";
import LandingSeller from "./components/LandingSeller";
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
          path="/customer/sverify"
          element={<ActionPasswordVerify user="customer" />}
        />
        <Route path="/customer/:action" element={<ActionCustomer />} />
        <Route path="/seller/:action" element={<ActionSeller />} />
        <Route
          path="/seller/landing"
          element={<LandingSeller user="seller" />}
        />
      </Routes>
    </div>
  );
}

export default App;
