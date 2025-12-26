import { Document, Page, pdfjs } from "react-pdf";
import Draggable from "react-draggable";
import { useRef, useState } from "react";
import SignaturePad from "./SignaturePad";
import { signPdf } from "../api/api";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<any>(null);
  const [signature, setSignature] = useState<string>("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  function onStop(_: any, data: any) {
    if (!containerRef.current) return;
    const box = data.node.getBoundingClientRect();
    const pdf = containerRef.current.getBoundingClientRect();

    setCoords({
      page: 1,
      xPct: (box.left - pdf.left) / pdf.width,
      yPct: (box.top - pdf.top) / pdf.height,
      wPct: box.width / pdf.width,
      hPct: box.height / pdf.height
    });
  }

  async function submit() {
    if (!signature) return alert("Please save a signature first!");
    if (!coords) return alert("Please place the field on the PDF!");
    
    try {
      const response = await signPdf(signature, coords);
      alert("Signed PDF created successfully!");
      
      if (response && response.data && response.data.url) {
        window.open(response.data.url, "_blank");
      }
    } catch (err) {
      alert("Error: Check if backend is running at " + API_BASE_URL);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div ref={containerRef} style={{ width: 600, position: "relative", border: '1px solid #000' }}>
        <Document file="/sample.pdf">
          <Page pageNumber={1} width={600} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>

        <Draggable bounds="parent" onStop={onStop}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '150px', height: '60px',
            border: '2px dashed #007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            cursor: 'move', zIndex: 10,
            resize: 'both', overflow: 'hidden' 
          }}>
            SIGN HERE
          </div>
        </Draggable>
      </div>

      <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
        <SignaturePad 
          onSave={setSignature} 
          onClear={() => setSignature("")} 
        />
      </div>
      
      <button 
        onClick={submit} 
        style={{ 
          marginTop: '10px', 
          padding: '10px 20px',
          backgroundColor: signature ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: signature ? 'pointer' : 'not-allowed'
        }}
        disabled={!signature} 
      >
        Burn Signature into PDF
      </button>
    </div>
  );
}