import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { style } from '../../shared/styles/styles'
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
  const [num, setNum] = useState(0)
  const [numArr, setNumArr] = useState([num])
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
    },
    false
  )

  const courseSubmitHandler = async (event) => {
    event.preventDefault()
    let labList = []
    let labname = ''
    let labpassword = ''
    for (let i = 0; i < event.target.length; i++) {
      for (let j = 0; j < event.target.length; j++) {
        if (event.target[j].id === `labname${i}`) {
          labname = event.target[j].value
        }
        if (event.target[j].id === `labpassword${i}`) {
          labpassword = event.target[j].value
          labList.push({
            name: labname,
            password: labpassword,
          })
          labname = ''
          labpassword = ''
        }
      }
    }

    try {
      await sendRequest(
        process.env.VITE_BACKEND_URL + '/courses',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          labs: labList,
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      navigate('/courses/all')
    } catch (err) {
      console.log('err courseSubmitHandler: ', err)
    }
  }

  const addLabHandler = async (event) => {
    event.preventDefault()
    const newNum = num + 1
    const newArr = [...numArr, newNum]
    setNum(newNum)
    setNumArr(newArr)
  }

  const removeLabHandler = async (event) => {
    event.preventDefault()
    if (numArr.length > 1) {
      const newNum = num - 1
      setNum(newNum)
      const newArr = numArr.slice(0, -1)
      setNumArr(newArr)
      formState.isValid = true // (1) force form validity after lab removal so that form submit button becomes enabled
    }
  }

  return (
    <React.Fragment>
      {auth.isAdmin && (
        <>
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
            {Array.from(numArr).map((lab) => {
              return (
                <React.Fragment key={lab}>
                  <div style={style.main}>LAB{lab}</div>
                  <Input
                    id={`labname${lab}`}
                    placeholder="lab name"
                    element="input"
                    label="Lab name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid lab name."
                    onInput={inputHandler}
                  />
                  <Input
                    id={`labpassword${lab}`}
                    placeholder="lab password"
                    element="input"
                    label="Lab password"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid lab password."
                    onInput={inputHandler}
                  />
                </React.Fragment>
              )
            })}
            <div style={style.button}>
              <Button onClick={addLabHandler}>+ ADD NEW LAB</Button>
              <Button onClick={removeLabHandler}>- REMOVE NEW LAB</Button>
            </div>
            <Button type="submit" disabled={!formState.isValid}>
              ADD COURSE
            </Button>
          </form>
        </>
      )}
    </React.Fragment>
  )
}

export default NewCourse
