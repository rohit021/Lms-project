import axios from "axios";
const API_URL = "http://localhost:5000"
// https://formbackend11.herokuapp.com";

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
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        localStorage.setItem("authToken", JSON.stringify(response.data.token));
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
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        localStorage.setItem("authToken", JSON.stringify(response.data.token));
      }  
      return response.data;
    });
};

// checking user is loggeg in
const isAuthenticated = () => {
  if (typeof window == "undefined") {
      return false;
  }
  if (localStorage.getItem("authToken")) {
      return JSON.stringify(localStorage.getItem("authUser"));
  } else {
      return false;
  }
};
  
const signout = function (next) {
  if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authName");
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