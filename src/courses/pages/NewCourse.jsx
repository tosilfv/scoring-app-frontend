import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Input from '../../shared/components/FormElements/Input'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import './CourseForm.css'

const NewCourse = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const courseSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(
        process.env.VITE_BACKEND_URL + '/courses',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      navigate('/')
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="course-form" onSubmit={courseSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          placeholder="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          placeholder="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          placeholder="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD COURSE
        </Button>
      </form>
    </React.Fragment>
  )
}

export default NewCourse
