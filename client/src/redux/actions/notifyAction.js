import { deleteDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI("notify", msg, auth.token);
      console.log(res);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );
      console.log(res);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
