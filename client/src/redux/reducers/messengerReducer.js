const { GLOBALTYPES } = require("../actions/globalTypes");
const { MESS_TYPES } = require("../actions/messageAction");

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    default:
      return state;
  }
};

export default messageReducer;
