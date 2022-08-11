import { useNavigate } from "react-router-dom";
import "./dashboard-card.styles.css";

const DashCard = ({ group }) => {
  const { name, subject, membersLength, image } = group;
  const navigate = useNavigate();

  const navigateGrpsDash = () => {
    navigate(`/groups/${group._id}`);
  };

  return (
    <div className="grpsv-card">
      <div>
        <div className="pic-cha">
          <img className="prof-pic-up mar-r" src={image} alt="profile pic" />
        </div>
        <h2 className="heading-primary-sm-3 pad-t">{subject}</h2>
      </div>
      <div className="mar-l">
        <h2 className="heading-primary-sm-3 ">Topic: {name}</h2>
        <h2 className="heading-primary-sm-3 pad-t pad-b">
          Members Present: {membersLength}
        </h2>
        <button onClick={navigateGrpsDash} className="button">
          Click to Enter Group
        </button>
      </div>
    </div>
  );
};

export default DashCard;
