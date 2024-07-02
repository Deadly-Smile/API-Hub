import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store";
import LoadingContext from "../context/LoadingContext";
import ToastMessage from "./ToastMessage";

const Logout = () => {
  const navigate = useNavigate();
  const [logout, result] = useLogoutMutation();
  const [showToast, setShowToast] = useState(false);
  const isLoadingContext = useContext(LoadingContext);

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
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (logout?.isSuccess || logout?.isError) {
      handleShowToast();
    }
  }, [logout?.isSuccess, logout?.isError]);

  useEffect(() => {
    logout("Please work properly");
  }, [logout]);

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/login");
    }
  }, [navigate, result.isSuccess]);

  let render = null;
  if (result.isSuccess) {
    render = (
      <div>
        {showToast && (
          <ToastMessage
            toastList={[
              { message: "Logged out successfully", type: "success" },
            ]}
          />
        )}
      </div>
    );
  }
  if (result.isError) {
    render = (
      <div>
        {showToast && (
          <ToastMessage
            toastList={[
              { message: "An unexpected error occured", type: "error" },
            ]}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <h1 className="flex justify-center items-center">{render}</h1>
    </div>
  );
};

export default Logout;
