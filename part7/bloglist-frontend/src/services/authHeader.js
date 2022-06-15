export default () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};
