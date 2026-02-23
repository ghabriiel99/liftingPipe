"use client";

import { useData } from "@/context/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { TipoFotoObligatoria } from "@/lib/types";
import { toast } from "sonner";

export default function ConfiguracionPage() {
  const { tiposFoto, agregarTipoFoto, actualizarTipoFoto, eliminarTipoFoto } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<TipoFotoObligatoria | null>(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: "", descripcion: "" });
    setDialogOpen(true);
  };

  const abrirEditar = (tipo: TipoFotoObligatoria) => {
    setEditando(tipo);
    setForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion) {
      toast.error("Completa todos los campos.");
      return;
    }
    if (editando) {
      actualizarTipoFoto({ ...form, id: editando.id });
      toast.success("Tipo de foto actualizado.");
    } else {
      agregarTipoFoto({ ...form, id: `tf${Date.now()}` });
      toast.success("Tipo de foto creado.");
    }
    setDialogOpen(false);
  };

  const handleEliminar = (id: string) => {
    eliminarTipoFoto(id);
    toast.success("Tipo de foto eliminado.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tipos de Fotografía Obligatoria</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configura los tipos de foto que se requieren en cada tarea.
              </p>
            </div>
            <Button onClick={abrirNuevo}>+ Agregar Tipo</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiposFoto.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No hay tipos de foto configurados.
                  </TableCell>
                </TableRow>
              ) : (
                tiposFoto.map((tipo) => (
                  <TableRow key={tipo.id}>
                    <TableCell className="font-medium">{tipo.nombre}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tipo.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => abrirEditar(tipo)}>Editar</Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleEliminar(tipo.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Tipo de Foto" : "Nuevo Tipo de Foto"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre *</Label>
              <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: Calendario de mantención" />
            </div>
            <div>
              <Label>Descripción *</Label>
              <Textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción de lo que debe mostrar la foto..." />
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">{editando ? "Guardar Cambios" : "Crear Tipo"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
