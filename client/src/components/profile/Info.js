import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";

const Info = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);
  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user.id}>
          <Avatar src={user.avatar} size="supper-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              <button
                className="btn btn-outline-info"
                onClick={() => setOnEdit(true)}>
                Edit Profile
              </button>
            </div>
            <div className="follow_btn">
              <span className="mr-4">{user.followers.length} Followers</span>
              <span className="ml-4">{user.following.length} Following</span>
            </div>
            <h6>
              {user.fullname} {user.mobile}
            </h6>
            <p className="m-0">{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
        </div>
      ))}
    </div>
  );
};

export default Info;
