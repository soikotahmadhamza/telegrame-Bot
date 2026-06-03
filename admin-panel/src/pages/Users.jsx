import { useEffect, useState } from "react";
import API from "../api";

 function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Telegram ID</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>@{user.username}</td>
            <td>{user.telegramId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;