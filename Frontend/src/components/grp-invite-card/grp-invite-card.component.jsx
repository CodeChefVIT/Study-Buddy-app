import { useLocation } from "react-router-dom";

import Image1 from "./../../assets/img.svg";
import Image2 from "./../../assets/approve-user.png";
import Image3 from "./../../assets/reject-user.png";

const GrpInviteCard = ({ member }) => {
  const { user, regno, id } = member;

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();
  const arr = path.split("/");

  const handleAccept = () => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/groups/request/accept/${arr[2]}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => alert(data.message));
  };

  const handleReject = () => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/groups/request/reject/${arr[2]}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => alert(data.message));
  };

  return (
    <div className="mem-box">
      <div className="mem-con">
        <img className="mem-img" src={Image1} alt="user icon" />
        <div>
          <h2 className="heading-name align-l">{user}</h2>
          <h2 className="heading-name-2 align-l pad-m">RegNo: {regno}</h2>
        </div>
        <button className="button-l" onClick={handleAccept}>
          <img className="act-img-1 mar-l-3" src={Image2} alt="accept icon" />
        </button>
        <button className="button-l" onClick={handleReject}>
          <img className="act-img-2 mar-l" src={Image3} alt="reject icon" />
        </button>
      </div>
    </div>
  );
};

export default GrpInviteCard;
