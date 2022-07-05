import { useNavigate } from "react-router-dom";
import { ReactComponent as ProfPic } from "./../../assets/img.svg";
import "./dashboard-card.styles.css";

const DashCard = ({ groups }) => {
  const navigate = useNavigate();
  const { name, subject, members } = groups;
  // const numberMembers = members.length;

  const navigateGrpsDash = () => {
    navigate("/grp-dash");
  };
  // console.log(groups);

  return (
    <div className="grpsv-card">
      <div>
        <ProfPic className="prof-pic" src="img/img.svg" alt="group image" />
        <h2 className="heading-primary-sm-3 pad-t">{name}</h2>
      </div>
      <div>
        <h2 className="heading-primary-sm-3 ">Topic: {subject}</h2>
        <h2 className="heading-primary-sm-3 pad-t pad-b">Members Present:69</h2>
        <button onClick={navigateGrpsDash} className="button">
          Click to Enter Group
        </button>
      </div>
    </div>
  );
};

export default DashCard;
