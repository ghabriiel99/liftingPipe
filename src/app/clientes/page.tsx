"use client";

import { useData } from "@/context/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Cliente } from "@/lib/types";
import { toast } from "sonner";

const clienteVacio: Omit<Cliente, "id"> = {
  nombre: "", sucursal: "", direccion: "", piso: "", oficina: "", referencia: "",
  emailContacto: "", nombreContacto: "", telefonoContacto: "",
};

export default function ClientesPage() {
  const { clientes, agregarCliente, actualizarCliente, eliminarCliente } = useData();
  const [busqueda, setBusqueda] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [form, setForm] = useState<Omit<Cliente, "id">>(clienteVacio);

  const clientesFiltrados = clientes.filter(
    (c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
           c.sucursal.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirNuevo = () => {
    setEditando(null);
    setForm(clienteVacio);
    setDialogOpen(true);
  };

  const abrirEditar = (cliente: Cliente) => {
    setEditando(cliente);
    const { id, ...rest } = cliente;
    setForm(rest);
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.sucursal || !form.direccion || !form.piso || !form.oficina || !form.referencia) {
      toast.error("Completa todos los campos obligatorios.");
      return;
    }
    if (editando) {
      actualizarCliente({ ...form, id: editando.id });
      toast.success("Cliente actualizado.");
    } else {
      agregarCliente({ ...form, id: `c${Date.now()}` });
      toast.success("Cliente creado.");
    }
    setDialogOpen(false);
  };

  const handleEliminar = (id: string) => {
    eliminarCliente(id);
    toast.success("Cliente eliminado.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Buscar clientes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={abrirNuevo}>+ Nuevo Cliente</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Sucursal</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Piso / Oficina</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No se encontraron clientes.
                  </TableCell>
                </TableRow>
              ) : (
                clientesFiltrados.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nombre}</TableCell>
                    <TableCell>{c.sucursal}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{c.direccion}</TableCell>
                    <TableCell>{c.piso} / {c.oficina}</TableCell>
                    <TableCell className="text-sm">
                      {c.nombreContacto || "-"}
                      {c.telefonoContacto && <span className="block text-xs text-muted-foreground">{c.telefonoContacto}</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => abrirEditar(c)}>Editar</Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleEliminar(c.id)}>Eliminar</Button>
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
            <DialogTitle>{editando ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Nombre *</Label>
                <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div>
                <Label>Sucursal *</Label>
                <Input value={form.sucursal} onChange={(e) => setForm({ ...form, sucursal: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Dirección *</Label>
              <Input value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Piso *</Label>
                <Input value={form.piso} onChange={(e) => setForm({ ...form, piso: e.target.value })} />
              </div>
              <div>
                <Label>Oficina *</Label>
                <Input value={form.oficina} onChange={(e) => setForm({ ...form, oficina: e.target.value })} />
              </div>
              <div>
                <Label>Referencia *</Label>
                <Input value={form.referencia} onChange={(e) => setForm({ ...form, referencia: e.target.value })} />
              </div>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">Datos opcionales</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Nombre Contacto</Label>
                <Input value={form.nombreContacto || ""} onChange={(e) => setForm({ ...form, nombreContacto: e.target.value })} />
              </div>
              <div>
                <Label>Email Contacto</Label>
                <Input type="email" value={form.emailContacto || ""} onChange={(e) => setForm({ ...form, emailContacto: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Teléfono Contacto</Label>
              <Input value={form.telefonoContacto || ""} onChange={(e) => setForm({ ...form, telefonoContacto: e.target.value })} />
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">{editando ? "Guardar Cambios" : "Crear Cliente"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Separator() {
  return <div className="border-t my-2" />;
}
