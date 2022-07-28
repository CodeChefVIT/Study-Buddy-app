/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, members } = group;
  const [data, setData] = useState([]);
  // const { error, SetError } = useState(false);
  // const { alertMsg, setAlertMsg } = useState("");
  const navigate = useNavigate();

  const navigateSendReq = () => {
    fetch(`${process.env.REACT_APP_URL}/groups/request/${inviteCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/dashboard`);
        } else {
          // SetError(true);
          // setAlertMsg("Request already sent");
          alert("Request already sent");
        }
      })
      .then((data) => {
        setData(data);
        navigate(`/dashboard`);
      });
  };

  // if (error) {
  //   return (
  //     <Stack sx={{ width: "100%" }} spacing={2}>
  //       <Alert severity="error">Request already sent</Alert>
  //     </Stack>
  //   );
  // }

  return (
    <div className="box">
      <div className="grp-con">
        <h2 className="heading-primary-sm-2 align-l">{name}</h2>
        <button onClick={navigateSendReq} className="button">
          Join Group
        </button>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          {inviteCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {subject}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members:{" "}
          {members ? members.length : 0}
        </h2>
      </div>
    </div>
  );
};

export default JoinGrpCard;
