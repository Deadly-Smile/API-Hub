import PropTypes from "prop-types";

const ToastMessage = ({ toastList }) => {
  const baseAlertClasses = "alert shadow-lg";
  const alertClasses = {
    success: `${baseAlertClasses} alert-success`,
    error: `${baseAlertClasses} alert-error`,
    info: `${baseAlertClasses} alert-info`,
    default: `${baseAlertClasses}`,
  };

  const iconPaths = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current flex-shrink-0 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div className="toast toast-end max-w-sm w-full">
      {toastList.map((toast, index) => (
        <div
          key={index}
          className={`${
            alertClasses[toast.type] || alertClasses.default
          } max-w-full`}
        >
          {iconPaths[toast.type]}
          <span className="truncate block w-full">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

ToastMessage.propTypes = {
  toastList: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
    })
  ).isRequired,
};

export default ToastMessage;
