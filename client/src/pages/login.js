import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} method="POST">
        <h3
          className="text-uppercase text-center mb-4"
          style={{ color: "cornflowerblue" }}>
          Zahu
        </h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            name="email"
            value={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
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
              autoComplete="off"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? (
                <span className="material-icons">visibility_off</span>
              ) : (
                <span className="material-icons">visibility</span>
              )}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary  w-100"
          disabled={email && password ? false : true}>
          Login
        </button>
        <p className="my-2">
          You don't have an account ?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
