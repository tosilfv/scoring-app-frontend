import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./CourseForm.css";

const UpdateCourse = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCourse, setLoadedCourse] = useState();
  const auth = useContext(AuthContext);
  const courseId = useParams().courseId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      code: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      credits: {
        value: "",
        isValid: false,
      },
      registeringTime: {
        value: "",
        isValid: false,
      },
      schedule: {
        value: "",
        isValid: false,
      },
      labs: {
        value: "",
        isValid: false,
      },
      passwords: {
        value: "",
        isValid: false,
      },
      users: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/courses/${courseId}`
        );
        setLoadedCourse(responseData.course);
        setFormData(
          {
            name: {
              value: responseData.course.name,
              isValid: true,
            },
            code: {
              value: responseData.course.code,
              isValid: true,
            },
            description: {
              value: responseData.course.description,
              isValid: true,
            },
            credits: {
              value: responseData.course.credits,
              isValid: true,
            },
            registeringTime: {
              value: responseData.course.registeringTime,
              isValid: true,
            },
            schedule: {
              value: responseData.course.schedule,
              isValid: true,
            },
            labs: {
              value: responseData.course.labs,
              isValid: true,
            },
            passwords: {
              value: responseData.course.passwords,
              isValid: true,
            },
            users: {
              value: responseData.course.users,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log("UpdateCourse useEffect err: ", err);
      }
    };
    fetchCourse();
  }, [courseId, sendRequest, setFormData]);

  const courseUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/courses/${courseId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          code: formState.inputs.code.value,
          description: formState.inputs.description.value,
          credits: formState.inputs.credits.value,
          registeringTime: formState.inputs.registeringTime.value,
          schedule: formState.inputs.schedule.value,
          labs: formState.inputs.labs.value,
          passwords: formState.inputs.passwords.value,
          users: formState.inputs.users.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate("/" + auth.userId + "/courses");
    } catch (err) {
      console.log("UpdateCourse courseUpdateSubmitHandler err: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedCourse && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a course.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedCourse && (
        <form className="course-form" onSubmit={courseUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Course Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedCourse.name}
            initialValid={true}
          />
          <Input
            id="code"
            element="input"
            type="text"
            label="Course code"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid code."
            onInput={inputHandler}
            initialValue={loadedCourse.code}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description of at least 5 characters."
            onInput={inputHandler}
            initialValue={loadedCourse.description}
            initialValid={true}
          />
          <Input
            id="credits"
            element="input"
            type="text"
            label="Credits"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid credits."
            onInput={inputHandler}
            initialValue={loadedCourse.credits}
            initialValid={true}
          />
          <Input
            id="registeringTime"
            element="input"
            type="text"
            label="Registering Time"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Registering Time."
            onInput={inputHandler}
            initialValue={loadedCourse.registeringTime}
            initialValid={true}
          />
          <Input
            id="schedule"
            element="input"
            type="text"
            label="Schedule"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid schedule."
            onInput={inputHandler}
            initialValue={loadedCourse.schedule}
            initialValid={true}
          />
          <Input
            id="labs"
            element="textarea"
            label="Labs"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid labs."
            onInput={inputHandler}
            initialValue={loadedCourse.labs}
            initialValid={true}
          />
          <Input
            id="passwords"
            element="textarea"
            label="Passwords"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid passwords."
            onInput={inputHandler}
            initialValue={loadedCourse.passwords}
            initialValid={true}
          />
          <Input
            id="users"
            element="textarea"
            label="Users"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid users."
            onInput={inputHandler}
            initialValue={loadedCourse.users}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE COURSE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateCourse;
