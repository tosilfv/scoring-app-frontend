import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
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
  const courseId = useParams().courseId;

  const identifiedCourse = DUMMY_COURSES.find((c) => c.id === courseId);

  if (!identifiedCourse) {
    return (
      <div className="center">
        <h2>Could not find a course!</h2>
      </div>
    );
  }

  return (
    <form className="course-form">
      <Input
        id="name"
        element="input"
        type="text"
        label="Course Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={() => {}}
        value={identifiedCourse.name}
        valid={true}
      />
      <Input
        id="code"
        element="input"
        type="text"
        label="Course code"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid code."
        onInput={() => {}}
        value={identifiedCourse.code}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={() => {}}
        value={identifiedCourse.description}
        valid={true}
      />
      <Input
        id="credits"
        element="input"
        type="text"
        label="Credits"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid credits."
        onInput={() => {}}
        value={identifiedCourse.credits}
        valid={true}
      />
      <Input
        id="registeringTime"
        element="input"
        type="text"
        label="Registering Time"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Registering Time."
        onInput={() => {}}
        value={identifiedCourse.registeringTime}
        valid={true}
      />
      <Input
        id="schedule"
        element="input"
        type="text"
        label="Schedule"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid schedule."
        onInput={() => {}}
        value={identifiedCourse.schedule}
        valid={true}
      />
      <Input
        id="labs"
        element="textarea"
        label="Labs"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid labs."
        onInput={() => {}}
        value={identifiedCourse.labs}
        valid={true}
      />
      <Input
        id="passwords"
        element="textarea"
        label="Passwords"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid passwords."
        onInput={() => {}}
        value={identifiedCourse.passwords}
        valid={true}
      />
      <Input
        id="users"
        element="textarea"
        label="Users"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid users."
        onInput={() => {}}
        value={identifiedCourse.users}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE COURSE
      </Button>
    </form>
  );
};

export default UpdateCourse;
