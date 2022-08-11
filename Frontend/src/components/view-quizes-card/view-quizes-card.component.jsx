import { Link } from "react-router-dom";

const ViewQuizesCard = ({ quiz }) => {
  const Grppath = `/groups/quiz/attempt/${quiz.id}`;

  return (
    <div className="quiz-box">
      <div className="quiz-con">
        <h2 className="heading-primary-sm-2 align-l">
          Created by: {quiz.creator.name}
        </h2>
        <Link to={Grppath} className="main-nav-link nav-cta align-c">
          Attempt Quiz
        </Link>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          Number of questions:{quiz.questions.length}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time Alotted: {quiz.time}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last Score:{" "}
          {localStorage.getItem(`score${quiz.id}`) || 0}
        </h2>
      </div>
    </div>
  );
};

export default ViewQuizesCard;
