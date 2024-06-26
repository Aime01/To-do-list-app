import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasksFromStorage, saveTasksToStorage } from './utils/storage';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';

const App = () => {
  // Initialize the tasks state as an empty array.
  const [tasks, setTasks] = useState([]);

  // Effect to load tasks from local storage when the component mounts.
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
      setTasks(storedTasks); // Set tasks state with tasks fetched from local storage.
    }
  }, []);

  // Effect to save tasks to local storage whenever tasks state changes.
  useEffect(() => {
    if (Array.isArray(tasks)) {
      saveTasksToStorage(tasks); // Save tasks to local storage.
    }
  }, [tasks]);

  // Function to add a new task to the tasks state.
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4(), isEditing: false }]); // Add new task with unique ID.
  };

  // Function to remove a task from the tasks state.
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Filter out the task to remove.
  };

  // Function to sort tasks by a given field.
  const sortTasks = (field) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[field] > b[field]) return 1; // Sort tasks in ascending order.
      if (a[field] < b[field]) return -1;
      return 0;
    });
    setTasks(sortedTasks); // Update tasks state with sorted tasks.
  };

  // Function to filter tasks by status.
  const filterTasks = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status); // Filter tasks by status.
    setTasks(filteredTasks); // Update tasks state with filtered tasks.
  };


  const setIsEditing=(id, isEditing)=>{
    const result = tasks.map(task =>{
      if(task.id === id){
       task.isEditing = isEditing;
       return task;
      }
      return task;
    })
    setTasks(result);
  }

  const editTargetTask=(id, e)=>{
    const result = tasks.map(task =>{
      if(task.id === id){
        task[e.target.name]=e.target.value;
        return task;
      }
      return task
    })
    setTasks(result);
  }
  // Render the application UI.
  return (
    <div className="App">
      <Header /> {/* Render the header component */}
      <TaskForm addTask={addTask} /> {/* Render the task form component */}
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        sortTasks={sortTasks}
        filterTasks={filterTasks}
        setIsEditing={setIsEditing}
        editTargetTask={editTargetTask}
      /> {/* Render the task list component */}
       {/* Render the fetched data at the bottom of the page */}
      <Footer/>
    </div>
  );
};

export default App;
