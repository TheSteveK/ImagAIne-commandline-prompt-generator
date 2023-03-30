import React from "react";
import PropTypes from "prop-types";

const OptionsGroup = ({
  group,
  selectedOptions,
  handleChange,
  handleOtherChange,
  isExpanded,
  isNegativePrompt,
  includeNegativePrompt,
  handleNegativePromptToggle,
}) => {
  const sortedItems = group.items.slice().sort();

  const renderChildGroups = (childGroups) => {
    return childGroups.map((childGroup) => (
      <OptionsGroup
        key={childGroup.id}
        group={childGroup}
        selectedOptions={selectedOptions}
        handleChange={handleChange}
        handleOtherChange={handleOtherChange}
        isNegativePrompt={false}
        includeNegativePrompt={false}
      />
    ));
  };

  return (
    <details key={group.id} className="checkbox-group" open={isExpanded}>
      <summary>{group.title}</summary>
      {isNegativePrompt && (
        <div>
          <input
            type="checkbox"
            id="include-negative-prompt"
            name="include-negative-prompt"
            onChange={handleNegativePromptToggle}
            checked={includeNegativePrompt}
          />
          <label htmlFor="include-negative-prompt">
            Include negative prompt
          </label>
        </div>
      )}
      <fieldset>
        <legend className="visually-hidden">{group.title}</legend>
        {!isNegativePrompt || (isNegativePrompt && includeNegativePrompt) ? (
          <>
            <div className="checkbox-container">
              {sortedItems.map((item) => (
                <div key={`${group.id}-${item}`}>
                  <input
                    type="checkbox"
                    id={`${group.id}-${item}`}
                    name={item}
                    value={item}
                    onChange={(e) => handleChange(e, item)}
                    checked={selectedOptions.has(item)}
                  />
                  <label htmlFor={`${group.id}-${item}`}>{item}</label>
                </div>
              ))}
            </div>
            <div className="break" />
            <div className="child-groups">
              {group.children && renderChildGroups(group.children)}
            </div>
            <div className="break" />
            <div className="other-option">
              <div className="other-option-checkbox">
                <input
                  type="checkbox"
                  id={`${group.id}-other`}
                  name="other"
                  value="Other"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleChange(e, `other-${group.id}`);
                    } else {
                      const newSelectedOptions = new Set(selectedOptions);
                      newSelectedOptions.delete(`other-${group.id}`);
                      handleChange(
                        { target: { checked: false } },
                        `other-${group.id}`
                      );
                    }
                  }}
                />
                <label htmlFor={`${group.id}-other`}>Other:</label>
              </div>
              <textarea
                type="text"
                className="other-option-input"
                id={`${group.id}-other-text`}
                name={`${group.id}-other-text`}
                aria-labelledby={`${group.id}-other-label`}
                disabled={!selectedOptions.has(`other-${group.id}`)}
                onChange={(e) => handleOtherChange(e, group)}
                style={{
                  display: selectedOptions.has(`other-${group.id}`)
                    ? "flex"
                    : "none",
                }}
              />
            </div>
          </>
        ) : null}
      </fieldset>
    </details>
  );
};

OptionsGroup.propTypes = {
  group: PropTypes.object.isRequired,
  selectedOptions: PropTypes.instanceOf(Set).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleOtherChange: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  isNegativePrompt: PropTypes.bool,
  includeNegativePrompt: PropTypes.bool,
  handleNegativePromptToggle: PropTypes.func,
};

export default OptionsGroup;
