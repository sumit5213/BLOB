import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function signPdf(signature: string, coords: any) {
  return await axios.post(`${API_BASE_URL}/sign-pdf`, {
    pdfId: "sample",
    signatureImage: signature,
    fields: [coords]
  });
}