"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

interface FirmaCanvasProps {
  firmaActual?: string;
  onGuardar: (dataUrl: string) => void;
}

export function FirmaCanvas({ firmaActual, onGuardar }: FirmaCanvasProps) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [mostrarCanvas, setMostrarCanvas] = useState(!firmaActual);

  const limpiar = () => {
    sigRef.current?.clear();
  };

  const guardar = () => {
    if (sigRef.current?.isEmpty()) return;
    const dataUrl = sigRef.current?.toDataURL("image/png") || "";
    onGuardar(dataUrl);
    setMostrarCanvas(false);
  };

  if (!mostrarCanvas && firmaActual) {
    return (
      <div className="space-y-3">
        <div className="border rounded-lg p-2 bg-white">
          <img src={firmaActual} alt="Firma" className="max-h-32 mx-auto" />
        </div>
        <Button variant="outline" size="sm" onClick={() => setMostrarCanvas(true)}>
          Cambiar firma
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="border rounded-lg overflow-hidden bg-white">
        <SignatureCanvas
          ref={sigRef}
          canvasProps={{
            className: "w-full",
            style: { width: "100%", height: "150px" },
          }}
          penColor="black"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={guardar}>Guardar Firma</Button>
        <Button size="sm" variant="outline" onClick={limpiar}>Limpiar</Button>
      </div>
    </div>
  );
}
