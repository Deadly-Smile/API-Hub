import useForm from "../hooks/useForm";
import PropTypes from "prop-types";

const ParameterForm = ({ onSubmit, submitText }) => {
  const [formState, handleChange, resetForm, setFormState, handleFileChange] =
    useForm({
      parameter_name: "",
      is_file: false,
      file: null,
      text: "",
      is_default: false,
      is_required: true,
    });

  // const handleFileChange = (e) => {
  //   setFormState({
  //     ...formState,
  //     file: e.target.files[0],
  //   });
  // };

  const handleArgumentTypeChange = (e) => {
    const isFile = e.target.value === "File";
    setFormState({
      ...formState,
      is_file: isFile,
    });
  };

  const handleParameterTypeChange = (e) => {
    const isDefault = e.target.value === "Default";
    setFormState({
      ...formState,
      is_default: isDefault,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    resetForm();
  };

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      {/* data form */}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Parameter Name:</span>
          </label>
          <input
            type="text"
            name="parameter_name"
            value={formState.parameter_name}
            onChange={handleChange}
            placeholder="Enter parameter name..."
            className="input input-bordered input-accent"
          />
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Parameter type:</span>
            <select
              className="select select-accent w-full max-w-xs"
              onChange={handleParameterTypeChange}
            >
              <option defaultValue>User input</option>
              <option>Default</option>
            </select>
            {/* <input
              type="checkbox"
              name="is_default"
              checked={formState.is_default}
              onChange={(e) =>
                handleChange({
                  target: { name: "is_default", value: e.target.checked },
                })
              }
              className="checkbox checkbox-accent"
            /> */}
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Argument type:</span>
            <select
              className="select select-accent w-full max-w-xs"
              onChange={handleArgumentTypeChange}
            >
              <option defaultValue>Text</option>
              <option>File</option>
            </select>
            {/* <input
              type="checkbox"
              name="is_file"
              checked={formState.is_file}
              onChange={(e) =>
                handleChange({
                  target: { name: "is_file", value: e.target.checked },
                })
              }
              className="checkbox checkbox-accent"
            /> */}
          </label>
        </div>
        {formState.is_default ? (
          formState.is_file ? (
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">File:</span>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered checkbox-accent"
                />
              </label>
            </div>
          ) : (
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Text:</span>
                <textarea
                  name="text"
                  value={formState.text}
                  onChange={handleChange}
                  className="textarea textarea-bordered textarea-accent"
                />
              </label>
            </div>
          )
        ) : (
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Is Required:</span>
              <input
                type="checkbox"
                name="is_required"
                checked={formState.is_required}
                onChange={(e) =>
                  handleChange({
                    target: { name: "is_required", value: e.target.checked },
                  })
                }
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        )}
        <div className="flex justify-end">
          <button className="btn btn-success mx-2" type="submit">
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

ParameterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default ParameterForm;
