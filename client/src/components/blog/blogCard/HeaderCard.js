import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const HeaderCard = ({ blogss }) => {
  return (
    <div className="card_header">
      <div className="d-flex">
        <div className="card_name">
          <h4 className="m-0">
            <Link to={`/details/${blogss._id}`} className="text-dark">
              {blogss.title}
            </Link>
          </h4>
          <small className="text-muted">
            {moment(blogss.createdAt).fromNow()}
          </small>
        </div>
      </div>

      {/* <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span>
                Edit post
              </div>
              <div className="dropdown-item">
                <span className="material-icons">delete_outline</span>Remove
                post
              </div>
            </>
          )}
          <div className="dropdown-item">
            <span className="material-icons">content_copy</span>Copy link
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HeaderCard;
