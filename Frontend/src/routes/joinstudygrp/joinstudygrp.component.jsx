import { Link } from "react-router-dom";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
  return (
    <div>
      <NavigationAuth />

      <section className="groups">
        <div className="grps-title">
          <h1 className="heading-primary-sm">Find Study Groups</h1>
          <form className="join-stud-grp">
            <input type="text" placeholder="Search by study group code" />
          </form>
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
