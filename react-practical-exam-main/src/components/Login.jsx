import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import apiIntance from "../api/apiInstance";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiIntance.get(
        `/users?email=${loginData.email}&password=${loginData.password}`,
      );

      if (res.data.length === 0) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data[0]));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title mb-5">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email :</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            <label>Password :</label>
          </div>

          <button className="login-btn">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account?
          <NavLink to="/signup">Signup</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
