import React, { useState } from "react";
import options from "./options";
import SubjectInput from "./components/subject-input";
import OptionsGroup from "./components/options-group";
import OutputSection from "./components/output-section";
import ButtonsSection from "./components/buttons-section";
import AdvancedOptions from "./components/advanced-options";
import useGenerateOutput from "./hooks/generate-output";
import useOptions from "./hooks/use-options";
import Header from "./components/header";

import "./styles.css";

const App = () => {
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
    handleReset,
    handleSubjectChange,
  } = useOptions();

  useGenerateOutput(
    subject,
    selectedOptions,
    otherOptions,
    advancedOptions,
    includeNegativePrompt,
    setOutput
  );

  return (
    <div className="container">
      <Header />
      <ButtonsSection handleReset={handleReset} output={output} />
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
      <AdvancedOptions
        handleAdvancedOptions={handleAdvancedOptions}
        advancedOptions={advancedOptions}
      />
      <OutputSection output={output} handleReset={handleReset} />;
    </div>
  );
};

export default App;
