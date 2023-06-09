import React, { useState } from "react";
import PropTypes from "prop-types";

const OutputSection = ({ output, handleReset }) => {
  OutputSection.propTypes = {
    output: PropTypes.string.isRequired,
    handleReset: PropTypes.func.isRequired,
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className="output-heading-container">
        <h2>Output</h2>
        {output && (
          <div className="button-container">
            <button onClick={handleReset}>Reset</button>
            <button
              className={`copy-button ${isCopied ? "copied" : ""}`} // Add the 'copied' class when isCopied is true
              onClick={handleCopyClick}
              aria-label="Copy result to clipboard"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
      <div className="output-container">
        <pre className="output">{output}</pre>
      </div>
    </div>
  );
};

export default OutputSection;
