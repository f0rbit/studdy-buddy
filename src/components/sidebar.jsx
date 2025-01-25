import { useContext, useState, useEffect } from 'react';
import { AppData } from '../App';

const Sidebar = () => {
  const { setPage, courses, selected_course } = useContext(AppData);
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem('sidebarLinks');
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (error) {
      console.error('Error loading sidebar links:', error);
    }
  }, []);

  const selectedCourse = courses.find(course => course.id === selected_course);

  const updateLocalStorage = (updatedLinks) => {
    try {
      localStorage.setItem('sidebarLinks', JSON.stringify(updatedLinks));
    } catch (error) {
      console.error('Error saving sidebar links:', error);
    }
  };

  const addNewLink = () => {
    const newLink = {
      id: Date.now(),
      title: 'New Link',
      noteId: -1
    };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    updateLocalStorage(updatedLinks);
  };

  const updateLink = (id, newTitle) => {
    if (!newTitle.trim()) return;
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, title: newTitle.trim() } : link
    );
    setLinks(updatedLinks);
    updateLocalStorage(updatedLinks);
    setEditingId(null);
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