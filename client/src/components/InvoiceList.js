import InvoiceCard from "./InvoiceCard";

function InvoiceList({ invoices, onDelete, onPreview }) {

  if (invoices.length === 0) {
    return <p className="empty-text">No invoices uploaded yet</p>;
  }

  return (
    <div className="invoice-list">

      {invoices.map((inv) => (
        <InvoiceCard
          key={inv._id}
          invoice={inv}
          onDelete={onDelete}
          onPreview={onPreview}
        />
      ))}

    </div>
  );
}

export default InvoiceList;
