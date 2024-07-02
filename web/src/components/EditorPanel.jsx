import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import PropTypes from "prop-types";

const EditorPanel = ({
  initialCode = "",
  initialTheme = "vs-dark",
  language = "markdown",
  height = "80vh",
  width = "100%",
  themeOptions = ["cobalt", "vs-dark", "light", "hc-black"],
  resetLabel = "Reset",
  onEditorChange,
  isDisabledSubmit,
  onSubmit,
}) => {
  // const [code, setCode] = useState(initialCode);
  const [theme, setTheme] = useState(initialTheme);
  const [value, setValue] = useState(initialCode);

  const handleEditorChange = (value) => {
    setValue(value);
    if (onEditorChange) {
      onEditorChange(value);
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const resetCode = () => {
    setValue(initialCode);
  };

  return (
    <div className="flex flex-col flex-grow bg-base-100 p-4 w-full">
      <div className="flex items-center ml-auto space-x-4 mb-2">
        <select
          value={theme}
          onChange={handleThemeChange}
          className="select select-sm select-bordered w-full max-w-xs"
        >
          {themeOptions.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption}
            </option>
          ))}
        </select>
        <button className="btn btn-sm btn-warning" onClick={resetCode}>
          {resetLabel}
        </button>
        <button
          className="btn btn-sm btn-success"
          disabled={isDisabledSubmit}
          onClick={() => onSubmit(value)}
        >
          Submit
        </button>
      </div>
      <div className="mb-2">
        <Editor
          height={height}
          width={width}
          language={language}
          value={value}
          theme={theme}
          defaultValue={initialCode}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

EditorPanel.propTypes = {
  initialCode: PropTypes.string,
  initialTheme: PropTypes.string,
  language: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  themeOptions: PropTypes.arrayOf(PropTypes.string),
  resetLabel: PropTypes.string,
  onEditorChange: PropTypes.func,
  isDisabledSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

export default EditorPanel;
