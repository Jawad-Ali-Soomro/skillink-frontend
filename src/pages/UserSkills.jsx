import { useState, useEffect } from "react";
import { getUserInfo } from "../utils/getUser";
import "../styles/skills-user.scss";
import { CgAdd, CgAddR, CgFigma } from "react-icons/cg";
import { TbBrandAndroid, TbBrandReactNative } from "react-icons/tb";
import { FaFlutter, FaReact, FaSwift } from "react-icons/fa6";
import { SiPython, SiAdobeillustrator, SiAdobephotoshop } from "react-icons/si";
import { DiCss3 } from "react-icons/di";
import axios from "axios";
import { skillUrl } from "../utils/apiUrls";
import toast from "react-hot-toast";
import { BiAddToQueue } from "react-icons/bi";

const categoryIcons = {
  "React Development": <FaReact />,
  "Android Development": <TbBrandAndroid />,
  "Flutter Development": <FaFlutter />,
  "iOS Development": <FaSwift />,
  "Artificial Intelligence": <SiPython />,
  "Adobe Illustrator": <SiAdobeillustrator />,
  "Adobe Photoshop": <SiAdobephotoshop />,
  "React Native Development": <TbBrandReactNative />,
};

const UserSkills = () => {
  const userId = window.localStorage.getItem("authUserId");
  const [skills, setSkills] = useState([]);
  const [createOpt, setCreateOpt] = useState(false);
  const [selectedCategory, setCategory] = useState("");
  const [selectedLevel, setLevel] = useState("");
  const [selectedLanguage, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userId) {
      getUserInfo(userId).then((res) => setSkills(res.foundUser.skills));
    }
  }, [userId, createOpt]);

  const createNewSkill = async () => {
    if (
      !userId ||
      !title ||
      !description ||
      !selectedCategory ||
      !selectedLanguage ||
      !selectedLevel
    ) {
      return toast.error("All Fields Are Required!");
    }
    await axios
      .post(`${skillUrl}/new`, {
        userId,
        title,
        description,
        category: selectedCategory,
        language: selectedLanguage,
        skillLevel: selectedLevel,
      })
      .then((res) =>
        res.status == 200
          ? setCreateOpt(false) +
            setTitle("") +
            setDescription("") +
            setCategory("") +
            setLevel("") +
            setLevel("")
          : null
      );
  };

  return (
    <div className="skill-container flex" onClick={() => setCreateOpt(false)}>
      {skills.length < 1 ? (
        <div className="no-skills flex col">
          <h1>
            oops you haven't <span>created</span> any <span>skills</span> yet
          </h1>
          <h2>
            let's <span>create</span> a new one
          </h2>
          <button
            onClick={(e) => {
              setCreateOpt(true);
              e.stopPropagation();
            }}
          >
            CREATE
          </button>
        </div>
      ) : (
        <div className="skill-container-cards flex">
          <div
            className="btn-create flex"
            onClick={(e) => {
              setCreateOpt(true);
              e.stopPropagation();
            }}
          >
            <BiAddToQueue />
          </div>
          {skills.map((skill) => (
            <div className="skill-card flex col" key={skill._id}>
              <div className="icon flex">{categoryIcons[skill.category]}</div>
              <h1>{skill.title}</h1>
              <p>{skill.description}</p>
              <div className="btns flex col">
                <span className="flex">{skill.language}</span>
                <span className="flex">{skill.skillLevel}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className="create-new flex col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: createOpt ? "100%" : "0" }}
      >
        <div className="input-wrapper flex">
          <input
            type="text"
            placeholder="Skill Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-wrapper flex">
          <textarea
            placeholder="Enter Skill Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="categories flex">
          {Object.keys(categoryIcons).map((category) => (
            <div
              className="category flex"
              key={category}
              onClick={() => setCategory(category)}
              style={{
                background: selectedCategory === category ? "#333" : "",
              }}
            >
              {categoryIcons[category]}
            </div>
          ))}
        </div>
        <div className="categories flex">
          {["beginner", "intermediate", "expert"].map((level) => (
            <div
              className="category skill-level flex"
              key={level}
              onClick={() => setLevel(level)}
              style={{ background: selectedLevel === level ? "#333" : "" }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </div>
          ))}
        </div>
        <div className="categories flex">
          {["English", "سنڌي", "اردو"].map((lang) => (
            <div
              className="category skill-level flex"
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{ background: selectedLanguage === lang ? "#333" : "" }}
            >
              {lang}
            </div>
          ))}
        </div>
        <button onClick={createNewSkill}>CREATE</button>
      </div>
    </div>
  );
};

export default UserSkills;
