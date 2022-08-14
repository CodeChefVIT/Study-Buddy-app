import { Link } from "react-router-dom";

import "./../homepage/homepage.styles.css";

const Homepage = () => {
  return (
    <div>
      <div className="section-hero mr-b-4">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
              <p className="small-hero">
                Congratulations! Your account has been verified
              </p>
            </h1>
            <p className="hero-description">
              Please go to login page of the website or login using your
              credentials on our app.
            </p>
            <Link
              to={localStorage.getItem("token") ? "/dashboard" : "/login"}
              className="btn btn-web"
            >
              Get started now
            </Link>
          </div>
          <div className="hero-img-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
