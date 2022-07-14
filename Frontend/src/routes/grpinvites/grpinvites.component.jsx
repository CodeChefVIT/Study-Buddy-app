/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";

import GrpInviteCard from "./../../components/grp-invite-card/grp-invite-card.component";
import Footer from "./../footer/footer.component";

import "./grpinvites.styles.css";

const defaultData = [
  {
    user: "Trial User",
    regno: "21BCE0021",
  },
];

const GrpInvites = () => {
  const [members, setMembers] = useState(defaultData);
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
      .then(({ requests }) => setMembers(requests));
  }, []);

  console.log(members);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="groups-member">
        <div className="grp-mem-container">
          {members &&
            members.map((member) => {
              return <GrpInviteCard key={member.id} member={member} />;
            })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GrpInvites;
