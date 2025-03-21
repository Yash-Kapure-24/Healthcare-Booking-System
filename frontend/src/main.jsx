import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext.jsx";
import { doctors } from "./assets/assets.js";

const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AppContext.Provider value={{ token, setToken, doctors }}>
      {children}
    </AppContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
