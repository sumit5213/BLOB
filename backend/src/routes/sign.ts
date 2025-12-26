import { Router } from "express";
import fs from "fs";
import Audit from "../models/Audit";
import { signPDF } from "../services/pdfService";

const router = Router();

router.post("/sign-pdf", async (req, res) => {
  const { pdfId, signatureImage, fields } = req.body;

  const result = await signPDF(
    "./uploads/sample.pdf",
    signatureImage,
    fields[0]
  );

  fs.writeFileSync("./uploads/signed.pdf", result.signed);

  await Audit.create({
    pdfId,
    originalHash: result.originalHash,
    finalHash: result.finalHash,
    signedAt: new Date()
  });

  res.json({ url: "http://localhost:4000/signed.pdf" });
});

export default router;
