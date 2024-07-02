import PropTypes from "prop-types";
import Image1 from "../assets/Untitled.png";
import Image2 from "../assets/Untitled(1).png";

const backEndURL = import.meta.env.VITE_BACKEND_URL;
const ModelFormPanel = ({
  isDisabledName,
  isDisabledModel,
  isDisabledImage,
  handleModelFormSubmit,
  handleImageSubmit,
  handleFileChange,
  handleNameChange,
  name,
  imageSrc,
}) => {
  const notFoundImage =
    localStorage.getItem("theme") === "light" ? Image2 : Image1;

  return (
    <div
      id="form-list"
      className="flex flex-col flex-grow bg-base-100 p-4 space-y-2"
    >
      <div>
        <label className="form-control w-full text-xl">Enter model name</label>
        <input
          type="text"
          placeholder="Model name..."
          className="input w-full max-w-xs input-sm"
          disabled={isDisabledName}
          name="name"
          value={name || ""}
          onChange={handleNameChange}
        />
      </div>
      <div id="model-form" className="flex flex-col items-start space-y-2">
        <label className="form-control text-xl w-full">
          Insert your properly trained AI model file
        </label>
        <div className="flex items-center space-x-2 w-full">
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm file-input-accent w-full max-w-xs"
            disabled={isDisabledModel}
            name="model"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-success btn-sm"
            disabled={isDisabledModel}
            onClick={handleModelFormSubmit}
          >
            Submit model file
          </button>
        </div>
      </div>
      <div
        id="example-image-form"
        className="flex flex-col items-start space-y-2"
      >
        <label className="form-control text-xl w-full">
          Insert an example image for testing the model and script
        </label>
        <div className="flex items-center space-x-2 w-full">
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm file-input-accent w-full max-w-xs"
            disabled={isDisabledImage}
            name="image"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-success btn-sm"
            disabled={isDisabledImage}
            onClick={handleImageSubmit}
          >
            Submit test image
          </button>
        </div>
      </div>
      <div className="flex flex-row" id="output_area">
        <div className="avatar rounded-sm">
          <div className="w-72">
            <img
              src={imageSrc ? `${backEndURL}${imageSrc}` : notFoundImage}
              alt="Counldn't load test image"
            />
          </div>
        </div>

        <div className="mockup-code rounded-sm">
          <pre data-prefix="$">
            <code>Prediction result</code>
          </pre>
          <pre data-prefix=">" className="text-warning">
            <code>will be shown</code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>here</code>
          </pre>
        </div>
      </div>

      <div
        id="below-button-list"
        className="flex justify-end space-x-2 pr-4 space-y-2"
      >
        <button className="btn btn-error">Cancel</button>
      </div>
    </div>
  );
};

ModelFormPanel.propTypes = {
  isDisabledModel: PropTypes.bool.isRequired,
  isDisabledImage: PropTypes.bool.isRequired,
  isDisabledName: PropTypes.bool.isRequired,
  handleModelFormSubmit: PropTypes.func.isRequired,
  handleImageSubmit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

export default ModelFormPanel;
