import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import Authenticate from "./user/pages/Authenticate";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewCourse from "./courses/pages/NewCourse";
import UpdateCourse from "./courses/pages/UpdateCourse";
import UserCourses from "./courses/pages/UserCourses";
import Users from "./user/pages/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/:userId/courses" element={<UserCourses />} />
        <Route exact path="/courses/new" element={<NewCourse />} />
        <Route exact path="/courses/:courseId" element={<UpdateCourse />} />
        <Route path="*" element={<Users />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/:userId/courses" element={<UserCourses />} />
        <Route exact path="/auth" element={<Authenticate />} />
        <Route path="*" element={<Authenticate />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
