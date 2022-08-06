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
              Lets save food by reducing its wastage.
            </h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing. Lorem Ipsjkmek
              srfrfs sgksoefen e fjs oefaedae aeo e foekfoaea foaefj eofaefm e
            </p>
            <Link
              to={localStorage.getItem("token") ? "/dashboard" : "/signup"}
              className="btn"
            >
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
