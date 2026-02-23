"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TipoFotoObligatoria, FotoEvidencia } from "@/lib/types";

interface FotoUploadProps {
  tipoFoto: TipoFotoObligatoria;
  fotoActual?: FotoEvidencia;
  onChange: (archivo: string, comentario: string) => void;
}

export function FotoUpload({ tipoFoto, fotoActual, onChange }: FotoUploadProps) {
  const [preview, setPreview] = useState<string>(fotoActual?.archivo || "");
  const [comentario, setComentario] = useState(fotoActual?.comentario || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      onChange(dataUrl, comentario);
    };
    reader.readAsDataURL(file);
  };

  const handleComentarioChange = (value: string) => {
    setComentario(value);
    if (preview) {
      onChange(preview, value);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{tipoFoto.nombre}</p>
          <p className="text-xs text-muted-foreground">{tipoFoto.descripcion}</p>
        </div>
        {preview ? (
          <Badge variant="secondary" className="bg-green-100 text-green-800">Cargada</Badge>
        ) : (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pendiente</Badge>
        )}
      </div>

      <div className="flex gap-4">
        {preview ? (
          <div className="relative w-32 h-24 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
            <img src={preview} alt={tipoFoto.nombre} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => { setPreview(""); inputRef.current && (inputRef.current.value = ""); }}
              className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full text-xs flex items-center justify-center hover:bg-black/70"
            >
              x
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-32 h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors flex-shrink-0"
          >
            <span className="text-xs text-muted-foreground text-center px-2">Seleccionar foto</span>
          </div>
        )}
        <div className="flex-1">
          <Label className="text-xs">Comentario</Label>
          <Textarea
            value={comentario}
            onChange={(e) => handleComentarioChange(e.target.value)}
            placeholder="Agregar comentario..."
            className="h-20 text-sm"
          />
        </div>
      </div>

      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
