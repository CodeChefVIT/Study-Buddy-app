import { useState } from "react";

import NavigationAuth from "../navigation-auth/navigation-auth.component";
import Footer from "./../footer/footer.component";
import "./addmodule.styles.css";

const Input = () => {
  return (
    <div>
      <label>Name of Module</label>
      <input placeholder="Name of module" key="name" />

      <label>Number of days to complete</label>
      <input placeholder="20" key="daysToComplete" />
    </div>
  );
};

const AddModules = () => {
  const [inputList, setInputList] = useState([]);

  const onAddBtnClick = (event) => {
    setInputList(inputList.concat(<Input id={inputList.length} />));
  };

  return (
    <div>
      <NavigationAuth />
      <div className="addmodule">
        <h1 className="heading-primary-sm">Please add Modules</h1>
        <div className="grp-container">
          <div className="box">
            <form>
              <Input />
              {inputList}
            </form>
            <button onClick={onAddBtnClick} className="button mar-t">
              Add Module
            </button>
          </div>
        </div>
        <button className="add-m-button">Submit</button>
      </div>
      <Footer />
    </div>
  );
};

export default AddModules;
