import React, { useEffect, useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import "./CourseForm.css";

const DUMMY_COURSES = [
  {
    id: "c1",
    user: "u1",
    name: "Course One",
    code: "123456ABCDE",
    description: "Course one",
    credits: "5",
    registeringTime: "registeringTime",
    schedule: "schedule",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
  {
    id: "c2",
    user: "u1",
    name: "Course Two",
    code: "789012FGHIJ",
    description: "Course two",
    credits: "3",
    registeringTime: "registeringTime",
    schedule: "schedule",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
];

const UpdateCourse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const courseId = useParams().courseId;

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

  const identifiedCourse = DUMMY_COURSES.find((c) => c.id === courseId);

  useEffect(() => {
    if (identifiedCourse) {
      setFormData(
        {
          name: {
            value: identifiedCourse.name,
            isValid: true,
          },
          code: {
            value: identifiedCourse.code,
            isValid: true,
          },
          description: {
            value: identifiedCourse.description,
            isValid: true,
          },
          credits: {
            value: identifiedCourse.credits,
            isValid: true,
          },
          registeringTime: {
            value: identifiedCourse.registeringTime,
            isValid: true,
          },
          schedule: {
            value: identifiedCourse.schedule,
            isValid: true,
          },
          labs: {
            value: identifiedCourse.labs,
            isValid: true,
          },
          passwords: {
            value: identifiedCourse.passwords,
            isValid: true,
          },
          users: {
            value: identifiedCourse.users,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedCourse]);

  const courseUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedCourse) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a course.</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading.</h2>
      </div>
    );
  }

  return (
    <form className="course-form" onSubmit={courseUpdateSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Course Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formState.inputs.name.value}
        initialValid={formState.inputs.name.isValid}
      />
      <Input
        id="code"
        element="input"
        type="text"
        label="Course code"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid code."
        onInput={inputHandler}
        initialValue={formState.inputs.code.value}
        initialValid={formState.inputs.code.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="credits"
        element="input"
        type="text"
        label="Credits"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid credits."
        onInput={inputHandler}
        initialValue={formState.inputs.credits.value}
        initialValid={formState.inputs.credits.isValid}
      />
      <Input
        id="registeringTime"
        element="input"
        type="text"
        label="Registering Time"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Registering Time."
        onInput={inputHandler}
        initialValue={formState.inputs.registeringTime.value}
        initialValid={formState.inputs.registeringTime.isValid}
      />
      <Input
        id="schedule"
        element="input"
        type="text"
        label="Schedule"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid schedule."
        onInput={inputHandler}
        initialValue={formState.inputs.schedule.value}
        initialValid={formState.inputs.schedule.isValid}
      />
      <Input
        id="labs"
        element="textarea"
        label="Labs"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid labs."
        onInput={inputHandler}
        initialValue={formState.inputs.labs.value}
        initialValid={formState.inputs.labs.isValid}
      />
      <Input
        id="passwords"
        element="textarea"
        label="Passwords"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid passwords."
        onInput={inputHandler}
        initialValue={formState.inputs.passwords.value}
        initialValid={formState.inputs.passwords.isValid}
      />
      <Input
        id="users"
        element="textarea"
        label="Users"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid users."
        onInput={inputHandler}
        initialValue={formState.inputs.users.value}
        initialValid={formState.inputs.users.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE COURSE
      </Button>
    </form>
  );
};

export default UpdateCourse;
