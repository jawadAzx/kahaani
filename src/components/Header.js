import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

function Header() {
  return (
    <nav className="navbar navbar-light justify-content-center navbar-styling">
      <a className="brand">
        <Link to="">
          <img src={Logo} className="logo" alt="" />
        </Link>
      </a>
    </nav>
  );
}
export default Header;
