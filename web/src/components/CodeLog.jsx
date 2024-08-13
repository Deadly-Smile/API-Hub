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

  // Function to render JSON objects with indentation
  const renderJson = (json) => {
    return (
      <pre className={getMessageClass(log.type)}>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre>
    );
  };

  return (
    <div className="mockup-code rounded-sm">
      <pre data-prefix="$" className={getMessageClass(log.type)}>
        <code>Output:</code>
      </pre>
      {typeof log.message === "object" && !Array.isArray(log.message)
        ? // If message is an object (not an array), render as JSON
          renderJson(log.message)
        : // If message is plain text or array, render as text
          log.message.split("\n").map((line, index) => (
            <pre key={index} className={getMessageClass(log.type)}>
              <code>{line}</code>
            </pre>
          ))}
    </div>
  );
};

CodeLog.propTypes = {
  log: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
  }).isRequired,
};

export default CodeLog;
