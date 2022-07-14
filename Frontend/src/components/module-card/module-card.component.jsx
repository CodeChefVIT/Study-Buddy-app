const ModCard = ({ module }) => {
  console.log(module);
  return (
    <div className="grp-con box">
      <h2 className="heading-primary-sm-2 align-l">{module.name}</h2>
      <h2 className="heading-tertiary-sm align-l">
        Days to complete: {module.daysToComplete}
      </h2>
    </div>
  );
};

export default ModCard;
