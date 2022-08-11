import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

import { useLocation } from "react-router-dom";

import GrpSet from "./../../components/edit-grp/edit-grp.component";

const Group = () => {
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

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="account">
        <GrpSet path={path} />
      </section>
      <Footer />
    </div>
  );
};

export default Group;
