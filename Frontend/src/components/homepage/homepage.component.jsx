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
              <p className="small-hero">
                Want to increase productivity and achieve goals?
              </p>
            </h1>
            <p className="hero-description">
              Find buddies and join study groups to help each other meet
              deadlines.
            </p>
            <Link
              to={localStorage.getItem("token") ? "/dashboard" : "/signup"}
              className="btn btn-web"
            >
              Get started now
            </Link>

            <Link to="/" className="btn btn-app">
              Install our App
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
