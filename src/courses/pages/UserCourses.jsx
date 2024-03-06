import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import CourseList from "../components/CourseList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/courses/user/${userId}`
        );
        setLoadedCourses(responseData.courses);
      } catch (err) {
        console.log("UserCourses useEffect err: ", err);
      }
    };
    fetchCourses();
  }, [sendRequest, userId]);

  const courseDeletedHandler = (deletedCourseId) => {
    setLoadedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== deletedCourseId)
    );
  };

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
  );
};

export default UserCourses;
