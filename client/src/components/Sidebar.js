import { useNavigate } from "react-router-dom";

function Sidebar({ onLogout }) {

  const navigate = useNavigate();

  return (
   <div className="sidebar">

  <h2 className="sidebar-logo">InvoiceAI</h2>

  {/* Navigation Group */}
  <div className="sidebar-nav">

    <button onClick={() => navigate("/upload")}>
      Upload Invoice
    </button>

    <button onClick={() => navigate("/dashboard")}>
      My Invoices
    </button>

  </div>

  {/* Logout pinned bottom */}
  <button className="logout" onClick={onLogout}>
    Logout
  </button>

</div>

  );
}

export default Sidebar;
