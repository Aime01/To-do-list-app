import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks } from './utils/api';
import { getTasksFromStorage, saveTasksToStorage } from './utils/storage';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  // Initialize the tasks state as an empty array.
  const [tasks, setTasks] = useState([]);

  // Effect to load tasks from the API when the component mounts.
  useEffect(() => {
    const loadTasks = async () => {
      const apiTasks = await fetchTasks();
      setTasks(apiTasks); // Set tasks state with tasks fetched from the API.
    };
    loadTasks();
  }, []);

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

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch('https://onlineprojectsgit.github.io/API/WDEndpoint.json')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error(error));
  }, []);
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
      {apiData && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '20px', borderRadius: '5px' }}>
        <h2 style={{ color: '#007bff', borderBottom: '1px solid #ccc' }}>API Data:</h2>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}  

    </div>
  );
};

export default App;
