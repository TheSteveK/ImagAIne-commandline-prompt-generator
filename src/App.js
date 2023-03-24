import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    updateOutput();
  }, [subject, selectedOptions, otherOptions, advancedOptions]);

  const handleNegativePromptToggle = (e) => {
    setIncludeNegativePrompt(e.target.checked);
    const newSelectedOptions = new Set(selectedOptions);
    preSelectedNegativePrompts.forEach((item) => {
      if (e.target.checked) {
        newSelectedOptions.add(item);
      } else {
        newSelectedOptions.delete(item);
      }
    });
    setSelectedOptions(newSelectedOptions);
  };

  const handleChange = (e, item) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (e.target.checked) {
      newSelectedOptions.add(item);
    } else {
      newSelectedOptions.delete(item);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const updateOutput = () => {
    const negativePrompts = [];
    const otherOptionsList = [];
    const finalOptions = [];

    [...selectedOptions].forEach((option) => {
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
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => {
        if (value === key) {
          return `${value}`;
        } else {
          return `${key} ${value}`;
        }
      })
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
  };

  const handleAdvancedOptions = (e) => {
    const { id, value, checked, type } = e.target;

    const updatedAdvancedOptions = { ...advancedOptions };

    if (type === "checkbox") {
      if (checked) {
        updatedAdvancedOptions[id] = id;
      } else {
        delete updatedAdvancedOptions[id];
      }
    } else {
      updatedAdvancedOptions[id] = value;
    }

    setAdvancedOptions(updatedAdvancedOptions);
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
