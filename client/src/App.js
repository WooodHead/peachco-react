import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Build from "./pages/Build";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Random from "./pages/Random";
import React from "react";
import Search from "./pages/Search/Search";

import "./App.css";

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/search/" component={Search}/> 
          <Route exact path="/build/" component={Build}/>
          <Route exaxt path="/random/" component={Random}/>
          <Route component={NoMatch}/>
        </Switch>
      </main>
    </Router>

  )
}

export default App;
