import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../button/button.component";

const defaultFormFields = {
  password: "",
  confirm: "",
};

const ResetPassForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirm } = formFields;
  // const [mailVer, setMailVer] = useState(false);

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const path = usePathname();

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

    const response = await fetch(`${process.env.REACT_APP_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formFields),
    }).then((res) => res.json());
    console.log(response);

    if (response.success) {
      alert("Password Reset Sucessful");
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
          <div className="heading-secondary">Enter your new password</div>

          <label htmlFor="con-password">New Password</label>
          <input
            type="password"
            placeholder="New Password"
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

          <div className="mar-t-2">
            <Button>Reset Password</Button>
          </div>

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

export default ResetPassForm;
