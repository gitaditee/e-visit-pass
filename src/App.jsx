import Login_user_email from "./Login_user_email";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";

function App(){
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login_user_email onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>

    </>
  );
}
export default App;