import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  loginUser: async (credential) =>
    await axios({
      method: "POST",
      url: "/user/login-user",
      data: credential,
    }),
  isAuthenticated: async () =>
    await axios({
      method: "GET",
      url: "/user/is-authenticated",
    }),
  getAllUsers: async () =>
    await axios({
      url: "/user",
    }),
  fetchUser: async (email) =>
    await axios({
      method: "POST",
      url: "/user",
      data: { email },
    }),
};
