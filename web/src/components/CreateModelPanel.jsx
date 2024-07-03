import { useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import {
  useCreateModelMutation,
  useDeleteModelMutation,
  useUploadDocumentMutation,
  useUploadPythonScriptMutation,
  useUploadTestImageMutation,
} from "../store";
import PythonScriptSnippet from "../constants/PythonScriptSnippet";
import MarkDownSnippet from "../constants/MarkDownSnippet";
import NotActiveEditorSnippet from "../constants/NotActiveEditorSnippet";
import Image1 from "../assets/Untitled.png";
import Image2 from "../assets/Untitled(1).png";
import CodeLog from "./CodeLog";

const backEndURL = import.meta.env.VITE_BACKEND_URL;
const CreateModelPanel = () => {
  const notFoundImage =
    localStorage.getItem("theme") === "light" ? Image2 : Image1;
  const [createModel, createModelResult] = useCreateModelMutation();
  const [uploadTestImage, uploadTestImageResult] = useUploadTestImageMutation();
  const [uploadPythonScript, uploadPythonScriptResult] =
    useUploadPythonScriptMutation();
  const [uploadDocumentation, uploadDocumentationResult] =
    useUploadDocumentMutation();
  const [deleteModel, deleteModelResult] = useDeleteModelMutation();

  const [editorId, setEditorId] = useState(3);
  const [codeLog, setCodeLog] = useState({
    type: "Info",
    message: "Prediction result",
  });
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [modelFile, setModelFile] = useState(null);
  const [modelId, setModelId] = useState("");
  const [testImage, setTestImage] = useState("");
  const [isDisabledScript, setIsDisabledScript] = useState(true);
  const [isDisabledImage, setIsDisabledImage] = useState(true);
  const [isFulfiled, setIsFulfilled] = useState(false);

  const handleModelFormSubmit = (event) => {
    event.preventDefault();
    createModel({ name: name, model: modelFile, id: modelId });
  };

  const handleImageSubmit = (event) => {
    event.preventDefault();
    uploadTestImage({ image: image, id: modelId });
  };

  useEffect(() => {
    if (uploadTestImageResult.isSuccess) {
      setIsDisabledScript(false);
      // setActiveEditorId(1);
      setTestImage(uploadTestImageResult?.data?.image);
      setEditorId(1);
      // setCode(PythonScriptSnippet);
    }
  }, [uploadTestImageResult?.data?.image, uploadTestImageResult.isSuccess]);

  const handleFileChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0]);
    } else if (event.target.name === "model") {
      setModelFile(event.target.files[0]);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (createModelResult.isSuccess) {
      // setIsDisabledName(true);
      // setIsDisabledModel(true);
      setIsDisabledImage(false);
      setModelId(createModelResult?.data?.model?.id);
    }
  }, [createModelResult?.data?.model?.id, createModelResult.isSuccess]);

  const handleSubmitPython = (code) => {
    try {
      const pythonFile = new File([code], "script.py", {
        type: "text/x-python",
      });
      uploadPythonScript({ script: pythonFile, id: modelId });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitDoc = (code) => {
    try {
      const markdownFile = new File([code], "readme.md", {
        type: "text/markdown",
      });
      uploadDocumentation({ doc: markdownFile, id: modelId });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnAbort = () => {
    // todo: promt a confirmation
    deleteModel({ id: modelId });
  };

  const handleFinish = () => {
    // todo: promt user confirmation
  };

  useEffect(() => {
    if (uploadDocumentationResult.isSuccess) {
      // todo: should not be automatically switched editor
      setEditorId(1);
      //todo: getting result and show output of prediction
    }
  }, [uploadDocumentationResult.isSuccess]);

  useEffect(() => {
    if (uploadPythonScriptResult.isSuccess) {
      setIsFulfilled(true);
      setCodeLog({
        type: "success",
        message: uploadPythonScriptResult?.data?.output,
      });
      // todo: should not be automatically switched editor
      // setEditorId(2);
      //todo: getting result and show output of prediction
    }
    if (uploadPythonScriptResult.isError) {
      setCodeLog({
        type: "error",
        message: uploadPythonScriptResult?.error?.data?.message,
      });
    }
  }, [uploadPythonScriptResult]);

  return (
    <div className="flex w-full">
      <div className="w-2/5">
        <div
          id="form-list"
          className="flex flex-col flex-grow bg-base-100 p-4 space-y-4"
        >
          <div>
            <label className="form-control w-full text-lg">
              Enter model name
            </label>
            <input
              type="text"
              placeholder="Model name..."
              className="input w-full max-w-xs input-sm input-bordered"
              name="name"
              value={name || ""}
              onChange={handleNameChange}
            />
          </div>
          <div id="model-form" className="flex flex-col items-start space-y-4">
            <label className="form-control text-lg w-full">
              Trained AI model file
            </label>
            <div className="flex items-center space-x-2 w-full">
              <input
                type="file"
                className="file-input file-input-bordered file-input-sm file-input-accent w-full max-w-xs"
                name="model"
                onChange={handleFileChange}
              />
              <button
                className="btn btn-success btn-sm"
                onClick={handleModelFormSubmit}
              >
                Submit model
              </button>
            </div>
          </div>
          <div
            id="example-image-form"
            className="flex flex-col items-start space-y-4"
          >
            <label className="form-control text-lg w-full">Test Image</label>
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
                Submit image
              </button>
            </div>
          </div>
          <div className="flex flex-row" id="output_area">
            <div className="avatar rounded-sm">
              <div className="w-80">
                <img
                  src={testImage ? `${backEndURL}${testImage}` : notFoundImage}
                  alt="Counldn't load test image"
                />
              </div>
            </div>

            <CodeLog log={codeLog} />
          </div>

          <div id="below-button-list" className="flex justify-end ">
            <button className="btn btn-error mr-1" onClick={handleOnAbort}>
              Cancel
            </button>
            <button
              className="btn btn-info mr-1"
              disabled={!isFulfiled}
              onClick={() => setEditorId(2)}
            >
              Provide doc
            </button>
            <button
              className="btn btn-success"
              disabled={!isFulfiled}
              onClick={handleFinish}
            >
              Done!
            </button>
          </div>
        </div>
      </div>
      <div className="divider divider-horizontal max-w-2" />
      <div className="w-3/5">
        {editorId === 1 && (
          <EditorPanel
            initialCode={PythonScriptSnippet}
            language={"python"}
            isDisabledSubmit={false}
            // setCode={setCode}
            onSubmit={handleSubmitPython}
          />
        )}
        {editorId === 2 && (
          <EditorPanel
            initialCode={MarkDownSnippet}
            language={"markdown"}
            isDisabledSubmit={false}
            // setCode={setCode}
            onSubmit={handleSubmitDoc}
          />
        )}
        {editorId === 3 && (
          <EditorPanel
            initialCode={NotActiveEditorSnippet}
            language={"markdown"}
            isDisabledSubmit={true}
          />
        )}
      </div>
    </div>
  );
};

export default CreateModelPanel;
