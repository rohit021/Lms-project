import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../helpers/cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "../helpers/localStorage";
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:5000";

const config = {
  header: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
    //USER AUTHENTICATION DETAILS
const setAuthentication = (token, user) => {
    setCookie("authToken", token);
    setLocalStorage("authUser", user);
};
   
const login = (email, password) => {
  return axios
    .post(
      API_URL + "/auth/login",
      {
        email,
        password,
      },
      config
    )
    .then((response) => {
      if (response.data) {
        setAuthentication(response.data.token, response.data.user);
      }
      return response.data;
    });
};

const register = (username, email, password) => {
  return axios
    .post(
      API_URL + "/auth/register",
      {
        username,
        email,
        password,
      },
      config
    )
    .then((response) => {
      if (response.data) {
        setAuthentication(response.data.token, response.data.user);
      }
      return response.data;
    });
};

const reset = (email) => {
  return axios
    .post(
      API_URL + "/auth/reset-password",
      {
        email,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

const newpassword = (password, token) => {
  return axios
    .post(
      API_URL + "/auth/reset/" + token,
      {
        password,
      },
      config
    )
    .then((response) => {
      return response.data;
    });
};

// checking user is loggeg in
const isAuthenticated = function () {
  if (typeof window == "undefined") {
    return false;
  }
  if (getCookie("authToken") && getLocalStorage("authUser")) {
    return getLocalStorage("authUser");
  } else {
    return false;
  }
};

const signout = function (next) {
  if (typeof window !== "undefined") {
    deleteCookie("authToken");
    deleteLocalStorage("authUser");
    return fetch(`${API_URL}/auth/logout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};


// Leads Calls

const createNewLead = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .post(API_URL + "/api/leads/data", data, config)
    .then((response) => {
      return response.data;
    });
};

const GetLeadById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .get(API_URL + "/api/leads/data", { params: { id: data } }, config)
    .then((response) => {
      return response.data;
    });
};
const GetAllLeads = function (filterValue) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .post(API_URL + "/api/leads/datas", filterValue, config)
    .then((response) => {
      return response.data;
    });
};
const updateLeadById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .put(API_URL + "/api/leads/data", data, config)
    .then((response) => {
      return response.data;
    });
};
const deleteLeadById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .delete(API_URL + "/api/leads/data",{data}, config )
    .then((response) => {
      return response.data;
    });
};

  // Review Api Calls
  const createNewReview = function (data) {
    axios.defaults.headers.common = {
      Authorization: "Bearer " + getCookie("authToken"),
    };
    return axios
      .post(API_URL + "/api/review/data", data, config)
      .then((response) => {
        return response.data;
      });
  };

    
const GetReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .get(API_URL + "/api/review/data", { params: { id: data } }, config)
    .then((response) => {
      return response.data;
    });
};

const GetAllReviews = function (filterValue) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .post(API_URL + "/api/review/datas", filterValue, config)
    .then((response) => {
      return response.data;
    });
};

const updateReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .put(API_URL + "/api/review/data", data, config)
    .then((response) => {
      return response.data;
    });
};

const deleteReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .delete(API_URL + "/api/review/data",{data}, config )
    .then((response) => {
      return response.data;
    });
};


//Physcial review Api Calls


const createNewPhysicalReview = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .post(API_URL + "/api/physical-review/data", data, config)
    .then((response) => {
      return response.data;
    });
};

const GetPhysicalReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .get(API_URL + "/api/physical-review/data", { params: { id: data } }, config)
    .then((response) => {
      return response.data;
    });
};
const GetAllPhysicalReview = function (filterValue) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .post(API_URL + "/api/physical-review/datas", filterValue, config)
    .then((response) => {
      return response.data;
    });
};

const updatePhysicalReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .put(API_URL + "/api/physical-review/data", data, config)
    .then((response) => {
      return response.data;
    });
};

const deletePhysicalReviewById = function (data) {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + getCookie("authToken"),
  };
  return axios
    .delete(API_URL + "/api/physical-review/data",{data}, config )
    .then((response) => {
      return response.data;
    });
};

export default { login, register, reset, newpassword, isAuthenticated, signout,
                 createNewLead, GetLeadById, GetAllLeads, updateLeadById, deleteLeadById,
                 createNewReview, GetReviewById, GetAllReviews, updateReviewById, deleteReviewById,
                 createNewPhysicalReview, GetPhysicalReviewById, GetAllPhysicalReview, updatePhysicalReviewById, deletePhysicalReviewById
};
