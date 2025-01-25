import { useState, useContext } from "react";
import { AppData } from "../App";
import { Pencil } from "./sidebar";

export default function CourseCard({ course }) {
  const { notes, setPage, setSelectedCourse, setSelectedNote, deleteCourse, updateCourseTitle } = useContext(AppData);
  
  const [isEditing, setIsEditing] = useState(false);  // Track whether we're editing the title
  const [newTitle, setNewTitle] = useState(course.title);  // Store the new title

  const course_notes = notes.filter(note => note.course_id === course.id);
  const sorted_notes = course_notes.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));

  const openCourse = (e) => {
    e.stopPropagation();
    setPage('notes');
    setSelectedCourse(course.id)
    if (sorted_notes.length > 0) {
      setSelectedNote(sorted_notes[0].id);
    }
  }

  const openNote = (e, note_id) => {
    e.stopPropagation();
    setPage('notes');
    setSelectedCourse(course.id)
    setSelectedNote(note_id);
  }

  function handleDelete(event) {
    event.stopPropagation();  // Prevent triggering the onClick handler for navigation
    const confirmDelete = window.confirm(`Are you sure you want to delete ${course.title}?`);
    if (confirmDelete) {
      deleteCourse(course.id);  // Proceed with delete if confirmed
    }
  }

  function handleEditToggle(event) {
    event.stopPropagation();
	if (isEditing) {
		handleSave();
	} else {
		setIsEditing(true);
	}
  }

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }

  function handleSave() {
    updateCourseTitle(course.id, newTitle);
    setIsEditing(false);
  }

  const recent_3 = sorted_notes.slice(0, 3);



  return (
    <div className="course-card" onClick={openCourse}>
      <div className="course-card-header">
        {isEditing ? (
          <input 
            type="text" 
            value={newTitle} 
            onChange={handleTitleChange} 
			onBlur={handleSave}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleSave();
				}
			}}
            className="edit-course-input" 
            autoFocus
          />
        ) : (
          <h1 className="course-title">
            <a 
              role="button" 
              onClick={openCourse}
            >
              {course.title}
            </a>
          </h1>
        )}
		<a role="button" onClick={handleEditToggle} style={{display: isEditing ? 'none' : 'block'}}>
			<Pencil />
		</a>
      </div>
      <div className="course-notes">
        {recent_3.map((note) => (
          <a role="button" onClick={(e) => openNote(e, note.id)} key={note.id}>
            {note.title}
          </a>
        ))}
      </div>
	  <a role="button" onClick={handleDelete} className="delete-button">
		<Trash />
		</a> 
    </div>
  );
}


function Trash() {
	return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
}