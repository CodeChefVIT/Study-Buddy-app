import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

import AccSet from "./../../components/account-settings/account-settings.component";
import ResetPass from "../../components/reset-password/reset-password.component";

import "./profile.styles.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="account">
        <AccSet />
        <ResetPass />
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
