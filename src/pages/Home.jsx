import { CgArrowTopRight } from "react-icons/cg";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home-container flex col">
      <div className="top-container flex col">
        <div className="top-wrapper flex col">
          <div className="top-animate"></div>
          <div className="bottom-animate"></div>
          <div className="left-animate"></div>
          <div className="right-animate"></div>
          <h1>
            SKILL<span>•</span>INK
          </h1>
        </div>
        <div className="bottom-wrapper flex">
          <div className="wrapper flex">
            <button className="flex">
              Get STarted{" "}
              <span className="flex">
                <CgArrowTopRight />
              </span>
            </button>
          </div>
          <div className="wrapper flex">
            <button className="flex">
              api references{" "}
              <span className="flex">
                <CgArrowTopRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
