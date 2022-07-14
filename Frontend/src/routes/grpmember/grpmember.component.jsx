/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";

import GrpMemberCard from "../../components/grp-member-card/grp-member-card.component";
import Footer from "./../footer/footer.component";
import SearchBox from "../../components/search-box/search-box.component";

import "./grpmember.styles.css";

const defaultData = [
  {
    name: "Trial User",
    id: "62cd7f7f797670990068a11f",
  },
];

const GrpMembers = () => {
  const [members, setMembers] = useState(defaultData);
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(defaultData);

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
  const pathArr = path.split("m");
  const groupId = pathArr[0];

  useEffect(() => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1${groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(({ group }) => setMembers(group.members));
  }, []);

  useEffect(() => {
    const newFilteredMembers = members.filter((member) => {
      return member.name.includes(searchField);
    });
    setFilteredMembers(newFilteredMembers);
  }, [members, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value;
    setSearchField(searchFieldString);
  };

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="groups-member">
        <div className="grps-mem-title">
          <h1 className="heading-primary-sm">Find Members</h1>
          <SearchBox
            onChange={onSearchChange}
            placeholder="Search by Invite Code"
          />
        </div>
        <div className="grp-mem-container">
          {filteredMembers &&
            filteredMembers.map((member) => {
              return <GrpMemberCard key={member.id} member={member} />;
            })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GrpMembers;
