/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";

import GrpMemberCard from "../../components/grp-member-card/grp-member-card.component";
import Footer from "./../footer/footer.component";
import SearchBox from "../../components/search-box/search-box.component";

import "./grpmember.styles.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GrpMembers = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [searchField, setSearchField] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetch(`${process.env.REACT_APP_URL}${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ group }) => setMembers(group.members));
    setLoading(false);
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
            placeholder="Search by Member Name"
          />
        </div>
        <div className="grp-mem-container">
          {loading || filteredMembers.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                paddingBottom: "10.8rem",
                justifyContent: "center",
                paddingTop: "20vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            filteredMembers.map((member) => {
              return <GrpMemberCard key={member.id} member={member} />;
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GrpMembers;
