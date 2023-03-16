import React from "react";
import './footer.css';

function Footer(props) {
  return (
    <footer className="footer" style={{background:props.isLibrary?"white":'#F7D66E',top:props.isSynthesizer?'97.5%':undefined}}>
        <small className="textfooter">Copyright 2023 © Kahaani</small>
    </footer>
  );
}
export default Footer;
