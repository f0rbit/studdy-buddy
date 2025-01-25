
// notes page


export default function Notes({ selected_course }) {
  const [notes] = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {using_notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
