import { useState } from "react";
import PropTypes from "prop-types";

const ModelTestForm = ({ parameters, onSubmit, componentId }) => {
  const initialFormState = parameters
    .filter((parameter) => !parameter.is_default)
    .map((parameter) => ({
      id: parameter.id,
      value: parameter.is_file ? null : "",
      is_file: parameter.is_file,
    }));
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e, index) => {
    const { value } = e.target;
    setFormState((prevState) =>
      prevState.map((param, i) => (i === index ? { ...param, value } : param))
    );
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setFormState((prevState) =>
      prevState.map((param, i) =>
        i === index ? { ...param, value: file } : param
      )
    );
  };

  const renderForm = () => {
    return formState.map((param, index) => {
      const parameter = parameters.find((p) => p.id === param.id);
      return (
        <div
          key={index}
          className="form-control p-2 rounded-lg hover:bg-base-300"
        >
          <label className="cursor-pointer label">
            <span className="label-text">{parameter.parameter_name}:</span>
            {parameter.is_file ? (
              <input
                className="file-input file-input-bordered checkbox-accent"
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                required={parameter.is_required}
              />
            ) : (
              <textarea
                className="textarea textarea-bordered textarea-accent"
                value={param.value}
                onChange={(e) => handleChange(e, index)}
                required={parameter.is_required}
              />
            )}
          </label>
        </div>
      );
    });
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formState);
        document.getElementById(componentId).close();
      }}
    >
      {formState.length === 0 && <label>No fillable inputs</label>}
      {renderForm()}
      <div className="flex justify-end">
        <button type="submit" className="btn btn-accent">
          Submit
        </button>
      </div>
    </form>
  );
};

ModelTestForm.propTypes = {
  parameters: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
};

export default ModelTestForm;
