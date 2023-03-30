import React, { useState } from "react";
import PropTypes from "prop-types";

const ButtonsSection = ({ handleReset, output }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="floating-buttons">
      <button onClick={handleReset}>Reset</button>
      <button
        className={`copy-button ${isCopied ? "copied" : ""}`}
        onClick={handleCopyClick}
        aria-label="Copy result to clipboard"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

ButtonsSection.propTypes = {
  handleReset: PropTypes.func.isRequired,
  output: PropTypes.string.isRequired,
};

export default ButtonsSection;
