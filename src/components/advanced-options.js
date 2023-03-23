import React from "react";
import PropTypes from "prop-types";
import optionsAdvanced from "../options-advanced";

const AdvancedOptions = ({ handleAdvancedOptions }) => {
  return (
    <details className="advanced-options">
      <summary>Advanced Options</summary>
      <fieldset>
        <legend className="visually-hidden">Advanced Options</legend>
        {optionsAdvanced.map((item) => {
          if (item.type === "number" || item.type === "text") {
            return (
              <div key={item.id}>
                <label htmlFor={item.id}>{item.label}:</label>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.id}
                  min={item.min && item.min}
                  max={item.max && item.max}
                  onChange={handleAdvancedOptions}
                />
              </div>
            );
          } else if (item.type === "checkbox") {
            return (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                  onChange={handleAdvancedOptions}
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
            );
          } else if (item.type === "select") {
            return (
              <div key={item.id}>
                <label htmlFor={item.id}>{item.label}:</label>
                <select
                  id={item.id}
                  name={item.id}
                  onChange={handleAdvancedOptions}
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
          // Add more input types here if necessary
          return null;
        })}
      </fieldset>
    </details>
  );
};

AdvancedOptions.propTypes = {
  optionsAdvanced: PropTypes.array.isRequired,
  handleAdvancedOptions: PropTypes.func.isRequired,
};

export default AdvancedOptions;
