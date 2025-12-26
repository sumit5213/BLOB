import { PDFDocument } from "pdf-lib";
import crypto from "crypto";
import fs from "fs";

export async function signPDF(pdfPath: string, signatureBase64: string, field: any) {
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`File not found at ${pdfPath}`);
  }

  const original = fs.readFileSync(pdfPath);
  
  if (original.length < 10) {
    throw new Error("sample.pdf is empty or invalid.");
  }

  const originalHash = crypto.createHash("sha256").update(original).digest("hex");
  const pdfDoc = await PDFDocument.load(original);
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();

  const base64Data = signatureBase64.split(",")[1];
  const imgBytes = Buffer.from(base64Data, "base64");
  const img = await pdfDoc.embedPng(imgBytes);

  const x = field.xPct * width;
  const y = height - (field.yPct + field.hPct) * height;
  const w = field.wPct * width;
  const h = field.hPct * height;

  const rImg = img.width / img.height;
  const rBox = w / h;
  let dw, dh;

  if (rImg > rBox) {
    dw = w;
    dh = w / rImg;
  } else {
    dh = h;
    dw = h * rImg;
  }

  page.drawImage(img, {
    x: x + (w - dw) / 2, 
    y: y + (h - dh) / 2,
    width: dw,
    height: dh
  });

  const signed = await pdfDoc.save();
  const finalHash = crypto.createHash("sha256").update(signed).digest("hex");

  return { signed, originalHash, finalHash };
}