import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { userUrl } from "../utils/apiUrls";
import { useEffect } from "react";
import "../styles/user.scss";
import { FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";

const User = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    const response = await axios.get(`${userUrl}/find/${userId}`);
    setUserInfo(response.data.foundUser);
  };
  useEffect(() => {
    getUserInfo();
  }, [userId]);
  console.log(userInfo);
  return (
    <div className="user-info-container flex">
      <div className="user-info-main flex col">
        <div className="top-profile flex col">
          <div className="links flex">
            <a href="#" className="icon flex">
              <BsGithub className="icon-no-border" />
            </a>{" "}
            <a href="#" className="icon flex">
              <BsFacebook className="icon-no-border" />
            </a>{" "}
            <a href="#" className="icon flex">
              <BsLinkedin className="icon-no-border" />
            </a>{" "}
            <a href="#" className="icon flex">
              <BsInstagram className="icon-no-border" />
            </a>{" "}
            <a href="#" className="icon flex">
              <BsDribbble className="icon-no-border" />
            </a>
          </div>
          <div className="bg">
            <img src={`http://localhost:8080${userInfo?.avatar}`} alt="" />
          </div>
        </div>
        <div className="user-details flex col">
          <h1 className="username flex">
            {userInfo?.userName}{" "}
            <div className="verification flex">
              {userInfo?.isVerified ? "VERIFIED" : "unverified"}
            </div>
          </h1>
          <h1 className="position">{userInfo?.position}</h1>
          {userInfo?.location ? (
            <h1 className="flex">
              <FaLocationDot className="icon" />
              {userInfo?.location}
            </h1>
          ) : (
            this
          )}
          <a href="#" className="flex">
            <div className="icon">
              <CgWebsite className="icon-no-border" />
            </div>{" "}
            {userInfo?.website}
          </a>
        </div>
        <div className="about flex col">
          <div className="top-card flex col">
            <h1>Biography</h1>
          </div>
          <p>{userInfo?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
