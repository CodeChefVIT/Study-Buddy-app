import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/button.component";

import "./forgot-form.styles.css";

const defaultFormFields = {
  email: "",
};

const ForgotPassForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;

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
    console.log(response);

    if (response.success) {
      alert("Password reset link has been sent to your email");
    } else {
      alert("Email is not registered");
    }

    try {
      resetFormFields();
    } catch (error) {
      console.log("user creation error", error);
    }
  };

  return (
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
  );
};

export default ForgotPassForm;
