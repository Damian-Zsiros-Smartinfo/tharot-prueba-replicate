export function timeAgo(postgresTimestamp: string): string {
  const currentDate = new Date();
  const timestampDate = new Date(postgresTimestamp);

  const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - timestampDate.getTime()) / 1000);

  const intervals = {
      año: 31536000,
      mes: 2592000,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
  };

  let elapsedTime = 0;
  let unit = "";

  for (const [intervalUnit, secondsInInterval] of Object.entries(intervals)) {
      elapsedTime = Math.floor(timeDifferenceInSeconds / secondsInInterval);

      if (elapsedTime >= 1) {
          unit = intervalUnit;
          break;
      }
  }

  if (elapsedTime > 1) {
      unit += "s";
  }

  return `${elapsedTime} ${unit} ago`;
}