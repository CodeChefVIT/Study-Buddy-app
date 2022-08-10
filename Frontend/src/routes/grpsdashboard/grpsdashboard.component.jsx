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

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GrpDet = (props) => {
  const { group, path } = props;
  const navigate = useNavigate();
  const { name, subject, modules, inviteCode } = group;

  return (
    <div>
      <div className="group-hero">
        <h1 className="heading-primary-sm-2">{name}</h1>
        <h1 className="heading-primary-sm-2">{subject}</h1>
      </div>
      <div className="btn-sp">
        <button
          onClick={() => navigate(`${path}/members`)}
          className="button-grps"
          type="text"
        >
          See All Members
        </button>
        <button
          onClick={() => navigate(`${path}/request`)}
          className="button-grps"
          type="text"
        >
          View Requests
        </button>
      </div>
      <div className="btn-sp">
        <button
          onClick={() => navigate(`${path}/quiz/new`)}
          className="button-grps"
        >
          <img className="grp-btn-img" src={Image1} alt="search icon" />
          <h2 class="heading-tertiary-create">Create Quiz</h2>
        </button>

        <button className="button-grp-in">
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

      <button
        className="button-grps long "
        onClick={() => navigate(`${path}/set`)}
      >
        <p>Edit Group Info</p>
      </button>

      <h1 className="heading-primary-sm-2 mar-t-3">Modules</h1>

      <div className="grp-container">
        {modules &&
          modules.map((module) => <ModCard key={module.id} module={module} />)}
      </div>
    </div>
  );
};

const GrpDash = () => {
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    fetch(`${process.env.REACT_APP_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ group }) => setGroup(group));
    setLoading(false);
  }, []);

  console.log(group);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <div className="groups-in">
        {loading || group.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              paddingBottom: "40vh",
              justifyContent: "center",
              paddingTop: "20vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <GrpDet group={group} path={path} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GrpDash;
