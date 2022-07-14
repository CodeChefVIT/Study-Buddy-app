import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../navigation/navigation.component";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "../footer/footer.component";
import CreateGrp from "./../../components/create-grp/create-grp.component";

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
      <CreateGrp />
      <Footer />
    </div>
  );
};

export default CreateStudyGrp;
