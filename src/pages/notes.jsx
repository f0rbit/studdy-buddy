import { useContext } from "react";
import { AppData } from "../App";
// notes page

export default function Notes() {
  const { notes, selected_course, setPage } = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);

  return (
    <div>
      <a role="button" onClick={() => setPage('dashboard')}>Back</a>
      <h1>Notes</h1>
      <ul>
        {using_notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}   
