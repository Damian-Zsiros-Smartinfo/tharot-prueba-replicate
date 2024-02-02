/** @format */

export function getHourSpanish() {
  const ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  const ampm = horas >= 12 ? "PM" : "AM";

  // Convertir a formato de 12 horas
  horas = horas % 12 || 12;

  const minutesSpanish = minutos < 10 ? "0" + minutos : minutos;

  const horaFormateada = `${horas}:${minutesSpanish} ${ampm}`;
  return horaFormateada;
}
