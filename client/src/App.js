import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header";

function App() {
  const { auth } = useSelector((state) => state);

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

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
