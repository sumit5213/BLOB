import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignaturePad({ onSave }: { onSave: (v: string) => void }) {
  const ref = useRef<SignatureCanvas>(null);

  return (
    <>
      <SignatureCanvas
        ref={ref}
        penColor="black"
        canvasProps={{ width: 400, height: 150, className: "sigCanvas" }}
      />
      <button onClick={() => onSave(ref.current!.toDataURL())}>
        Save Signature
      </button>
    </>
  );
}
