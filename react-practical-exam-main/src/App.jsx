import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Addproduct from "./components/Addproduct";
import Viewproduct from "./components/Viewproduct";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Addproduct />} />
        <Route path="/view-product" element={<Viewproduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
