import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

interface SignaturePadProps {
  onSave: (v: string) => void;
  onClear: () => void;
}

export default function SignaturePad({ onSave, onClear }: SignaturePadProps) {
  const ref = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (ref.current) {
      ref.current.clear(); 
      onClear();          
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "10px", background: "#f9f9f9" }}>
      <SignatureCanvas
        ref={ref}
        penColor="black"
        canvasProps={{ 
          width: 400, 
          height: 150, 
          className: "sigCanvas",
          style: { border: "1px solid #000", background: "#fff" } 
        }}
      />
      <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button 
          onClick={() => onSave(ref.current!.toDataURL())}
          style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
        >
          Save Signature
        </button>
        <button 
          onClick={handleClear}
          style={{ padding: "8px 16px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
        >
          Clear Signature
        </button>
      </div>
    </div>
  );
}