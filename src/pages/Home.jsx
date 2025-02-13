import { CgArrowTopRight } from "react-icons/cg";
import "../styles/home.scss";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaFigma,
  FaEthereum,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

const Home = () => {
  const skills = [
    { delay: 400, icon: <FaReact className="react" />, name: "React.js" },
    { delay: 600, icon: <FaNodeJs className="node" />, name: "Node.js" },
    { delay: 800, icon: <FaPython className="python" />, name: "Python" },
    { delay: 1000, icon: <FaJava className="java" />, name: "Java" },
    { delay: 1200, icon: <FaFigma className="figma" />, name: "Figma" },
    {
      delay: 1400,
      icon: <FaEthereum className="ethereum" />,
      name: "Blockchain",
    },
    {
      delay: 1600,
      icon: <FaDatabase className="database" />,
      name: "Databases",
    },
    { delay: 1800, icon: <FaCode className="code" />, name: "Full Stack" },
  ];
  return (
    <div className="home-container flex col">
      <div className="top-container flex col">
        <div className="top-wrapper flex col">
          <div className="top-animate"></div>
          <div className="bottom-animate"></div>
          <div className="left-animate"></div>
          <div className="right-animate"></div>
          <h1 data-aos="fade-right" data-aos-delay="500">
            <span data-aos="fade-right" data-aos-delay="1000">
              Skill
            </span>
            INK
          </h1>
          <h2 data-aos="fade-left" data-aos-delay="3000">
            The <span>better</span> way to <span>showcase</span> your skills.
          </h2>
        </div>
        <div className="bottom-wrapper flex">
          <div className="wrapper flex">
            <button className="flex" data-aos="zoom-out" data-aos-delay="1000">
              Get STarted{" "}
              <span className="flex">
                <CgArrowTopRight />
              </span>
            </button>
          </div>
          <div className="wrapper flex">
            <button className="flex" data-aos="zoom-out" data-aos-delay="2000">
              api references{" "}
              <span className="flex">
                <CgArrowTopRight />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="skills-container flex">
        <div className="marquee-content flex">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item flex"
              data-aos="zoom-in"
              data-aos-delay={skill.delay}
            >
              {skill.icon}
              {/* <span>{skill.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
