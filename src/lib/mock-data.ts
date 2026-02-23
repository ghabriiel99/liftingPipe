import { Trabajador, Cliente, Equipo, Tarea, TipoFotoObligatoria } from "./types";

export const trabajadoresIniciales: Trabajador[] = [
  { id: "t1", nombre: "Carlos Méndez", email: "carlos@empresa.cl", rol: "trabajador" },
  { id: "t2", nombre: "Miguel Soto", email: "miguel@empresa.cl", rol: "trabajador" },
  { id: "t3", nombre: "Pedro Ramírez", email: "pedro@empresa.cl", rol: "trabajador" },
  { id: "j1", nombre: "Ana Torres", email: "ana@empresa.cl", rol: "jefe" },
  { id: "j2", nombre: "Roberto Figueroa", email: "roberto@empresa.cl", rol: "jefe" },
  { id: "a1", nombre: "Laura Herrera", email: "laura@empresa.cl", rol: "administrador" },
];

export const clientesIniciales: Cliente[] = [
  {
    id: "c1", nombre: "Edificio Plaza Central", sucursal: "Casa Matriz",
    direccion: "Av. Providencia 1234", piso: "1", oficina: "101", referencia: "Frente al metro",
    emailContacto: "admin@plazacentral.cl", nombreContacto: "María López", telefonoContacto: "+56912345678",
  },
  {
    id: "c2", nombre: "Torre Costanera", sucursal: "Sucursal Norte",
    direccion: "Av. Andrés Bello 2457", piso: "15", oficina: "1501", referencia: "Al lado del mall",
    emailContacto: "contacto@torrecostanera.cl", nombreContacto: "Juan Pérez",
  },
  {
    id: "c3", nombre: "Hospital San José", sucursal: "Edificio Principal",
    direccion: "San José 1196", piso: "Subterráneo", oficina: "S-3", referencia: "Entrada por urgencias",
    nombreContacto: "Dr. Andrés Muñoz", telefonoContacto: "+56987654321",
  },
  {
    id: "c4", nombre: "Mall del Sur", sucursal: "Local Comercial",
    direccion: "Av. Gran Avenida 13245", piso: "2", oficina: "L-215", referencia: "Segundo piso, ala norte",
  },
  {
    id: "c5", nombre: "Condominio Los Álamos", sucursal: "Torre A",
    direccion: "Los Álamos 567", piso: "PB", oficina: "Conserjería", referencia: "Entrada principal",
    emailContacto: "admin@losalamos.cl", nombreContacto: "Patricia Vega", telefonoContacto: "+56911223344",
  },
];

export const equiposIniciales: Equipo[] = [
  { id: "e1", codigo: "ASC-01", nombre: "Ascensor Pasajeros 1", marca: "Otis", modelo: "Gen2", numeroSerie: "OT-2024-001", comentario: "Ascensor principal lobby", piezas: [{ id: "p1", nombre: "Cable de tracción", cantidad: 4 }, { id: "p2", nombre: "Zapata de freno", cantidad: 2 }] },
  { id: "e2", codigo: "ASC-02", nombre: "Ascensor Pasajeros 2", marca: "Otis", modelo: "Gen2", numeroSerie: "OT-2024-002", comentario: "Ascensor secundario", piezas: [{ id: "p3", nombre: "Polea de desvío", cantidad: 1 }] },
  { id: "e3", codigo: "ASC-03", nombre: "Ascensor de Servicio", marca: "Schindler", modelo: "3300", numeroSerie: "SC-2023-015", comentario: "Solo personal autorizado", piezas: [] },
  { id: "e4", codigo: "MC-01", nombre: "Montacargas", marca: "Thyssenkrupp", modelo: "Cargo 500", numeroSerie: "TK-2022-088", comentario: "Capacidad 500kg", piezas: [{ id: "p4", nombre: "Rodamiento principal", cantidad: 2 }] },
  { id: "e5", codigo: "ESC-01", nombre: "Escalera Mecánica 1", marca: "KONE", modelo: "TransitMaster", numeroSerie: "KN-2023-042", comentario: "Nivel 1 a Nivel 2", piezas: [{ id: "p5", nombre: "Eslabón de cadena", cantidad: 50 }] },
  { id: "e6", codigo: "ESC-02", nombre: "Escalera Mecánica 2", marca: "KONE", modelo: "TransitMaster", numeroSerie: "KN-2023-043", comentario: "Nivel 2 a Nivel 3", piezas: [] },
  { id: "e7", codigo: "ASC-04", nombre: "Ascensor Panorámico", marca: "Mitsubishi", modelo: "Diamond", numeroSerie: "MT-2024-007", comentario: "Ascensor vidriado exterior", piezas: [{ id: "p6", nombre: "Panel de vidrio", cantidad: 6 }] },
  { id: "e8", codigo: "MC-02", nombre: "Montacargas Industrial", marca: "Thyssenkrupp", modelo: "Cargo 1000", numeroSerie: "TK-2023-112", comentario: "Capacidad 1000kg, zona de carga", piezas: [] },
];

