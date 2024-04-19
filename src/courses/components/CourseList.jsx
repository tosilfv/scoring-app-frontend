import React from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import CourseItem from './CourseItem'
import { style } from '../../shared/styles/styles'
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
    <>
      <ul className="course-list">
        <h2 className="course-list-header" style={style.main}>
          YOUR COURSES
        </h2>
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
      <h2 className="course-list-header" style={style.main}>
        JOIN COURSES
      </h2>
    </>
  )
}

export default CourseList
