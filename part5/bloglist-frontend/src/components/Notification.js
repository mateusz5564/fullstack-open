const Notification = ({ type, children }) => {
  const classType = type === "error" ? "error" : "success";
  return <div className={`notification ${classType}`}>{children}</div>;
};

export default Notification;
