import { useEffect } from "react";
import options from "../options";

const useGenerateOutput = (
  subject,
  selectedOptions,
  otherOptions,
  advancedOptions,
  setOutput
) => {
  useEffect(() => {
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

    updateOutput();
  }, [subject, selectedOptions, otherOptions, advancedOptions, setOutput]);
};

export default useGenerateOutput;
