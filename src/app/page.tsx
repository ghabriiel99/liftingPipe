"use client";

import { useData } from "@/context/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ESTADO_LABELS, PRIORIDAD_LABELS } from "@/lib/types";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  HardHat,
  Building2,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { tareas, trabajadores, clientes, equipos } = useData();

  const pendientes = tareas.filter((t) => t.estado === "pendiente").length;
  const enProgreso = tareas.filter((t) => t.estado === "en_progreso").length;
  const completadas = tareas.filter((t) => t.estado === "completada").length;

  const hoy = new Date().toISOString().split("T")[0];
  const tareasHoy = tareas.filter((t) => t.fechaProgramada.startsWith(hoy));

  const prioridadColor = {
    alta: "bg-red-100 text-red-800",
    media: "bg-yellow-100 text-yellow-800",
    baja: "bg-green-100 text-green-800",
  };

  const estadoColor = {
    pendiente: "bg-slate-100 text-slate-800",
    en_progreso: "bg-blue-100 text-blue-800",
    completada: "bg-green-100 text-green-800",
    cancelada: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Cards de resumen con iconos temáticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tareas</CardTitle>
              <ClipboardList className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tareas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{equipos.length} equipos registrados</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pendientes}</div>
            <p className="text-xs text-muted-foreground mt-1">Esperando ejecución</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">En Progreso</CardTitle>
              <ArrowUpDown className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{enProgreso}</div>
            <p className="text-xs text-muted-foreground mt-1">Técnicos en terreno</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completadas</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{completadas}</div>
            <p className="text-xs text-muted-foreground mt-1">Tareas finalizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div className="flex gap-3">
        <Link href="/tareas/nueva">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </Button>
        </Link>
        <Link href="/tareas">
          <Button variant="outline" className="gap-2">
            Ver Todas las Tareas
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Tareas de hoy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <CardTitle>Tareas de Hoy</CardTitle>
            <Badge variant="secondary" className="ml-2">{tareasHoy.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {tareasHoy.length === 0 ? (
            <div className="text-center py-8">
              <ArrowUpDown className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No hay tareas programadas para hoy.</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Todos los ascensores operan con normalidad.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tareasHoy.map((tarea) => {
                const trabajador = trabajadores.find((tr) => tr.id === tarea.trabajadorId);
                const cliente = clientes.find((cl) => cl.id === tarea.clienteId);
                return (
                  <Link key={tarea.id} href={`/tareas/${tarea.id}`} className="block">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <ArrowUpDown className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-medium text-sm">{tarea.descripcion}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <HardHat className="w-3 h-3" />
                            <span>{trabajador?.nombre}</span>
                            <span>-</span>
                            <Building2 className="w-3 h-3" />
                            <span>{cliente?.nombre}</span>
                            <span>-</span>
                            <Clock className="w-3 h-3" />
                            <span>{tarea.fechaProgramada.split("T")[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className={prioridadColor[tarea.prioridad]}>
                          {PRIORIDAD_LABELS[tarea.prioridad]}
                        </Badge>
                        <Badge variant="secondary" className={estadoColor[tarea.estado]}>
                          {ESTADO_LABELS[tarea.estado]}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardHat className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Técnicos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trabajadores.filter((t) => t.rol === "trabajador").map((t) => {
                const tareasActivas = tareas.filter((ta) => ta.trabajadorId === t.id && ta.estado !== "completada" && ta.estado !== "cancelada").length;
                return (
                  <div key={t.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {t.nombre.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span>{t.nombre}</span>
                    </div>
                    <Badge variant={tareasActivas > 2 ? "destructive" : "secondary"}>
                      {tareasActivas} activas
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Edificios / Clientes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clientes.slice(0, 5).map((c) => {
                const equiposCliente = tareas.filter((t) => t.clienteId === c.id).flatMap((t) => t.equipoIds);
                return (
                  <div key={c.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{c.nombre}</p>
                      <p className="text-xs text-muted-foreground">{c.sucursal} - {c.direccion}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      {new Set(equiposCliente).size} eq.
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
