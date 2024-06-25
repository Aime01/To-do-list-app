import axios from 'axios';

// Define the new API endpoint
const apiEndpoint = 'https://onlineprojectsgit.github.io/API/WDEndpoint.json';

// Fetch tasks from the new API
export const fetchTasks = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    if (Array.isArray(response.data.tasks)) {
      return response.data.tasks; // Assuming the JSON structure has a 'tasks' array
    }
    return [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
