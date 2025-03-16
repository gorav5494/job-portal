import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export const useAutoLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("userdata");
      localStorage.removeItem("usertype");

      // Optional: Call logout API if you have one
      //   await axios.post("/api/users/logout");

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    let inactivityTimeout;

    const resetInactivityTimer = () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      // 30 minutes = 30 * 60 * 1000 milliseconds
      inactivityTimeout = setTimeout(handleLogout, 10 * 10 * 1000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleLogout();
      }
    };

    const handleBeforeUnload = () => {
      handleLogout();
    };

    // Only add listeners if user is logged in
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      // Set up event listeners for user activity
      document.addEventListener("mousemove", resetInactivityTimer);
      document.addEventListener("keypress", resetInactivityTimer);
      document.addEventListener("click", resetInactivityTimer);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Initial setup of inactivity timer
      resetInactivityTimer();
    }

    // Cleanup function
    return () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keypress", resetInactivityTimer);
      document.removeEventListener("click", resetInactivityTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array as we want this to run once on mount
};
