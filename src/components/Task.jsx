import React from 'react';

// Task component displays individual task details and provides edit and remove functionality.
const Task = ({ task, editTask, removeTask }) => {
  return (
    <div className="task">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Assigned To: {task.assignedTo}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => editTask(task.id)}>Edit</button>
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </div>
  );
};

export default Task;
