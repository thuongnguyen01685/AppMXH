import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import PageRender from "./customRouter/PageRender";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header";
import Register from "./pages/register";
import PrivateRouter from "./customRouter/PrivateRouter";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";
import { getBlogs } from "./redux/actions/blogAction";
import { getSuggestions } from "./redux/actions/suggestionAction";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

function App() {
  const { auth, status, modal } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);
  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
    }
  }, [dispatch, auth.token]);
  useEffect(() => {
    if (auth.token) dispatch(getBlogs());
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <div className="wrap_page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
