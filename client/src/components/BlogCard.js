import React from "react";
import BodyCard from "./blog/blogCard/BodyCard";
import FooterCard from "./blog/blogCard/FooterCard";
import HeaderCard from "./blog/blogCard/HeaderCard";

const BlogCard = ({ blogss }) => {
  return (
    <div className="card my-3">
      <HeaderCard blogss={blogss} />
      <BodyCard blogss={blogss} />
    </div>
  );
};

export default BlogCard;
