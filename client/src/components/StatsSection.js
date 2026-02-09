function StatsSection({ totalInvoices, lastUpload, totalSizeMB }) {

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Invoices</h3>
        <p>{totalInvoices}</p>
      </div>

      <div className="stat-card">
        <h3>Last Upload</h3>
        <p>{lastUpload}</p>
      </div>

      <div className="stat-card">
        <h3>Storage Used</h3>
        <p>{totalSizeMB} MB</p>
      </div>

    </div>
  );
}

export default StatsSection;
