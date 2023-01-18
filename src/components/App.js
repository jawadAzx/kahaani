import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Library from "./Library";
import Header from "./Header";
import Footer from "./Footer";
import Player from "./Player";
import Summary from "./Summary";
import Testing from "./Testing";
import Synthesizer from "./Synthesizer";
import Upload from "./Upload";
import SST from "./SST";
import "../static/css/App.css"


/**
 * Routing:
 * Although we are using react HashRouter for handling routes, we
 * need to set paths in the project urls.py file as well in addition
 * to the usual Routes path in App.js.
 * 
 * Alternative easier way was HashRouter which just adds hash in url.
 * So revert to HashRouter in case of issues.
 */

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/library" component={Library} />
          <Route path="/player/:id" component={Player} />
          <Route path="/testing" component={Testing} />
          <Route path="/synthesizer" component={Synthesizer} />
          <Route path="/upload" component={Upload} />
          <Route path="/sst" component={SST} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// ReactDOM.render(<App />, document.getElementById("app"));
