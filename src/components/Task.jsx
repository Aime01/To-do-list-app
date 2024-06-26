import React, {useState} from 'react';

// Task component displays individual task details and provides edit and remove functionality.
const Task = ({ task, removeTask , editTargetTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(task);

    const handleChange=(e)=>{
        const newTask = {...task};
        newTask[e.target.name] = e.target.value;
        setTaskToEdit(newTask)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        editTargetTask(task.id, taskToEdit);
        setIsEditing(false)
    }

    if(isEditing) {
        return <form onSubmit={handleSubmit}>
            <h3>Edit Task:</h3>
            <input
                type="text"
                name="name"
                value={taskToEdit.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={taskToEdit.description}
                onChange={handleChange}
                required
            ></textarea>
            <input
                type="date"
                name="dueDate"
                value={taskToEdit.dueDate}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="assignedTo"
                value={taskToEdit.assignedTo}
                onChange={handleChange}
                required
            />
            <select
                name="status"
                value={taskToEdit.status}
                onChange={handleChange}
                required
            >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="review">Review</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => {
                setTaskToEdit(task);
                setIsEditing(false)
            }}>Cancel</button>
        </form>
    }
    return (
        <div className="task">
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Status: {task.status}</p>
            <button style={{marginRight:'1rem'}} onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
        </div>
    );
};

export default Task;
