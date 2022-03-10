import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard";

const Blog = () => {
  const { blog } = useSelector((state) => state);

  return (
    <div className="posts">
      {blog.blogs.map((blogss) => (
        <BlogCard key={blogss._id} blogss={blogss} />
      ))}
    </div>
  );
};

export default Blog;
