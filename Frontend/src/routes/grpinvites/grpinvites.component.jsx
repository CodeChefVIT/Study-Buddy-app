/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";

import GrpInviteCard from "./../../components/grp-invite-card/grp-invite-card.component";
import Footer from "./../footer/footer.component";

import "./grpinvites.styles.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GrpInvites = () => {
  const [members, setMembers] = useState([]);
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
      .then(({ requests }) => setMembers(requests));
    setLoading(false);
  }, []);

  console.log(members);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="groups-member">
        <div className="grp-mem-container">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                paddingBottom: "10.8rem",
                justifyContent: "center",
                paddingTop: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : members.length === 0 ? (
            <h1 className="invite-title">Sorry there are no requests </h1>
          ) : (
            members.map((member) => {
              return <GrpInviteCard key={member.id} member={member} />;
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GrpInvites;
