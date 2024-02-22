import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewCourse from "./courses/pages/NewCourse";
import Users from "./user/pages/Users";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="/courses/new" element={<NewCourse />} />
        </Routes>
        <Navigate to="/" />
      </main>
    </Router>
  );
}

export default App;
