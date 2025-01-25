import { AppData } from "../App";
import CourseCard from "../components/course_card";
import { useContext } from "react";

// dashboard page
export default function Dashboard() {
  const { courses, addCourse, deleteCourse } = useContext(AppData);

  const handleAddCourse = () => {
    const newCourse = {
      id: courses.length + 1,  // Assign a new unique ID
      title: `New Course ${courses.length + 1}`,
      last_updated: new Date().toISOString(),
    };
    addCourse(newCourse);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Studdy Buddy</h1>
      <button onClick={handleAddCourse}>Add Course</button>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onDelete={deleteCourse} />
        ))}
      </div>
    </div>
  );
}