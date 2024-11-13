export const mockData = {
  valoresM2Zona: {
    "Playa Unión": 70000,
    Rawson: 60000,
    Trelew: 65000,
    "Puerto Madryn": 80000,
    Gaiman: 55000,
    Dolavon: 50000,
    "28 de Julio": 48000,
  },
  costoConstruccion: {
    costoConstruccionM2: 90000,
  },
  valorTerrenoZona: {
    "Playa Unión": 20000,
    Rawson: 15000,
    Trelew: 18000,
    "Puerto Madryn": 25000,
    Gaiman: 12000,
    Dolavon: 10000,
    "28 de Julio": 9000,
  },
  tipoCambio: {
    dolarOficial: 150,
    dolarBlue: 200,
  },
  economicIndicators: [
    { date: "2023-01", ipc: 5.1, icc: 4.8, icl: 5.0 },
    { date: "2023-02", ipc: 5.3, icc: 4.9, icl: 5.1 },
    { date: "2023-03", ipc: 5.5, icc: 5.0, icl: 5.2 },
    // Agrega más datos según sea necesario
  ],
};

// Función para generar fechas aleatorias
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export const mockAsientos = [
  {
    id: 1,
    descripcion: "Alquiler Apto 101",
    tipo: "Crédito",
    monto: 1000,
    disponible: "Saldo a liquidar: $1000",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 2,
    descripcion: "Honorarios inmobiliarios",
    tipo: "Débito",
    monto: -100,
    disponible: "Recaudado: $100",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 3,
    descripcion: "Reparación plomería",
    tipo: "Débito",
    monto: -200,
    disponible: "Recaudado: $200",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 4,
    descripcion: "Alquiler Local 3",
    tipo: "Crédito",
    monto: 1500,
    disponible: "Saldo a liquidar: $1500",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 5,
    descripcion: "Impuesto municipal",
    tipo: "Débito",
    monto: -300,
    disponible: "Recaudado: $300",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 6,
    descripcion: "Alquiler Apto 202",
    tipo: "Crédito",
    monto: 1200,
    disponible: "Saldo a liquidar: $1200",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 7,
    descripcion: "Mantenimiento ascensor",
    tipo: "Débito",
    monto: -150,
    disponible: "Recaudado: $150",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 8,
    descripcion: "Alquiler Cochera 5",
    tipo: "Crédito",
    monto: 200,
    disponible: "Saldo a liquidar: $200",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 9,
    descripcion: "Seguro edificio",
    tipo: "Débito",
    monto: -500,
    disponible: "Recaudado: $500",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 10,
    descripcion: "Alquiler Local 7",
    tipo: "Crédito",
    monto: 2000,
    disponible: "Saldo a liquidar: $2000",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 11,
    descripcion: "Gastos administrativos",
    tipo: "Débito",
    monto: -80,
    disponible: "Recaudado: $80",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
  {
    id: 12,
    descripcion: "Alquiler Apto 303",
    tipo: "Crédito",
    monto: 1300,
    disponible: "Saldo a liquidar: $1300",
    vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
  },
];
