// import Image1 from "./../../assets/img.svg";

const GrpMemberCard = ({ member }) => {
  const { name, major, avatar } = member;

  return (
    <div className="mem-box mar-b-2">
      <div className="mem-con">
        <img className="mem-img" src={avatar} alt="user icon" />
        <div>
          <h2 className="heading-name align-l">{name}</h2>
          <h2 className="heading-name-2 align-l pad-m">Major: {major}</h2>
        </div>
      </div>
    </div>
  );
};

export default GrpMemberCard;
