import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePost from "./postReducer";
import modal from "./modalReducer";
import blog from "./blogReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestions from "./suggestionReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messengerReducer";
import online from "./onlineReducer";

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  homePost,
  modal,
  blog,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message,
  online,
});
