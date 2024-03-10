import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./CourseForm.css";

const NewCourse = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const courseSubmitHandler = async (event) => {
    console.log(auth);
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/courses",
        "POST",
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
          user: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="course-form" onSubmit={courseSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Course Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="code"
          element="input"
          type="text"
          label="Course code"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid code."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description of at least 5 characters."
          onInput={inputHandler}
        />
        <Input
          id="credits"
          element="input"
          type="text"
          label="Credits"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid credits."
          onInput={inputHandler}
        />
        <Input
          id="registeringTime"
          element="input"
          type="text"
          label="Registering Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Registering Time."
          onInput={inputHandler}
        />
        <Input
          id="schedule"
          element="input"
          type="text"
          label="Schedule"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid schedule."
          onInput={inputHandler}
        />
        <Input
          id="labs"
          element="textarea"
          label="Labs"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid labs."
          onInput={inputHandler}
        />
        <Input
          id="passwords"
          element="textarea"
          label="Passwords"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid passwords."
          onInput={inputHandler}
        />
        <Input
          id="users"
          element="textarea"
          label="Users"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid users."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD COURSE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewCourse;
