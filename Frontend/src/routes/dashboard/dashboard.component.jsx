import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";
import Footer from "./../footer/footer.component";
import "./dashboard.styles.css";

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
        <h1 class="heading-primary-sm">Groups</h1>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
