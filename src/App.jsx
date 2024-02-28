import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authenticate from "./user/pages/Authenticate";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewCourse from "./courses/pages/NewCourse";
import UpdateCourse from "./courses/pages/UpdateCourse";
import UserCourses from "./courses/pages/UserCourses";
import Users from "./user/pages/Users";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="/auth" element={<Authenticate />} />
          <Route exact path="/:userId/courses" element={<UserCourses />} />
          <Route exact path="/courses/new" element={<NewCourse />} />
          <Route exact path="/courses/:courseId" element={<UpdateCourse />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
