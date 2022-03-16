import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import LoadIcon from "../../images/loading.gif";
import { useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import LoadMoreBtn from "../LoadMoreBtn";
import { useDispatch } from "react-redux";

const Posts = () => {
  const { homePost, auth } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePost.page * 9}`,
      auth.token
    );
    setLoad(false);
  };

  return (
    <div className="posts">
      {homePost.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {/* {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={homePost.result}
        page={homePost.page}
        load={load}
        handleLoadMore={handleLoadMore}
      /> */}
    </div>
  );
};

export default Posts;
