/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./create-quiz.styles.css";

import AddQuestions from "./../add-questions/add-questions.component";

const defaultFormFields = {
  time: "",
  questions: [],
};

const CreateQuiz = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { time } = formFields;
  const [questions, setQuestions] = useState(defaultFormFields.questions);

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
    console.log(formFields);
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();
    console.log(formFields);

    const response = await fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());
    console.log(response);

    try {
      resetFormFields();
    } catch (error) {
      console.log("group creation error", error);
    }
  };

  const addQuestion = (question) => {
    console.log(question);
    setQuestions(questions.concat(question));
    console.log(questions);
    setFormFields({ ...formFields, questions: [...questions] });
  };

  return (
    <section className="create mar-t">
      <AddQuestions onAddQuestion={addQuestion} />

      <form className="form-create-quiz" onSubmit={handleQuizSubmit}>
        <div className="heading-primary">Create Quiz</div>
        <label htmlFor="modulename">Time </label>
        <input
          name="time"
          type="text"
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

        <button className="button mar-t-2">Create Group</button>
      </form>
    </section>
  );
};

export default CreateQuiz;
