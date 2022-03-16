import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostThumb from "../PostThumb";

const Posts = ({ auth, id, profile, dispatch }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) setPosts(data.posts);
      setResult(data.result);
    });
  }, [profile.userPosts, id]);

  return (
    <div>
      <PostThumb posts={posts} result={result} />
    </div>
  );
};

export default Posts;
