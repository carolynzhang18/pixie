import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./create/Create";
import Website from "./website/Website";
import Buy from "./website/Buy";
import Contact from "./website/Contact";

export const WebsiteContext = createContext();

function App() {
  const [websiteData, setWebsiteData] = useState({});
  return (
    <WebsiteContext.Provider value={{websiteData, setWebsiteData}}>
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
    </WebsiteContext.Provider>
  );
}

export default App;
