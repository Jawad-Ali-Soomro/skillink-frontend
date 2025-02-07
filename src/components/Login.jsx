/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { GiHummingbird } from "react-icons/gi";
import "../styles/login.scss";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({ onClose, isLightMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: "",
    handle: "",
    username: "",
    password: "",
  });

  const generateRandomHandle = (username) => {
    return username
      ? username.trim().replace(/\s+/g, "-") +
          "-" +
          Math.floor(Math.random() * 1000)
      : "user-" + Math.floor(Math.random() * 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
      handle:
        name === "username" ? generateRandomHandle(value) : prevState.handle,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (isRegistering) {
        if (!formInputs.username || !formInputs.password || !formInputs.email) {
          return toast.error("Please fill all the fields!");
        }
        response = await axios.post("http://localhost:8080/route/user/new", {
          userName: formInputs.username,
          email: formInputs.email,
          handle: formInputs.handle,
          password: formInputs.password,
        });

        console.log("Registration Success:", response.status);
        if (response.status === 201) {
          toast.success("Account created please login");
          setIsRegistering(false);
        } else if (response.status >= 400) {
          toast.error("account with email exists already!");
        }
      } else {
        if (!formInputs.email || !formInputs.password) {
          return toast.error("please fill all the fields!");
        }
        response = await axios.post("http://localhost:8080/route/user/login", {
          email: formInputs.email,
          password: formInputs.password,
        });

        if (response.status === 200) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("authUserId", response.data.userId);
          toast.success("Welcome Back") + window.location.reload();
        } else if (response.status === 401) {
          toast.error("Invalid email address or password");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container flex" onClick={onClose}>
      <div
        className="login-wrapper flex col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="logo flex">
          <div className="icon flex">
            <GiHummingbird />
          </div>
        </div>

        <h1>
          <span>Hi</span> There!
        </h1>

        <form className="form flex col" onSubmit={handleSubmit}>
          <div className="input-wrapper flex">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formInputs.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          {isRegistering && (
            <div className="input-wrapper flex">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formInputs.username}
                onChange={handleChange}
              />
            </div>
          )}

          {isRegistering && (
            <div className="input-wrapper flex">
              <label htmlFor="handle">Handle</label>
              <input
                type="text"
                name="handle"
                value={formInputs.handle}
                readOnly
              />
            </div>
          )}

          <div className="input-wrapper flex">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formInputs.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button disabled={isLoading} className="btn-login flex" type="submit">
            {isLoading ? (
              <div className="loader flex">
                <div className="circle flex"></div>
              </div>
            ) : isRegistering ? (
              "Register"
            ) : (
              "LOGIN"
            )}
          </button>

          <div className="text flex">
            <span>OR</span>
          </div>

          <div className="bottom-btns flex">
            <div className="icon flex">
              <FiGithub />
            </div>
            <div className="icon flex">
              <FiLinkedin />
            </div>
            <div className="icon flex">
              <FiInstagram />
            </div>
            <button
              className="flex"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "LOGIN" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
