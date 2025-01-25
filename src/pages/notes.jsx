import { useContext, useState } from "react";
import { AppData } from "../App";
// notes page

export default function Notes() {
  const { notes, selected_course, selected_note, setPage } = useContext(AppData);

  const using_notes = notes.filter((note) => note.course_id === selected_course);

  const editing_note = using_notes.find((note) => note.id === selected_note) ?? null;

  return (
    <div>
      <a style={{ position: "absolute", left: "5px", top: "5px" }} role="button" onClick={() => setPage('dashboard')}>Back</a>
      <div style={{ marginBottom: "50px" }} />
      <Editor note={editing_note} />
    </div>
  );
}
function Editor({ note }) {
  const { updateNote } = useContext(AppData);
  const [edit_title, setEditTitle] = useState(false);
  const [title_text, setTitleText] = useState(note?.title || "");

  if (!note) {
    return <p>Select a note to edit</p>;
  }

  const handleTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleTitleSave = () => {
    setEditTitle(false);
    // Save logic here (e.g., updating the context or sending data to the server)
    console.log("Title saved:", title_text);
    updateNote(note.id, { title: title_text });
  };

  return (
    <div>
      {/* Editable Title */}
      <div className="note-title">
        {edit_title ? (
          <input
            type="text"
            value={title_text}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTitleSave();
              }
            }}
            autoFocus
          />
        ) : (
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => setEditTitle(true)}
          >
            {title_text}
          </h1>
        )}
      </div>

      {/* Note Text */}
      <p>{note.text}</p>
    </div>
  );
}
