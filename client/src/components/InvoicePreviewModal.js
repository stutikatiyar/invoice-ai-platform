import "../styles/previewModal.css";

function InvoicePreviewModal({ invoice, onClose }) {

  if (!invoice) return null;

  return (
    <div className="preview-overlay" onClick={onClose}>

      <div
        className="preview-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button className="close-preview" onClick={onClose}>
          ✕
        </button>

        <h3>{invoice.fileName}</h3>

        <iframe
          src={invoice.fileUrl}
          title="Invoice Preview"
          className="preview-frame"
        />

      </div>

    </div>
  );
}

export default InvoicePreviewModal;
