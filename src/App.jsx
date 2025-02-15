import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { FiMoon, FiSun } from "react-icons/fi";
import Home from "./pages/Home";
import {} from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import User from "./pages/User";
import Update from "./pages/Update";
import UserSkills from "./pages/UserSkills";

function App() {
  const isLoggedIn = window.localStorage.getItem("authToken");
  const [isLightMode, setIsLightMode] = useState(false);
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    }
  }, [isLightMode]);

  return (
    <>
      <Toaster
        containerClassName="container-no-radius"
        toastOptions={{
          duration: "200",
          position: "top-right",
        }}
        containerStyle={{
          textTransform: "capitalize",
          fontWeight: 400,
          borderRadius: "0 !important",
        }}
      />
      <div
        className="theme-switcher flex"
        style={{ background: isLightMode ? "white" : "black" }}
      >
        <div
          className="icon-switch flex"
          style={{
            background: isLightMode ? "black" : "",
            color: isLightMode ? "white" : "white",
          }}
          onClick={() => setIsLightMode(true)}
        >
          <FiSun />
        </div>
        <div
          className="icon-switch flex"
          style={{
            background: !isLightMode ? "white" : "transparent",
            color: !isLightMode ? "black" : "black",
          }}
          onClick={() => setIsLightMode(false)}
        >
          <FiMoon />
        </div>
      </div>
      <BrowserRouter>
        <Header isLightMode={isLightMode} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Welcome /> : <Home />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route path="/update/profile" element={<Update />}></Route>
          <Route path="/skills/own" element={<UserSkills />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
