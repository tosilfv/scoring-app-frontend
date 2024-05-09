import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import CourseList from '../components/CourseList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const UserCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState()
  const [userName, setUserName] = useState('')
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const userId = useParams().userId

  useEffect(() => {
    const fetchCourses = async () => {
      let responseData
      try {
        responseData = await sendRequest(
          process.env.VITE_BACKEND_URL + `/courses/user/${userId}`
        )
      } catch (err) {
        /* continue regardless of error */
      }
      responseData && setLoadedCourses(responseData.courses)
      responseData && setUserName(responseData.user.name)
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
      {!isLoading && loadedCourses && auth.isLoggedIn && (
        <CourseList
          showAllCourses={false}
          items={loadedCourses}
          onDeleteCourse={courseDeletedHandler}
          userId={userId}
          userName={userName}
        />
      )}
    </React.Fragment>
  )
}

export default UserCourses
