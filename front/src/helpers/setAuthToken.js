import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Will be adding the authorization token to every request if we are logged in.
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
