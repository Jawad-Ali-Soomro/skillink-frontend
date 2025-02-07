/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/header.scss";
import { CgArrowTopRight } from "react-icons/cg";
import { GiHummingbird } from "react-icons/gi";
import Login from "./Login";

const Header = ({ isLightMode, isLoggedIn }) => {
  const tab = window.location.pathname;
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="header-container flex bw">
      <div className="left-header-wrapper flex">
        <div className="logo flex">
          <div
            className="circle flex"
            style={{
              background: isLightMode ? "#80808033" : "rgba(255,255,255, 0.2)",
            }}
          >
            <GiHummingbird className="icon" />
          </div>
          {/* <h1>
            SKILL<span>.INK</span>
          </h1> */}
        </div>
        <div className="navs flex">
          <ul
            className="flex"
            style={{
              color: isLightMode ? "rgba(0,0,0,.5)" : "rgba(255,255,255,0.8)",
            }}
          >
            <li
              style={{
                color: tab == "/" && isLightMode == true ? "black" : "white",
              }}
            >
              Home
            </li>
            <li>Skills</li>
            <li>Contact</li>
            <li>Enterprise</li>
          </ul>
        </div>
      </div>
      <div className="right-header-wrapper flex">
        <div
          className="search-box flex bw"
          style={{ background: isLightMode ? "#eee" : "rgba(255,255,255,.1)" }}
        >
          <input type="text" placeholder="" />
          <div className="keys flex">
            <div className="key flex">CTRL</div>
            <div className="key flex">K</div>
          </div>
        </div>
        <div className="btns flex">
          <button
            className="flex bw"
            style={{
              background: isLightMode ? "black" : "#eee",
              color: isLightMode ? "white" : "black",
            }}
            onClick={() => setShowLogin(true)}
          >
            {isLoggedIn ? "Profile" : "let's Go"}
            <span className="flex">
              <CgArrowTopRight />
            </span>
          </button>
        </div>
      </div>

      {showLogin && (
        <Login isLightMode={isLightMode} onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Header;
