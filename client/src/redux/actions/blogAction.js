import { getData } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const BLOG_TYPES = {
  LOADING_BLOG: "LOADING_BLOG",
  GET_BLOGS: "GET_BLOGS",
};

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_TYPES.LOADING_BLOG, payload: true });
    const res = await getData();

    dispatch({
      type: BLOG_TYPES.GET_BLOGS,
      payload: res.data,
    });

    dispatch({ type: BLOG_TYPES.LOADING_BLOG, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
