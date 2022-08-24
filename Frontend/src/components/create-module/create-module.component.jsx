import { useState } from "react";

import ErrorModal from "../../components/error/error.component";

const AddModule = (props) => {
  const [modulesName, setModulesName] = useState("");
  const [modulesDatesToComp, setModulesDatesToComp] = useState("");
  const [error, setError] = useState();

  const handleModuleChange = (event) => {
    setModulesName(event.target.value);
  };

  const handleDaysToCompChange = (event) => {
    setModulesDatesToComp(event.target.value);
  };

  const handleSubmitModule = (event) => {
    event.preventDefault();

    if (modulesDatesToComp < 0) {
      setError({
        message: "Please enter a valid number of days to complete",
      });
      setModulesDatesToComp("");
      return;
    }

    const modules = {
      name: modulesName,
      daysToComplete: modulesDatesToComp,
    };

    setModulesName("");
    setModulesDatesToComp("");

    props.onSaveModule(modules);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal message={error.message} onConfirm={errorHandler} />}
      <form className="form-create" onSubmit={handleSubmitModule}>
        <div className="heading-primary">Add Modules</div>
        <div>
          <label htmlFor="modulename">Module Name</label>
          <input
            type="text"
            required
            onChange={handleModuleChange}
            value={modulesName}
            placeholder="PDE"
          />
        </div>

        <div>
          <label htmlFor="daystocomp">Days to Complete</label>
          <input
            required
            onChange={handleDaysToCompChange}
            type="number"
            value={modulesDatesToComp}
            placeholder="13"
          />
        </div>
        <button type="submit" className="button mar-t-2">
          Add Module
        </button>
      </form>
    </div>
  );
};

export default AddModule;
