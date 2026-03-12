import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <NavLink to="/" className="brand">
          P.M.S
        </NavLink>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Add Product
          </NavLink>

          <NavLink
            to="/view-product"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            View Products
          </NavLink>
        </nav>

        {/* User Area */}
        {user && (
          <div className="user-area">
            <span className="welcome-text">Welcome, {user.name}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
