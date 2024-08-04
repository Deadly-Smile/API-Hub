import { useState } from "react";
import PropTypes from "prop-types";

const ModelTestForm = ({ parameters, onSubmit, componentId }) => {
  const initialState = parameters.reduce((acc, parameter) => {
    if (!parameter.is_default) {
      acc[`${parameter.id}`] = parameter.is_file ? null : "";
    }
    return acc;
  }, {});

  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormState((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const renderForm = () => {
    return parameters.map((parameter, index) => {
      if (parameter.is_default) return null;
      const inputName = `${parameter.id}`;

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
                name={inputName}
                onChange={handleFileChange}
                required={parameter.is_required}
              />
            ) : (
              <textarea
                className="textarea textarea-bordered textarea-accent"
                name={inputName}
                value={formState[inputName] || ""}
                onChange={handleChange}
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
      {parameters.every((param) => param.is_default) && (
        <label>No fillable inputs</label>
      )}
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