export const tiposFotoIniciales: TipoFotoObligatoria[] = [
  { id: "tf1", nombre: "Calendario de mantención", descripcion: "Calendario de mantención dentro de cabina (mes en curso)" },
  { id: "tf2", nombre: "Libro de novedades", descripcion: "Libro de novedades (mes en curso)" },
  { id: "tf3", nombre: "Sello de certificación", descripcion: "Sello de certificación vigente" },
  { id: "tf4", nombre: "Placa de características", descripcion: "Placa de características del ascensor (marca y capacidad)" },
];

export const tareasIniciales: Tarea[] = [
  {
    id: "ta1", trabajadorId: "t1", jefeId: "j1", clienteId: "c1", equipoIds: ["e1", "e2"],
    fechaProgramada: "2026-02-23T09:00", duracionEstimada: 120, prioridad: "alta",
    tipoTarea: "mantencion_preventiva", estado: "pendiente",
    descripcion: "Mantención preventiva mensual de ascensores del lobby",
    fotos: [], creadoEn: "2026-02-20T10:00",
  },
  {
    id: "ta2", trabajadorId: "t2", jefeId: "j1", clienteId: "c2", equipoIds: ["e3"],
    fechaProgramada: "2026-02-23T14:00", duracionEstimada: 90, prioridad: "media",
    tipoTarea: "inspeccion", estado: "en_progreso",
    descripcion: "Inspección técnica de ascensor de servicio",
    fotos: [], creadoEn: "2026-02-19T08:30",
  },
  {
    id: "ta3", trabajadorId: "t3", jefeId: "j2", clienteId: "c3", equipoIds: ["e4"],
    fechaProgramada: "2026-02-22T08:00", duracionEstimada: 180, prioridad: "alta",
    tipoTarea: "reparacion", estado: "completada",
    descripcion: "Reparación de montacargas - ruido anormal en motor",
    fotos: [], creadoEn: "2026-02-18T15:00",
  },
  {
    id: "ta4", trabajadorId: "t1", jefeId: "j2", clienteId: "c4", equipoIds: ["e5", "e6"],
    fechaProgramada: "2026-02-24T10:00", duracionEstimada: 240, prioridad: "media",
    tipoTarea: "mantencion_preventiva", estado: "pendiente",
    descripcion: "Mantención preventiva de escaleras mecánicas",
    fotos: [], creadoEn: "2026-02-21T09:00",
  },
  {
    id: "ta5", trabajadorId: "t2", jefeId: "j1", clienteId: "c5", equipoIds: ["e7"],
    fechaProgramada: "2026-02-25T09:00", duracionEstimada: 60, prioridad: "baja",
    tipoTarea: "inspeccion", estado: "pendiente",
    descripcion: "Inspección rutinaria de ascensor panorámico",
    fotos: [], creadoEn: "2026-02-22T11:00",
  },
  {
    id: "ta6", trabajadorId: "t3", jefeId: "j1", clienteId: "c1", equipoIds: ["e1"],
    fechaProgramada: "2026-02-21T11:00", duracionEstimada: 60, prioridad: "alta",
    tipoTarea: "mantencion_correctiva", estado: "completada",
    descripcion: "Corrección de puerta que no cierra correctamente",
    fotos: [], creadoEn: "2026-02-20T16:00",
  },
  {
    id: "ta7", trabajadorId: "t1", jefeId: "j2", clienteId: "c3", equipoIds: ["e4"],
    fechaProgramada: "2026-02-23T16:00", duracionEstimada: 90, prioridad: "media",
    tipoTarea: "mantencion_preventiva", estado: "pendiente",
    descripcion: "Lubricación y ajuste de guías del montacargas",
    fotos: [], creadoEn: "2026-02-22T14:00",
  },
  {
    id: "ta8", trabajadorId: "t2", jefeId: "j2", clienteId: "c2", equipoIds: ["e3"],
    fechaProgramada: "2026-02-20T08:00", duracionEstimada: 120, prioridad: "baja",
    tipoTarea: "instalacion", estado: "completada",
    descripcion: "Instalación de nuevo panel de control",
    fotos: [], creadoEn: "2026-02-17T10:00",
  },
  {
    id: "ta9", trabajadorId: "t3", jefeId: "j1", clienteId: "c4", equipoIds: ["e5"],
    fechaProgramada: "2026-02-23T11:00", duracionEstimada: 60, prioridad: "alta",
    tipoTarea: "reparacion", estado: "en_progreso",
    descripcion: "Reparación de sensor de escalera mecánica",
    fotos: [], creadoEn: "2026-02-23T07:00",
  },
  {
    id: "ta10", trabajadorId: "t1", jefeId: "j1", clienteId: "c5", equipoIds: ["e7"],
    fechaProgramada: "2026-02-19T14:00", duracionEstimada: 45, prioridad: "media",
    tipoTarea: "inspeccion", estado: "cancelada",
    descripcion: "Inspección cancelada por acceso restringido",
    fotos: [], creadoEn: "2026-02-18T09:00",
  },
];
