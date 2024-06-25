// Retrieve tasks from local storage.
export const getTasksFromStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
  // Save tasks to local storage.
  export const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  