import React from "react";
import PropTypes from "prop-types";

const NegativePromptToggle = ({
  includeNegativePrompt,
  handleNegativePromptToggle,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id="negative-prompt-toggle"
        onChange={handleNegativePromptToggle}
        checked={includeNegativePrompt}
      />
      <label htmlFor="negative-prompt-toggle">Include Negative Prompts</label>
    </div>
  );
};

NegativePromptToggle.propTypes = {
  includeNegativePrompt: PropTypes.bool.isRequired,
  handleNegativePromptToggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default NegativePromptToggle;
