import api from "../../api/user";

// login user
export const loginUser = (credentials, setScreen) => async (dispatch) => {
  dispatch({ type: "LOADING" });
  return api
    .loginUser(credentials)
    .then((resp) => {
      if (resp.status === 200) {
        dispatch({ type: "LOGIN_USER", payload: resp.data });
        return resp.status;
      }
      return false;
    })
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({ type: "LOGIN_USER_ERR", payload: err.response.data });
        setScreen(false);
      }
    });
};

// checking is authenticated
export const isAuthenticated = () => async (dispatch) => {
  dispatch({ type: "LOADING" });
  return await api
    .isAuthenticated()
    .then((resp) => {
      if (resp.status === 200) {
        dispatch({ type: "LOGGED_IN", payload: resp.data });
        return resp.status;
      }
      return false;
    })
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({ type: "LOGIN_USER_ERR", payload: err.response.data });
        return err.response.status;
      }
      if (err.response.status === 401) {
        dispatch({ type: "UN_AUTHENTICATED", payload: err.response.data });
        return err.response.status;
      }
    });
};

// fetch all system users
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING_USERS" });
  return await api
    .getAllUsers()
    .then((resp) => {
      if (resp.status === 200) {
        dispatch({ type: "ALL_USERS", payload: resp.data });
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) {
        dispatch({ type: "FETCH_USRS_ERR", payload: err.response.data });
      }
      if (err.response.status === 401) {
        dispatch({ type: "UN_AUTHENTICATED", payload: err.response.data });
      }
    });
};

// fetch one user by email
export const fetchUser = async (email) => {
  return await api.fetchUser(email).then((res) => res.data && res.data.user);
};
