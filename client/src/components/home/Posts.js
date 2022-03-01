import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";

const Posts = () => {
  const { homePost } = useSelector((state) => state);

  return (
    <div className="posts">
      {homePost.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
