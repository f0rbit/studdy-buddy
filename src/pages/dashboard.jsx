import { AppData } from "../App";
import CourseCard from "../components/course_card";
import { useContext } from "react";

// dashboard page


export default function Dashboard() {
  const { courses, notes } = useContext(AppData);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Studdy Buddy</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

