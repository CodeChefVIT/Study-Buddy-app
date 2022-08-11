/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./create-quiz.styles.css";

import ErrorModal from "../../components/error/error.component";
import AddQuestions from "./../add-questions/add-questions.component";

const defaultFormFields = {
  time: "",
  questions: [],
};

const CreateQuiz = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { time } = formFields;
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleQuizChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();

    const temp = formFields;
    temp.questions = questions;

    console.log(formFields);
    console.log(questions);

    const response = await fetch(`${process.env.REACT_APP_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formFields),
    }).then((res) => res.json());
    console.log(response);

    try {
      setError({
        message: "Quiz Created Successfully",
      });
      resetFormFields();
    } catch (error) {
      setError({
        message: "Something went wrong, please try again",
      });
    }
  };

  const addQuestion = (newQuestions) => {
    setQuestions([newQuestions, ...questions]);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <section className="create mar-t">
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <AddQuestions onAddQuestion={addQuestion} />

      <form className="form-create-quiz" onSubmit={handleQuizSubmit}>
        <div className="heading-primary">Create Quiz</div>
        <label htmlFor="modulename">Time </label>
        <input
          name="time"
          type="time"
          required
          onChange={handleQuizChange}
          value={time}
          placeholder="2"
          id="modulename"
        />

        <div className="heading-primary pad-t">Your Questions</div>

        {questions.map((question) => (
          <h3 className="heading-tertiary">{question.question}</h3>
        ))}

        <button className="button mar-t-2">Create Quiz</button>
      </form>
    </section>
  );
};

export default CreateQuiz;
