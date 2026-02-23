"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Tarea, Cliente, Equipo, Trabajador, TipoFotoObligatoria } from "@/lib/types";
import {
  tareasIniciales,
  clientesIniciales,
  equiposIniciales,
  trabajadoresIniciales,
  tiposFotoIniciales,
} from "@/lib/mock-data";

interface DataContextType {
  tareas: Tarea[];
  clientes: Cliente[];
  equipos: Equipo[];
  trabajadores: Trabajador[];
  tiposFoto: TipoFotoObligatoria[];
  agregarTarea: (tarea: Tarea) => void;
  actualizarTarea: (tarea: Tarea) => void;
  eliminarTarea: (id: string) => void;
  agregarCliente: (cliente: Cliente) => void;
  actualizarCliente: (cliente: Cliente) => void;
  eliminarCliente: (id: string) => void;
  agregarEquipo: (equipo: Equipo) => void;
  actualizarEquipo: (equipo: Equipo) => void;
  eliminarEquipo: (id: string) => void;
  agregarTipoFoto: (tipo: TipoFotoObligatoria) => void;
  actualizarTipoFoto: (tipo: TipoFotoObligatoria) => void;
  eliminarTipoFoto: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [tareas, setTareas] = useState<Tarea[]>(tareasIniciales);
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [trabajadores] = useState<Trabajador[]>(trabajadoresIniciales);
  const [tiposFoto, setTiposFoto] = useState<TipoFotoObligatoria[]>(tiposFotoIniciales);

  const agregarTarea = (tarea: Tarea) => setTareas((prev) => [...prev, tarea]);
  const actualizarTarea = (tarea: Tarea) => setTareas((prev) => prev.map((t) => (t.id === tarea.id ? tarea : t)));
  const eliminarTarea = (id: string) => setTareas((prev) => prev.filter((t) => t.id !== id));

  const agregarCliente = (cliente: Cliente) => setClientes((prev) => [...prev, cliente]);
  const actualizarCliente = (cliente: Cliente) => setClientes((prev) => prev.map((c) => (c.id === cliente.id ? cliente : c)));
  const eliminarCliente = (id: string) => setClientes((prev) => prev.filter((c) => c.id !== id));

  const agregarEquipo = (equipo: Equipo) => setEquipos((prev) => [...prev, equipo]);
  const actualizarEquipo = (equipo: Equipo) => setEquipos((prev) => prev.map((e) => (e.id === equipo.id ? equipo : e)));
  const eliminarEquipo = (id: string) => setEquipos((prev) => prev.filter((e) => e.id !== id));

  const agregarTipoFoto = (tipo: TipoFotoObligatoria) => setTiposFoto((prev) => [...prev, tipo]);
  const actualizarTipoFoto = (tipo: TipoFotoObligatoria) => setTiposFoto((prev) => prev.map((t) => (t.id === tipo.id ? tipo : t)));
  const eliminarTipoFoto = (id: string) => setTiposFoto((prev) => prev.filter((t) => t.id !== id));

  return (
    <DataContext.Provider
      value={{
        tareas, clientes, equipos, trabajadores, tiposFoto,
        agregarTarea, actualizarTarea, eliminarTarea,
        agregarCliente, actualizarCliente, eliminarCliente,
        agregarEquipo, actualizarEquipo, eliminarEquipo,
        agregarTipoFoto, actualizarTipoFoto, eliminarTipoFoto,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
