import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useParams } from 'react-router-dom'
import CourseList from '../components/CourseList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const UserCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const userId = useParams().userId

  useEffect(() => {
    const fetchCourses = async () => {
      let responseData
      try {
        responseData = await sendRequest(
          process.env.VITE_BACKEND_URL + `/courses/user/${userId}`
        )
      } catch (err) {
        console.log('err UserCourses: ', err)
      }
      responseData && setLoadedCourses(responseData.courses)
    }
    fetchCourses()
  }, [sendRequest, userId])

  const courseDeletedHandler = (deletedCourseId) => {
    setLoadedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== deletedCourseId)
    )
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCourses && (
        <CourseList
          items={loadedCourses}
          onDeleteCourse={courseDeletedHandler}
        />
      )}
    </React.Fragment>
  )
}

export default UserCourses
