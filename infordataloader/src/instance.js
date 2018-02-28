import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://eval.sssworld.com/sdata',
  //timeout: 120000,
  headers: {'Content-Type': 'application/json'},
  auth: {
    username: 'admin',
    password: ''
  },
  withCredentials:true
});

export default instance;
