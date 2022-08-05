import { useState } from "react";
import { Link } from "react-router-dom";

import ErrorModal from "../../components/error/error.component";

import Button from "./../button/button.component";
import "./sigunup-form.styles.css";

const defaultFormFields = {
  email: "",
  password: "",
  confirm: "",
  name: "",
  regno: "",
  major: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, regno, major, password, confirm } = formFields;
  const [error, setError] = useState();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirm) {
      setError({
        message: "Password and Confirm Password do not match",
      });
      return;
    }

    console.log(formFields);

    const response = await fetch(`${process.env.REACT_APP_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    }).then((res) => res.json());
    console.log(response);

    const { message } = response;
    setError({
      message: message,
    });

    if (response.success) {
      localStorage.setItem("token", response.token);
      setError({
        message: "User Created",
      });
    } else {
      const { error } = response;
      setError({
        message: error,
      });
    }

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <section className="signup">
        <div className="signup-background">
          <div className="signup-shape"></div>
          <div className="signup-shape"></div>
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
            name="name"
            value={name}
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
            name="confirm"
            value={confirm}
            id="confirm"
          />

          <div className="mar-t">
            <Button>Create Account</Button>
          </div>

          <p className="para-primary align-l">
            Already have an account? &nbsp;
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
