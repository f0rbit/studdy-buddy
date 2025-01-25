import { createContext, useState } from 'react'
import Dashboard from './pages/dashboard'
import Notes from './pages/notes'

// uni courses
const default_courses = [
  {
    id: 1,
    title: 'Maths 1002',
    last_updated: '2025-01-25 12:00:00',
  },
  {
    id: 2,
    title: 'Comp Sci 1002',
    last_updated: '2025-01-25 14:00:00',
  },
];

const default_notes = [
  {
    id: 1,
    title: 'Maths 1002',
    last_updated: '2025-01-25 12:00:00',
    course_id: 1,
    text: "Hi this is note for maths 1002",
  },
  {
    id: 2,
    title: 'Comp Sci 1002',
    last_updated: '2025-01-25 14:00:00',
    course_id: 2,
    text: "Hi this is note for comp sci 1002"
  },
];

// create a context for courses and notes
export const AppData = createContext();

function App() {
  const [courses, setCourses] = useState(default_courses);
  const [notes, setNotes] = useState(default_notes);
  const [page, setPage] = useState('dashboard');
  const [selected_course, setSelectedCourse] = useState(1);
  const [selected_note, setSelectedNote] = useState(1);

  const updateNote = (id, new_note) => {
    const updated_notes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...new_note };
      } else {
        return note;
      }
    });
    setNotes(updated_notes);
  };

  return (
    <AppData.Provider value={{ courses, notes, page, selected_course, selected_note, setSelectedNote, setCourses, setNotes, setPage, setSelectedCourse, updateNote }}>
      {page === 'dashboard' ? <Dashboard /> : <Notes />}
    </AppData.Provider>
  );
}

export default App;
