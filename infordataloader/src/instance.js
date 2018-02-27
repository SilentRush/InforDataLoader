import axios from 'axios';

var instance = axios.create({
  baseURL: 'https://slxweb.sssworld.com/sdata',
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
  auth: {
    username: 'twilkis',
    password: 'twilkis99'
  },
  withCredentials:true
});

export default instance;
