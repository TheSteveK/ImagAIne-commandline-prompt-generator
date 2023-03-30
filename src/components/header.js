import React from "react";
import headerImage from "../header.png"; // Import the header image directly

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <img src={headerImage} alt="Header" className="header-image" />
        <h1 className="header-title">Image Generation AI Prompt</h1>
      </div>
    </div>
  );
};

export default Header;
