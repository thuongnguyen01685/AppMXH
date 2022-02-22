import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default Profile;
