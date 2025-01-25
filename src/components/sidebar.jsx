import { useContext, useState, useEffect } from 'react';
import { AppData } from '../App';

const Sidebar = () => {
  const { setPage, courses, selected_course } = useContext(AppData);
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedLinks = localStorage.getItem('sidebarLinks');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  const selectedCourse = courses.find(course => course.id === selected_course);

  const addNewLink = () => {
    const newLink = {
      id: Date.now(),
      title: 'New Link',
      noteId: -1
    };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    localStorage.setItem('sidebarLinks', JSON.stringify(updatedLinks));
    setEditingId(newLink.id);
  };

  const updateLink = (id, newTitle) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, title: newTitle } : link
    );
    setLinks(updatedLinks);
    localStorage.setItem('sidebarLinks', JSON.stringify(updatedLinks));
    setEditingId(null);
  };

  const deleteLink = (id) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    localStorage.setItem('sidebarLinks', JSON.stringify(updatedLinks));
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
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div className="sidebar__title">
          {selectedCourse?.title || 'No course selected'}
        </div>
      </div>

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
                <button
                  onClick={() => deleteLink(link.id)}
                  className="sidebar__delete-button"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addNewLink}
        className="sidebar__add-button"
      >
        + Add Link
      </button>
    </div>
  );
};

export default Sidebar;