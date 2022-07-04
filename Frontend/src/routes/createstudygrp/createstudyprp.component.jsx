import NavigationAuth from "./../navigation-auth/navigation-auth.component";
import "./createstudygrp.styles.css";

const Dashboard = () => {
  return (
    <div>
      <NavigationAuth />
      <section className="create mar-t">
        <div className="create-background">
          <div className="shape-c"></div>
          <div className="shape-c"></div>
        </div>
        <form className="form-create">
          <div className="heading-primary">Create Study Group</div>

          <label htmlFor="username">Course Name</label>
          <input
            type="email"
            placeholder="Differential equatins"
            id="username"
          />

          <label htmlFor="username">Course Code</label>
          <input type="password" placeholder="BMAT102L" id="username" />

          <label htmlFor="username">Number of Modules</label>
          <input type="password" placeholder="2" id="username" />

          <button className="button mar-t-2">Create Group</button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;
