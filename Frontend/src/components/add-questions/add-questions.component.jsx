/* eslint-disable no-unused-vars */

import { useState } from "react";

const AddQuestions = (props) => {
  const saveQuestionArray = (enteredQuestion) => {
    const questions = {
      ...enteredQuestion,
    };
    props.onAddQuestion(questions);
  };

  const [question, setQuestion] = useState([]);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };
  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };
  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };
  const handleOption4Change = (event) => {
    setOption4(event.target.value);
  };

  const handleSubmitModule = (event) => {
    event.preventDefault();

    let temp = [];
    temp.push(option1, option2, option3, option4);
    console.log(temp);

    const questions = {
      question: question,
    };

    questions.options = temp;
    questions.answer = temp[answer - 1];

    console.log(questions);

    saveQuestionArray(questions);

    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setQuestion("");
    setAnswer("");
  };

  return (
    <div>
      <form className="form-create-quiz" onSubmit={handleSubmitModule}>
        <div className="heading-primary">Add Questions</div>
        <label htmlFor="modulename">Question</label>
        <input
          type="text"
          required
          onChange={handleQuestionChange}
          value={question}
          placeholder="What is PDE ?"
          id="modulename"
        />

        <label htmlFor="daystocomp">Add Options</label>
        <input
          required
          onChange={handleOption1Change}
          type="text"
          value={option1}
          placeholder="Option 1"
          id="daystocomp"
        />
        <input
          required
          onChange={handleOption2Change}
          type="text"
          value={option2}
          placeholder="Option 2"
          id="daystocomp"
        />
        <input
          required
          onChange={handleOption3Change}
          type="text"
          value={option3}
          placeholder="Option 3"
          id="daystocomp"
        />
        <input
          required
          onChange={handleOption4Change}
          type="text"
          value={option4}
          placeholder="Option 4"
          id="daystocomp"
        />
        <label htmlFor="modulename">Correct Option</label>
        <input
          type="text"
          required
          onChange={handleAnswerChange}
          value={answer}
          placeholder="1/2/3/4"
          id="modulename"
        />
        <button type="submit" className="button mar-t-2">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
