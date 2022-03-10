import React from "react";
import { useState } from "react";
import Carousel from "../../Carousel";

const BodyCard = ({ blogss }) => {
  const [readMore, setReadMore] = useState(false);
  const data = blogss.content;

  return (
    <div className="card_body">
      <div className="card_body-content">
        {/* {blogss.content.length < 60 ? (
          <div dangerouslySetInnerHTML={{ __html: data }} />
        ) : readMore ? (
          <div dangerouslySetInnerHTML={{ __html: data }} /> + " "
        ) : (
          (
            <span
              dangerouslySetInnerHTML={{
                __html: blogss.content.slice(0, 60),
              }}></span>
          ) + "..."
        )}

        {blogss.content.length > 60 && (
          <span
            className="readMore text-info"
            style={{ cursor: "pointer" }}
            onClick={() => setReadMore(!readMore)}>
            {readMore ? "Ẩn bớt" : "Xem thêm"}
          </span>
        )} */}
        <div dangerouslySetInnerHTML={{ __html: data }} />
        <span>{blogss.ten_nblog}</span>
        <h5>{blogss.user_created}</h5>
        <img
          src={`https://api.fostech.vn${blogss.picture}?access_token=e8ba858476afc6a0f6c1d3d686e275a8`}
        />
      </div>

      {/* <img src={blogss.picture} /> */}
    </div>
  );
};

export default BodyCard;
