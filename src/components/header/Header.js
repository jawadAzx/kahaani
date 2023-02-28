import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Kahaani.png";
import "../../static/css/App.css"
import  {AiOutlineSearch} from "react-icons/ai";
import './Header.css'
function Header() {
  return (
    <nav className="navbar navbar-fixed-top navbar-custom " >
      <div className="container-fluid style-nav">
        <div className="navbar-header">
        <Link to="">
          <img src={Logo} className="logo" alt="" />
        </Link>
        </div>
        <div className="navbar-header">
        <p className="heading-homepage">KAHAANI</p>
        </div>
          <div className="form-group has-search rounded search-group">
          <AiOutlineSearch size={40} className="search-icon"/>
          </div>
          </div>
        
    </nav>
  );
}
export default Header;