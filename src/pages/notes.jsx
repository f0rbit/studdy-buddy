import { useContext } from "react";
import { AppData } from "../App";
import Sidebar from "../components/sidebar";

export default function Notes() {
  const { notes, selected_course } = useContext(AppData);
  const using_notes = notes.filter((note) => note.course_id === selected_course);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ 
        marginLeft: '250px', 
        padding: '20px',
        width: 'calc(100% - 250px)'
      }}>
        <h1>Notes</h1>
        <ul>
          {using_notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}