import PropTypes from "prop-types";
const CodeLog = ({ log }) => {
  const getMessageClass = (type) => {
    switch (type) {
      case "success":
        return "text-success px-2";
      case "error":
        return "text-error px-2";
      case "info":
      default:
        return "text-info px-2";
    }
  };

  return (
    <div className="mockup-code rounded-sm">
      <pre data-prefix="$" className="text-lg">
        <code>{log.type}</code>
      </pre>
      <pre data-prefix=">" className={getMessageClass(log.type)}>
        <code>{log.message}</code>
      </pre>
    </div>
  );
};

CodeLog.propTypes = {
  log: PropTypes.object.isRequired,
};

export default CodeLog;
