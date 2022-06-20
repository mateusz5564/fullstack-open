import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    userService.getOne(params.userId).then(data => {
      setUser(data);
    });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default User;
