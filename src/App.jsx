import { createContext, useState } from 'react'
import './App.css'

// uni courses
const courses = [
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

const notes = [
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
  const [courses, setCourses] = useState(courses);
  const [notes, setNotes] = useState(notes);

  return (
    <AppData.Provider value={{ courses, notes, setCourses, setNotes }}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.jsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </AppData.Provider>
  );
}

export default App;
