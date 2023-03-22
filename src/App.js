import React, { useState } from "react";
import options from "./options";
import preSelectedNegativePrompts from "./preselected-neg-prompts";
import SubjectInput from "./components/subject-input";
import OptionsGroup from "./components/options-group";
import OutputSection from "./components/output-section";
import AdvancedOptionsGroup from "./components/advanced-options-group";

import "./styles.css";

const App = () => {
  const [subject, setSubject] = useState("");
  const [includeNegativePrompt, setIncludeNegativePrompt] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [output, setOutput] = useState("");
  const [otherOptions, setOtherOptions] = useState({});
  const [isNegativePromptExpanded] = useState(false);

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

  const updateOutput = (subject, selectedOptions, otherOptions) => {
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
    console.log(combinedOptions.length);
    setOutput(
      `imagine "${subject}${
        combinedOptions.length > 0 ? ", " + combinedOptions.join(", ") : ""
      }"${
        negativePrompts.length
          ? ` --negative-prompt "${negativePrompts.join(", ")}"`
          : ""
      }`
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

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const item = options
      .find((group) => group.id === "advanced-options-group")
      .items.find((i) => i.id === id);

    const newSelectedOptions = new Map(selectedOptions);

    if (type === "checkbox") {
      if (checked) {
        newSelectedOptions.set(id, `${item.command} ${value}`);
      } else {
        newSelectedOptions.delete(id);
      }
    } else {
      newSelectedOptions.set(id, `${item.command} ${value}`);
    }

    setSelectedOptions(newSelectedOptions);
    // Update the output as needed
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
      {options
        .filter((group) => group.id === "multi-input-group")
        .map((group) => (
          <AdvancedOptionsGroup
            key={group.id}
            group={group}
            selectedOptions={selectedOptions}
            handleInputChange={handleInputChange}
          />
        ))}

      <OutputSection
        output={output}
        handleReset={handleReset}
        handleCopyClick={handleCopyClick}
      />
    </div>
  );
};

export default App;
