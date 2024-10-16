import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import './App.css'
import Login from './components/Login'
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  useEffect(() => {
    const handleOffline = () => {
      alert("You are offline. Please check your connection.");
    };

    const handleOnline = () => {
      alert("Back online!");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Clean up the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;