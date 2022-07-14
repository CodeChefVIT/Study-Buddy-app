/* eslint-disable react-hooks/exhaustive-deps */
// import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipboardCopy from "../../components/clipboard/clipboard.component";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import ModCard from "./../../components/module-card/module-card.component";

import Image1 from "./../../assets/add.png";
import Image2 from "./../../assets/send.png";

import "./grpsdashboard.styles.css";

const GrpDash = () => {
  const [group, setGroup] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();

  useEffect(() => {
    fetch(`https://study-buddy-app-production.up.railway.app/api/v1${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ group }) => setGroup(group));
  }, []);

  const { name, subject, modules, inviteCode } = group;

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <div className="groups-in">
        <div className="group-hero">
          <h1 className="heading-primary-sm-2">{name}</h1>
          <h1 className="heading-primary-sm-2">{subject}</h1>
        </div>
        <button
          onClick={() => navigate(`${path}/members`)}
          className="button-grps long"
          type="text"
        >
          See All Members
        </button>
        <div className="btn-sp">
          <button
            onClick={() => navigate(`${path}/quiz/new`)}
            className="button-grps"
          >
            <img className="grp-btn-img" src={Image1} alt="search icon" />
            <h2 class="heading-tertiary-create">Create Quiz</h2>
          </button>

          <button className="button-grps">
            <img className="grp-btn-img" src={Image2} alt="search icon" />
            <ClipboardCopy copyText={inviteCode} />
          </button>
        </div>

        <button
          className="button-grps long "
          onClick={() => navigate(`${path}/quiz`)}
        >
          <p>Attempt Quiz</p>
        </button>

        <h1 className="heading-primary-sm-2 mar-t-3">Modules</h1>

        <div className="grp-container">
          {modules &&
            modules.map((module) => (
              <ModCard key={module.id} module={module} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GrpDash;
