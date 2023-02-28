import React from "react";
import './footer.css';

function Footer(props) {
  return (
    <footer className="footer" style={{background:props.isLibrary?"white":'#F8D66E',top:props.isSynthesizer?'98.5%':undefined}}>
      <div className="text-left text-black">
        <small className="textfooter">Copyright 2023 © Kahaani</small>
      </div>
    </footer>
  );
}
export default Footer;
