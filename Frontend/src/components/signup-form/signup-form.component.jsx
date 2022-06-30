import { Link } from "react-router-dom";

import "./sigunup-form.styles.css";

const SignUpForm = () => {
  return (
    <div>
      <section className="signup">
        <div className="login-background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="form-signup">
          <div className="heading-primary">Signup</div>
          <div className="heading-tertiary">Create an account. It's free!</div>

          <label for="username">Name</label>
          <input type="text" placeholder="Name" id="username" />

          <label for="username">Email</label>
          <input type="email" placeholder="Email" id="username" />

          <label for="username">Major</label>
          <input type="text" placeholder="Major" id="username" />

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" />
          <label for="password">Confirm Password</label>
          <input type="password" placeholder="Confirm Password" id="password" />

          <Link to="#" className="btn mar-t">
            Create Account
          </Link>
          <p className="para-primary align-c">
            Already have an account?
            <Link to="/login" className="log-nav-link">
              Signin
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignUpForm;
