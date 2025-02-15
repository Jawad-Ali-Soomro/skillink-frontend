import {
  FaAngleRight,
  FaFlutter,
  FaReact,
  FaSwift,
  FaDatabase,
  FaCloud,
  FaCode,
  FaServer,
  FaGamepad,
  FaVrCardboard,
} from "react-icons/fa6";
import { SiPython, SiEthereum, SiTensorflow } from "react-icons/si";
import { TbBrandAndroid, TbDeviceDesktopCode } from "react-icons/tb";
import "../styles/skills.scss";
import { FaMobileAlt } from "react-icons/fa";
import { ImCogs } from "react-icons/im";
import { BiShield } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";

const Skills = () => {
  const categories = [
    "React Development",
    "Android Development",
    "Flutter Development",
    "iOS Development",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Game Development",
    "AI/ML Development",
    "Blockchain Development",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Embedded Systems",
    "Database Management",
    "Data Science",
    "mongoDB",
    "AR/VR Development",
  ];

  const categoryIcons = {
    "React Development": <FaReact color="#61DAFB" />, // Light Blue
    "Android Development": <TbBrandAndroid color="#3DDC84" />, // Green
    "Flutter Development": <FaFlutter color="#02569B" />, // Dark Blue
    "iOS Development": <FaSwift color="#FA7343" />, // Orange
    "Web Development": <TbDeviceDesktopCode color="#4A90E2" />, // Blue
    "Frontend Development": <FaCode color="#F7DF1E" />, // Yellow
    "Backend Development": <FaServer color="#6D28D9" />, // Purple
    "Full Stack Development": <FaCode color="#FF6F61" />, // Red
    "Mobile Development": <FaMobileAlt color="#F56A79" />, // Pink
    "Game Development": <FaGamepad color="#8E44AD" />, // Purple
    "AI/ML Development": <SiTensorflow color="#FF6F00" />, // Orange
    "Blockchain Development": <SiEthereum color="#3C3C3D" />, // Dark Gray
    Cybersecurity: <BiShield color="#3498DB" />, // Blue
    "Cloud Computing": <FaCloud color="#00ADEF" />, // Light Blue
    DevOps: <ImCogs color="#E74C3C" />, // Red
    "Embedded Systems": <FaCode color="#FF8C00" />, // Orange
    "Database Management": <FaDatabase color="#3498DB" />, // Blue
    "Data Science": <SiPython color="#3776AB" />, // Python Blue
    "AR/VR Development": <FaVrCardboard color="#FF4500" />, // Red-Orange
    mongoDB: <DiMongodb color="#4DB33D" />, // Green
  };

  return (
    <div className="container-skills flex col">
      <div className="suggestion-container flex">
        {categories.map((cat) => (
          <div className="user-card flex col" key={cat}>
            <div className="icon flex">{categoryIcons[cat]}</div>
            <h3>{cat}</h3>
            <div className="btns flex">
              <button className="flex">Providers</button>
              <button className="flex">
                <FaAngleRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
