import { useLocation } from "react-router-dom";

import "./create-quiz.styles.css";

const CreateQuiz = () => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();
  console.log(path);

  return (
    <div>
      <div className="questions-container"></div>
    </div>
  );
};

export default CreateQuiz;
