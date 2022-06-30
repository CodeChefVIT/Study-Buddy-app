import { Link } from "react-router-dom";
import { ReactComponent as HeroLogo } from "./../../assets/Hero-Img.svg";

import "./homepage.styles.css";

const Homepage = () => {
  return (
    <div>
      <div className="section-hero">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
              Want to increase productivity and achieve goals?
            </h1>
            <p className="hero-description">
              Want to get increase productivity? Find buddies and join study
              groups to help each other meet your academic goals with StudyBuddy
            </p>
            <Link to="/signup" className="btn">
              Get started now
            </Link>
          </div>
          <div className="hero-img-box">
            <HeroLogo className="hero-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
