import React from "react";

import "./error.styles.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">
        <p className="heading-secondary">{props.message}</p>
      </div>
      <footer className="actions">
        <button className="btn-alert" onClick={props.onConfirm}>
          Okay
        </button>
      </footer>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      <Backdrop onClick={props.onConfirm} />
      <ModalOverlay message={props.message} onConfirm={props.onConfirm} />
    </React.Fragment>
  );
};

export default ErrorModal;
