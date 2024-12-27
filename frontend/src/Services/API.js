import axios from 'axios';

const API = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/users' });

export const fetchAPIUsers = () => API.get();

console.log("fetchAPIUsers : ", fetchAPIUsers)

