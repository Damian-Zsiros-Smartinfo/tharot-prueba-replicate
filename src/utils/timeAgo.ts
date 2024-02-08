export function timeAgo(date: Date): string | undefined {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const timeUnits: { value: number; unit: string }[] = [
    { value: days, unit: "día" },
    { value: hours, unit: "hora" },
    { value: minutes, unit: "minuto" },
    { value: seconds, unit: "segundo" }
  ];

  for (const { value, unit } of timeUnits) {
    if (value > 0) {
      return value === 1 ? `hace un ${unit}` : `hace ${value} ${unit}s`;
    }
  }

  return "hace un momento";
}
