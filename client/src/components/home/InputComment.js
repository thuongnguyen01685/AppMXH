import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ children, post }) => {
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setContent("");
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };
    dispatch(createComment({ post, newComment, auth }));
  };
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Nhập bình luận..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="postBtn btn btn-info"
        disabled={content !== "" ? false : true}>
        Post
      </button>
    </form>
  );
};

export default InputComment;
