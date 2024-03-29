import React, { useContext, useState } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Modal from '../../shared/components/UIElements/Modal'
import './CourseItem.css'

const CourseItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(
        process.env.VITE_BACKEND_URL + `/courses/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      )
      props.onDelete(props.id)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
              OK
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this course? This action cannot be undone.</p>
      </Modal>
      <li className="course-item">
        <Card className="course-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="course-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="course-item__actions">
            {auth.userId === props.creatorId && (
              <Button to={`/courses/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default CourseItem
