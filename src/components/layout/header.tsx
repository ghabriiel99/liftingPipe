"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Wrench,
  Settings,
  FileText,
  PlusCircle,
} from "lucide-react";

const pageConfig: Record<string, { title: string; icon: React.ElementType; description: string }> = {
  "/": { title: "Dashboard", icon: LayoutDashboard, description: "Resumen general del sistema" },
  "/tareas": { title: "Tareas", icon: ClipboardList, description: "Gestión de órdenes de trabajo" },
  "/tareas/nueva": { title: "Nueva Tarea", icon: PlusCircle, description: "Crear orden de trabajo" },
  "/clientes": { title: "Clientes", icon: Building2, description: "Edificios y sucursales" },
  "/equipos": { title: "Equipos", icon: Wrench, description: "Ascensores, montacargas y más" },
  "/configuracion": { title: "Configuración", icon: Settings, description: "Ajustes del sistema" },
};

export function Header() {
  const pathname = usePathname();
  const config = pageConfig[pathname] || (pathname.startsWith("/tareas/")
    ? { title: "Detalle de Tarea", icon: FileText, description: "Información de la orden de trabajo" }
    : { title: "", icon: LayoutDashboard, description: "" });

  const Icon = config.icon;

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 pl-16 md:pl-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">{config.title}</h2>
          <p className="text-[11px] text-muted-foreground">{config.description}</p>
        </div>
      </div>
    </header>
  );
}
