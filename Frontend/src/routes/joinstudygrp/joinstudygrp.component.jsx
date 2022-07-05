import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import JoinGrpCard from "../../components/join-grp-card/join-grp-card.component";
import Footer from "./../footer/footer.component";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="groups">
        <div className="grps-title">
          <h1 className="heading-primary-sm">Find Study Groups</h1>
          <input
            type="text"
            className="find-grp"
            placeholder="Search by Invite Code"
          />
        </div>
        <div className="grp-container">
          <JoinGrpCard />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JoinStudyGrp;
