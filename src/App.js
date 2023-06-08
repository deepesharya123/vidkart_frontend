import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/login/:id" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
