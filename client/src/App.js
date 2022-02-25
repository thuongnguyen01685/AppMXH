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

function App() {
  const { auth, status } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
