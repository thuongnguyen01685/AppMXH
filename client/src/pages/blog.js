import React from "react";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";
import Hlog from "../components/blog/Blog";

const Blog = () => {
  const { theme, blog } = useSelector((state) => state);

  return (
    <div className="home row mx-0">
      <div className="col-md-12">
        {blog.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : blog.result === 0 && blog.blogs.length === 0 ? (
          <h2 className="text-center">No Blog</h2>
        ) : (
          <Hlog blog={blog} />
        )}
      </div>
    </div>
  );
};

export default Blog;
