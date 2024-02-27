import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./CourseItem.css";

const CourseItem = (props) => {
  return (
    <li className="course-item">
      <Card className="course-item__content">
        <div className="course-item__info">
          <h2>{props.name}</h2>
          <h3>{props.code}</h3>
          <h3>{props.description}</h3>
          <h3>{props.credits}</h3>
          <h3>{props.registeringTime}</h3>
          <h3>{props.schedule}</h3>
          <p>{props.labs}</p>
          <p>{props.passwords}</p>
          <p>{props.users}</p>
        </div>
        <div className="course-item__actions">
          <Button inverse>JOIN COURSE</Button>
          <Button to={`/courses/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default CourseItem;
