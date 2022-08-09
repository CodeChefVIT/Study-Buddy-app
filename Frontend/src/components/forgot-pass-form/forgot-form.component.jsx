import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/button.component";
import ErrorModal from "../error/error.component";
import "./forgot-form.styles.css";

const defaultFormFields = {
  email: "",
};

const ForgotPassForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;
  const [error, setError] = useState();

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

    console.log(`${process.env.REACT_APP_URL}/user/forgotPassword`);

    const response = await fetch(
      `${process.env.REACT_APP_URL}/user/forgotPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());

    if (response.success) {
      setError({
        message: "Password reset link has been sent to your email",
      });
    } else {
      setError({
        message: "Email is not registered",
      });
    }

    resetFormFields();
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <div>
        <div className="forgot">
          <div className="forgot-background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form className="form-forgot" onSubmit={handleSubmit}>
            <div className="heading-primary">Reset Password</div>
            <div className="heading-secondary">
              Please Enter Mail to get Reset Link
            </div>

            <label htmlFor="email">Enter your Mail</label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={email}
              placeholder="Email"
              className="mar-b-2"
            />
            <Button className="mar-t">Reset Password</Button>

            <p className="para-primary align-l">
              Don't have an account? &nbsp;
              <Link to="/signup" className="log-nav-link">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassForm;
