import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { userUrl } from "../utils/apiUrls";
import { useEffect } from "react";
import "../styles/user.scss";
import { FaLocationDot } from "react-icons/fa6";

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
          <h1 className="flex">
            <FaLocationDot className="icon" />
            {userInfo?.location}
          </h1>
          <a href="#">{userInfo?.website}</a>
        </div>
      </div>
    </div>
  );
};

export default User;
