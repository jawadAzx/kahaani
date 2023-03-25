import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo_Kahaani.png";
import "../../static/css/App.css"
import  {AiOutlineSearch} from "react-icons/ai";
import './Header.css'

function clickHandler(e){
  console.log("handler triggered")
}

function HeaderMobile() {
  return (
    <nav className="navbar d-flex navbar-fixed-top navbar-custom mobile-header " >
        
        <Link className="header-image-mobile" to="/">
          <img src={Logo} className="logo-mobile" alt="" />
        </Link>
        
        
          
        
    </nav>
  );
}
export default HeaderMobile;