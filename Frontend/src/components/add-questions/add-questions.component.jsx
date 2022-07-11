import AddQuestion from "./../create-question/create-question.component";

const AddQuestions = (props) => {
  const saveQuestionArray = (enteredQuestion) => {
    const questions = {
      ...enteredQuestion,
    };

    props.onAddQuestion(questions);
  };

  return <AddQuestion onSaveQuestion={saveQuestionArray} />;
};

export default AddQuestions;
