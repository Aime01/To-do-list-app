import React from 'react';
import Task from './Task';

// TaskList component displays a list of tasks.
const TaskList = ({ tasks, removeTask, sortTasks, filterTasks, setIsEditing, editTargetTask }) => {
  // Check if tasks is an array before mapping.
  if (!Array.isArray(tasks)) {
    return null; // or you can return some fallback UI.
  }

  return (
    <div className="task-list">
      {/* Render sort and filter controls */}
      <div className="controls">
        <button onClick={() => sortTasks('status')}>Sort by Status</button>
        <button onClick={() => sortTasks('dueDate')}>Sort by Due Date</button>
        <button onClick={() => filterTasks('in-progress')}>Filter In Progress</button>
        <button onClick={() => filterTasks('completed')}>Filter Completed</button>
        <button onClick={() => filterTasks('review')}>Filter Review</button>
      </div>
      
      {/* Map over tasks and render each one using the Task component */}
      {tasks.map(task => (
        <Task key={task.id} task={task} removeTask={removeTask} setIsEditing={setIsEditing} editTargetTask={editTargetTask}/>
      ))}
    </div>
  );
};

export default TaskList;
