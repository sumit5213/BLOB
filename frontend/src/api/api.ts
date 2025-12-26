import axios from "axios";

export async function signPdf(signature: string, coords: any) {
  await axios.post("http://localhost:4000/sign-pdf", {
    pdfId: "sample",
    signatureImage: signature,
    fields: [coords]
  });
}