"use client";

import { useData } from "@/context/data-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tarea, TIPOS_TAREA_LABELS, TipoTarea, Prioridad } from "@/lib/types";
import { toast } from "sonner";

export default function NuevaTareaPage() {
  const { trabajadores, clientes, equipos, agregarTarea } = useData();
  const router = useRouter();

  const [form, setForm] = useState({
    trabajadorId: "",
    jefeId: "",
    clienteId: "",
    fechaProgramada: "",
    duracionEstimada: 60,
    prioridad: "media" as Prioridad,
    tipoTarea: "mantencion_preventiva" as TipoTarea,
    descripcion: "",
  });
  const [equipoIds, setEquipoIds] = useState<string[]>([]);

  const jefes = trabajadores.filter((t) => t.rol === "jefe" || t.rol === "administrador");
  const tecnicosDisponibles = trabajadores.filter((t) => t.rol === "trabajador");

  const toggleEquipo = (id: string) => {
    setEquipoIds((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.trabajadorId || !form.jefeId || !form.clienteId || !form.fechaProgramada || !form.descripcion) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    const nuevaTarea: Tarea = {
      id: `ta${Date.now()}`,
      ...form,
      equipoIds,
      estado: "pendiente",
      fotos: [],
      creadoEn: new Date().toISOString(),
    };

    agregarTarea(nuevaTarea);
    toast.success("Tarea creada exitosamente.");
    router.push("/tareas");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Información de la Tarea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Describe la tarea a realizar..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Tarea *</Label>
              <Select value={form.tipoTarea} onValueChange={(v) => setForm({ ...form, tipoTarea: v as TipoTarea })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(TIPOS_TAREA_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prioridad *</Label>
              <Select value={form.prioridad} onValueChange={(v) => setForm({ ...form, prioridad: v as Prioridad })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fecha">Fecha y Hora Programada *</Label>
              <Input
                id="fecha"
                type="datetime-local"
                value={form.fechaProgramada}
                onChange={(e) => setForm({ ...form, fechaProgramada: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="duracion">Duración Estimada (minutos)</Label>
              <Input
                id="duracion"
                type="number"
                min={15}
                step={15}
                value={form.duracionEstimada}
                onChange={(e) => setForm({ ...form, duracionEstimada: Number(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asignación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Jefe / Encargado *</Label>
              <Select value={form.jefeId} onValueChange={(v) => setForm({ ...form, jefeId: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar jefe" /></SelectTrigger>
                <SelectContent>
                  {jefes.map((j) => (
                    <SelectItem key={j.id} value={j.id}>{j.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Trabajador Asignado *</Label>
              <Select value={form.trabajadorId} onValueChange={(v) => setForm({ ...form, trabajadorId: v })}>
                <SelectTrigger><SelectValue placeholder="Seleccionar trabajador" /></SelectTrigger>
                <SelectContent>
                  {tecnicosDisponibles.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cliente *</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={form.clienteId} onValueChange={(v) => setForm({ ...form, clienteId: v })}>
            <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
            <SelectContent>
              {clientes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.nombre} - {c.sucursal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipos a Revisar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {equipos.map((eq) => (
              <div
                key={eq.id}
                onClick={() => toggleEquipo(eq.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  equipoIds.includes(eq.id)
                    ? "border-primary bg-primary/5"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{eq.codigo} - {eq.nombre}</p>
                    <p className="text-xs text-muted-foreground">{eq.marca} {eq.modelo}</p>
                  </div>
                  {equipoIds.includes(eq.id) && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">Seleccionado</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit">Crear Tarea</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/tareas")}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
