import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useLoginMutation } from "../store/APIs/UsersAPI";
import useForm from "../hooks/useForm";
import LoadingContext from "../context/LoadingContext";
import ToastMessage from "./ToastMessage";

const Login = () => {
  const [authInfo, handleChange, resetForm] = useForm({
    email: "",
    password: "",
  });
  const [login, result] = useLoginMutation();
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
    login(authInfo);
  };
  useEffect(() => {
    if (result.isSuccess && result.data) {
      // resetForm();
      return navigate("/");
    }
  }, [navigate, resetForm, result.data, result.isSuccess]);

  useEffect(() => {
    if (result?.error?.error) {
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

  const handleOAuthLogin = async (provider) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/${provider}/redirect`
    );
    const data = await response.json();
    window.open(data.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {showToast && <ToastMessage toastList={toastList} />}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            {
              "You can publish your AI trained models here, reviwe other's model and lot more. Just login and explore."
            }
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={authInfo.email}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={authInfo.password}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="label">
                <span className="label-text-alt">
                  {"Don't have an account? "}
                  <Link to="/signup" className="link link-hover text-lg">
                    {"Sign up"}
                  </Link>
                  {" now!"}
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Login</button>
            </div>
          </form>
          <div className="mx-auto mb-2">
            <button
              className="btn mb-2 flex justify-center"
              onClick={() => handleOAuthLogin("google")}
            >
              Continue with google account
              <span className="text-3xl">
                <AiFillGoogleCircle />
              </span>
            </button>
            <button
              className="btn my-2 flex justify-center"
              onClick={() => handleOAuthLogin("github")}
            >
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

export default Login;
