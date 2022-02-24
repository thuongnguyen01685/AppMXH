import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import LoadIcon from "../../images/loading.gif";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state);

  return (
    <div className="profile">
      {profile.loading ? (
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
      ) : (
        <Info />
      )}

      <Posts />
    </div>
  );
};

export default Profile;
