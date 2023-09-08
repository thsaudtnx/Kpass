import axios from 'axios';

//export const baseURL = 'https://k-pass.mcpayment.com.my';
export const baseURL = 'http://xx.xxx.xx.xx.xx';

const client = axios.create({
  baseURL,
});

export default client;
