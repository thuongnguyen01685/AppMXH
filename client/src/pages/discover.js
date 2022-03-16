import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  DISCOVER_TYPES,
  getDiscoverPosts,
} from "../redux/actions/discoverAction";
import LoadIcon from "../images/loading.gif";
import PostThumb from "../components/PostThumb";
import { useState } from "react";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?limit=${discover.page * 9}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPES.GET_POSTS, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}
      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      )}
      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
