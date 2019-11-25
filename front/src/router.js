import Vue from 'vue';
import Router from 'vue-router';
// Main
import Main from '@/views/Main.vue';
// Auth
import Login from '@/views/Login.vue';
import ActivateUser from '@/views/ActivateUser.vue';
import Register from '@/views/Register.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import setNewPassword from '@/views/SetNewPassword.vue';
// 404
import PageNotFound from '@/views/PageNotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Main
    {
      path: '/',
      name: 'main',
      component: Main
    },
    // Auth
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/users/:hash/activate',
      name: 'activate-user',
      component: ActivateUser
    },
    {
      path: '/users/reset-password',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/users/:hash/reset-password',
      name: 'set-new-password',
      component: setNewPassword
    },
    // 404
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
});
