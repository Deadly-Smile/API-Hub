import PropTypes from "prop-types";
import { BsFillPencilFill } from "react-icons/bs";
const ParameterView = ({ parameter, onDelete, onEdit }) => {
  return (
    <div className="card card-body card-bordered card-actions btn-ghost">
      <div className="absolute right-2 top-2 flex">
        <button
          className="btn btn-sm btn-circle btn-error mr-1"
          onClick={onDelete}
        >
          ✕
        </button>
        <button className="btn btn-sm btn-circle btn-accent" onClick={onEdit}>
          <BsFillPencilFill />
        </button>
      </div>

      <label className="label-text">
        {parameter?.parameter_name}
        <span>({parameter?.is_file ? "File" : "Text"})</span>
      </label>
      {parameter?.is_default && (
        <label className="label-text">Loaded parameter</label>
      )}
      {parameter?.is_required && (
        <label className="label-text">Required parameter</label>
      )}
    </div>
  );
};

ParameterView.propTypes = {
  parameter: PropTypes.shape({
    parameter_name: PropTypes.string.isRequired,
    is_file: PropTypes.bool.isRequired,
    is_default: PropTypes.bool,
    is_required: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ParameterView;
