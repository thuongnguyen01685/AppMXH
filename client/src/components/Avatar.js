import React from "react";

const Avatar = ({ src, theme }) => {
  return (
    <div>
      <img
        src={src}
        alt="avatar"
        className="avatar"
        style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
      />
    </div>
  );
};

export default Avatar;
