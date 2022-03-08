import React, { useState } from "react";
import { useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);

  const [next, setNext] = useState(2);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  return (
    <div className="comments">
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
      {comments.length - next > 0 ? (
        <div
          className="p-2 border-top text-info"
          style={{ cursor: "pointer" }}
          onClick={() => setNext(next + 100)}>
          Xem tất cả bình luận
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="p-2 border-top text-info"
            style={{ cursor: "pointer" }}
            onClick={() => setNext(2)}>
            Ẩn bớt bình luận
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
