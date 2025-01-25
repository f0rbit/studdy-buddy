import { useContext } from "react";
import { AppData } from "../App";


export default function CourseCard({ course }) {
  const { setPage, setSelectedCourse } = useContext(AppData);

  function handleClick() {
    setPage('notes');
    setSelectedCourse(course.id);
  }



  return (
    <div className="course-card" onClick={handleClick}>
      <h1 className="course-title">
        <a role="button" onClick={(e) => {
          e.stopPropagation();
          handleClick()
          setPage('notes'); // TALK TO CAM ABOUT NOTES PAGE SPECIFICS
          setSelectedCourse(course.id);
        }}>
          {course.title}
        </a>
      </h1>
      <p className="course-updated">{course.last_updated}</p>
    </div>
  );
}
