/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../error/error.component";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, members } = group;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState();

  const navigateSendReq = () => {
    fetch(`${process.env.REACT_APP_URL}/groups/request/${inviteCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate(`/dashboard`);
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

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
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
    </div>
  );
};

export default JoinGrpCard;
