/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import "../styles/welcome.scss";
import axios from "axios";
import { postUrl, userUrl } from "../utils/apiUrls";
import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiLink2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedPosts, setsuggestedPosts] = useState([]);
  const loggedInUser = window.localStorage.getItem("authUserId");
  const navigate = useNavigate();

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
  const followUser = async ({ targetUserId, targetUserName }) => {
    const response = await axios.patch(`${userUrl}/toggle-follow`, {
      currentUserId: loggedInUser,
      targetUserId,
    });
    console.log(response.data);
    response.data.followed === true
      ? toast.success(`Following ${targetUserName}`)
      : toast.success(`Unfollowing ${targetUserName}`);
    getSuggested();
  };

  useEffect(() => {
    return () => {
      getSuggested();
      getAllPosts();
    };
  }, [suggestedUsers]);
  return (
    <div className="welcome-container flex col">
      {suggestedUsers.length >= 1 ? (
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
                      <img
                        src={`http://localhost:8080${user?.avatar}`}
                        alt=""
                        onClick={() => navigate(`/user/${user?._id}`)}
                      />
                    ) : (
                      <div
                        className="circle-avatar flex"
                        onClick={() => navigate(`/user/${user?._id}`)}
                      ></div>
                    )}
                    <h2>{user?.userName}</h2>
                    {/* <h4>@{user?.handle}</h4> */}
                  </div>
                  <h3>{user?.position}</h3>
                  <div className="btns flex">
                    <button
                      className="flex"
                      onClick={() => navigate(`/user/${user?._id}`)}
                    >
                      View Profile
                    </button>
                    <button
                      className="flex"
                      onClick={() =>
                        followUser({
                          targetUserId: user?._id,
                          targetUserName: user?.userName,
                        })
                      }
                    >
                      <FiLink2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}
      {suggestedPosts?.length >= 1 ? (
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
                    <div
                      className="user-info-main flex"
                      onClick={() => navigate(`/user/${post?.author?._id}`)}
                    >
                      <img
                        src={`http://localhost:8080${post?.author?.avatar}`}
                        alt=""
                      />
                      <div className="info flex col">
                        <h2>{post?.author?.userName}</h2>
                      </div>
                    </div>
                    <div className="btns flex">
                      {loggedInUser === post?.author?._id ? (
                        this
                      ) : (
                        <button
                          style={{
                            background: post?.author?.followers?.includes(
                              loggedInUser
                            )
                              ? "transparent"
                              : "#eee",

                            border: post?.author?.followers?.includes(
                              loggedInUser
                            )
                              ? "1px solid #80808090"
                              : "none",

                            color: post?.author?.followers?.includes(
                              loggedInUser
                            )
                              ? "inherit"
                              : "black",
                          }}
                          onClick={() =>
                            followUser({
                              targetUserId: post?.author?._id,
                              targetUserName: post?.author?.userName,
                            })
                          }
                        >
                          {post?.author?.followers?.includes(loggedInUser)
                            ? "Following  "
                            : "FOLLOW"}
                        </button>
                      )}
                    </div>
                  </div>
                  {/* <h3>{post?.title?.substring(0, 30)}</h3> */}
                  {/* <h4>{post?.description?.substring(0, 60)}...</h4> */}
                  <div className="tags flex">
                    {post?.tags?.map((tag) => {
                      return (
                        <div className="tag flex" key={tag}>
                          #{tag}
                        </div>
                      );
                    })}
                  </div>
                  <div className="image-main">
                    <img src={post?.image} alt="" />
                  </div>
                  <div className="icons flex">
                    {loggedInUser === post?.author?._id ? (
                      this
                    ) : (
                      <div className="icon flex">
                        <p>LIKE</p>
                        <IoMdHeartEmpty />
                      </div>
                    )}

                    <div className="icon flex">
                      <p>SHARE</p>
                      <IoShareSocialOutline />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}
    </div>
  );
};

export default Welcome;
