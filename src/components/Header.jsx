/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/header.scss";
import { CgArrowTopRight, CgMenuGridO } from "react-icons/cg";
import { GiHummingbird } from "react-icons/gi";
import Login from "./Login";
import { BiLogOut, BiMessageSquareDetail } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import {
  IoLogOutOutline,
  IoSettings,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { BsTools } from "react-icons/bs";
import { RiDashboard2Line, RiProfileLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { FiSettings } from "react-icons/fi";

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
              className="top-profile flex"
              style={{
                background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
              }}
            >
              <div className="avatar flex col">
                <img src="https://avatars.githubusercontent.com/u/142707756?v=4" />
                <div className="flex col user-info">
                  <h3>Jawad</h3>
                  <h4>Web Developer</h4>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="sidebar-menu flex col">
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>Dashboard</span>
                <RxDashboard className="icon" />
              </button>
              <div className="line"></div>
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>explore skills</span>
                <MdOutlineExplore className="icon" />
              </button>
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>my skills</span>
                <RiProfileLine className="icon" />
              </button>
              <div className="line"></div>
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>Requests</span>
                <GoGitPullRequest className="icon" />
              </button>
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>messages</span>
                <BiMessageSquareDetail className="icon" />
              </button>
              <div className="line"></div>
              <button
                className="sidebar-button flex bw"
                style={{
                  background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
                  color: "inherit",
                }}
              >
                <span>manage profile</span>
                <IoSettingsOutline className="icon" />
              </button>
            </div>
            <div
              className="btn-logout flex"
              onClick={() =>
                window.localStorage.clear() + window.location.reload()
              }
            >
              LOGOUT
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
