import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

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
          <Button sx={{ mt: 1 }} onClick={toggleVisibility}>
            cancel
          </Button>
        </>
      )}
      {!visible && (
        <Button variant="outlined" onClick={toggleVisibility}>
          {label}
        </Button>
      )}
    </div>
  );
});

Toggable.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggable.displayName = "Toggable";

export default Toggable;
