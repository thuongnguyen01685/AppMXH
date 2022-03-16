import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));
    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="home row mx-0">
      <div className="col-md-2"></div>
      <div className="col-md-6">
        <div className="posts">
          {post.length === 0 && (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          )}
          {post.map((item) => (
            <PostCard post={item} key={item._id} />
          ))}
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Post;
