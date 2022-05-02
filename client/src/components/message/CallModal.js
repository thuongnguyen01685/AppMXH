import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

const CallModal = () => {
  const { call } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);

  //Set time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
  }, [total]);

  //End call
  const handleEndCall = () => {
    dispatch({ type: GLOBALTYPES.CALL, payload: null });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, answer]);

  //Answer call
  const handleAnswer = () => {
    setAnswer(true);
  };

  return (
    <div className="call_modal">
      <div className="call_box">
        <div className="text-center" style={{ padding: "20px" }}>
          <Avatar src={call.avatar} size="supper-avatar" />
          <h4>{call.fullname}</h4>
          <h6>{call.username}</h6>
          <div>
            {call.video ? <span>Gọi video...</span> : <span>Gọi audio...</span>}
          </div>
        </div>

        <div className="timer">
          <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
          <small>:</small>
          <small>{second.toString().length < 2 ? "0" + second : second}</small>
        </div>

        <div className="call_menu">
          <span className="material-icons text-danger" onClick={handleEndCall}>
            call_end
          </span>
          <>
            {call.video ? (
              <span
                className="material-icons text-success"
                onClick={handleAnswer}>
                videocam
              </span>
            ) : (
              <span
                className="material-icons text-success"
                onClick={handleAnswer}>
                call
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
