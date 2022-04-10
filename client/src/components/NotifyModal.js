import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoNotice from "../images/notice.png";
import Avatar from "../components/Avatar";
import moment from "moment";

const NotifyModal = () => {
  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div style={{ minWidth: "320px" }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h5 style={{ top: "10px" }}>Thông báo</h5>
        {notify.sound ? (
          <i
            className="fas fs-bell text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          />
        )}
      </div>
      <hr className="my-2" />
      {notify.data.length === 0 && (
        <img src={NoNotice} alt="NoNotice" className="w-100" />
      )}
      <div style={{ maxHeight: "cacl(100vh - 200px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center">
              <Avatar src={msg.user.avatar} size="big-avatar" />
              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{msg.user.fullname}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              <div style={{ width: "30px" }}>
                {msg.image && (
                  <img
                    src={msg.image}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "20%",
                    }}
                  />
                )}
              </div>
            </Link>
            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle text text-primary" />}
            </small>
          </div>
        ))}
      </div>
      <hr className="my-1" />
      <div
        className="text-right text-danger mr-2"
        style={{ cursor: "pointer" }}>
        Xoá tất cả thông báo
      </div>
    </div>
  );
};

export default NotifyModal;
