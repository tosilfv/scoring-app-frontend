import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Modal from '../../shared/components/UIElements/Modal'
import { style } from '../../shared/styles/styles'
import './CourseItem.css'

const CourseItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

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
      /* continue regardless of error */
    }
  }

  const labSubmitHandler = async (event, courseId, labId) => {
    event.preventDefault()
    let result
    try {
      result = await sendRequest(
        process.env.VITE_BACKEND_URL + '/labs',
        'POST',
        JSON.stringify({
          courseid: courseId,
          labid: labId,
          labpassword: event.target.labInput.value,
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      navigate('/profile')
    } catch (err) {
      /* continue regardless of error */
    }
  }

  const joinCourseHandler = async (event) => {
    event.preventDefault()
    let result
    try {
      result = await sendRequest(
        process.env.VITE_BACKEND_URL + '/courses/join',
        'POST',
        JSON.stringify({
          courseid: props.id,
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      navigate('/profile')
    } catch (err) {
      /* continue regardless of error */
    }
  }

  const changeHandler = (event) => {
    event.preventDefault()
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
            <h2 style={style.main}>COURSE</h2>
            {props.title}
            <div style={style.yourcourses}>
              <h3 style={style.main}>DESCRIPTION</h3>
              {props.description}
            </div>
            {props.labs &&
              props.labs.map((lab) => (
                <div key={lab._id}>
                  <form
                    onSubmit={(event) =>
                      labSubmitHandler(event, props.id, lab._id)
                    }
                  >
                    {lab.isCompleted.includes(props.userId) ? (
                      <>
                        <span style={style.labcompleted}>LAB</span>
                        <span style={style.labcompleted}>{lab.name}</span>
                        <span style={style.labcompleted}>
                          {'< COMPLETED >'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={style.labsubmit}>LAB</span>
                        <span style={style.labsubmit}>{lab.name}</span>
                        {auth.isAdmin ? (
                          <span style={style.labnotcompleted}>
                            {'< NOT COMPLETED >'}
                          </span>
                        ) : (
                          <>
                            <input
                              style={style.labsubmit}
                              onChange={changeHandler}
                              placeholder="enter lab password"
                              type="text"
                              name="labInput"
                            />
                            <Button type="submit">SUBMIT</Button>
                          </>
                        )}
                      </>
                    )}
                  </form>
                </div>
              ))}
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
            {!(auth.userId === props.creatorId) &&
              !props.users.includes(auth.userId) && (
              <Button onClick={joinCourseHandler}>JOIN</Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default CourseItem
