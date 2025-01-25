import { useContext } from 'react';
import { AppData } from '../App';

const Sidebar = ({ notes }) => {
  const { setPage, courses, selected_course, selected_note, addNote, setSelectedNote, updateNote } = useContext(AppData);
  const [isExpanded, setIsExpanded] = useState(true);

  const selectedCourse = courses.find(course => course.id === selected_course);

    // TODO: this isn't used?
  const updateLink = (id, newTitle) => {
    updateNote(id, { title: newTitle });
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar__header">
        {isExpanded && (
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
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        
        <div className="sidebar__title">
          {isExpanded && (selectedCourse?.title || 'No course selected')}
        </div>

        {isExpanded ? (
          <button 
            onClick={() => setIsExpanded(false)}
            className="sidebar__shrink-button"
            title="Collapse sidebar"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#4a4a4a" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="sidebar__expand-button"
            title="Expand sidebar"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#4a4a4a" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 19l7-7-7-7"/>
            </svg>
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="sidebar__links">
          {links.map(link => (
            <div key={link.id} className="sidebar__link-item">
              {editingId === link.id ? (
                <input
                  autoFocus
                  className="sidebar__link-input"
                  defaultValue={link.title}
                  onBlur={(e) => updateLink(link.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateLink(link.id, e.target.value);
                    }
                  }}
                />
              ) : (
                <>
                  <button
                    onClick={() => setPage('notes')}
                    className="sidebar__link-button"
                  >
                    {link.title}
                  </button>
                  <button
                    onClick={() => setEditingId(link.id)}
                    className="sidebar__edit-button"
                  >
                    ✎
                  </button>
                </>
              )}
            </div>
          ))}
          <div className="sidebar__link-item">
            <button
              onClick={addNewLink}
              className="sidebar__link-button sidebar__add-button"
            >
              Add Link
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
