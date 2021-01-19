import { combineReducers } from "redux";
import { customersReducer } from "./customersReducer";
import { projectsReducer } from "./projectsReducer";
import { invoicesReducer } from "./invoicesReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

export default combineReducers({
  customersReducer,
  projectsReducer,
  userReducer,
  invoicesReducer,
  authReducer,
  uiReducer,
});
