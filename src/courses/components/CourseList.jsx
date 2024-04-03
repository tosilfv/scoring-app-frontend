import React from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import CourseItem from './CourseItem'
import './CourseList.css'

const CourseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="course-list center">
        <Card>
          <h2>No courses found.</h2>
          <Button to="/courses/new">New Course</Button>
        </Card>
      </div>
    )
  }

  return (
    <ul className="course-list">
      {props.items.map((course) => (
        <CourseItem
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          labs={course.labs}
          creatorId={course.creator}
          onDelete={props.onDeleteCourse}
        />
      ))}
    </ul>
  )
}

export default CourseList
