import { Document, Page } from "react-pdf";
import Draggable from "react-draggable";
import { useRef, useState } from "react";
import SignaturePad from "./SignaturePad";
import { signPdf } from "../api/api";

export default function PDFViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<any>(null);
  const [signature, setSignature] = useState<string>("");

  function onStop(_: any, data: any) {
    const box = data.node.getBoundingClientRect();
    const pdf = containerRef.current!.getBoundingClientRect();

    setCoords({
      page: 1,
      xPct: (box.left - pdf.left) / pdf.width,
      yPct: (box.top - pdf.top) / pdf.height,
      wPct: box.width / pdf.width,
      hPct: box.height / pdf.height
    });
  }

  async function submit() {
    await signPdf(signature, coords);
    alert("Signed PDF created");
  }

  return (
    <>
      <div ref={containerRef} style={{ width: 600, position: "relative" }}>
        <Document file="/sample.pdf">
          <Page pageNumber={1} width={600} />
        </Document>

        <Draggable onStop={onStop}>
          <div className="signature-box">SIGN</div>
        </Draggable>
      </div>

      <SignaturePad onSave={setSignature} />
      <button onClick={submit}>Sign PDF</button>
    </>
  );
}
