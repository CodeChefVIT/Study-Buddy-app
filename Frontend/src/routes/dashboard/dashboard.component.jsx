import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import DashCard from "./../../components/dashboard-card/dashboard-card.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { padding } from "@mui/system";

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
    fetch(
      "https://study-buddy-app-production.up.railway.app/api/v1/groups/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(({ groups }) => setGroups(groups));
    setLoading(false);
  }, []);

  console.log(groups);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="dashboard">
        <h1 className="heading-primary-sm-2 mar-b">My Groups</h1>
        {loading || groups.length === 0 ? (
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
