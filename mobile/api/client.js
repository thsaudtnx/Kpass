import axios from 'axios';

export const baseURL = 'http://13.215.32.109';

const client = axios.create({
  baseURL,
});

export default client;