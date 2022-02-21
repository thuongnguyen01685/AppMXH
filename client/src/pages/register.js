import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password, gender } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} method="POST">
        <h3 className="text-uppercase text-center mb-4">Zahu</h3>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            onChange={handleChangeInput}
            name="fullname"
            value={fullname}
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChangeInput}
            name="username"
            value={username.toLocaleLowerCase().replace(/ /g, "")}
            style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            name="email"
            value={email}
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              name="password"
              value={password}
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              name="cf_password"
              value={cf_password}
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>
        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male:
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female">
            Female:
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            Other:
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary  w-100"
          // disabled={email && password ? false : true}
        >
          Register
        </button>
        <p className="my-2">
          Already have an account ?
          <Link to="/login" style={{ color: "crimson" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
