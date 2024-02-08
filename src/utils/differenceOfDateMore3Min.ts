export function hasDifferenceOfDateMore3Min(desdeFecha: Date): boolean {
  const ahora = new Date();

  const diferenciaEnMilisegundos = ahora.getTime() - desdeFecha.getTime();

  const diferenciaEnMinutos = diferenciaEnMilisegundos / (1000 * 60);

  return diferenciaEnMinutos > 3;
}
