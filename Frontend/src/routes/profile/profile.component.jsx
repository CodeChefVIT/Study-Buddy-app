import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";

import "./profile.styles.css";

const Dashboard = () => {
  return (
    <div>
      <header class="header">
        <Logo className="logo" />
        <nav class="main-nav">
          <ul class="main-nav-list">
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
              <Link to="#" className="main-nav-link">
                Signout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="dashboard">
        <h2 className="heading-primary-sm">Welcome John Doe </h2>
      </section>
    </div>
  );
};

export default Dashboard;
