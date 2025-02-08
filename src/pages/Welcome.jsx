import { useEffect } from "react";
import "../styles/welcome.scss";
import axios from "axios";
import { postUrl, userUrl } from "../utils/apiUrls";
import { useState } from "react";
import {
  BiCommand,
  BiComment,
  BiCommentDetail,
  BiLike,
  BiMessage,
  BiMessageSquareDetail,
  BiShare,
} from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { HiHeart } from "react-icons/hi2";
import { TiHeartOutline } from "react-icons/ti";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosHeart, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";

const Welcome = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedPosts, setsuggestedPosts] = useState([]);
  useEffect(() => {
    const getSuggested = async () => {
      const response = await axios.get(
        `${userUrl}/suggest/${window.localStorage.getItem("authUserId")}`
      );
      setSuggestedUsers(response.data);
    };
    const getAllPosts = async () => {
      const response = await axios.get(`${postUrl}/get-all`);
      setsuggestedPosts(response.data.posts);
    };
    return () => {
      getSuggested();
      getAllPosts();
    };
  }, []);
  return (
    <div className="welcome-container flex col">
      <div className="suggestions flex col">
        <div className="flex text bw">
          <h1>
            <span>Developers</span> You May Know!
          </h1>
          <button>Explore</button>
        </div>
        <div className="suggestion-container flex">
          {suggestedUsers?.map((user) => {
            return (
              <div className="user-card flex col" key={user?._id}>
                <div className="bg-image flex">
                  {user?.bgImage == "" ? (
                    this
                  ) : (
                    <img src={user?.bgImage} alt="" />
                  )}
                </div>
                <div className="top-profile flex col">
                  {user.avatar !== "" ? (
                    <img src={user?.avatar} alt="" />
                  ) : (
                    <div className="circle-avatar flex"></div>
                  )}
                  <h2>{user?.userName}</h2>
                  <h4>@{user?.handle}</h4>
                </div>
                <h3>{user?.position}</h3>
                <div className="btns flex">
                  <button className="flex">View Profile</button>
                  <button className="flex">Follow</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="posts-container flex col">
        <div className="flex text bw">
          <h1>
            <span>Latest</span> Blogs
          </h1>
          <button>Explore</button>
        </div>
        <div className="post-wrapper flex">
          {suggestedPosts?.map((post) => {
            return (
              <div className="post-card flex col" key={post?._id}>
                <div className="top-user flex">
                  <div className="user-info-main flex">
                    <img src={post?.author?.avatar} alt="" />
                    <div className="info flex col">
                      <h2>{post?.author?.userName}</h2>
                      {/* <h3>{post?.author?.position}</h3> */}
                    </div>
                  </div>
                  <div className="btns flex">
                    <button>Follow</button>
                    {/* <button>Profile</button> */}
                  </div>
                </div>
                <div className="line"></div>
                <div className="image-main">
                  <img src={post?.image} alt="" />
                </div>
                <div className="icons flex">
                  <div className="icon flex">
                    <IoMdHeartEmpty />
                  </div>

                  <div className="icon flex">
                    <IoShareSocialOutline />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
