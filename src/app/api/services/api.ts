import axios from "axios";
const api = axios.create({
  headers: {'Content-type':'Application/json', 'Accept':'Application/json', 'Access-Control-Allow-Origin': "*",},
  baseURL: 'process.env.NEXT_PUBLIC_API_URL',
  // baseURL: '//localhost:3000/',
  // baseURL: '//dcqas012168.weg.net:3255/',
});

export default api;