import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Kahaani.png";
import "../../static/css/App.css"
import  {AiOutlineSearch} from "react-icons/ai";
function Header() {
  return (
    <nav className="navbar">
        <Link to="">
          <img src={Logo} className="logo" alt="" />
        </Link>
        <p className="heading-homepage">KAHAANI</p>
          <div className="form-group has-search rounded search-group">
          <AiOutlineSearch size={40} className="search-icon"/>
          </div>
        
    </nav>
  );
}
export default Header;