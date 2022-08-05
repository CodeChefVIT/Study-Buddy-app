import { useState } from "react";
import ErrorModal from "../error/error.component";

const defaultFormFields = {
  oldPass: "",
  newPass: "",
  confirmPass: "",
};

const ResetPass = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { oldPass, newPass, confirmPass } = formFields;
  const [error, setError] = useState();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPass !== confirmPass) {
      setError({
        message: "Password and Confirm Password do not match",
      });

      return;
    }

    console.log(formFields);

    const response = await fetch(`${process.env.REACT_APP_URL}/user/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formFields),
    }).then((res) => res.json());
    console.log(response);

    if (response.success) {
      setError({
        message: "User Updated Sucessfully!",
      });

      resetFormFields();
    } else {
      const { error } = response;
      setError({
        message: error,
      });
    }
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
      <form className="form-account" onSubmit={handleSubmit}>
        <div className="heading-primary">Password Change</div>

        <label htmlFor="username">Old Password</label>
        <input
          type="password"
          placeholder="Old Password"
          required
          onChange={handleChange}
          name="oldPass"
          value={oldPass}
          id="oldPass"
        />

        <label htmlFor="username">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          required
          onChange={handleChange}
          name="newPass"
          value={newPass}
          id="newPass"
        />

        <label htmlFor="username">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPass"
          value={confirmPass}
          id="confirmPass"
        />

        <button className="button mar-t">Save Changes</button>
      </form>
    </div>
  );
};

export default ResetPass;
