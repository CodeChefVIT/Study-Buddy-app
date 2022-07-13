import Image1 from "./../../assets/img.svg";

const GrpMemberCard = ({ member }) => {
  const { name } = member;
  console.log(member);

  return (
    <div className="mem-box">
      <div className="grp-con">
        <img className="mem-img" src={Image1} alt="user icon" />
        <h2 className="heading-primary-sm-2 align-l">{name}</h2>
      </div>
    </div>
  );
};

export default GrpMemberCard;
