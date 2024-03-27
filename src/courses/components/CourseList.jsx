import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import CourseItem from './CourseItem'
import Button from '../../shared/components/FormElements/Button'
import './CourseList.css'

const CourseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="course-list center">
        <Card>
          <h2>No courses found. Maybe create one?</h2>
          <Button to="/courses/new">Share Course</Button>
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
          image={course.image}
          title={course.title}
          description={course.description}
          address={course.address}
          creatorId={course.creator}
          coordinates={course.location}
          onDelete={props.onDeleteCourse}
        />
      ))}
    </ul>
  )
}

export default CourseList
