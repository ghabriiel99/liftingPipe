"use client";

import { useData } from "@/context/data-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { ESTADO_LABELS, PRIORIDAD_LABELS, TIPOS_TAREA_LABELS, EstadoTarea, Prioridad } from "@/lib/types";

export default function TareasPage() {
  const { tareas, trabajadores, clientes } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const tareasFiltradas = tareas.filter((t) => {
    const matchBusqueda = t.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === "todos" || t.estado === filtroEstado;
    const matchPrioridad = filtroPrioridad === "todos" || t.prioridad === filtroPrioridad;
    const fechaTarea = t.fechaProgramada.split("T")[0];
    const matchFechaDesde = !fechaDesde || fechaTarea >= fechaDesde;
    const matchFechaHasta = !fechaHasta || fechaTarea <= fechaHasta;
    return matchBusqueda && matchEstado && matchPrioridad && matchFechaDesde && matchFechaHasta;
  });

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-1">
          <Input
            placeholder="Buscar tareas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroPrioridad} onValueChange={setFiltroPrioridad}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas las prioridades</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href="/tareas/nueva">
          <Button>+ Nueva Tarea</Button>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Label className="text-sm text-muted-foreground whitespace-nowrap">Filtrar por fecha:</Label>
        <Input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          className="w-[170px]"
          placeholder="Desde"
        />
        <span className="text-muted-foreground text-sm">a</span>
        <Input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          className="w-[170px]"
          placeholder="Hasta"
        />
        {(fechaDesde || fechaHasta) && (
          <Button variant="ghost" size="sm" onClick={() => { setFechaDesde(""); setFechaHasta(""); }}>
            Limpiar fechas
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Trabajador</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tareasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No se encontraron tareas.
                  </TableCell>
                </TableRow>
              ) : (
                tareasFiltradas.map((tarea) => {
                  const trabajador = trabajadores.find((tr) => tr.id === tarea.trabajadorId);
                  const cliente = clientes.find((cl) => cl.id === tarea.clienteId);
                  return (
                    <TableRow key={tarea.id}>
                      <TableCell className="font-medium max-w-[250px] truncate">{tarea.descripcion}</TableCell>
                      <TableCell className="text-sm">{TIPOS_TAREA_LABELS[tarea.tipoTarea]}</TableCell>
                      <TableCell className="text-sm">{trabajador?.nombre}</TableCell>
                      <TableCell className="text-sm">{cliente?.nombre}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {new Date(tarea.fechaProgramada).toLocaleDateString("es-CL", { day: "2-digit", month: "short" })}
                        {" "}
                        {tarea.fechaProgramada.split("T")[1]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={prioridadColor[tarea.prioridad]}>
                          {PRIORIDAD_LABELS[tarea.prioridad]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={estadoColor[tarea.estado]}>
                          {ESTADO_LABELS[tarea.estado]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/tareas/${tarea.id}`}>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
