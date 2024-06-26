import axios from 'axios';

// Define the new API endpoint
const apiEndpoint = 'https://onlineprojectsgit.github.io/API/WDEndpoint.json';

// Fetch tasks from the new API
export const fetchData = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
