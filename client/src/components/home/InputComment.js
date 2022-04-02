import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) return setOnReply(false);
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
        Đăng
      </button>
    </form>
  );
};

export default InputComment;
