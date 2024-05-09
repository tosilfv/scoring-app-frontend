import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'
import MainNavigation from './shared/components/Navigation/MainNavigation'

const AllCourses = React.lazy(() => import('./courses/pages/AllCourses'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const NewCourse = React.lazy(() => import('./courses/pages/NewCourse'))
const UpdateCourse = React.lazy(() => import('./courses/pages/UpdateCourse'))
const UserCourses = React.lazy(() => import('./courses/pages/UserCourses'))
const Users = React.lazy(() => import('./user/pages/Users'))
const Profile = React.lazy(() => import('./user/pages/Profile'))

const App = () => {
  const { token, login, logout, userId, isAdmin, userName } = useAuth()

  let routes

  if (token) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/:userId/courses" element={<UserCourses />} />
        <Route exact path="/courses/all" element={<AllCourses />} />
        <Route exact path="/courses/new" element={<NewCourse />} />
        <Route exact path="/courses/:courseId" element={<UpdateCourse />} />
        <Route path="*" element={<AllCourses />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<AllCourses />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin: isAdmin,
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
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
