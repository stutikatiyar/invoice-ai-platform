function InvoiceCard({ invoice, onDelete, onPreview }) {

  return (
    <div className="invoice-card">

      <div className="invoice-info">
        <p className="invoice-name">
          {invoice.fileName || "Invoice Document"}
        </p>

        <p className="invoice-date">
          Uploaded: {new Date(invoice.uploadedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="invoice-actions">

        <button
          className="view-btn"
          onClick={() => onPreview(invoice)}
        >
          View
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(invoice._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default InvoiceCard;
