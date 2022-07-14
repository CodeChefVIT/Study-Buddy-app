import Image1 from "./../../assets/img.svg";

const GrpMemberCard = ({ member }) => {
  const { name, major } = member;
  console.log(member);

  return (
    <div className="mem-box">
      <div className="mem-con">
        <img className="mem-img" src={Image1} alt="user icon" />
        <div>
          <h2 className="heading-name align-l">{name}</h2>
          <h2 className="heading-name-2 align-l pad-m">Major: {major}</h2>
        </div>
      </div>
    </div>
  );
};

export default GrpMemberCard;
