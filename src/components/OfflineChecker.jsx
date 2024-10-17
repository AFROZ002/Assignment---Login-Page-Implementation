import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfflineChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOffline = () => {
      navigate("/offline");  // Navigate to the offline page when offline
    };

    const handleOnline = () => {
      if (localStorage.getItem("token")) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  return null;  // This component doesn't render anything
};

export default OfflineChecker;
