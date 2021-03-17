import axios from "axios";
import cookie from 'js-cookie';
const API_URL = "http://localhost:5000" || process.env.REACT_APP_BASE_URL ;

const config = {
  header: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      email,
      password,
    },config)
    .then((response) => {
      if (response.data) {
        cookie.set('authUser', JSON.stringify(response.data.user), { expires: 1 })
        cookie.set('authToken', JSON.stringify(response.data.token), { expires: 1 })    
      }  
      return response.data;
    });
};

const register = (username, email, password) => {
  return axios
    .post(API_URL + "/auth/register", {
        username,
        email,
        password,
      },
      config)
    .then((response) => {
      if (response.data) {
        cookie.set('authUser', JSON.stringify(response.data.user), { expires: 1 })
        cookie.set('authToken', JSON.stringify(response.data.token), { expires: 1 })            
      }  
      return response.data;
    });
};

// checking user is loggeg in
const isAuthenticated = () => {
  if (typeof window == "undefined") {
      return false;
  }
  if (cookie.get("authToken")) {
      return JSON.stringify(cookie.get("authUser"));
  } else {
      return false;
  }
};
  
const signout = function (next) {
  if (typeof window !== "undefined") {
      cookie.remove('authUser');
      cookie.set('authToken');      
      next();

      return fetch(`${API_URL}/auth/signout`, {
          method: "GET"
      })
          .then(response => console.log("signout success"))
          .catch(err => console.log(err));
  }
};


  export default {
    login,register,isAuthenticated, 
    signout
  }