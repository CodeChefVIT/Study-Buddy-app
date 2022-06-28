import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
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

      <section className="groups">
        <div className="grps-title">
          <h1 className="heading-primary-sm">Find Study Groups</h1>
          <input type="text" placeholder="Search by study group code" />
        </div>
        <div className="grp-container">
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2">Card</h2>
              <Link to="#" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <h2 className="heading-secondary-sm pad-t align-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur voluptatem ab, quo nesciunt voluptates illo eaque
              dolores quos maxime quisquam.
            </h2>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2">Card</h2>
              <Link to="#" className="main-nav-link nav-cta">
                Join Group
              </Link>
            </div>
            <h2 class="heading-secondary-sm pad-t align-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur voluptatem ab, quo nesciunt voluptates illo eaque
              dolores quos maxime quisquam.
            </h2>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2">Card</h2>
              <Link to="#" className="main-nav-link nav-cta">
                Join Group
              </Link>
            </div>
            <h2 className="heading-secondary-sm pad-t align-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur voluptatem ab, quo nesciunt voluptates illo eaque
              dolores quos maxime quisquam.
            </h2>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2">Card</h2>
              <Link to="#" className="main-nav-link nav-cta">
                Join Group
              </Link>
            </div>
            <h2 className="heading-secondary-sm pad-t align-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur voluptatem ab, quo nesciunt voluptates illo eaque
              dolores quos maxime quisquam.
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinStudyGrp;
