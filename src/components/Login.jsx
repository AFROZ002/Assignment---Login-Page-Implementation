import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email and password validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, with one number and one special character."
      );
      return;
    }

    try {
      // API call to login
      const loginApiUrl = import.meta.env.VITE_API_LOGIN_URL;  // Use the environment variable

      const response = await axios.post(loginApiUrl, {
        email_id: email,
        password: password,
        type: "super_admin"
      });
      

      // Get token from response and store it in localStorage
      console.log(response);
      const { token } = response.data.data.data.token;
      console.log(token);
      localStorage.setItem("token", token);

      // Fetch and store geolocation after login success
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("geolocation", JSON.stringify({ latitude, longitude }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );

      // Redirect to the dashboard after successful login and geolocation storage
      navigate("/dashboard");
    //   window.location.href = "/dashboard";
    } catch (error) {
      setError("Invalid credentials or server issue.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
