import { useContext } from 'react';
import { AppData } from '../App';

const Sidebar = ({ notes }) => {
  const { setPage, courses, selected_course, selected_note, addNote, setSelectedNote, updateNote } = useContext(AppData);

  const selectedCourse = courses.find(course => course.id === selected_course);

  // TODO: this isn't used?
  const updateLink = (id, newTitle) => {
    updateNote(id, { title: newTitle });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <button
          onClick={() => setPage('dashboard')}
          className="sidebar__back-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4a4a4a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="sidebar__title">
          {selectedCourse?.title || 'No course selected'}
        </div>
      </div>

      <div className="sidebar__links">
        {notes.map(({ id, title }) => (
          <div key={id} className="sidebar__link-item">
            <a role="button" onClick={() => setSelectedNote(id)} className={selected_note === id ? 'selected' : ''}>
              {title}
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={() => addNote(selected_course)}
        className="sidebar__add-button"
      >
        + Add Note
      </button>
    </div>
  );
};

export default Sidebar;
