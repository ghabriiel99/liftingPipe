"use client";

import { useData } from "@/context/data-context";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ESTADO_LABELS, PRIORIDAD_LABELS, TIPOS_TAREA_LABELS, EstadoTarea } from "@/lib/types";
import { FotoUpload } from "@/components/evidencia/foto-upload";
import { FirmaCanvas } from "@/components/evidencia/firma-canvas";
import { toast } from "sonner";

export default function DetalleTareaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { tareas, trabajadores, clientes, equipos, tiposFoto, actualizarTarea } = useData();

  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Tarea no encontrada.</p>
      </div>
    );
  }

  const trabajador = trabajadores.find((t) => t.id === tarea.trabajadorId);
  const jefe = trabajadores.find((t) => t.id === tarea.jefeId);
  const cliente = clientes.find((c) => c.id === tarea.clienteId);
  const equiposTarea = equipos.filter((e) => tarea.equipoIds.includes(e.id));

  const prioridadColor: Record<string, string> = {
    alta: "bg-red-100 text-red-800",
    media: "bg-yellow-100 text-yellow-800",
    baja: "bg-green-100 text-green-800",
  };
  const estadoColor: Record<string, string> = {
    pendiente: "bg-slate-100 text-slate-800",
    en_progreso: "bg-blue-100 text-blue-800",
    completada: "bg-green-100 text-green-800",
    cancelada: "bg-red-100 text-red-700",
  };

  const cambiarEstado = (nuevoEstado: string) => {
    actualizarTarea({ ...tarea, estado: nuevoEstado as EstadoTarea });
    toast.success(`Estado actualizado a "${ESTADO_LABELS[nuevoEstado as EstadoTarea]}".`);
  };

  const handleFotoChange = (tipoFotoId: string, archivo: string, comentario: string) => {
    const fotosActualizadas = [...tarea.fotos];
    const idx = fotosActualizadas.findIndex((f) => f.tipoFotoId === tipoFotoId);
    if (idx >= 0) {
      fotosActualizadas[idx] = { ...fotosActualizadas[idx], archivo, comentario };
    } else {
      fotosActualizadas.push({ id: `f${Date.now()}`, tipoFotoId, archivo, comentario });
    }
    actualizarTarea({ ...tarea, fotos: fotosActualizadas });
  };

  const handleFirmaTrabajador = (dataUrl: string) => {
    actualizarTarea({
      ...tarea,
      firmaTrabajador: { dataUrl, fechaHora: new Date().toISOString() },
    });
    toast.success("Firma del trabajador guardada.");
  };

  const handleFirmaCliente = (dataUrl: string) => {
    actualizarTarea({
      ...tarea,
      firmaCliente: { dataUrl, fechaHora: new Date().toISOString() },
    });
    toast.success("Firma del cliente guardada.");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header de tarea */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{tarea.descripcion}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Creada el {new Date(tarea.creadoEn).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge variant="secondary" className={prioridadColor[tarea.prioridad]}>
            {PRIORIDAD_LABELS[tarea.prioridad]}
          </Badge>
          <Select value={tarea.estado} onValueChange={cambiarEstado}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info general */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detalles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo</span>
              <span className="font-medium">{TIPOS_TAREA_LABELS[tarea.tipoTarea]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha programada</span>
              <span className="font-medium">
                {new Date(tarea.fechaProgramada).toLocaleDateString("es-CL")} {tarea.fechaProgramada.split("T")[1]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duración estimada</span>
              <span className="font-medium">{tarea.duracionEstimada} min</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trabajador</span>
              <span className="font-medium">{trabajador?.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Jefe asignador</span>
              <span className="font-medium">{jefe?.nombre}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {cliente && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre</span>
                  <span className="font-medium">{cliente.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sucursal</span>
                  <span className="font-medium">{cliente.sucursal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dirección</span>
                  <span className="font-medium">{cliente.direccion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Piso / Oficina</span>
                  <span className="font-medium">{cliente.piso} / {cliente.oficina}</span>
                </div>
                {cliente.nombreContacto && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contacto</span>
                    <span className="font-medium">{cliente.nombreContacto}</span>
                  </div>
                )}
                {cliente.telefonoContacto && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teléfono</span>
                    <span className="font-medium">{cliente.telefonoContacto}</span>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Equipos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Equipos a Revisar</CardTitle>
        </CardHeader>
        <CardContent>
          {equiposTarea.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay equipos asociados.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {equiposTarea.map((eq) => (
                <div key={eq.id} className="p-3 rounded-lg border">
                  <p className="font-medium text-sm">{eq.codigo} - {eq.nombre}</p>
                  <p className="text-xs text-muted-foreground">{eq.marca} {eq.modelo} | S/N: {eq.numeroSerie}</p>
                  {eq.piezas.length > 0 && (
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {eq.piezas.map((p) => (
                        <Badge key={p.id} variant="outline" className="text-xs">
                          {p.nombre} (x{p.cantidad})
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evidencia fotográfica */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Evidencia Fotográfica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tiposFoto.map((tipo) => {
              const fotoExistente = tarea.fotos.find((f) => f.tipoFotoId === tipo.id);
              return (
                <FotoUpload
                  key={tipo.id}
                  tipoFoto={tipo}
                  fotoActual={fotoExistente}
                  onChange={(archivo, comentario) => handleFotoChange(tipo.id, archivo, comentario)}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Firmas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Firma del Trabajador</CardTitle>
          </CardHeader>
          <CardContent>
            <FirmaCanvas
              firmaActual={tarea.firmaTrabajador?.dataUrl}
              onGuardar={handleFirmaTrabajador}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Firma del Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <FirmaCanvas
              firmaActual={tarea.firmaCliente?.dataUrl}
              onGuardar={handleFirmaCliente}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/tareas")}>
          Volver a Tareas
        </Button>
      </div>
    </div>
  );
}
