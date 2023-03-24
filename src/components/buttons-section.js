import React from "react";
import PropTypes from "prop-types";

const ButtonsSection = ({
  setSubject,
  setSelectedOptions,
  setOutput,
  setIncludeNegativePrompt,
  setOtherOptions,
  setAdvancedOptions,
  output,
}) => {
  const handleReset = () => {
    setSubject("");
    setSelectedOptions(new Set());
    setOutput("");
    setIncludeNegativePrompt(false);
    setOtherOptions({});
    setAdvancedOptions({});
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleCopyClick}>Copy to Clipboard</button>
    </div>
  );
};

ButtonsSection.propTypes = {
  setSubject: PropTypes.func.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  setOutput: PropTypes.func.isRequired,
  setIncludeNegativePrompt: PropTypes.func.isRequired,
  setOtherOptions: PropTypes.func.isRequired,
  setAdvancedOptions: PropTypes.func.isRequired,
  output: PropTypes.string.isRequired,
};

export default ButtonsSection;
