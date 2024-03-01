import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import "./CourseItem.css";

const CourseItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING.");
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="course-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this course? This action cannot be
          undone.
        </p>
      </Modal>
      <li className="course-item">
        <Card className="course-item__content">
          <div className="course-item__info">
            <h2>{props.name}</h2>
            <h3>{props.code}</h3>
            <h3>{props.description}</h3>
            <h3>{props.credits}</h3>
            <h3>{props.registeringTime}</h3>
            <h3>{props.schedule}</h3>
            <p>{props.labs}</p>
            <p>{props.passwords}</p>
            <p>{props.users}</p>
          </div>
          <div className="course-item__actions">
            <Button to={`/TODO1`} inverse>
              JOIN COURSE
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/courses/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CourseItem;
