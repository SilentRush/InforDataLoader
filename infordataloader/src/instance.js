import axios from 'axios';

var GetInstance = (username,password,url) => {
  return axios.create({
    baseURL: url,
    //timeout: 120000,
    headers: {'Content-Type': 'application/json'},
    auth: {
      username: username,
      password: password
    },
    withCredentials:true
  });
}

export default GetInstance;
