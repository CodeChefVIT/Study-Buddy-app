import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";

const NavigationAuth = () => {
  return (
    <Fragment>
      <header className="header">
        <Link className="logo-container" to="/dashboard">
          <Logo className="logo" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <Link to="/create-study-grp" className="main-nav-link">
                Create Study Group
              </Link>
            </li>
            <li>
              <Link to="/join-study-grp" className="main-nav-link">
                Join Study Group
              </Link>
            </li>
            <li>
              <Link to="/profile" className="main-nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/" className="main-nav-link">
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Signout
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default NavigationAuth;
