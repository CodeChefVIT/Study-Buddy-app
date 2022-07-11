import { Link } from "react-router-dom";

const ViewQuizesCard = ({ quiz }) => {
  console.log(quiz);

  const Grppath = `/groups/quiz/attempt/${quiz._id}`;

  return (
    <div className="quiz-box">
      <div className="quiz-con">
        <h2 className="heading-primary-sm-2 align-l">
          Created by: {quiz.creator}
        </h2>
        <Link to={Grppath} className="main-nav-link nav-cta align-c">
          Attempt Quiz
        </Link>
      </div>
      <div className="mar">
        <h2 className="heading-tertiary-sm align-l">
          Number of questions:{quiz.questions.length}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time Alotted: {quiz.time}
        </h2>
      </div>
    </div>
  );
};

export default ViewQuizesCard;
