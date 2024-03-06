import React from "react";
import Button from "../FormElements/Button";
import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      footer={<Button onClick={props.onClear}>Okay</Button>}
      header="An Error Occurred!"
      onCancel={props.onClear}
      show={!!props.error}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
