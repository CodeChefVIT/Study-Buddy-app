/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./attempt-quiz.styles.css";

import Navigation from "../navigation/navigation.component";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

const defaultQuestions = [
  {
    question: "Default Question 1?",
    options: ["0", "1", "2", "3"],
    answer: "1",
  },
];
const AttemptQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(defaultQuestions);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();
  const QuizId = path.split("/")[4];

  console.log(QuizId);

  useEffect(() => {
    fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/groups/quiz/${QuizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(({ questions }) => setQuestions(questions));
  }, []);

  console.log(questions);

  const handleAnswerButtonClick = (answer) => {
    if (answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    setCurrentQuestion(nextQuestion);
  };

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <div className="attempt-quiz">
        {showScore ? (
          <div className="heading-primary-z answer">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <div>
            <div className="question-section">
              <div className="question-count heading-primary-sm-3 pad-b2">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text heading-primary">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  className="attempt-quiz-button"
                  onClick={() =>
                    handleAnswerButtonClick(
                      option === questions[currentQuestion].answer
                    )
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default AttemptQuiz;
