import { combineReducers } from "redux";
import { customersReducer } from "./customersReducer";
import { projectsReducer } from "./projectsReducer";

export default combineReducers({
  customersReducer,
  projectsReducer,
});
