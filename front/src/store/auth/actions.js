import axios from 'axios';
import setAuthToken from "../../helpers/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  registerUrl,
  loginUrl,
  checkAuthUrl,
  resetPasswordUrl
} from '../urls';

function register({ commit }, data) {
  return new Promise((resolve) => {
    axios.post(registerUrl, data)
    .then(() => {
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function activateUser({ commit }, hash) {
  console.log('sending request for hash', hash)
  return new Promise((resolve) => {
    axios.patch(`http://localhost:5000/api/users/${hash}/activate`)
    .then((response) => {
      console.log(response)
        resolve();
      })
      .catch((error) => {
        console.log(error)
      });
  });
}

function resetPassword({ commit }, data) {
  return new Promise((resolve) => {
    axios.post(resetPasswordUrl, data)
      .then(() => {
        commit('RESET_USER');
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function setNewPassword({ commit }, data) {
  return new Promise((resolve) => {
    axios.patch(`http://localhost:5000/api/users/${data.hash}/reset-password`, data)
      .then(() => {
        commit('SET_USER');
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function login({ commit }, data) {
  return new Promise((resolve) => {
    axios.post(loginUrl, data)
    .then((response) => {
        // Save token from 'response.data' to local storage
        const { token } = response.data;
        // Set token to local storage. Local storage only stores strings.
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        commit('SET_USER', decoded);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
      });
  });
}

function logout({ commit }) {

  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  // Remove auth geader for future requests
  setAuthToken(false);
  
  // Set currentUser to {} wich will set isAuthenticated to false
  commit('RESET_USER');
}

function checkUser({ commit }) {
  return new Promise((resolve) => {
    axios.post(checkAuthUrl)
      .then((response) => {
        const user = response.data.data;

        if (user) {
          commit('SET_USER', user);
        } else {
          commit('RESET_USER');
        }

        resolve();
      })
      .catch(error => console.log(error));
  });
}

export {
  register,
  login,
  logout,
  checkUser,
  resetPassword,
  activateUser,
  setNewPassword
};
