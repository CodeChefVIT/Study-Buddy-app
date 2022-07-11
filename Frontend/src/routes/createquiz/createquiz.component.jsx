import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "../footer/footer.component";
import CreateQuiz from "../../components/create-quiz/create-quiz.component";

const CreateStudyGrp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div>
      {localStorage.getItem("token") ? <NavigationAuth /> : <Navigation />}
      <CreateQuiz />
      <Footer />
    </div>
  );
};

export default CreateStudyGrp;
