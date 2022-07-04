import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

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
  // const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirm) {
      alert("passwords do not match");
      return;
    }

    console.log(formFields);

    const response = await fetch(
      `https://study-buddy-app-production.up.railway.app/api/v1/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());
    console.log(response);

    const { message } = response;
    alert(message);

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
