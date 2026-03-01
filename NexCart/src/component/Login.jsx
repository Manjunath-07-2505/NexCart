import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/Background.jpeg";
import "./Register.css";   // reuse same CSS

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/api/auth/login", {
  username,
  password
});

      alert("Login Successful ✅");

      console.log(response.data);

      // redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      alert("Invalid Username or Password ❌");
      console.error(error);
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="register-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off">

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button type="submit">Sign In</button>

          <p className="login-text">
            New user? <Link to="/">Register here</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;