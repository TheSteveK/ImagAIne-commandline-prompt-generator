import React from "react";
import PropTypes from "prop-types";
import optionsAdvanced from "../options-advanced";

// eslint-disable-next-line react/prop-types
const AdvancedOptions = ({ handleAdvancedOptions, advancedOptions }) => {
  const getWidthBasedOnMax = (max) => {
    const numberOfDigits = Math.floor(Math.log10(max)) + 1;
    return `${numberOfDigits + 1.5}ch`;
  };

  const renderOptions = (importance) =>
    optionsAdvanced
      .filter((item) => item.importance === importance)
      .map((item) => {
        if (item.type === "select") {
          return (
            <div key={item.id} className={item.importance}>
              <label htmlFor={item.id}>{item.label}:</label>
              <select
                id={item.id}
                name={item.id}
                onChange={handleAdvancedOptions}
                value={advancedOptions[item.id] || ""} // Set the value using advancedOptions
              >
                {item.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        return (
          <div key={item.id} className={item.importance}>
            <label htmlFor={item.id}>{item.label}:</label>
            <input
              type={item.type}
              id={item.id}
              name={item.id}
              min={item.min && item.min}
              max={item.max && item.max}
              onChange={handleAdvancedOptions}
              value={advancedOptions[item.id] || ""} // Set the value using advancedOptions
              style={
                item.type === "number"
                  ? { width: getWidthBasedOnMax(item.max) }
                  : {}
              }
            />
          </div>
        );
      });

  return (
    <details className="advanced-options">
      <summary>Advanced Options</summary>
      <fieldset>
        <legend className="visually-hidden">Advanced Options</legend>
        <div className="primary">
          <div className="group-title">Primary</div>
          {renderOptions("primary")}
        </div>
        <div className="secondary">
          <div className="group-title">Secondary</div>
          {renderOptions("secondary")}
        </div>
        <div className="tertiary">
          <div className="group-title">Tertiary</div>
          {renderOptions("tertiary")}
        </div>
      </fieldset>
    </details>
  );
};

AdvancedOptions.propTypes = {
  handleAdvancedOptions: PropTypes.func.isRequired,
};

export default AdvancedOptions;
