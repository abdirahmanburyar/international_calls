const INITIAL_STATE = {
  error: null,
  users: [],
  user: null,
  loading: false,
  loadingUser: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "LOADING_USERS":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "ALL_USERS":
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case "LOADING_USER":
      return {
        ...state,
        loadingUser: true,
        user: null,
      };
    case "FETCH_USER":
      return {
        ...state,
        loadingUser: false,
        user: payload,
      };
    default:
      return state;
  }
};
