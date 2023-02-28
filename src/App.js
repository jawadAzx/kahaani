import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Library from "./components/library/Library";
import Header from "./components/header/Header";
import Player from "./components/player/Player";
import Testing from "./components/testing/Testing";
import Synthesizer from "./components/texttospeech/Synthesizer";
import Upload from "./components/upload/Upload";
import SST from "./components/sst/SST";
import "./static/css/App.css"


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
      </Router>
    </div>
  );
}

export default App;

