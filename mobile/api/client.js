import axios from 'axios';

export const baseURL = 'https://k-pass.mcpayment.com.my';

const client = axios.create({
  baseURL,
});

export default client;