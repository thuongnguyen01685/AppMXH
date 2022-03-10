import { BLOG_TYPES } from "../actions/blogAction";

const initialState = {
  loading: false,
  blogs: [],
  result: 0,
  page: 2,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_TYPES.LOADING_BLOG:
      return {
        ...state,
        loading: action.payload,
      };
    case BLOG_TYPES.GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        result: action.payload,
      };

    default:
      return state;
  }
};

export default blogReducer;
