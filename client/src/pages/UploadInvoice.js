import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/upload.css";

function UploadInvoice() {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const token = localStorage.getItem("token");

  // ---------- File Select ----------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ---------- Drag Events ----------
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // ---------- Upload ----------
  const handleUpload = async () => {

    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("invoice", file);

    try {

      await axios.post(
        "http://localhost:5000/api/invoices/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <h2>Upload Invoice</h2>

        {/* Drag Zone */}
        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >

          <p>
            {file
              ? file.name
              : "Drag & Drop invoice here OR Click to Upload"}
          </p>

          <input
            type="file"
            onChange={handleFileChange}
          />

        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default UploadInvoice;
