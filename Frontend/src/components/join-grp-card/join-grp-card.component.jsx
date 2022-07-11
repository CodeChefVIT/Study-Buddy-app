import { useNavigate } from "react-router-dom";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, members } = group;

  const navigate = useNavigate();

  const navigateSendReq = () => {
    navigate(`groups/request/${inviteCode}`);
  };

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
