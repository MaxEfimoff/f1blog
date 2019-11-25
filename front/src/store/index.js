import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import errors from './errors';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      auth,
      errors
    },
    strict: process.env.DEV
  })

  return Store
}

