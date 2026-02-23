"use client";

import { useData } from "@/context/data-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Equipo, Pieza } from "@/lib/types";
import { toast } from "sonner";

const equipoVacio = {
  codigo: "", nombre: "", marca: "", modelo: "", numeroSerie: "", comentario: "",
};

export default function EquiposPage() {
  const { equipos, agregarEquipo, actualizarEquipo, eliminarEquipo } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<Equipo | null>(null);
  const [form, setForm] = useState(equipoVacio);
  const [piezas, setPiezas] = useState<Pieza[]>([]);
  const [nuevaPieza, setNuevaPieza] = useState({ nombre: "", cantidad: 1 });

  const equiposFiltrados = equipos.filter(
    (e) => e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
           e.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
           e.marca.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirNuevo = () => {
    setEditando(null);
    setForm(equipoVacio);
    setPiezas([]);
    setDialogOpen(true);
  };

  const abrirEditar = (equipo: Equipo) => {
    setEditando(equipo);
    const { id, piezas: p, ...rest } = equipo;
    setForm(rest);
    setPiezas([...p]);
    setDialogOpen(true);
  };

  const agregarPieza = () => {
    if (!nuevaPieza.nombre) return;
    setPiezas([...piezas, { id: `p${Date.now()}`, ...nuevaPieza }]);
    setNuevaPieza({ nombre: "", cantidad: 1 });
  };

  const eliminarPieza = (id: string) => {
    setPiezas(piezas.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.codigo || !form.nombre || !form.marca || !form.modelo || !form.numeroSerie) {
      toast.error("Completa todos los campos obligatorios.");
      return;
    }
    if (editando) {
      actualizarEquipo({ ...form, id: editando.id, piezas });
      toast.success("Equipo actualizado.");
    } else {
      agregarEquipo({ ...form, id: `e${Date.now()}`, piezas });
      toast.success("Equipo creado.");
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Buscar equipos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={abrirNuevo}>+ Nuevo Equipo</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Marca / Modelo</TableHead>
                <TableHead>N° Serie</TableHead>
                <TableHead>Piezas</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equiposFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No se encontraron equipos.
                  </TableCell>
                </TableRow>
              ) : (
                equiposFiltrados.map((eq) => (
                  <TableRow key={eq.id}>
                    <TableCell className="font-mono font-medium">{eq.codigo}</TableCell>
                    <TableCell className="font-medium">{eq.nombre}</TableCell>
                    <TableCell>{eq.marca} {eq.modelo}</TableCell>
                    <TableCell className="font-mono text-sm">{eq.numeroSerie}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {eq.piezas.length === 0 ? (
                          <span className="text-xs text-muted-foreground">-</span>
                        ) : (
                          eq.piezas.map((p) => (
                            <Badge key={p.id} variant="outline" className="text-xs">
                              {p.nombre} (x{p.cantidad})
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => abrirEditar(eq)}>Editar</Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { eliminarEquipo(eq.id); toast.success("Equipo eliminado."); }}>
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Equipo" : "Nuevo Equipo"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Código *</Label>
                <Input value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="Ej: ASC-01" />
              </div>
              <div>
                <Label>Nombre *</Label>
                <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: Ascensor Pasajeros" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Marca *</Label>
                <Input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} />
              </div>
              <div>
                <Label>Modelo *</Label>
                <Input value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Número de Serie *</Label>
              <Input value={form.numeroSerie} onChange={(e) => setForm({ ...form, numeroSerie: e.target.value })} />
            </div>
            <div>
              <Label>Comentario</Label>
              <Textarea value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} />
            </div>

            <div className="border-t pt-3">
              <Label className="text-sm font-medium">Piezas Asociadas</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Nombre de pieza"
                  value={nuevaPieza.nombre}
                  onChange={(e) => setNuevaPieza({ ...nuevaPieza, nombre: e.target.value })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  value={nuevaPieza.cantidad}
                  onChange={(e) => setNuevaPieza({ ...nuevaPieza, cantidad: Number(e.target.value) })}
                  className="w-20"
                />
                <Button type="button" variant="outline" size="sm" onClick={agregarPieza}>Agregar</Button>
              </div>
              {piezas.length > 0 && (
                <div className="mt-2 space-y-1">
                  {piezas.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm bg-muted/50 px-3 py-1.5 rounded">
                      <span>{p.nombre} (x{p.cantidad})</span>
                      <button type="button" onClick={() => eliminarPieza(p.id)} className="text-destructive text-xs hover:underline">Quitar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">{editando ? "Guardar Cambios" : "Crear Equipo"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
