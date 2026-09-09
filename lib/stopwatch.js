export function pad(num, size = 2) {
  return String(num).padStart(size, "0");
}

export function breakdown(ms) {
  const total = Math.max(0, Math.floor(ms));
  const milliseconds = Math.floor((total % 1000) / 10);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor(total / (1000 * 60 * 60));
  return { hours, minutes, seconds, milliseconds };
}

export function formatSplit(ms) {
  const { hours, minutes, seconds, milliseconds } = breakdown(ms);
  return {
    h: pad(hours, 2),
    m: pad(minutes, 2),
    s: pad(seconds, 2),
    ms: pad(milliseconds, 2),
  };
}

export function formatDuration(ms) {
  const { hours, minutes, seconds } = breakdown(ms);
  const parts = [];

  if (hours) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (minutes) parts.push(`${minutes} mins`);
  if (seconds || parts.length === 0) parts.push(`${seconds} secs`);

  return parts.join(" ");
}
