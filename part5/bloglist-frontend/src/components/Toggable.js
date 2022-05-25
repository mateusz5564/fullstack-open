import { useState, forwardRef, useImperativeHandle } from "react";

const Toggable = ({ label, children }, ref) => {
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
};

export default forwardRef(Toggable);
