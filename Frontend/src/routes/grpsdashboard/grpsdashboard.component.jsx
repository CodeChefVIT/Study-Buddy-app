// import { Link } from "react-router-dom";
import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";

import "./grpsdashboard.styles.css";

const GrpDash = () => {
  return (
    <div>
      <NavigationAuth />
      <div className="groups-in">
        <div className="group-hero">
          <h1 className="heading-primary-sm-2">qwe-asd-zxc</h1>
          <h1 className="heading-secondary">BMAT101L</h1>
        </div>
        <button className="button-grps long" type="text">
          See All Members
        </button>
        <div className="btn-sp">
          <button className="button-grps">
            {/*<img className='grp-btn-img' src="img/add.png" alt="search icon">*/}
            <p>Create Quiz</p>
          </button>

          <button className="button-grps">
            {/* <img className='grp-btn-img' src="img/send.png" alt="search icon">*/}
            <p>Send Invite</p>
          </button>
        </div>

        <button className="button-grps long">
          {/*<img className='grp-btn-img' src="img/send.png" alt="search icon">*/}
          <p>Attempt Quiz</p>
        </button>

        <h1 className="heading-primary-sm-2 mar-t-3">Modules</h1>

        <div className="grp-container">
          <div className="grp-con box">
            <h2 className="heading-primary-sm-2 align-l">PDE</h2>
            <h2 className="heading-tertiary-sm align-l">
              Members Completed: 29
            </h2>
          </div>
          <div className="grp-con box">
            <h2 className="heading-primary-sm-2 align-l">ODE</h2>
            <h2 className="heading-tertiary-sm align-l">
              Members Completed: 14
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GrpDash;
