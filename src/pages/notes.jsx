import { useContext } from "react";
import { AppData } from "../App";
import { TextEditor } from "../components/text_editor";

// notes page

export default function Notes() {
  const { notes, selected_course, selected_note, setPage } = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);
  const editing_note = using_notes.find((note) => note.id === selected_note) ?? null;

  return (
    <div>
      <a style={{ position: "absolute", left: "5px", top: "5px" }} role="button" onClick={() => setPage('dashboard')}>Back</a>
      <div style={{ marginBottom: "50px" }} />
      <TextEditor note={editing_note} />
    </div>
  );
}

