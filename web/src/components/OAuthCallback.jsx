import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useOauthLoginMutation } from "../store";

const OAuthCallback = ({ provider }) => {
  const location = useLocation();
  const [oauthLogin, { isLoading, error }] = useOauthLoginMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    if (code) {
      oauthLogin({ provider, code })
        .unwrap()
        .then((result) => {
          // Handle success
          console.log("Login successful", result);
        })
        .catch((err) => {
          // Handle error
          console.error("Login failed", err);
        });
    }
  }, [location.search, oauthLogin, provider]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};

OAuthCallback.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default OAuthCallback;
