import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import CourseItem from "./CourseItem";
import "./CourseList.css";

const CourseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="course-list center">
        <Card>
          <h2>No courses were found.</h2>
          <Button to="/courses/new">Create Course</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="course-list">
      {props.items.map((course) => (
        <CourseItem
          key={course.id}
          id={course.id}
          userId={course.user}
          name={course.name}
          code={course.code}
          description={course.description}
          credits={course.credits}
          registeringTime={course.registeringTime}
          schedule={course.schedule}
          labs={course.labs}
          passwords={course.passwords}
          users={course.users}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default CourseList;
