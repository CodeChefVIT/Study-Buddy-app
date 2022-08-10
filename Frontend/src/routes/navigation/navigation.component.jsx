import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";

import Footer from "./../footer/footer.component";
import "./navigation.styles.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <Link to="/login" className="main-nav-link">
                <p className="small">Sign in</p>
              </Link>
            </li>
            <li>
              <Link to="/signup" className="main-nav-link nav-cta">
                Create Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Navigation;
