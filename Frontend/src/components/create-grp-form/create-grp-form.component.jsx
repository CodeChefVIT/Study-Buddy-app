import { useState } from "react";
import { Link } from "react-router-dom";

import "./create-grp-form.syles.css";

const defaultFormFields = {
  name: "",
  subject: "",
  description: "",
  modules: [],
};

const CreateGrp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, subject, description /*modules*/ } = formFields;

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
      `https://study-buddy-app-production.up.railway.app/api/v1/groups/new`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());
    console.log(response);

    try {
      resetFormFields();
    } catch (error) {
      console.log("group creation error", error);
    }
  };

  return (
    <section className="create mar-t">
      <div className="create-background">
        <div className="shape-c"></div>
        <div className="shape-c"></div>
      </div>
      <form className="form-create" onSubmit={handleSubmit}>
        <div className="heading-primary">Create Study Group</div>

        <label htmlFor="coursename">Course Name</label>
        <input
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={name}
          placeholder="Differential equatins"
          id="coursename"
        />

        <label htmlFor="coursecode">Course Code</label>
        <input
          name="subject"
          required
          onChange={handleChange}
          type="text"
          value={subject}
          placeholder="BMAT102L"
          id="coursecode"
        />

        <label htmlFor="description">Group Description</label>
        <input
          name="description"
          required
          onChange={handleChange}
          type="text"
          value={description}
          placeholder="Hey mates, Let's study differential equations"
          id="description"
        />

        <Link to="/addmodule" className="log-nav-link pad-r">
          Add Modules
        </Link>

        <button className="button mar-t-2">Create Group</button>
      </form>
    </section>
  );
};

export default CreateGrp;
