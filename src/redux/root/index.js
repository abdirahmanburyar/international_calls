import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import systemRoute from "../system";
import userReducer from "../user/reducers";
import usersRoute from "../user/reducers/allUsers";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const routReducer = combineReducers({
  user: userReducer,
  users: usersRoute,
  system: systemRoute,
});

export default persistReducer(persistConfig, routReducer);
