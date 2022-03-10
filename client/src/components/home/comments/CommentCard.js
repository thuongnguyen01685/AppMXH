import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import moment from "moment";
import LikeButton from "../../LikeButton";
import { useSelector } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  unLikeComment,
  updateComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);
  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };
  const handleCancel = () => {
    setOnEdit(false);
    setContent(comment.content);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };
  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.fullname}</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              row="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                  @{comment.tag.fullname}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => setReadMore(!readMore)}>
                  {readMore ? "Ẩn bớt" : "Xem thêm"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            {onEdit ? (
              <>
                <button
                  className="font-weight-bold mr-3"
                  disabled={content.length !== 0 ? false : true}
                  onClick={handleUpdate}
                  style={{ border: "none", outline: "none" }}>
                  Chỉnh sửa
                </button>
                <button
                  className="font-weight-bold mr-3"
                  onClick={handleCancel}
                  style={{ border: "none", outline: "none" }}>
                  Đóng
                </button>
              </>
            ) : (
              <>
                <LikeButton
                  isLike={isLike}
                  handleLike={handleLike}
                  handleUnLike={handleUnLike}
                />
                <small className="font-weight-bold ml-2 mr-3">
                  {comment.likes.length} Likes
                </small>
                <small className="font-weight-bold mr-3" onClick={handleReply}>
                  {onReply ? "Đóng" : "Phản hồi"}
                </small>
              </>
            )}
          </div>
        </div>
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
        </div>
      </div>
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.fullname}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
