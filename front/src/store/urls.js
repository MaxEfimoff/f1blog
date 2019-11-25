const serverUrl = 'http://localhost:5000';

// Auth
const loginUrl = `${serverUrl}/api/users/login/`;
const registerUrl = `${serverUrl}/api/users/register/`;
const checkAuthUrl = `${serverUrl}/api/users/check`;
const resetPasswordUrl = `${serverUrl}/api/users/reset-password`;


export {
  // Auth
  serverUrl,
  registerUrl,
  resetPasswordUrl,
  loginUrl,
  checkAuthUrl
};
