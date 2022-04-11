import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { DeleteData, EditData, GLOBALTYPES } from "./globalTypes";
import { createNotify, deleteNotify } from "./notifyAction";
import { POST_TYPES } from "./postAction";

export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });
      //socket
      socket.emit("createComment", newPost);

      //Notify

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "Vừa trả lời bình luận của bạn"
          : "Vừa bình luận bài viết của bạn",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reponse.data.msg },
      });
    }
  };
export const updateComment =
  ({ comment, post, content, auth }) =>
  async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
export const likeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
      //Notify

      const msg = {
        id: comment._id,
        text: comment.reply
          ? "Vừa thích câu trả lời bình luận của bạn"
          : "Vừa thích bình luận bài viết của bạn",
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
export const unLikeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
      //Notify

      const msg = {
        id: comment._id,
        text: comment.reply
          ? "Vừa thích câu trả lời bình luận của bạn"
          : "Vừa thích bình luận bài viết của bạn",
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(deleteNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
export const deleteComment =
  ({ post, auth, comment, socket }) =>
  async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((data) => cm._id === data._id)
      ),
    };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("deleteComment", newPost);

    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);
        //Notify

        const msg = {
          id: item._id,
          text: comment.reply
            ? "Vừa trả lời bình luận của bạn"
            : "Vừa bình luận bài viết của bạn",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };
        dispatch(deleteNotify({ msg, auth, socket }));
      });
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, error: error.response.data.msg });
    }
  };
