/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/header.scss";
import { GiHummingbird } from "react-icons/gi";
import Login from "./Login";
import { BiCamera, BiMessageSquareDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiProfileLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineExplore } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { getUserInfo } from "../utils/getUser";
import { useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { userUrl } from "../utils/apiUrls";

const Header = ({ isLightMode, isLoggedIn }) => {
  const userId = window.localStorage.getItem("authUserId");
  const tab = window.location.pathname;
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    const userId = window.localStorage.getItem("authUserId");
    console.log(userId);
    formData.append("avatar", file);
    formData.append("userId", userId);

    try {
      const response = await axios.post(`${userUrl}/upload-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", response.data); // Debugging line

      if (response.data?.avatar) {
        setUserInfo((prev) => ({ ...prev, avatar: response.data.avatar }));
      } else {
        console.error(
          "Upload failed:",
          response.data.message || "No avatar URL in response"
        );
      }
    } catch (error) {
      console.error(
        "Error uploading avatar:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return;
      try {
        const response = await getUserInfo(userId);
        setUserInfo(response.foundUser || {});
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]); // Runs only when `userId` changes
  return (
    <div
      className="header-container flex bw"
      style={{ background: isLightMode ? "white" : "black" }}
    >
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
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="top-profile flex"
              style={{
                background: isLightMode ? "#eee" : "rgba(255,255,255,.1)",
              }}
            >
              <div
                className="premium-text flex"
                style={{
                  background: userInfo?.premium ? "blueviolet" : "gray",
                }}
              >
                <p>{userInfo.premium ? "premium" : "BASIC"}</p>
              </div>
              <div className="avatar flex col">
                {userInfo?.avatar !== "" ? (
                  <img
                    src={`http://localhost:8080${userInfo?.avatar}`}
                    alt="User Avatar"
                  />
                ) : (
                  <div className="upload flex">
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleAvatarUpload}
                      id=""
                    />
                    <BiCamera />
                  </div>
                )}
                <div className="flex col user-info">
                  <h3>{userInfo?.userName}</h3>
                  <h4>{userInfo?.position}</h4>
                </div>
              </div>
              <div className="edit-opt flex">
                <BsPencil className="icon-no-border" />
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
              {/* <div className="line"></div> */}
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
            <button
              className="btn-logout flex"
              onClick={() =>
                window.localStorage.clear() + window.location.reload()
              }
            >
              LOGOUT
            </button>
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
