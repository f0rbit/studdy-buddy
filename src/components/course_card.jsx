import { useState, useContext } from "react";
import { AppData } from "../App";

export default function CourseCard({ course }) {
  const { notes, setPage, setSelectedCourse, setSelectedNote, deleteCourse, updateCourseTitle } = useContext(AppData);

  const course_notes = notes.filter(note => note.course_id === course.id);
  const sorted_notes = course_notes.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
  
  const [isEditing, setIsEditing] = useState(false);  // Track whether we're editing the title
  const [newTitle, setNewTitle] = useState(course.title);  // Store the new title

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



  return (
    <div className="course-card" onClick={openCourse}>
      <div className="course-card-header">
        {isEditing ? (
          <input 
            type="text" 
            value={newTitle} 
            onChange={handleTitleChange} 
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
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="course-notes">
        {recent_3.map((note) => (
          <a role="button" onClick={(e) => openNote(e, note.id)} key={note.id}>
            {note.title}
          </a>
        ))}
      </div>
	  <button onClick={handleDelete} className="delete-button">Delete</button> 
    </div>
  );
}
