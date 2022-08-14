import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import DashCard from "./../../components/dashboard-card/dashboard-card.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/groups/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ groups }) => setGroups(groups));
    setLoading(false);
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="dashboard">
        <h1 className="heading-primary-sm-2 mar-b">My Groups</h1>
        {loading ? (
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
        ) : groups.length === 0 ? (
          <h1 className="heading-primary mar-t-3">
            Please join groups to display them here.{" "}
          </h1>
        ) : (
          <div className="grpsv-container">
            {groups.map((group) => {
              return <DashCard key={group.id} group={group} />;
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
