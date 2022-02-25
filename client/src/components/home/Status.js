import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} alt={auth.user.avatar} size="big-avatar" />
      <button
        className="statusBtn flex-fill"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
        {auth.user.name} what are you thinking ?
      </button>
    </div>
  );
};

export default Status;
