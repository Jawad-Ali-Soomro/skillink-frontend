/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/header.scss";
import { CgArrowTopRight, CgMenuGridO } from "react-icons/cg";
import { GiHummingbird } from "react-icons/gi";
import Login from "./Login";
import { BiLogOut } from "react-icons/bi";

const Header = ({ isLightMode, isLoggedIn }) => {
  const tab = window.location.pathname;
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
        {!isLoggedIn ? (
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
                {isLoggedIn ? "dashboard" : "home"}
              </li>
              <li>Skills</li>
              <li>Contact</li>
              <li>Enterprise</li>
            </ul>
          </div>
        ) : (
          this
        )}
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
          {!isLoggedIn && (
            <button
              className="flex"
              style={{
                background: isLightMode ? "black" : "#eee",
                color: isLightMode ? "white" : "black",
              }}
              onClick={() => setShowLogin(true)}
            >
              let's begin!
              {/* <span className="flex">
                <CgArrowTopRight />
              </span> */}
            </button>
          )}
        </div>
        {isLoggedIn && (
          <div className="btn-menu flex col" onClick={() => setShowMenu(true)}>
            <div className="bars"></div>
            <div
              className="bars"
              style={{
                width: showMenu ? "30px" : "15px",
                marginLeft: showMenu ? "0px" : "15px",
              }}
            ></div>
            <div className="bars"></div>
          </div>
        )}
      </div>
      {showMenu && (
        <div className="main-menu flex" onClick={() => setShowMenu(false)}>
          <div
            className="main-menu-container flex col"
            style={{
              background: isLightMode ? "white" : "black",
            }}
          >
            <div
              className="top-profile flex col"
              style={{
                background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
              }}
            >
              <div className="avatar flex">
                <img src="https://avatars.githubusercontent.com/u/142707756?v=4" />
              </div>
              <div className="details flex col"></div>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <Login isLightMode={isLightMode} onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Header;
