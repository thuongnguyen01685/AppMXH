import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePost from "./postReducer";
import modal from "./modalReducer";
import blog from "./blogReducer";

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  homePost,
  modal,
  blog,
});
