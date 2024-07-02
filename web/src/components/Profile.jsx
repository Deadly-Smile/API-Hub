import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetUserByIDQuery } from "../store";
import { useContext, useEffect } from "react";
import LoadingContext from "../context/LoadingContext";

const Profile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserByIDQuery({ id });
  const isLoadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      isLoadingContext.setProgress(30);
    } else {
      isLoadingContext.setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
    }
  }, [isError, navigate]);

  return (
    <div className="hero bg-base-50">
      <div className="hero-content flex-col lg:flex-row">
        <div id="left_side">
          <div className="avatar">
            <div className="w-96 rounded">
              <img
                src={
                  data?.avatar
                    ? `${import.meta.env.VITE_BACKEND_URL}${data?.avatar}`
                    : "https://cdn.onlinewebfonts.com/svg/img_329115.png"
                }
                alt={`${data?.name}'s Avatar`}
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold">{data?.name}</h2>
            <p>{data?.email}</p>
            <p>
              <strong>Contribution: </strong>
              <span>{data?.contribution}</span>
            </p>
          </div>
        </div>
        <div id="right_side">
          <Link className="btn btn-accent justify-end" to={"/create-model"}>
            Create new model
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
