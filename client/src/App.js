import React from "react";
import Header from "./components/Header/Header";
import Search from "./pages/Search/Search";
import Build from "./pages/Build";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/build/:type/:id" component={Build}/>
          <Route exact path="/build/:type/:id" component={Build}/>
          <Route exact path="/build/:type/" component={Build}/>
          <Route component={NoMatch}/>
        </Switch>
      </main>
    </Router>

  )
}

export default App;
