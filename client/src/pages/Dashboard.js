import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import InvoiceList from "../components/InvoiceList";
import StatsSection from "../components/StatsSection";
import ChartSection from "../components/ChartSection";
import InvoicePreviewModal from "../components/InvoicePreviewModal";

import "../styles/dashboard.css";


function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [previewInvoice, setPreviewInvoice] = useState(null);

  // ⭐ ADDED Preview Handler
  const handlePreview = (invoice) => {
    setPreviewInvoice(invoice);
  };

  // ===== Fetch Invoices =====
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/invoices",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setInvoices(res.data || []);

      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchInvoices();

  }, [navigate, location]);

  // ===== Logout =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ===== Delete Invoice =====
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this invoice?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/invoices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setInvoices(prev => prev.filter(inv => inv._id !== id));

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ===== Search + Sort =====
  const displayedInvoices = [...invoices]
    .filter(inv =>
      (inv.fileName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {

      const da = new Date(a.uploadedAt);
      const db = new Date(b.uploadedAt);

      return sortOrder === "newest" ? db - da : da - db;
    });

  // ===== Stats Calculations =====
  const totalInvoices = invoices.length;

  const lastUpload = invoices.length > 0
    ? new Date(invoices[0].uploadedAt).toLocaleDateString()
    : "N/A";

  const totalSizeMB = (
    invoices.reduce((sum, inv) => sum + (inv.fileSize || 0), 0) / 1024 / 1024
  ).toFixed(2);

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="main-content">

       <div className="dashboard-header">
  <div>
    <h1>Dashboard</h1>
    <p>Manage and analyze your invoices effortlessly</p>
  </div>

  <button
    className="upload-main-btn"
    onClick={() => navigate("/upload")}
  >
    + Upload Invoice
  </button>
</div>

        {/* Stats */}
        <StatsSection
          totalInvoices={totalInvoices}
          lastUpload={lastUpload}
          totalSizeMB={totalSizeMB}
        />

        {/* Chart */}
        <ChartSection invoices={invoices} />

        {/* Search + Sort Controls */}
        <div className="invoice-controls">

          <input
            type="text"
            placeholder="Search invoices..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

        </div>

        {/* Invoice List */}
        <InvoiceList
          invoices={displayedInvoices}
          onDelete={handleDelete}
          onPreview={handlePreview}   
        />

      </div>

      {/* ⭐ ADDED Preview Modal */}
      <InvoicePreviewModal
        invoice={previewInvoice}
        onClose={() => setPreviewInvoice(null)}
      />

    </div>
  );
}

export default Dashboard;
