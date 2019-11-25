<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';

export default {
  created() {
    // Check for token in local storage
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.$store.commit('auth/setUser', decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.$store.dispatch('auth/logout');
        // Clear current Profile
        // store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = "/login";
      }
    }
  }
}
</script>

<style>
@import 'assets/css/spacing.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}

</style>
