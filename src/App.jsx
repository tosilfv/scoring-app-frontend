import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

const Users = React.lazy(() => import('./user/pages/Users'))
const NewCourse = React.lazy(() => import('./courses/pages/NewCourse'))
const UserCourses = React.lazy(() => import('./courses/pages/UserCourses'))
const UpdateCourse = React.lazy(() => import('./courses/pages/UpdateCourse'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()

  let routes

  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/:userId/courses" element={<UserCourses />} />
        <Route exact path="/courses/new" element={<NewCourse />} />
        <Route exact path="/courses/:courseId" element={<UpdateCourse />} />
        <Route path="*" element={<Users />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/:userId/courses" element={<UserCourses />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
