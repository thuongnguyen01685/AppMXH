import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

const Header = () => {
  const navLinks = [
    { lable: "Home", icon: "home", path: "/" },
    { lable: "Message", icon: "near_me", path: "/message" },
    { lable: "Discover", icon: "explore", path: "/disvocer" },
    { lable: "Notify", icon: "favorite", path: "/notify" },
  ];
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  useEffect(() => {}, []);
  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link className="navbar-brand" to="/">
          <h1 className="navbar-brand text-uppercase p-0 m-0">Zahu</h1>
        </Link>

        <div className="menu">
          <ul className="navbar-nav flex-row">
            {navLinks.map((link, index) => (
              <li
                className={`nav-item px-2 ${isActive(link.path)} `}
                key={index}>
                <Link className="nav-link" to={link.path}>
                  <span className="material-icons">{link.icon}</span>
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <Avatar src={auth.user.avatar} theme={theme} />
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  className="dropdown-item"
                  to={`/profile/${auth.user._id}`}>
                  Profile
                </Link>
                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                  }>
                  {theme ? "Light mode" : "Dark mode"}
                </label>

                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => {
                    dispatch(logout());
                  }}>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
