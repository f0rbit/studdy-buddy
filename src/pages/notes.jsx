import { useContext } from "react";
import { AppData } from "../App";
import { TextEditor } from "../components/text_editor";

import Sidebar from "../components/sidebar";

export default function Notes() {
  const { notes, selected_course, selected_note } = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);
  const editing_note = using_notes.find((note) => note.id === selected_note) ?? null;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar notes={using_notes} />
      <TextEditor note={editing_note} />
    </div>
  );
}   
