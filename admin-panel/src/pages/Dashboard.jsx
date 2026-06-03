import { useEffect, useState } from "react";
import API from "../api";
import FileTable from "../components/FileTable";
import Broadcast from "../components/Broadcast";

 function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/stats");
    setStats(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚡ Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>👥 Users: {stats.totalUsers}</div>
        <div>📁 Files: {stats.totalFiles}</div>
      </div>

      <hr />

      <FileTable />
      <Broadcast />
    </div>
  );
}

export default Dashboard;