import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import CreateGrp from "./../../components/create-grp-form/create-grp-form.component";

const Dashboard = () => {
  return (
    <div>
      <NavigationAuth />
      <CreateGrp />
      <Footer />
    </div>
  );
};

export default Dashboard;
