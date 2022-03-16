import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);
  if (result === 0) return <h2 className="text-center">Không có bài viết.</h2>;

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            <img
              src={post.images[0].url}
              alt={post.images[0].url}
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
            <div className="post_thumb_menu">
              <div className="menu d-flex">
                <i className="far fa-heart">{post.likes.length}</i>
                <i className="far fa-comment">{post.comments.length}</i>
              </div>
              <p className="content text-white">{post.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
