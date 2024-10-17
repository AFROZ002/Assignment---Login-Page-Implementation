import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [brands, setBrands] = useState([]);
  const [user, setUser] = useState("Super Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const brandApiUrl = import.meta.env.VITE_API_BRAND_URL;  // Use the environment variable

    if (!token) {
      window.location.href = "/";
      return;
    }

    axios
      .get(brandApiUrl, {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.error("Error fetching brands", error);
      });
  }, []);

  const handleLogout = () => {
    // Clear the token and geolocation from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("geolocation");

    // Redirect the user to the login page
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user}</h1>
      <h2>Brands List:</h2>
      <ul className="brand-list">
        {brands.map((brand) => (
          <li key={brand.id} className="brand-item">{brand.name}</li>
        ))}
      </ul>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default Dashboard;