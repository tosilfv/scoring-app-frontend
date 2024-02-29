import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import Authenticate from "./user/pages/Authenticate";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewCourse from "./courses/pages/NewCourse";
import UpdateCourse from "./courses/pages/UpdateCourse";
import UserCourses from "./courses/pages/UserCourses";
import Users from "./user/pages/Users";

const style = {
  main: {
    fontFamily: "Love Ya Like A Sister",
    letterSpacing: 3,
    margin: 10,
  },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
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
        <Route exact path="/auth" element={<Authenticate />} />
        <Route path="*" element={<Authenticate />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main style={style.main}>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
