import PropTypes from "prop-types";

const CustomDialog = ({ componentId, title, children }) => {
  return (
    <dialog id={componentId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-xl py-2">{title}</h3>
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

CustomDialog.propTypes = {
  componentId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default CustomDialog;
