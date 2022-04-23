import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({
  children,
  user,
  handleClose,
  border,
  setShowFollowers,
  setShowFollowing,
  msg,
  theme,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center">
          <Avatar src={user.avatar} size="big-avatar" />

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.fullname}</span>

            <small style={{ opacity: 0.7 }}>
              {msg ? (
                <>
                  <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                    {user.text}
                  </div>
                  {user.media.length > 0 && (
                    <div>
                      Đã nhận {user.media.length} ảnh{" "}
                      <i className="fas fa-image" />
                    </div>
                  )}
                </>
              ) : (
                user.username
              )}
            </small>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
