import { useContext, useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import {
  useCreateModelMutation,
  useDeleteModelMutation,
  useUploadDocumentMutation,
  useUploadPythonScriptMutation,
} from "../store";
import PythonScriptSnippet from "../constants/PythonScriptSnippet";
import MarkDownSnippet from "../constants/MarkDownSnippet";
import NotActiveEditorSnippet from "../constants/NotActiveEditorSnippet";
import ParameterForm from "./ParameterForm";
import ParameterView from "./ParameterView";
import UserContext from "../context/UserContext";
import NotFound from "./NotFound";

// const backEndURL = import.meta.env.VITE_BACKEND_URL;
const CreateModelPanel = () => {
  const [createModel, createModelResult] = useCreateModelMutation();
  const [uploadPythonScript, uploadPythonScriptResult] =
    useUploadPythonScriptMutation();
  const [uploadDocumentation, uploadDocumentationResult] =
    useUploadDocumentMutation();
  const [deleteModel, deleteModelResult] = useDeleteModelMutation();
  const [editorId, setEditorId] = useState(1);
  const [codeLog, setCodeLog] = useState({
    type: "Info",
    message: "Prediction result",
  });
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [isFulfiled, setIsFulfilled] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [parameterToDelete, setParameterToDelete] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const { user } = useContext(UserContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.length > 3) {
      setIsFulfilled(true);
    }
  };

  useEffect(() => {
    if (createModelResult.isSuccess) {
      setModelId(createModelResult?.data?.model?.id);
      setConfirmation(true);
      setParameters(createModelResult?.data?.parameters);
    }
  }, [
    createModelResult?.data?.model?.id,
    createModelResult?.data?.parameters,
    createModelResult.isSuccess,
  ]);

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
    deleteModel({ id: modelId });
  };

  const handleFinish = () => {
    createModel({ name, parameters, id: modelId });
    // todo: promt user confirmation
  };

  const handleConfirmation = () => {
    setConfirmation(false);
    // todo: change model status in server
  };

  const handleAddParameter = (parameter) => {
    setParameters([...parameters, parameter]);
  };

  const handleEditParameter = (parameter) => {
    if (editIndex !== null) {
      setParameters(
        parameters.map((p, index) => (index === editIndex ? parameter : p))
      );
    }
    setEditIndex(null);
    document.getElementById("parameter-edit-form").close();
  };

  const handleDeleteRequest = (param) => {
    setParameterToDelete(param);
    document.getElementById("parameter-delete").showModal();
  };

  const handleDeleteParameter = (e) => {
    e.preventDefault();
    setParameters(parameters.filter((param) => param !== parameterToDelete));
    setParameterToDelete(null);
    document.getElementById("parameter-delete").close();
  };

  const handleEditRequest = (param, index) => {
    setEditIndex(index);
    document.getElementById("parameter-edit-form").showModal();
  };

  useEffect(() => {
    if (uploadDocumentationResult.isSuccess) {
      setEditorId(1);
    }
  }, [uploadDocumentationResult.isSuccess]);

  useEffect(() => {
    if (uploadPythonScriptResult.isSuccess) {
      setIsFulfilled(true);
      setCodeLog({
        type: "success",
        message: uploadPythonScriptResult?.data?.output,
      });
    }
    if (uploadPythonScriptResult.isError) {
      setCodeLog({
        type: "error",
        message: uploadPythonScriptResult?.error?.data?.message,
      });
    }
  }, [uploadPythonScriptResult]);

  let render = <NotFound />;
  if (user) {
    render = (
      <div className="flex w-full">
        <div className="w-2/5 max-h-screen overflow-auto">
          <div
            id="form-list"
            className="flex flex-col flex-grow bg-base-100 p-4 space-y-4"
          >
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-2xl font-bold">
                  Model name:
                </span>
                <input
                  type="text"
                  placeholder="Type..."
                  className="input w-full max-w-xs input-bordered"
                  name="name"
                  value={name || ""}
                  onChange={handleNameChange}
                />
              </label>
            </div>

            <div className="max-h-[60vh] overflow-auto">
              {parameters.map((param, index) => (
                <ParameterView
                  key={index}
                  parameter={param}
                  onDelete={() => handleDeleteRequest(param)}
                  onEdit={() => handleEditRequest(param, index)}
                />
              ))}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("parameter-form").showModal();
              }}
            >
              Add Parameter
            </button>
            {confirmation && (
              <button
                className="btn btn-error"
                onClick={() => {
                  document.getElementById("test-form").showModal();
                }}
              >
                Test model
              </button>
            )}

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
              {confirmation ? (
                <button
                  className="btn btn-success"
                  onClick={handleConfirmation}
                >
                  Confirm ok!
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  disabled={!isFulfiled}
                  onClick={handleFinish}
                >
                  Done!
                </button>
              )}
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
              onSubmit={handleSubmitPython}
            />
          )}
          {editorId === 2 && (
            <EditorPanel
              initialCode={MarkDownSnippet}
              language={"markdown"}
              isDisabledSubmit={false}
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
        <dialog
          id="parameter-form"
          className="modal modal-bottom sm:modal-middle"
        >
          <ParameterForm
            onSubmit={handleAddParameter}
            // existing={parameterToEdit}
            submitText="Add Parameter"
          />
        </dialog>
        <dialog
          id="parameter-edit-form"
          className="modal modal-bottom sm:modal-middle"
        >
          <ParameterForm
            onSubmit={handleEditParameter}
            submitText="Edit Parameter"
          />
        </dialog>
        <dialog
          id="parameter-delete"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Attention!</h3>
            <p className="py-4">
              Are you sure you want to delete this parameter?
            </p>
            <form className="flex justify-end" onSubmit={handleDeleteParameter}>
              <button className="btn btn-error mx-2" type="submit">
                Delete
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  }

  return <>{render}</>;
};

export default CreateModelPanel;
