import React, { useState } from 'react';

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleBroadcast = async () => {
    setStatus("⏳ Sending broadcast...");
    try {
      const response = await fetch("http://localhost:5000/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: message, 
          adminId: 876027252  // .env বা auth থেকে নিন
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Message sent to all users!");
      } else {
        setStatus("❌ Failed to send.");
      }
    } catch (error) {
      setStatus("❌ Error connecting to server");
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📢 Broadcast Message</h2>
      <textarea 
        rows="5" 
        style={{ width: "100%", marginBottom: "10px" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <br />
      <button onClick={handleBroadcast}>Send Broadcast</button>
      <p>{status}</p>
    </div>
  );
};

export default Broadcast;