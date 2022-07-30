import { useState } from "react";
import { useLocation } from "react-router-dom";

import Image1 from "./../../assets/img.svg";
import Image2 from "./../../assets/approve-user.png";
import Image3 from "./../../assets/reject-user.png";

import ErrorModal from "../error/error.component";

const GrpInviteCard = ({ member }) => {
  const { user, regno, id } = member;
  const [error, setError] = useState();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();
  const arr = path.split("/");

  const handleAccept = () => {
    fetch(
      `${process.env.REACT_APP_URL}/groups/request/accept/${arr[2]}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setError({
          message: data.message,
        })
      )
      .then(() => {
        window.location.reload();
      });
  };

  const handleReject = () => {
    fetch(
      `${process.env.REACT_APP_URL}/groups/request/reject/${arr[2]}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setError({
          message: data.message,
        })
      );
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <div className="mem-box mar-b">
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
    </div>
  );
};

export default GrpInviteCard;
