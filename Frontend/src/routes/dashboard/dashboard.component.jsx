import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import DashCard from "./../../components/dashboard-card/dashboard-card.component";

const Dashboard = () => {
  const [groups, setGroups] = useState([{}]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
  }, []);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="dashboard">
        <h1 className="heading-primary">My Groups</h1>
        <div className="grpsv-container">
          {loading ? (
            groups.map((group) => {
              return <DashCard key={group.id} group={group} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
