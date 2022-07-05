import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import DashCard from "./../../components/dashboard-card/dashboard-card.component";

const Dashboard = () => {
  const [groups, setGroups] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    const getAllGrps = async () => {
      const response = await fetch(
        "https://study-buddy-app-production.up.railway.app/api/v1/groups/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then((res) => res.json());
      setGroups(response.groups[1]);
    };
    getAllGrps();
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="dashboard">
        <h1 className="heading-primary">My Groups</h1>
        <div className="grpsv-container">
          <DashCard groups={groups} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
