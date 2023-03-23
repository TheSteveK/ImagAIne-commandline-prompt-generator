const OptionsAdvanced = [
  // Existing options
  {
    id: "--r",
    label: "Number of images",
    type: "number",
    min: 1,
    max: 100,
    importance: "primary",
  },
  {
    id: "--seed",
    label: "Seed",
    type: "number",
    min: 1,
    max: 10000000000,
    importance: "primary",
  },
  {
    id: "control-image",
    label: "Control Image Path",
    type: "text",
    importance: "tertiary",
  },
  {
    id: "--steps",
    label: "Number of steps",
    type: "number",
    min: 1,
    max: 1000,
    importance: "primary",
  },
  {
    id: "--prompt-strength",
    label: "Prompt strength",
    type: "number",
    min: 0.1,
    max: 10,
    importance: "secondary",
  },
  {
    id: "--init-image",
    label: "Starting image",
    type: "text",
    importance: "secondary",
  },
  {
    id: "--init-image-strength",
    label: "Starting image strength",
    type: "number",
    min: 0,
    max: 1,
    importance: "secondary",
  },
  {
    id: "--outdir",
    label: "Output directory",
    type: "text",
    importance: "tertiary",
  },
  {
    id: "--output-file-extension",
    label: "Output file extension",
    type: "select",
    options: [
      { value: "jpg", label: "JPG" },
      { value: "png", label: "PNG" },
    ],
    importance: "secondary",
  },
  {
    id: "--height",
    label: "Image height",
    type: "number",
    min: 8,
    step: 8,
    max: 10000,
    importance: "primary",
  },
  {
    id: "--width",
    label: "Image width",
    type: "number",
    min: 8,
    step: 8,
    max: 10000,
    importance: "primary",
  },
  // ... add more options as needed
];

export default OptionsAdvanced;
