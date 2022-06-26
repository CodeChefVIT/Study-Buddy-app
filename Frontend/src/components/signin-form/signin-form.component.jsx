import { Link } from "react-router-dom";

const SigninForm = () => {
  return (
    <div>
      <div className="login">
        <div className="login-background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="form-signin">
          <div className="heading-primary">Login</div>
          <div className="heading-secondary">
            Welcome back! See what you have missed
          </div>

          <label for="username">Enter your Mail</label>
          <input type="email" placeholder="Email" id="username" />

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" />
          <p className="para-primary align-r">
            Forgot Password?
            <Link to="/" className="log-nav-link">
              Reset Password
            </Link>
          </p>
          <Link to="/" className="btn">
            Log In
          </Link>
          <p className="para-primary align-c">
            Don't have an account?
            <Link to="/signup" className="log-nav-link">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
