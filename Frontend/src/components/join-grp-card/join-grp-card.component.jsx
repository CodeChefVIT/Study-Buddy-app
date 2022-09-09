/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../error/error.component";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, membersLength, members } = group;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigateSendReq = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}/groups/request/${inviteCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        setError({
          message: "Request sent successfully",
        });
        setLoading(false);
      } else {
        setError({
          message: "You have already sent a request to this group",
        });
      }
    });
  };

  const errorHandler = () => {
    setError(null);
  };
  // console.log(membersLength);
  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <div className="box">
        <div className="grp-con">
          <h2 className="heading-primary-sm-2 align-l">{name}</h2>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <button onClick={navigateSendReq} className="button">
              Join Group
            </button>
          )}
        </div>
        <h2 className="heading-tertiary-sm align-l mar">
          {inviteCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {subject}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members:{" "}
          {membersLength ? membersLength : 0}
        </h2>
      </div>
    </div>
  );
};

export default JoinGrpCard;
