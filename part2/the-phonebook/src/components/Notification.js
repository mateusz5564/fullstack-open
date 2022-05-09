import { useRef, useEffect } from "react";

const Notification = ({ children, reset, type }) => {
  const classString = type === "error" ? "error" : "success";
  const timeout = useRef(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      reset();
    }, 5000);
  }, [children]);

  return <div className={`notification ${classString}`}>{children}</div>;
};

export default Notification;
