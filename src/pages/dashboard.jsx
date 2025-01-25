import { AppData } from "../App";
import CourseCard from "../components/course_card";

// dashboard page


export default function Dashboard() {
  const [courses, notes] = useContext(AppData);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Courses</p>
      <ul>
        {courses.map((course) => (
          <CourseCard course={course} />
        ))}
      </ul>
      <p>Notes</p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

