export const MESS_TYPES = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
};

export const addUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({ type: MESS_TYPES.ADD_USER, payload: user });
    }
    try {
    } catch (error) {}
  };

export const addMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    console.log(msg);
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
  };
