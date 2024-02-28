import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import "./CourseForm.css";

const NewCourse = () => {
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

  const courseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="course-form" onSubmit={courseSubmitHandler}>
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
        errorText="Please enter a valid description (at least 5 characters)."
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
  );
};

export default NewCourse;
