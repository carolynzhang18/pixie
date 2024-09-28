import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Create from "./create/Create";
import Website from "./website/Website";
import Buy from "./website/Buy";
import Contact from "./website/Contact";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/create"} component={Create} />
          <Route exact path={"/website"} component={Website} />
          <Route exact path={"/website/buy"} component={Buy} />
          <Route exact path={"/website/contact"} component={Contact} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
