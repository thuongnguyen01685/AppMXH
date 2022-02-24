import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = ({ user, setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const { auth } = useSelector((state) => state);

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn-close"
        onClick={() => setOnEdit(false)}>
        Close
      </button>
      <form>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
