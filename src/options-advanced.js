const OptionsAdvanced = [
  // Existing options
  {
    id: "--r",
    label: "Number of images",
    type: "number",
    min: 1,
    max: 100,
  },
  {
    id: "--seed",
    label: "Seed",
    type: "number",
    min: 1,
    max: 10000000000,
  },
  {
    id: "control-image",
    label: "Control Image Path",
    type: "text",
  },
  {
    id: "--steps",
    label: "Number generation steps",
    type: "number",
    min: 1,
    max: 1000,
  },

  // New options
  {
    id: "--negative-prompt",
    label: "Negative prompt",
    type: "text",
  },
  {
    id: "--prompt-strength",
    label: "Prompt strength",
    type: "number",
    min: 0.1,
    max: 10,
  },
  {
    id: "--init-image",
    label: "Starting image",
    type: "text",
  },
  {
    id: "--init-image-strength",
    label: "Starting image strength",
    type: "number",
    min: 0,
    max: 1,
  },
  {
    id: "--outdir",
    label: "Output directory",
    type: "text",
  },
  {
    id: "--output-file-extension",
    label: "Output file extension",
    type: "select",
    options: [
      { value: "jpg", label: "JPG" },
      { value: "png", label: "PNG" },
    ],
  },
  {
    id: "--height",
    label: "Image height",
    type: "number",
    min: 8,
    step: 8,
  },
  {
    id: "--width",
    label: "Image width",
    type: "number",
    min: 8,
    step: 8,
  },
  // ... add more options as needed
];

export default OptionsAdvanced;
