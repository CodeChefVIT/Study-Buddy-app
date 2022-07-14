import { useState } from "react";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, members } = group;
  const [data, setData] = useState([]);

  const navigateSendReq = () => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/groups/request/${inviteCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  if (data.success) {
    alert("Request sent successfully");
  }

  return (
    <div className="box">
      <div className="grp-con">
        <h2 className="heading-primary-sm-2 align-l">{inviteCode}</h2>
        <button onClick={navigateSendReq} className="button">
          Join Group
        </button>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          {name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {subject}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members:{" "}
          {members ? members.length : 0}
        </h2>
      </div>
    </div>
  );
};

export default JoinGrpCard;
