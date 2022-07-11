import { Link } from "react-router-dom";

const JoinGrpCard = ({ group }) => {
  const { inviteCode, name, subject, members } = group;

  // This is rendering infinitely to be fixed later
  // console.log(group);

  return (
    <div className="box">
      <div className="grp-con">
        <h2 className="heading-primary-sm-2 align-l">{inviteCode}</h2>
        <Link to="/" className="main-nav-link nav-cta align-c">
          Join Group
        </Link>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          {name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {subject}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: {members}
        </h2>
      </div>
    </div>
  );
};

export default JoinGrpCard;
