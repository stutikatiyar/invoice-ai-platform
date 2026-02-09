import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fileUrl: String,
  fileSize: Number,


  fileName: String,   // ⭐ ADD THIS

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Invoice", invoiceSchema);
