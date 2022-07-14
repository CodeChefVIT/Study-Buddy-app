import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "./../button/button.component";
import "./signin-form.styles.css";

const defaultFormFields = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields);

    const response = await fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());
    console.log(response);

    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }

    try {
      resetFormFields();
    } catch (error) {
      console.log("user creation error", error);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login-background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="heading-primary">Login</div>
          <div className="heading-secondary">
            Welcome back! See what you have missed
          </div>

          <label htmlFor="email">Enter your Mail</label>
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={email}
            placeholder="Email"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={password}
            placeholder="Password"
            id="password"
          />
          <p className="para-primary align-l">
            Forgot Password? &nbsp;
            <Link to="/" className="log-nav-link">
              Reset Password
            </Link>
          </p>
          <Button to="/">Log In</Button>

          <p className="para-primary align-l">
            Don't have an account? &nbsp;
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
