import { Router } from "express";
import fs from "fs";
// import path from "path";
import Audit from "../models/Audit";
import { signPDF } from "../services/pdfService";

const router = Router();

router.post("/sign-pdf", async (req, res) => {
  try {
    const { pdfId, signatureImage, fields } = req.body;
    const inputPath = "./uploads/sample.pdf";
    const outputPath = "./uploads/signed.pdf";

    const result = await signPDF(inputPath, signatureImage, fields[0]);
    fs.writeFileSync(outputPath, result.signed);

    await Audit.create({
      pdfId,
      originalHash: result.originalHash,
      finalHash: result.finalHash,
      signedAt: new Date()
    });

    const baseUrl = process.env.BACKEND_URL || "http://localhost:4000";
    res.json({ url: `${baseUrl}/uploads/signed.pdf` }); 

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;