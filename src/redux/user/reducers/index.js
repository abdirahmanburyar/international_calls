const INITIAL_STATE = {
  error: null,
  user: null,
  users: [],
  loading: false,
  logged: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "LOGIN_USER":
      return {
        ...state,
        logged: true,
        loading: false,
        user: payload.user,
        error: null,
      };
    case "LOGIN_USER_ERR":
      return {
        ...state,
        loading: false,
        user: null,
        error: payload,
        logged: false,
      };
    case "LOGGED_IN":
      return {
        ...state,
        loading: false,
        user: payload,
        logged: true,
      };
    case "UN_AUTHENTICATED":
      return {
        ...state,
        loading: false,
        user: {},
        logged: false,
      };
    default:
      return state;
  }
};
