export const MESS_TYPES = {
  ADD_USER: "ADD_USER",
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
