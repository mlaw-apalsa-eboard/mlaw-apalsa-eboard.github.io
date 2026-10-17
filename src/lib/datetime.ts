/**
 * Event times are stored as wall-clock strings in Ann Arbor time ("2026-10-02T12:30"),
 * exactly as editors type them. Everything here works on those strings directly, so the
 * build machine's time zone (UTC on GitHub Actions) never shifts an event.
 */
export const SITE_TIME_ZONE = 'America/Detroit';

/** Matches "YYYY-MM-DDTHH:mm". */
export const LOCAL_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

interface Parts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function parse(value: string): Parts {
  const [date = '', time = ''] = value.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return { year: year!, month: month!, day: day!, hour: hour!, minute: minute! };
}

/**
 * A Date whose UTC fields equal the wall-clock fields. Only for formatting with
 * `timeZone: 'UTC'`; never compare it with a real instant.
 */
function asWallClock(value: string): Date {
  const { year, month, day, hour, minute } = parse(value);
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' });

const longDate = fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const shortMonth = fmt({ month: 'short' });
const dayOfMonth = fmt({ day: 'numeric' });
const time = fmt({ hour: 'numeric', minute: '2-digit' });

export const formatLongDate = (value: string) => longDate.format(asWallClock(value));
export const formatMonth = (value: string) => shortMonth.format(asWallClock(value));
export const formatDay = (value: string) => dayOfMonth.format(asWallClock(value));
export const formatTime = (value: string) => time.format(asWallClock(value));

export const isSameDay = (a: string, b: string) => a.slice(0, 10) === b.slice(0, 10);

/** "Friday, October 2, 2026 · 12:30 PM – Sunday, October 4, 2026 · 3:30 PM" style range. */
export function formatRange(start: string, end?: string): string {
  const startText = `${formatLongDate(start)} · ${formatTime(start)}`;
  if (!end) return startText;
  if (isSameDay(start, end)) return `${startText} – ${formatTime(end)}`;
  return `${startText} – ${formatLongDate(end)} · ${formatTime(end)}`;
}

/** The current wall-clock time in Ann Arbor, as "YYYY-MM-DDTHH:mm". */
export function nowInSiteTimeZone(now: Date = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: SITE_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

/** "2026-10-02T12:30" → "20261002T123000" (iCalendar / Google Calendar format). */
export const toCalendarStamp = (value: string) => `${value.replace(/[-:]/g, '')}00`;
