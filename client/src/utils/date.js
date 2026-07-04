export function formatCalendarDate(value, options = {}) {
  if (!value) return options.fallback || '—';

  const date = parseCalendarDate(value);
  if (!date) return String(value);

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: options.month || 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function parseCalendarDate(value) {
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
