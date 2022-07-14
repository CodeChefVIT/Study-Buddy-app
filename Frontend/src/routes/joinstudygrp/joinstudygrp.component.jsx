/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import JoinGrpCard from "../../components/join-grp-card/join-grp-card.component";
import Footer from "./../footer/footer.component";
import SearchBox from "../../components/search-box/search-box.component";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(groups);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/groups?limit=5000`,
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
  }, []);

  useEffect(() => {
    const newFilteredGroups = groups.filter((group) => {
      return group.inviteCode.includes(searchField);
    });
    setFilteredGroups(newFilteredGroups);
  }, [groups, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value;
    setSearchField(searchFieldString);
  };

  // console.log(filteredGroups);

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <section className="groups">
        <div className="grps-title">
          <h1 className="heading-primary-sm">Find Study Groups</h1>
          <SearchBox
            onChange={onSearchChange}
            placeholder="Search by Invite Code"
          />
        </div>
        <div className="grp-container">
          {filteredGroups &&
            filteredGroups.map((group) => {
              return <JoinGrpCard key={group.id} group={group} />;
            })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JoinStudyGrp;
