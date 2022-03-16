import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, auth } = useSelector((state) => state);
  const { id } = useParams();
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {profile.loading ? (
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
      ) : (
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  );
};

export default Profile;
