import { fetchUser } from "../user/actions";

const INITIAL_STATE = {
  deleteModal: false,
  updateModal: false,
  user: null,
  updateUserForm: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "DELETE_USER_MODAL":
      console.log(payload);
      return {
        ...state,
        deleteModal: !state.deleteModal,
        user: payload,
      };
    case "UPDATE_USER_MODAL":
      const getUserData = async (payload) => {
        if (!payload) return null;
        const user = await fetchUser(payload.email);
        console.log(user);
        return user;
      };
      return {
        ...state,
        updateModal: !state.updateModal,
        user: payload,
        updateUserForm: getUserData(payload),
      };
    default:
      return state;
  }
};
