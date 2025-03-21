import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialize token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [doctors, setDoctors] = useState([]);

  const [userData, setUserData] = useState(false);

  // Function to update token and sync with localStorage
  const updateToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } else {
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Verify token if it exists
  const verifyToken = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data.success) {
        toast.error("Session expired. Please log in again.");
        updateToken(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      updateToken(null);
      toast.error("Invalid or expired token. Please log in again.");
    }
  };

  // Fetch doctors data if token is valid
  const getDoctorsData = async () => {
    if (!token) {
      console.log("No token available. Please login.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const loadUserData = async () => {    

    if (!token) {
      console.log("No token available. Please login.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Verify token and fetch data on mount or when token changes
  useEffect(() => {
    verifyToken();
    if (token) {
      getDoctorsData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, []);
  

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken: updateToken,
    backendUrl,
    userData,
    setUserData,
    loadUserData,
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        currencySymbol,
        token,
        setToken: updateToken,
        backendUrl,
        userData,
        setUserData,
        loadUserData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
