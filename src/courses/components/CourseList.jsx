import React, { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import CourseItem from './CourseItem'
import { style } from '../../shared/styles/styles'
import './CourseList.css'

const CourseList = (props) => {
  const auth = useContext(AuthContext)

  if (props.items.length === 0) {
    return (
      <div className="course-list center">
        <Card>
          <h2>No courses found.</h2>
          {auth.isAdmin && <Button to="/courses/new">New Course</Button>}
        </Card>
      </div>
    )
  }

  return (
    <ul className="course-list">
      {props.showAllCourses ? (
        <>
          {props.items.map((course) => (
            <CourseItem
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              creatorId={course.creator}
              onDelete={props.onDeleteCourse}
              users={course.users}
              userId={props.userId}
            />
          ))}
        </>
      ) : (
        <>
          <h3 style={style.mycourses}>User '{props.userName}' Courses</h3>
          {props.items.map((course) => (
            <CourseItem
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              labs={course.labs}
              creatorId={course.creator}
              onDelete={props.onDeleteCourse}
              users={course.users}
              userId={props.userId}
            />
          ))}
        </>
      )}
    </ul>
  )
}

export default CourseList
