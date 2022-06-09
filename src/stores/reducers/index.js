import { combineReducers } from "redux";
import authReducer from "./authReducer";
import updateReducer from "./updateReducer";

export default combineReducers({
  auth: authReducer,  update: updateReducer,
});