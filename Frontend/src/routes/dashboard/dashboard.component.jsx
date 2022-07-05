import { useNavigate } from "react-router-dom";
import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import { ReactComponent as ProfPic } from "./../../assets/img.svg";

import "./dashboard.styles.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateGrpsDash = () => {
    navigate("/grp-dash");
  };

  return (
    <div>
      <NavigationAuth />
      <section className="dashboard">
        <h1 className="heading-primary">My Groups</h1>
        <div className="grpsv-container">
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button onClick={navigateGrpsDash} className="button">
                Click to Enter Group
              </button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
          <div className="grpsv-card">
            <div>
              <ProfPic
                className="prof-pic"
                src="img/img.svg"
                alt="group image"
              />
              <h2 className="heading-primary-sm-3 pad-t">qwe-asd-zxc</h2>
            </div>
            <div>
              <h2 className="heading-primary-sm-3 ">Topic: BMAT101L</h2>
              <h2 className="heading-primary-sm-3 pad-t pad-b">
                Members Present: 69
              </h2>
              <button className="button">Click to Enter Group</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
