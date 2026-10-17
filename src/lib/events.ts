import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_TIME_ZONE, nowInSiteTimeZone, toCalendarStamp } from './datetime';

export type EventEntry = CollectionEntry<'events'>;

/** When an event stops being "upcoming": its end time, or its start time if it has no end. */
const endOf = (event: EventEntry) => event.data.end ?? event.data.start;

const byStart = (a: EventEntry, b: EventEntry) => a.data.start.localeCompare(b.data.start);

/**
 * Splits events into upcoming (soonest first) and past (most recent first).
 * Runs at build time; the deploy workflow rebuilds daily so this stays current.
 */
export async function getEvents() {
  const now = nowInSiteTimeZone();
  const events = await getCollection('events');
  return {
    upcoming: events.filter((e) => endOf(e) >= now).sort(byStart),
    past: events.filter((e) => endOf(e) < now).sort((a, b) => byStart(b, a)),
  };
}

/** Events without an end time are shown in calendars as one hour long. */
function calendarEnd(event: EventEntry): string {
  if (event.data.end) return event.data.end;
  const [date, time] = event.data.start.split('T');
  const [h, m] = time!.split(':').map(Number);
  const hour = Math.min(h! + 1, 23);
  return `${date}T${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function googleCalendarUrl(event: EventEntry): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.data.title,
    dates: `${toCalendarStamp(event.data.start)}/${toCalendarStamp(calendarEnd(event))}`,
    ctz: SITE_TIME_ZONE,
  });
  if (event.data.location) params.set('location', event.data.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

const escapeIcs = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Folds lines longer than 75 octets, as RFC 5545 requires. */
const foldIcs = (line: string) => line.replace(/(.{74})(?=.)/gu, '$1\r\n ');

/** Ann Arbor's time zone rules, so calendar apps place the event correctly. */
const DETROIT_VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:America/Detroit',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:-0500',
  'TZOFFSETTO:-0400',
  'TZNAME:EDT',
  'DTSTART:19700308T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:-0400',
  'TZOFFSETTO:-0500',
  'TZNAME:EST',
  'DTSTART:19701101T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
];

export function toIcs(event: EventEntry, site: URL, description: string): string {
  const url = new URL(`/events/${event.id}/`, site);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Michigan APALSA//mlawapalsa.com//EN',
    'CALSCALE:GREGORIAN',
    ...DETROIT_VTIMEZONE,
    'BEGIN:VEVENT',
    `UID:${event.id}@${site.hostname}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=${SITE_TIME_ZONE}:${toCalendarStamp(event.data.start)}`,
    `DTEND;TZID=${SITE_TIME_ZONE}:${toCalendarStamp(calendarEnd(event))}`,
    `SUMMARY:${escapeIcs(event.data.title)}`,
    event.data.location && `LOCATION:${escapeIcs(event.data.location)}`,
    description && `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter((line): line is string => Boolean(line));
  return lines.map(foldIcs).join('\r\n') + '\r\n';
}
