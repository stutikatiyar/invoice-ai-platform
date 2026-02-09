import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";
import { uploadInvoice } from "../controllers/invoiceController.js";
import { getInvoices } from "../controllers/invoiceController.js";
import { deleteInvoice } from "../controllers/invoiceController.js";





const router = express.Router();

router.post("/", protect, upload.single("invoice"), uploadInvoice);
router.get("/", protect, getInvoices);
router.delete("/:id", protect, deleteInvoice);


export default router;
