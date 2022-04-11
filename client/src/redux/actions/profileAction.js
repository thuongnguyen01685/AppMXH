import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES, DeleteData, EditData } from "./globalTypes";
import { createNotify, deleteNotify } from "./notifyAction";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_USER: "GET_PROFILE_USER",
  GET_ID: "GET_PROFILE_ID",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_POST: "GET_PROFILE_POST",
  UPDATE_POST: "UPDATE_PROFILE_POST",
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    // if (users.every((user) => user._id !== id)) {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = getDataAPI(`/user/${id}`, auth.token);
      const res1 = getDataAPI(`/user_posts/${id}`, auth.token);

      const users = await res;
      const posts = await res1;

      dispatch({
        type: PROFILE_TYPES.GET_POST,
        payload: { ...posts.data, _id: id, page: 2 },
      });

      dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data });
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
    // }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your full name." },
      });
    if (userData.fullname.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your full name too long." },
      });

    if (userData.story.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your story too long." },
      });
    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    //followers
    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });
    //following
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });
    //socket.emit("follow", newUser);
    try {
      const res = await patchDataAPI(
        `user/${user._id}/follow`,
        null,
        auth.token
      );
      socket.emit("follow", res.data.newUser);

      //Notify

      const msg = {
        id: auth.user._id,
        text: "Bắt đầu theo dõi bạn",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };
      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
export const unfollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }
    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });
    socket.emit("unFollow", newUser);
    try {
      const res = await patchDataAPI(
        `user/${user._id}/unfollow`,
        null,
        auth.token
      );
      socket.emit("unFollow", res.data.newUser);

      //Notify

      const msg = {
        id: auth.user._id,
        text: "Bắt đầu theo dõi bạn",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };
      dispatch(deleteNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
