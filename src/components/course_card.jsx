import { useState, useContext } from "react";
import { AppData } from "../App";

export default function CourseCard({ course }) {
  const { setPage, setSelectedCourse, deleteCourse, updateCourseTitle } = useContext(AppData);
  
  const [isEditing, setIsEditing] = useState(false);  // Track whether we're editing the title
  const [newTitle, setNewTitle] = useState(course.title);  // Store the new title

  function handleClick() {
    setPage('notes');
    setSelectedCourse(course.id);
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
    setIsEditing(prev => !prev);
  }

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }

  function handleSave() {
    updateCourseTitle(course.id, newTitle);
    setIsEditing(false);
  }

  return (
    <div className="course-card" onClick={handleClick}>
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation on title click
                handleClick(); // Go to notes page
              }}
            >
              {course.title}
            </a>
          </h1>
        )}
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <p className="course-updated">{course.last_updated}</p>
      <button onClick={handleDelete} className="delete-button">Delete</button>  {/* Delete button */}
    </div>
  );
}
