import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiIntance from "../api/apiInstance";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await apiIntance.get(`/users?email=${user.email}`);

      if (res.data.length > 0) {
        alert("User already exists");
        return;
      }

      await apiIntance.post("/users", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title mb-5">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" required onChange={handleChange} />
            <label>Name :</label>
          </div>

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

          <button className="signup-btn">Signup</button>
        </form>

        <p className="signup-footer">
          Already have an account?
          <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
