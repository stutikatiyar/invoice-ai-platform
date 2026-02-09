import Invoice from "../models/Invoice.js";

export const uploadInvoice = async (req, res) => {
  try {

   const newInvoice = await Invoice.create({
  user: req.user.id,
  fileUrl: req.file.path,
  fileName: req.file.originalname,  // ⭐ ADD THIS
  fileSize:req.file.size
});


    res.json(newInvoice);

  } catch {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getInvoices = async (req, res) => {

  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.json(invoices);
  } catch {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }

};
import cloudinary from "../config/cloudinary.js";

export const deleteInvoice = async (req, res) => {

  try {

    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Extract Cloudinary public ID from URL
    const publicId = invoice.fileUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`invoices/${publicId}`);

    await invoice.deleteOne();

    res.json({ message: "Invoice deleted" });

  } catch {
    res.status(500).json({ message: "Delete failed" });
  }

};
