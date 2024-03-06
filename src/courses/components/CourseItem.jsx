import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import "./CourseItem.css";

const CourseItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/courses/${props.id}`,
        "DELETE"
      );
    } catch (err) {
      console.log("CourseItem confirmDeleteHandler err: ", err);
    }
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
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
        footerClass="course-item__modal-actions"
        header="Are you sure?"
        onCancel={cancelDeleteHandler}
        show={showConfirmModal}
      >
        <p>
          Do you want to proceed and delete this course? This action cannot be
          undone.
        </p>
      </Modal>
      <li className="course-item">
        <Card className="course-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
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
            {auth.userId === props.userId && (
              <Button to={`/courses/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.userId && (
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
