import React from "react";
import PropTypes from "prop-types";

const AdvancedOptionsGroup = ({ group, handleInputChange }) => {
  return (
    <details className="advanced-options-group">
      <summary>{group.title}</summary>
      <fieldset>
        <legend className="visually-hidden">{group.title}</legend>
        {group.items.map((item) => {
          if (item.type === "checkbox") {
            return (
              <div key={item.id}>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.id}
                  value={item.command}
                  onChange={handleInputChange}
                />
                <label htmlFor={item.id}>{item.label}</label>
              </div>
            );
          } else if (item.type === "number") {
            return (
              <div key={item.id}>
                <label htmlFor={item.id}>{item.label}:</label>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.id}
                  min={item.min}
                  max={item.max}
                  onChange={handleInputChange}
                />
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

AdvancedOptionsGroup.propTypes = {
  group: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default AdvancedOptionsGroup;
