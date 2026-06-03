import { useEffect, useState } from "react";
import API from "../api";

function FileTable() {
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const previewFile = async (fileId) => {
    const res = await API.get(`/file-link/${fileId}`);

    window.open(res.data.url, "_blank");
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const res = await API.get("/files");
    setFiles(res.data);
  };

  const deleteFile = async (id) => {
    await API.delete(`/file/${id}`);
    loadFiles();
  };

  return (
    <div>
      <h2>📂 All Files</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Preview</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td>{file.fileName}</td>
              <td>{file.fileType}</td>
              <td>
                {file.fileType === "photo" && "🖼️"}
                {file.fileType === "video" && "🎬"}
                {file.fileType === "document" && "📄"}
                <button
                  onClick={() => previewFile(file.fileId)}
                >
                  🔍 View
                </button>
              </td>
              <td>{file.userId}</td>
              <td>
                {users.find((user) => user._id === file.userId)?.firstName || "Unknown"}
              </td>
              <td>
                {users.find((user) => user._id === file.userId)?.username || "Unknown"}
              </td>
              <td>
                <button onClick={() => deleteFile(file.fileId)}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;