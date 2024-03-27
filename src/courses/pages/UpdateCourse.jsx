import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './CourseForm.css'

const UpdateCourse = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedCourse, setLoadedCourse] = useState()
  const courseId = useParams().courseId
  const navigate = useNavigate()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.VITE_BACKEND_URL + `/courses/${courseId}`
        )
        setLoadedCourse(responseData.course)
        setFormData(
          {
            title: {
              value: responseData.course.title,
              isValid: true,
            },
            description: {
              value: responseData.course.description,
              isValid: true,
            },
          },
          true
        )
      } catch (err) {
        console.log('err: ', err)
      }
    }
    fetchCourse()
  }, [sendRequest, courseId, setFormData])

  const courseUpdateSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(
        process.env.VITE_BACKEND_URL + `/courses/${courseId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      )
      navigate('/' + auth.userId + '/courses')
    } catch (err) {
      console.log('err: ', err)
    }
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedCourse && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find course!</h2>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedCourse && (
        <form className="course-form" onSubmit={courseUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedCourse.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedCourse.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE COURSE
          </Button>
        </form>
      )}
    </React.Fragment>
  )
}

export default UpdateCourse
