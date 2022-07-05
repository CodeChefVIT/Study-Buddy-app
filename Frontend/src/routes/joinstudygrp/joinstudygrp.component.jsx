import { Link } from "react-router-dom";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
  return (
    <div>
      <NavigationAuth />

      <section className="groups">
        <div className="grps-title">
          <h1 className="heading-primary-sm">Find Study Groups</h1>
          <input
            type="text"
            className="find-grp"
            placeholder="Search by study group code"
          />
        </div>
        <div className="grp-container">
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
              <Link to="/" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <div className="mar">
              <h2 className="heading-tertiary-sm align-l">
                BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
              </h2>
            </div>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
              <Link to="/" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <div className="mar">
              <h2 className="heading-tertiary-sm align-l">
                BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
              </h2>
            </div>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
              <Link to="/" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <div className="mar">
              <h2 className="heading-tertiary-sm align-l">
                BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
              </h2>
            </div>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
              <Link to="/" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <div className="mar">
              <h2 className="heading-tertiary-sm align-l">
                BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
              </h2>
            </div>
          </div>
          <div className="box">
            <div className="grp-con">
              <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
              <Link to="/" className="main-nav-link nav-cta align-c">
                Join Group
              </Link>
            </div>
            <div className="mar">
              <h2 className="heading-tertiary-sm align-l">
                BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
              </h2>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JoinStudyGrp;
