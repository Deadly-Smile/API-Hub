import { useNavigate, useParams } from "react-router-dom";
import useForm from "../hooks/useForm";
import ToastMessage from "./ToastMessage";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../context/LoadingContext";
import { useVerifyMailMutation } from "../store";

const VerificationPanel = () => {
  const [formData, handleChange, resetForm] = useForm({
    verificationCode: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastList, setToastList] = useState([]);
  const { id } = useParams();
  const [verifyMail, result] = useVerifyMailMutation();
  const isLoadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isLoading) {
      isLoadingContext.setProgress(30);
    } else {
      isLoadingContext.setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isLoading]);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastList([]);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    verifyMail({ id, code: formData.verificationCode });
  };

  useEffect(() => {
    if (result?.error?.error) {
      console.log(result.error);
      setToastList((prevToastList) => [
        ...prevToastList,
        { message: result.error.error, type: "error" },
      ]);
      handleShowToast();
    } else if (result?.error?.data?.message) {
      setToastList((prevToastList) => [
        ...prevToastList,
        { message: result?.error?.data?.message, type: "error" },
      ]);
      handleShowToast();
    }
  }, [result.error, result.isError]);

  useEffect(() => {
    if (result.isSuccess && result.data) {
      resetForm();
      return navigate("/");
    }
  }, [navigate, resetForm, result.data, result.isSuccess]);

  return (
    <div className="hero min-h-screen bg-base-200">
      {showToast && <ToastMessage toastList={toastList} />}
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Verification code</span>
          </label>
          <input
            type="text"
            name="verificationCode"
            placeholder="Verification code"
            value={formData.verificationCode}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VerificationPanel;
