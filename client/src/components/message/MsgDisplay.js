import React from "react";
import Avatar from "../Avatar";

const MsgDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.fullname}</span>
      </div>
      <div className="chat_text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
        deleniti, unde in quidem esse alias, quam qui ipsum veritatis saepe
        dolorem rerum optio soluta minima nobis facere. Tenetur, ducimus cum?
      </div>
      <div className="chat_time">Tháng 4 2022</div>
    </>
  );
};

export default MsgDisplay;
