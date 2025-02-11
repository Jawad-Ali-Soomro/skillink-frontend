import {
  BsBehance,
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsWhatsapp,
} from "react-icons/bs";
import "../styles/share.scss";

const Share = ({ linkShareable, onClose }) => {
  return (
    <div className="share-screen flex" onClick={onClose}>
      <div className="container-share flex col">
        <h1>
          Let's <span>Share</span> IT!
        </h1>
        <div className="icons flex">
          <div className="icon flex">
            <BsLinkedin className="icon-no-border" />
          </div>
          <div className="icon flex">
            <BsFacebook className="icon-no-border" />
          </div>
          <div className="icon flex">
            <BsDribbble className="icon-no-border" />
          </div>

          <div className="icon flex">
            <BsWhatsapp className="icon-no-border" />
          </div>
          <div className="icon flex">
            <BsInstagram className="icon-no-border" />
          </div>
        </div>
        <div className="link-shareable flex">
          <p>{linkShareable}</p>
          <div className="btn-copy flex">COPY</div>
        </div>
      </div>
    </div>
  );
};

export default Share;
