export function calcularValorComparativo(
  valorPromedioZona,
  superficieCubierta,
  superficieSemicubierta,
  coeficienteReduccion,
  ajuste,
) {
  const superficieTotal =
    superficieCubierta + superficieSemicubierta * coeficienteReduccion;
  const valorComparativo = valorPromedioZona * superficieTotal * (1 + ajuste);
  return valorComparativo;
}

export function calcularValorReposicion(
  superficieCubierta,
  superficieSemicubierta,
  coeficienteReduccion,
  costoConstruccionM2,
  tasaDepreciacion,
) {
  const superficieTotal =
    superficieCubierta + superficieSemicubierta * coeficienteReduccion;
  const valorReposicion =
    superficieTotal * costoConstruccionM2 * (1 - tasaDepreciacion);
  return valorReposicion;
}

export function calcularValorCapitalizacion(
  ingresoMensual,
  gastosMantenimiento,
  tasaCapitalizacion,
) {
  const ingresoNetoAnual = ingresoMensual * 12 - gastosMantenimiento;
  const valorCapitalizacion = ingresoNetoAnual / tasaCapitalizacion;
  return valorCapitalizacion;
}

export function aplicarAjustes(
  valorBase,
  coeficienteProximidad,
  coeficienteOrientacion,
  coeficienteVecindario,
) {
  return (
    valorBase *
    (1 + coeficienteProximidad + coeficienteOrientacion + coeficienteVecindario)
  );
}

export function calcularValorFinal(
  valorComparativo,
  valorReposicion,
  valorCapitalizacion,
  pesoComparativo = 0.4,
  pesoReposicion = 0.35,
  pesoCapitalizacion = 0.25,
) {
  const valorFinal =
    valorComparativo * pesoComparativo +
    valorReposicion * pesoReposicion +
    valorCapitalizacion * pesoCapitalizacion;
  return valorFinal;
}

export function calcularTasacionCompleta(datosPropiedad) {
  const {
    valorPromedioZona,
    superficieCubierta,
    superficieSemicubierta,
    coeficienteReduccion,
    ajuste,
    costoConstruccionM2,
    tasaDepreciacion,
    ingresoMensual,
    gastosMantenimiento,
    tasaCapitalizacion,
    coeficienteProximidad,
    coeficienteOrientacion,
    coeficienteVecindario,
  } = datosPropiedad;

  const valorComparativo = calcularValorComparativo(
    valorPromedioZona,
    superficieCubierta,
    superficieSemicubierta,
    coeficienteReduccion,
    ajuste,
  );
  const valorReposicion = calcularValorReposicion(
    superficieCubierta,
    superficieSemicubierta,
    coeficienteReduccion,
    costoConstruccionM2,
    tasaDepreciacion,
  );
  const valorCapitalizacion = calcularValorCapitalizacion(
    ingresoMensual,
    gastosMantenimiento,
    tasaCapitalizacion,
  );

  const valorComparativoAjustado = aplicarAjustes(
    valorComparativo,
    coeficienteProximidad,
    coeficienteOrientacion,
    coeficienteVecindario,
  );
  const valorReposicionAjustado = aplicarAjustes(
    valorReposicion,
    coeficienteProximidad,
    coeficienteOrientacion,
    coeficienteVecindario,
  );
  const valorCapitalizacionAjustado = aplicarAjustes(
    valorCapitalizacion,
    coeficienteProximidad,
    coeficienteOrientacion,
    coeficienteVecindario,
  );

  const valorFinal = calcularValorFinal(
    valorComparativoAjustado,
    valorReposicionAjustado,
    valorCapitalizacionAjustado,
  );
  return valorFinal;
}
