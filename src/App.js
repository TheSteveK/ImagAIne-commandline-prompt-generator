import React, { useState } from "react";
import options from "./options";
import SubjectInput from "./components/subject-input";
import OptionsGroup from "./components/options-group";
import OutputSection from "./components/output-section";
import AdvancedOptions from "./components/advanced-options";
import useGenerateOutput from "./hooks/generate-output";
import useOptions from "./hooks/use-options";

import "./styles.css";

const App = () => {
  // const [subject, setSubject] = useState("");
  const [output, setOutput] = useState("");

  const {
    includeNegativePrompt,
    subject,
    selectedOptions,
    otherOptions,
    advancedOptions,
    handleNegativePromptToggle,
    handleChange,
    handleOtherChange,
    handleAdvancedOptions,
    resetOptions,
    handleSubjectChange,
  } = useOptions();

  useGenerateOutput(
    subject,
    selectedOptions,
    otherOptions,
    advancedOptions,
    setOutput
  );

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
      <OutputSection output={output} handleReset={resetOptions} />;
    </div>
  );
};

export default App;
