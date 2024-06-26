import React, { useState } from 'react';

// TaskForm component handles the creation of new tasks.
const TaskForm = ({ addTask }) => {
  // State to manage task input values.
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    status: 'in-progress',
    isEditing: false
  });

  // Handle input changes and update state accordingly.
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields before adding the task.
    if (task.name && task.description && task.dueDate && task.assignedTo) {
      addTask(task);
      // Reset form fields after submission.
      setTask({
        name: '',
        description: '',
        dueDate: '',
        assignedTo: '',
        status: 'in-progress'
      });
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleChange} required></textarea>
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      <input type="text" name="assignedTo" placeholder="Assigned To" value={task.assignedTo} onChange={handleChange} required />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="review">Review</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
