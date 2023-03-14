import React from "react";
import { Link } from "react-router-dom";
import Homelogo from "../../assets/images/Homelogo.png";
import Footer from "../footer/Footer";
import './Homepage.css';
import Header from "../header/Header";

function Homepage() {
  return (
    <div className="homepage">
    <Header isLibrary={false}/>
      <div className="row">
        <div className="col change-text">
          <div className="container mt-5 ">
            <h1 className="top-text pad-left">An Urdu Audio Book Reader</h1>
            <h3 className="homepage-text pad-left">You can listen to Urdu story books at same time</h3>
            <h3 className="homepage-text pad-left">OR</h3>
            <h3 className="homepage-text pad-left">Enter any text and listen to the audio file</h3>
          </div>
          <div className="container mt-top-10 pad-left .d-none">
            <div className="row">
              <div className="col">
              <br></br>
                <Link to="/library">
                  <button class="btn btn-primary button-text" >Go to Library</button>
                </Link>
              </div>
            <div className="row">
            <div className="col">
                <Link to="/synthesizer">
                <button class="btn btn-primary button-text" >Convert Text to Audio</button>
                </Link>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col">
          <img src={Homelogo} className="home-illus" />
        </div>
      </div>
      <Footer isLibrary = {false}/>
    </div>
  );
}
export default Homepage;
