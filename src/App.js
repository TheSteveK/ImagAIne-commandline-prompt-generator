/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import options from "./options";
import preSelectedNegativePrompts from "./preselected-neg-prompts";
import SubjectInput from "./components/subject-input";
import OptionsGroup from "./components/options-group";
import OutputSection from "./components/output-section";
import AdvancedOptions from "./components/advanced-options";

import "./styles.css";

const App = () => {
  const [subject, setSubject] = useState("");
  const [includeNegativePrompt, setIncludeNegativePrompt] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [output, setOutput] = useState("");
  const [otherOptions, setOtherOptions] = useState({});
  const [isNegativePromptExpanded] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState({});

  const handleNegativePromptToggle = (e) => {
    setIncludeNegativePrompt(e.target.checked);
    if (e.target.checked) {
      const newSelectedOptions = new Set([
        ...selectedOptions,
        ...preSelectedNegativePrompts,
      ]);
      setSelectedOptions(newSelectedOptions);
      updateOutput(subject, newSelectedOptions, otherOptions);
    } else {
      const newSelectedOptions = new Set(
        [...selectedOptions].filter((item) => {
          return (
            !preSelectedNegativePrompts.includes(item) &&
            !item.startsWith("other-negative-prompt") &&
            !options[0].items.includes(item)
          );
        })
      );
      setSelectedOptions(newSelectedOptions);
      updateOutput(subject, newSelectedOptions, otherOptions);
    }
  };

  const handleChange = (e, item) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (e.target.checked) {
      newSelectedOptions.add(item);
    } else {
      newSelectedOptions.delete(item);
    }
    setSelectedOptions(newSelectedOptions);

    const negativePrompts = [];
    const otherOptionsList = [];

    Array.from(newSelectedOptions).forEach((option) => {
      if (option.startsWith("other-")) {
        const groupId = option.slice(6);
        if (otherOptions[groupId]) {
          if (groupId === "negative-prompt") {
            negativePrompts.push(otherOptions[groupId]);
          } else {
            otherOptionsList.push(otherOptions[groupId]);
          }
        }
      } else if (includeNegativePrompt && options[0].items.includes(option)) {
        negativePrompts.push(option);
      } else {
        otherOptionsList.push(option);
      }
    });

    setOutput(
      `imagine "${subject}, ${otherOptionsList.join(", ")}"${
        negativePrompts.length
          ? ` --negative-prompt "${negativePrompts.join(", ")}"`
          : ""
      }`
    );
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);

    const negativePrompts = [];
    const otherOptions = [];

    Array.from(selectedOptions).forEach((option) => {
      if (options[0].items.includes(option)) {
        negativePrompts.push(option);
      } else {
        otherOptions.push(option);
      }
    });

    setOutput(
      `imagine "${e.target.value}, ${otherOptions.join(", ")}"${
        negativePrompts.length
          ? ` --negative-prompt "${negativePrompts.join(", ")}"`
          : ""
      }`
    );
  };

  const updateOutput = (
    subject,
    selectedOptions,
    otherOptions,
    advancedOptions
  ) => {
    const negativePrompts = [];
    const otherOptionsList = [];
    const finalOptions = [];

    Array.from(selectedOptions).forEach((option) => {
      if (option.startsWith("other-")) {
        const groupId = option.slice(6);
        if (otherOptions[groupId]) {
          if (groupId === "negative-prompt") {
            negativePrompts.push(otherOptions[groupId]);
          } else {
            otherOptionsList.push(otherOptions[groupId]);
          }
        }
      } else if (options[0].items.includes(option)) {
        negativePrompts.push(option);
      } else {
        finalOptions.push(option);
      }
    });

    const combinedOptions = [...finalOptions, ...otherOptionsList];

    const advancedOptionsString = Object.entries(advancedOptions)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => `${key} ${value}`)
      .join(" ");

    setOutput(
      `imagine "${subject}${
        combinedOptions.length > 0 ? ", " + combinedOptions.join(", ") : ""
      }"${
        negativePrompts.length
          ? ` --negative-prompt "${negativePrompts.join(", ")}"`
          : ""
      } ${advancedOptionsString}`
    );
  };

  const handleOtherChange = (e, group) => {
    const updatedOtherOptions = {
      ...otherOptions,
      [group.id]: e.target.value,
    };
    setOtherOptions(updatedOtherOptions);

    const newSelectedOptions = new Set(selectedOptions);
    newSelectedOptions.add(`other-${group.id}`);
    setSelectedOptions(newSelectedOptions);
    updateOutput(subject, newSelectedOptions, updatedOtherOptions);
  };

  const handleAdvancedOptions = (e) => {
    const { id, value, checked, type } = e.target;

    // Create a copy of the current advanced options state
    const updatedAdvancedOptions = { ...advancedOptions };

    if (type === "checkbox") {
      // Update the advanced options state with the checkbox value
      updatedAdvancedOptions[id] = checked;
    } else {
      // Update the advanced options state with the input value
      updatedAdvancedOptions[id] = value;
    }

    // Update the advanced options state with the new value
    setAdvancedOptions(updatedAdvancedOptions);

    // Update the output string with the new advanced option
    updateOutput(subject, selectedOptions, otherOptions, {
      ...advancedOptions,
      ...updatedAdvancedOptions,
    });
  };

  const handleReset = () => {
    setSubject("");
    setSelectedOptions(new Set());
    setOutput("");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="container">
      <h1>Image Generation AI Prompt</h1>
      <label htmlFor="subject">Subject (prompt):</label>
      <SubjectInput
        subject={subject}
        handleSubjectChange={handleSubjectChange}
      />
      <OptionsGroup
        group={options[0]}
        selectedOptions={selectedOptions}
        handleChange={handleChange}
        handleOtherChange={handleOtherChange}
        isExpanded={isNegativePromptExpanded}
        isNegativePrompt={true}
        includeNegativePrompt={includeNegativePrompt}
        handleNegativePromptToggle={handleNegativePromptToggle}
      />
      {options.slice(1).map((group) => (
        <OptionsGroup
          key={group.id}
          group={group}
          selectedOptions={selectedOptions}
          handleChange={handleChange}
          handleOtherChange={handleOtherChange}
        />
      ))}
      <AdvancedOptions handleAdvancedOptions={handleAdvancedOptions} />

      <OutputSection
        output={output}
        handleReset={handleReset}
        handleCopyClick={handleCopyClick}
      />
    </div>
  );
};

export default App;
