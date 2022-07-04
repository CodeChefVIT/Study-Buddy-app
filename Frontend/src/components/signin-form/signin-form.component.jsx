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

    var dataLength = JSON.stringify(formFields).length;
    console.log(formFields);

    const response = await fetch(`${process.env.REACT_APP_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": dataLength,
        // "Host": "https://study-buddy-app-production.up.railway.app/",
      },
      body: JSON.stringify({
        formFields,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate.push("/");
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
          <p className="para-primary align-r">
            Forgot Password?
            <Link to="/" className="log-nav-link">
              Reset Password
            </Link>
          </p>
          <Button to="/">Log In</Button>

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
