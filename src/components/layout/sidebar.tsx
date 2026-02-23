"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Wrench,
  Settings,
  ArrowUpDown,
  HardHat,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tareas", label: "Tareas", icon: ClipboardList },
  { href: "/clientes", label: "Clientes", icon: Building2 },
  { href: "/equipos", label: "Equipos", icon: Wrench },
  { href: "/configuracion", label: "Configuración", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[oklch(0.55_0.2_250)] flex items-center justify-center">
            <ArrowUpDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">LiftTask</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">Gestión de Mantenimiento</p>
          </div>
        </div>
      </div>

      {/* Indicador de estado */}
      <div className="px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <span className="text-emerald-400 text-xs font-mono font-bold">OK</span>
          </div>
          <div className="text-xs text-white/40">
            <span className="text-emerald-400 font-medium">Sistema operativo</span>
            <br />8 equipos monitoreados
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-[10px] text-white/30 uppercase tracking-wider px-3 pt-2 pb-1.5 font-medium">Navegación</p>
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[oklch(0.55_0.2_250)] text-white shadow-lg shadow-blue-500/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Usuario */}
      <div className="p-3 border-t border-white/10">
        <div className="px-3 py-2 rounded-lg bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center">
              <HardHat className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">Laura Herrera</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Botón hamburger - solo mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg bg-[oklch(0.22_0.05_250)] flex items-center justify-center shadow-lg"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 bg-[oklch(0.22_0.05_250)] min-h-screen flex-col">
        <SidebarContent />
      </aside>

      {/* Sidebar mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-[oklch(0.22_0.05_250)] min-h-screen flex flex-col animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
