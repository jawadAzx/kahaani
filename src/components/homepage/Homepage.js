import React from "react";
import { Link } from "react-router-dom";
import libraryLogo from "../../assets/images/library-logo.svg"
import SynthesizerLogo from "../../assets/images/synth-logo.svg"
import HomeLogo from "../../assets/images/home-illus.svg"
import Footer from "../footer/Footer";
import './Homepage.css'

function Homepage() {
  return (
    <div className="homepage">
      <div className="row">
        <div className="col change-text">
          <div className="container mt-5 ">
            <h1 className="top-text pad-left">Let’s Learn Urdu!</h1>
            <h1 className="top-text pad-left">By Listening to</h1>
            <h1 className="top-text pad-left">Short Stories</h1>
          </div>
          <div className="container mt-top-10 pad-left .d-none .d-sm-block">
            <div className="row">
              <div className="col">
                <Link to="/library/">
                  <img
                    src={libraryLogo}
                    className="home-icons"
                  />
                  <h2 className="pad-left make-bold m-left-mobile">Library</h2>
                </Link>
              </div>
              <div className="col">
                <Link to="/synthesizer">
                  <img
                    src={SynthesizerLogo}
                    className="home-icons"
                  />
                  <h2 className="make-bold m-left-mobile2">
                    Text to Speech
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col vh-100 d-none d-lg-block">
          <img src={HomeLogo} className="home-illus" />
        </div>
      </div>
    <Footer isLibrary = {false}
    />
    </div>
  );
}
export default Homepage;
