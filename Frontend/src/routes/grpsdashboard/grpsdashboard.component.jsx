/* eslint-disable react-hooks/exhaustive-deps */
// import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import ModCard from "./../../components/module-card/module-card.component";

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

  const { name, subject, modules } = group;
  console.log(modules);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <div className="groups-in">
        <div className="group-hero">
          <h1 className="heading-primary-sm-2">{name}</h1>
          <h1 className="heading-primary-sm-2">{subject}</h1>
        </div>
        <button className="button-grps long" type="text">
          See All Members
        </button>
        <div className="btn-sp">
          <button className="button-grps">
            {/*<img className='grp-btn-img' src="img/add.png" alt="search icon">*/}
            <p>Create Quiz</p>
          </button>

          <button className="button-grps">
            {/* <img className='grp-btn-img' src="img/send.png" alt="search icon">*/}
            <p>Send Invite</p>
          </button>
        </div>

        <button className="button-grps long">
          {/*<img className='grp-btn-img' src="img/send.png" alt="search icon">*/}
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
