import axios from "axios";
import { setCookie, getCookie, deleteCookie } from '../helpers/cookies';
import {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
} from '../helpers/localStorage';
const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL :"http://localhost:5000";

const config = {
  header: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',  
  }
};

const setAuthentication = (token, user) => {
  setCookie('authToken', token);
  setLocalStorage('authUser', user);
};


const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      email,
      password,
    },config)
    .then((response) => {
      if (response.data) {
        setAuthentication(response.data.token, response.data.user)        
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
        setAuthentication(response.data.token, response.data.user)               
      }  
      return response.data;
    });
};

const reset = (email) => {
  return axios
    .post(API_URL + "/auth/reset-password", {
        email,
      },
      config)
    .then((response) => {      
      return response.data;
    });
};

const newpassword =(password, token) =>{
  return axios
  .post(API_URL + "/auth/reset/"+token, {
      password,
    },
    config)
  .then((response) => {      
    return response.data;
  });
}

// checking user is loggeg in
const isAuthenticated = function () {
  if (typeof window == "undefined") {
      return false;
  }
  if (getCookie('authToken') && getLocalStorage('authUser')) {
    return getLocalStorage('authUser');
  } else {
      return false;
  }
};

const signout = function (next) {
  if (typeof window !== "undefined") {
    deleteCookie('authToken');
    deleteLocalStorage('authUser');
    return fetch(`${API_URL}/auth/logout`, {
      method: "GET"
    })
    .then(response => console.log("signout success"))
    .catch(err => console.log(err));
  }
};

const getAllLeads = function (filterValue){
  axios.defaults.headers.common = {'Authorization': "Bearer " +getCookie('authToken') }
  return axios
  .post(API_URL + "/api/leads/datas",filterValue,
    config)
  .then((response) => {      
    return response.data;
  });
};

const createNewLead = function (data){
  axios.defaults.headers.common = {'Authorization': "Bearer " +getCookie('authToken') }
  return axios
  .post(API_URL + "/api/leads/data", {
    data,
    },
    config)
  .then((response) => {      
    return response.data;
  });

};

const deleteLeadbyId = function (data){
  axios.defaults.headers.common = {'Authorization': "Bearer " +getCookie('authToken') }
  return axios
  .delete(API_URL + "/api/leads/data", {
    data,
    },
    config)
  .then((response) => {      
    return response.data;
  });

};

  export default {
    login,register,isAuthenticated, reset,newpassword,getAllLeads,deleteLeadbyId, createNewLead
    ,signout
  }