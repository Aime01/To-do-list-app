import React from 'react';
import Task from './Task';

// TaskList component displays a list of tasks.
const TaskList = ({ tasks, removeTask, setIsEditing, editTargetTask, handleOnSortChange,handleOnFilterChange }) => {
  // Check if tasks is an array before mapping.
  if (!Array.isArray(tasks)) {
    return null; // or you can return some fallback UI.
  }

  return (
    <div className="task-list">
      {/* Render sort and filter controls */}
      <div className="controls">
        <p>Sort by status:</p>
        <select
            name="sort"
            onChange={(e)=>handleOnSortChange(e.target.value)}
        >
          <option value="all">All tasks</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="review">Review</option>
        </select>
      </div>

      {/* Map over tasks and render each one using the Task component */}
      {tasks.map(task => (
          <Task key={task.id} task={task} removeTask={removeTask} setIsEditing={setIsEditing}
                editTargetTask={editTargetTask}/>
      ))}
    </div>
  );
};

export default TaskList;
