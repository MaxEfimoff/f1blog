import isEmpty from '../../helpers/is-empty';

function SET_USER(state, user) {
  state.user = user;
  state.isAuthenticated = !isEmpty(user);
}

function RESET_USER(state) {
  state.user = {};
  state.isAuthenticated = false;
}

export {
  SET_USER,
  RESET_USER,
};
