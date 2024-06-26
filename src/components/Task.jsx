import React from 'react';

// Task component displays individual task details and provides edit and remove functionality.
const Task = ({ task, removeTask, setIsEditing , editTargetTask}) => {
    const handleSubmit=()=>{
        setIsEditing(task.id, false)
    }
    const handleChange = (e) => {
        editTargetTask(task.id, e)
    };
    if(task.isEditing) {
        return <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={task.name}
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
            ></textarea>
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
            />
            <input
                type="text"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
            />
            <select
                name="status"
                value={task.status}
                onChange={handleChange}
            >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="review">Review</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(task.id, false)}>Cancel</button>
        </form>
    }
    return (
        <div className="task">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => setIsEditing(task.id, true)}>Edit</button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
        </div>
    );
};

export default Task;
