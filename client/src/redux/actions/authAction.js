import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";
import { GLOBALTYPES } from "./globalTypes";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const check = valid(data);
    if (check.errLength > 0)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
