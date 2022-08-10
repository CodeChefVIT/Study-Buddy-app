import AddModule from "./../create-module/create-module.component";

const CreateModule = (props) => {
  const saveModuleArray = (enteredModule) => {
    const modules = {
      ...enteredModule,
    };

    props.onAddModule(modules);
  };

  return <AddModule onSaveModule={saveModuleArray} />;
};

export default CreateModule;
