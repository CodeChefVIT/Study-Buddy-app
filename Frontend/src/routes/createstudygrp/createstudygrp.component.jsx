import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "../footer/footer.component";
import CreateGrp from "../../components/create-grp/create-grp.component";

const CreateStudyGrp = () => {
  return (
    <div>
      <NavigationAuth />
      <CreateGrp />
      <Footer />
    </div>
  );
};

export default CreateStudyGrp;
