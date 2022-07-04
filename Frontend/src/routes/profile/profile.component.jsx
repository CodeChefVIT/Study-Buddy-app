import { Link } from "react-router-dom";
// import { ReactComponent as Logo } from "./../../assets/Logo-Main.svg";
import { ReactComponent as ProfPic} from "./../../assets/img.svg";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

import "./profile.styles.css";

const Dashboard = () => {
  return (
    <div>
    <NavigationAuth/>
      <section className="account">
        <div className="account-background">
          <div className="shape-Link"></div>
          <div className="shape-Link"></div>
        </div>
        <form className="form-account">
          <div className="heading-primary">Your Account Settings</div>

          <div className="pic-cha">
            <ProfPic className="prof-pic" alt="profile pic" />
            <Link to="/" className="btn f-s mar-l">Upload Profile Pic</Link>

          </div>

          <label htmlFor="username">Name</label>
          <input type="email" placeholder="Name" id="username" />

          <label htmlFor="bio">Bio</label>
          <input type="email" placeholder="Bio" id="password" />
          
          <Link to="/" className="btn mar-t-2">Save Changes</Link>
          
          <div className="heading-primary mar-t-3">Password Change</div>

          <label htmlFor="username">Old Password</label>
          <input type="password" placeholder="Old Password" id="username" />
          
          <label htmlFor="username">New Password</label>
          <input type="password" placeholder="New Password" id="username" />
          
          <label htmlFor="username">Confirm Password</label>
          <input type="password" placeholder="Confirm Password" id="username" />

          <Link to="/" className="btn mar-t-2">Save Changes</Link>
        </form>
      </section>
      <Footer />

      
    </div>
  );
};

export default Dashboard;
