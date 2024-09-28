import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Create from "./create/Create";
import Website from "./website/Website";

function App() {
  useEffect(() => {
    async function fetchData() {
      const { data } = axios.get("http://localhost:8000/");
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/create"} component={Create} />
          <Route exact path={"/website"} component={Website} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
