import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "../../static/css/App.css"
function Header() {
  return (
    <nav className="navbar navbar-light justify-content-left navbar-styling d-flex flex-nowrap">
      <a className="brand">
        <Link to="">
          <img src={Logo} className="logo logo-image" alt="" />
        </Link>
      </a>
      
          <div className="form-group has-search rounded search-group">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control rounded"
              placeholder="Search a story..."
            />
          </div>
        
    </nav>
  );
}
export default Header;