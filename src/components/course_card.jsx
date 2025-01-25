import { useContext } from "react";
import { AppData } from "../App";


export default function CourseCard({ course }) {
  const { setPage, setSelectedCourse } = useContext(AppData);

  function handleClick() {
    setPage('notes');
    setSelectedCourse(course.id);
  }

  return (
    <div>
      <h1>
        <a role="button" onClick={handleClick}>
          {course.title}
        </a>
      </h1>
      <p>{course.last_updated}</p>
    </div>
  );
}
