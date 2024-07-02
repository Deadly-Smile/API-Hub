import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../context/LoadingContext";
import ToastMessage from "./ToastMessage";
import { useAddUserMutation } from "../store";

const Register = () => {
  const [formData, handleChange, resetForm] = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [signup, result] = useAddUserMutation();
  const navigate = useNavigate();
  const [toastList, setToastList] = useState([]);
  const isLoadingContext = useContext(LoadingContext);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastList([]);
    }, 3000); // Hides the toast after 3 seconds
  };

  useEffect(() => {
    if (result.isLoading) {
      isLoadingContext.setProgress(30);
    } else {
      isLoadingContext.setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(formData);
  };
  useEffect(() => {
    if (result.isSuccess && result.data) {
      setToastList((prevToastList) => [
        ...prevToastList,
        {
          message: "Registration successful, please check your email",
          type: "success",
        },
      ]);
      handleShowToast();
      resetForm();
      if (
        result?.data?.message ===
        "Registered successfully, now please verify your email"
      ) {
        handleShowToast();
        return navigate("/");
      }
    }
  }, [navigate, resetForm, result.data, result.isSuccess]);

  useEffect(() => {
    if (result?.error?.error) {
      setToastList((prevToastList) => [
        ...prevToastList,
        { message: result.error.error, type: "error" },
      ]);
    } else if (result.error?.data?.error === "validation error") {
      Object.keys(result.error?.data?.errors).forEach((field) => {
        result.error.data.errors[field].forEach((errorMessage) => {
          setToastList((prevToastList) => [
            ...prevToastList,
            { message: errorMessage, type: "error" },
          ]);
        });
      });
    } else if (result?.error?.data?.message) {
      setToastList((prevToastList) => [
        ...prevToastList,
        { message: result?.error?.data?.message, type: "error" },
      ]);
    } else {
      // ignoring this error
    }
    handleShowToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.error, result.isError]);

  return (
    <div className="hero min-h-screen bg-base-200">
      {showToast && <ToastMessage toastList={toastList} />}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up</h1>
          <p className="py-6">
            {
              "You can publish your AI trained models here, reviwe other's model and lot more. Just Signup and explore."
            }
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  required
                  type="text"
                  className="grow"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  required
                  type="text"
                  className="grow"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  required
                  type="password"
                  className="grow"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  required
                  type="password"
                  className="grow"
                  placeholder="Confirm password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </label>
              <label className="label">
                <span className="label-text-alt">
                  {"Already have an account? "}
                  <Link to="/login" className="link link-hover text-lg">
                    {"Log in"}
                  </Link>
                  {" here!"}
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Sign up</button>
            </div>
          </form>
          <div className="mx-auto mb-2">
            <button className="btn mb-2 flex justify-center">
              Continue with google account
              <span className="text-3xl">
                <AiFillGoogleCircle />
              </span>
            </button>
            <button className="btn my-2 flex justify-center">
              Continue with github account
              <span className="text-3xl">
                <AiFillGithub />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
