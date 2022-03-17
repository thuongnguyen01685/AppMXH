import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import { likePost, unLikePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import LikeButton from "../../LikeButton";
import ShareModal from "../../ShareModal";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user._id]);
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>
          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
        </div>
        <i className="far fa-bookmark" />
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} lượt thích
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} Bình luận
        </h6>
      </div>
      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
