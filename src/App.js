import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import {fetchData} from './utils/api';
import { getTasksFromStorage, saveTasksToStorage } from './utils/storage';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';

const App = () => {
  const [course, setCourse]=useState();
  // Initialize the tasks state as an empty array.
  const [totalTasks, setTotalTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState(totalTasks)
  // Effect to load tasks from the API when the component mounts.
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setCourse(data);
    };
    loadData();
  }, []);

  // Effect to load tasks from local storage when the component mounts.
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
      setTotalTasks(storedTasks);
      setDisplayTasks(storedTasks);
    }
  }, []);

  // Function to add a new task to the tasks state.
  const addTask = (task) => {
    const totalTasksToStore = [...displayTasks, { ...task, id: uuidv4(), isEditing: false }]
    setTotalTasks(totalTasksToStore); // Add new task with unique ID.
    setDisplayTasks(totalTasksToStore);
    saveTasksToStorage(totalTasksToStore);
  };

  // Function to remove a task from the tasks state.
  const removeTask = (id) => {
    const tasksAfterRemove = displayTasks.filter(task => task.id !== id);
    setTotalTasks(tasksAfterRemove); // Filter out the task to remove.
    setDisplayTasks(tasksAfterRemove);
    saveTasksToStorage(tasksAfterRemove);
  };

  const handleOnSortChange=(status)=>{
    if(status==='all') {
      setDisplayTasks(totalTasks);
    } else {
      const filteredTasks = totalTasks.filter(task => task.status === status); // Filter tasks by status.
      setDisplayTasks(filteredTasks);
    }
  }

  const editTargetTask=(id, editedTask)=>{
    const result = displayTasks.map(task =>{
      if(task.id === id){
        return editedTask;
      }
      return task
    })
    setDisplayTasks(result);
    setTotalTasks(result);
  }
  const renderData=(value)=>{
    return <div>
      <p>Welcome to {value.info.Name}</p>
      <p>The course ID is {value.info.id}</p>
      <p>The course is taught by <strong>{value.info.instructor.name}</strong> starts from {value.info.Start} to {value.info.End}</p>
      <p>Students enrolled in this course are:</p>
      <ul>
        {value.info.students.map(student=>{
          return <li>{student}</li>
        })}
      </ul>
    </div>
  }
  // Render the application UI.
  return (
    <div className="App">
      <Header /> {/* Render the header component */}
      {course && renderData(course)}
      <TaskForm addTask={addTask} /> {/* Render the task form component */}
      <TaskList
        tasks={displayTasks}
        removeTask={removeTask}
        editTargetTask={editTargetTask}
        handleOnSortChange={handleOnSortChange}
      />
      <Footer/>
    </div>
  );
};

export default App;
