import { Link } from "react-router-dom";

const JoinGrpCard = ({ grps }) => {
  return (
    <div className="box">
      <div className="grp-con">
        <h2 className="heading-primary-sm-2 align-l">qwe-asd-zxc</h2>
        <Link to="/" className="main-nav-link nav-cta align-c">
          Join Group
        </Link>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          BMAT101L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Members: 69
        </h2>
      </div>
    </div>
  );
};

export default JoinGrpCard;
