import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { toIcs, type EventEntry } from '@/lib/events';

export const getStaticPaths = (async () => {
  const events = await getCollection('events');
  return events.map((event) => ({ params: { id: event.id }, props: { event } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ event: EventEntry }> = ({ props, site }) => {
  const { event } = props;
  return new Response(toIcs(event, site!, event.body?.trim() ?? ''), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
