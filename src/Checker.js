import React, { useState } from "react";
import "./Checker.css";

const Checker = () => {
  const [url, setUrl] = useState("");
  const [isMalicious, setIsMalicious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkUrl = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    setLoading(true);
    setError("");
    setIsMalicious(null);

    try {
      
      const response = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsMalicious(data.isMalicious); 
      } else {
        setError(data.error || "Failed to check the URL");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
    setLoading(false);
  };

  return (
    <div className="checker-container">
      <h1 className="title">Malicious Link Checker</h1>
      <input
        type="text"
        placeholder="Enter a URL to check"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="url-input"
      />
      <button onClick={checkUrl} className="check-button">
        {loading ? "Checking..." : "Check"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {isMalicious !== null && (
        <p className={isMalicious ? "malicious-result" : "safe-result"}>
          {isMalicious ? "The link is malicious!" : "The link is safe."}
        </p>
      )}
    </div>
  );
};

export default Checker;
