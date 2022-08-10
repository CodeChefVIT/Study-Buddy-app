/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./create-grp.styles.css";
import ErrorModal from "../../components/error/error.component";

import CreateModule from "./../add-module/add-module.component";

const defaultFormFields = {
  name: "",
  subject: "",
  description: "",
};

const CreateGrp = (props) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { name, subject, description } = formFields;
  const [modules, setModules] = useState([]);
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
    console.log(modules);

    const temp = formFields;
    temp.modules = modules;

    console.log(temp);

    setFormFields(temp);

    console.log(formFields);

    const response = await fetch(`${process.env.REACT_APP_URL}/groups/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formFields),
    }).then((res) => res.json());
    // console.log(response);

    try {
      setError({
        message: "Group Created Successfully",
      });
      resetFormFields();
      setModules([]);
    } catch (error) {
      setError({
        message: "Something went wrong, please try again",
      });
    }
  };

  const addModule = (newModule) => {
    setModules([newModule, ...modules]);
  };

  const errorHandler = () => {
    setError(null);
  };

  // const handleFileChange = (event) => {
  //   event.preventDefault();
  //   defaultForm.append("avatar", event.target.files[0]);
  // };

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <section className="create mar-t">
        <CreateModule onAddModule={addModule} />
        {modules.length > 0 && (
          <div>
            <div className="create-background">
              <div className="shape-c"></div>
              <div className="shape-c"></div>
            </div>
            <form className="form-create" onSubmit={handleSubmit}>
              <div className="heading-primary">Create Study Group</div>

              {/* <div className="pic-cha">
                <img
                  className="prof-pic-up mar-r"
                  src={url}
                  alt="profile pic"
                />
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleFileChange}
                  id="avatar"
                />
        </div>*/}
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
              <div className="heading-primary pad-t">Your Modules</div>
              {modules.length > 0 ? (
                modules.map((module) => {
                  return (
                    <div>
                      <h1 className="heading-primary-sm-mod">
                        {module.name} : {module.daysToComplete}
                      </h1>
                    </div>
                  );
                })
              ) : (
                <h1 className="heading-primary-sm-mod">No modules added</h1>
              )}

              <button className="button mar-t-2">Create Group</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default CreateGrp;
