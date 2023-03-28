// ./hooks/use-options.js
import { useState } from "react";
import preSelectedNegativePrompts from "../preselected-neg-prompts";
import OptionsAdvanced from "../options-advanced";

const initialAdvancedOptions = OptionsAdvanced.reduce((acc, option) => {
  if (option.defaultValue !== undefined) {
    acc[option.id] = option.defaultValue;
  }
  return acc;
}, {});

const useOptions = () => {
  const [subject, setSubject] = useState("");
  const [includeNegativePrompt, setIncludeNegativePrompt] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [otherOptions, setOtherOptions] = useState({});
  const [advancedOptions, setAdvancedOptions] = useState(
    initialAdvancedOptions
  );

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleNegativePromptToggle = (e) => {
    const isChecked = e.target.checked;
    setIncludeNegativePrompt(isChecked);

    const newSelectedOptions = new Set(selectedOptions);
    preSelectedNegativePrompts.forEach((item) => {
      if (isChecked) {
        newSelectedOptions.add(item);
      } else {
        newSelectedOptions.delete(item);
      }
    });
    setSelectedOptions(newSelectedOptions);

    if (!isChecked) {
      // Clear negative prompt-related otherOptions when includeNegativePrompt is unchecked
      const updatedOtherOptions = { ...otherOptions };
      preSelectedNegativePrompts.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(updatedOtherOptions, item)) {
          delete updatedOtherOptions[item];
        }
      });
      setOtherOptions(updatedOtherOptions);
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

  return {
    subject,
    handleSubjectChange,
    includeNegativePrompt,
    selectedOptions,
    otherOptions,
    advancedOptions,
    handleNegativePromptToggle,
    handleChange,
    handleOtherChange,
    handleAdvancedOptions,
  };
};

export default useOptions;
