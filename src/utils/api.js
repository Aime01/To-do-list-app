import axios from "axios";


// Define the new API endpoint
const apiEndpoint = 'https://onlineprojectsgit.github.io/API/WDEndpoint.json';

export const fetchTeams = async() => await axios.get(apiEndpoint); // api cal to fetch data




