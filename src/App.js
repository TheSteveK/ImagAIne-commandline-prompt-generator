import React, { useState } from 'react';
import options from './options';

import './styles.css'

const App = () => {
  const [subject, setSubject] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [output, setOutput] = useState('');
  const [otherOptions, setOtherOptions] = useState({});

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
      if (option.startsWith('other-')) {
        const groupId = option.slice(6);
        if (otherOptions[groupId]) {
          if (groupId === 'negative-prompt') {
            negativePrompts.push(otherOptions[groupId]);
          } else {
            otherOptionsList.push(otherOptions[groupId]);
          }
        }
      } else if (options[0].items.includes(option)) {
        negativePrompts.push(option);
      } else {
        otherOptionsList.push(option);
      }
    });
  
    setOutput(
      `imagine "${subject}, ${otherOptionsList.join(', ')}"${
        negativePrompts.length ? ` --negative-prompt "${negativePrompts.join(', ')}"` : ''
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
      `imagine "${e.target.value}, ${otherOptions.join(', ')}"${
        negativePrompts.length ? ` --negative-prompt "${negativePrompts.join(', ')}"` : ''
      }`
    );
  };

  const updateOutput = (subject, selectedOptions, otherOptions) => {
    const negativePrompts = [];
    const otherOptionsList = [];
    const finalOptions = [];
  
    Array.from(selectedOptions).forEach((option) => {
      if (option.startsWith('other-')) {
        const groupId = option.slice(6);
        if (otherOptions[groupId]) {
          if (groupId === 'negative-prompt') {
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
  
    setOutput(
      `imagine "${subject}, ${[...finalOptions, ...otherOptionsList].join(', ')}"${
        negativePrompts.length ? ` --negative-prompt "${negativePrompts.join(', ')}"` : ''
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
  

  const handleReset = () => {
    setSubject('');
    setSelectedOptions(new Set());
    setOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div>
      <h1>Image Generation AI Prompt</h1>
      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={subject}
        onChange={handleSubjectChange}
      />
  
      {options.map((group) => (
        <details key={group.id} className="checkbox-group">
          <summary>{group.title}</summary>
          <fieldset>
            <legend className="visually-hidden">{group.title}</legend>
            {group.items.map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  id={`${group.id}-${item}`}
                  name={item}
                  value={item}
                  onChange={(e) => handleChange(e, item)}
                />
                <label htmlFor={`${group.id}-${item}`}>{item}</label>
              </div>
            ))}
            <div>
              <input
                type="checkbox"
                id={`${group.id}-other`}
                name="other"
                value="Other"
                onChange={(e) => {
                  if (e.target.checked) {
                    const newSelectedOptions = new Set(selectedOptions);
                    newSelectedOptions.add(`other-${group.id}`);
                    setSelectedOptions(newSelectedOptions);
                  } else {
                    const newSelectedOptions = new Set(selectedOptions);
                    newSelectedOptions.delete(`other-${group.id}`);
                    setSelectedOptions(newSelectedOptions);
                    updateOutput(subject, newSelectedOptions, otherOptions);
                  }
                }}
              />
              <label htmlFor={`${group.id}-other`}>Other:</label>
              <input
                type="text"
                id={`${group.id}-other-text`}
                name={`${group.id}-other-text`}
                aria-labelledby={`${group.id}-other-label`}
                disabled={!selectedOptions.has(`other-${group.id}`)}
                onChange={(e) => handleOtherChange(e, group)}
                style={{ display: selectedOptions.has(`other-${group.id}`) ? 'inline-block' : 'none' }}
              />
              <span
                id={`${group.id}-other-label`}
                style={{ display: selectedOptions.has(`other-${group.id}`) ? 'inline' : 'none' }}
              >
                (Separate multiple prompts with a comma)
              </span>
            </div>
          </fieldset>
        </details>
      ))}
  
      <button onClick={handleReset}>Reset</button>
  
      <h2>Output</h2>
      <textarea readOnly value={output} />
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
    </div>
  );
  
};

export default App;
