function resetErrors(state) {
  state.errors = {};
}

function setErrors(state, errors) {
  state.errors = errors;
}
export {
  setErrors,
  resetErrors
};
