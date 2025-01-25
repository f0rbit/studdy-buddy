

export default function CourseCard({ course }) {
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.last_updated}</p>
    </div>
  );
}
