import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import PageRender from "./PageRender";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
