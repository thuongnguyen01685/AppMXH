import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
    try {
      const data = { ...newComment, postId: post._id };
      await postDataAPI("comment", data, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reponse.data.msg },
      });
    }
  };
