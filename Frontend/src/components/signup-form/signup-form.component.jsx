import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "./../button/button.component";
import "./sigunup-form.styles.css";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
  regno: "",
  major: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, regno, major, password, confirmPassword } =
    formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert("passwords do not match");
  //     return;
  //   }

  //   try {
  //     resetFormFields();
  //   } catch (error) {
  //     console.log("user creation error", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Length": ,
        "Host":3000,
      },
      body: JSON.stringify({
        formFields,
      }),
    });

    const json = await response.json();
    console.log(json);

    localStorage.setItem("token", json.authtoken);
    navigate.push("/");

    try {
      resetFormFields();
    } catch (error) {
      console.log("user creation error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <section className="signup">
        <div className="login-background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form className="form-signup" onSubmit={handleSubmit}>
          <div className="heading-primary">Signup</div>
          <div className="heading-tertiary">Create an account. It's free!</div>

          <label htmlFor="username">Name</label>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <label htmlFor="regno">Regisration Number</label>
          <input
            type="text"
            placeholder="21BCE0021"
            required
            onChange={handleChange}
            name="regno"
            value={regno}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <label htmlFor="major">Major</label>
          <input
            type="text"
            placeholder="Major"
            required
            onChange={handleChange}
            name="major"
            value={major}
            id="major"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            id="password"
          />
          <label htmlFor="con-password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            id="confirmpassword"
          />

          <div className="mar-t">
            <Button>Create Account</Button>
          </div>

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
