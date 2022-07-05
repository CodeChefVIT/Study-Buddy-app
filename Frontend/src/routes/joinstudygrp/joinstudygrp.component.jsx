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
  const [grps /*setGrps*/] = useState([]);
  const [filteredGrps, setFilteredGrps] = useState(grps);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    const newFilteredGrps = grps.filter((monster) => {
      return grps.name.toLowerCase().includes(searchField);
    });

    setFilteredGrps(newFilteredGrps);
  }, [grps, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

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
          <JoinGrpCard grps={filteredGrps} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JoinStudyGrp;
