export type Prioridad = "alta" | "media" | "baja";
export type EstadoTarea = "pendiente" | "en_progreso" | "completada" | "cancelada";
export type TipoTarea = "mantencion_preventiva" | "mantencion_correctiva" | "inspeccion" | "instalacion" | "reparacion";

export interface Trabajador {
  id: string;
  nombre: string;
  email: string;
  rol: "administrador" | "jefe" | "trabajador";
}

export interface Cliente {
  id: string;
  nombre: string;
  sucursal: string;
  direccion: string;
  piso: string;
  oficina: string;
  referencia: string;
  emailContacto?: string;
  nombreContacto?: string;
  telefonoContacto?: string;
}

export interface Pieza {
  id: string;
  nombre: string;
  cantidad: number;
}

export interface Equipo {
  id: string;
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  comentario: string;
  piezas: Pieza[];
}

export interface FotoEvidencia {
  id: string;
  tipoFotoId: string;
  archivo: string; // base64 data URL
  comentario: string;
}

export interface TipoFotoObligatoria {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Firma {
  dataUrl: string;
  fechaHora: string;
}

export interface Tarea {
  id: string;
  trabajadorId: string;
  jefeId: string;
  clienteId: string;
  equipoIds: string[];
  fechaProgramada: string;
  duracionEstimada: number; // minutos
  prioridad: Prioridad;
  tipoTarea: TipoTarea;
  estado: EstadoTarea;
  descripcion: string;
  fotos: FotoEvidencia[];
  firmaTrabajador?: Firma;
  firmaCliente?: Firma;
  creadoEn: string;
}

export const TIPOS_TAREA_LABELS: Record<TipoTarea, string> = {
  mantencion_preventiva: "Mantención Preventiva",
  mantencion_correctiva: "Mantención Correctiva",
  inspeccion: "Inspección",
  instalacion: "Instalación",
  reparacion: "Reparación",
};

export const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export const ESTADO_LABELS: Record<EstadoTarea, string> = {
  pendiente: "Pendiente",
  en_progreso: "En Progreso",
  completada: "Completada",
  cancelada: "Cancelada",
};
