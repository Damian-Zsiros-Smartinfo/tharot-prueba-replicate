import moment from "moment";

export function hasDifferenceOfDateMore3Min(desdeFecha: string): boolean {
  const ahora = new Date();

  const fecha1 = moment(new Date());
  const fecha2 = moment(desdeFecha);

  const diferenciaEnMinutos = fecha2.diff(fecha1, "minutes");

  console.log(diferenciaEnMinutos);

  return diferenciaEnMinutos > 3;
}
