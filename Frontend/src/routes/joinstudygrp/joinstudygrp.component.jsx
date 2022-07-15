/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import JoinGrpCard from "../../components/join-grp-card/join-grp-card.component";
import Footer from "./../footer/footer.component";
import SearchBox from "../../components/search-box/search-box.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./joinstudygrp.styles.css";

const JoinStudyGrp = () => {
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const response = useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/groups?limit=5000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(({ groups }) => setGroups(groups));
    setLoading(false);
  }, []);

  useEffect(() => {
    const newFilteredGroups = groups.filter((group) => {
      return group.inviteCode.toLowerCase().includes(searchField.toLowerCase());
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
          {loading || filteredGroups.length === 0 ? (
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
            filteredGroups.map((group) => {
              return <JoinGrpCard key={group.id} group={group} />;
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JoinStudyGrp;
