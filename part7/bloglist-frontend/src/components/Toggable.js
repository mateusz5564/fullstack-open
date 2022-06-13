import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggable = forwardRef(({ label, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      {visible && (
        <>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </>
      )}
      {!visible && <button onClick={toggleVisibility}>{label}</button>}
    </div>
  );
});

Toggable.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggable.displayName = "Toggable";

export default Toggable;
