import React from "react";
import { useParams } from "react-router-dom";

import CourseList from "../components/CourseList";

const DUMMY_COURSES = [
  {
    id: "c1",
    name: "Course One",
    code: "123456ABCDE",
    credits: "5",
    registeringTime: "registeringTime",
    schedule: "schedule",
    user: "u1",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
  {
    id: "c2",
    name: "Course Two",
    code: "789012FGHIJ",
    credits: "3",
    registeringTime: "registeringTime",
    schedule: "schedule",
    user: "u1",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
];

const UserCourses = () => {
  const userId = useParams().userId;
  const loadedCourses = DUMMY_COURSES.filter(
    (course) => course.user === userId
  );
  return <CourseList items={loadedCourses} />;
};

export default UserCourses;
