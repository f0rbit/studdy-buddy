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
  {
    id: 3,
    title: 'Physics 1002',
    last_updated: '2025-01-25 16:00:00',
  },
  {
    id: 4,
    title: 'Physics 2202',
    last_updated: '2025-01-25 18:00:00',
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

  const addNote = (course_id) => {
    // get the highest note id and add one
    const highest_note_id = notes.reduce((max, note) => Math.max(max, note.id), 0);
    const new_note = {
      id: highest_note_id + 1,
      title: 'New Title',
      last_updated: new Date().toISOString(),
      course_id: course_id,
      text: '',
    };
    setNotes([...notes, new_note]);
    setSelectedNote(new_note.id);
  }

  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourseTitle = (id, newTitle) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, title: newTitle };
      } else {
        return course;
      }
    });
    setCourses(updatedCourses);
  };

  return (
    <AppData.Provider value={{ courses, notes, page, selected_course, selected_note, setSelectedNote, setCourses, setNotes, setPage, setSelectedCourse, updateNote, addNote, addCourse, deleteCourse }}>
      {page === 'dashboard' ? <Dashboard /> : <Notes />}
    </AppData.Provider>
  );
}

export default App;
