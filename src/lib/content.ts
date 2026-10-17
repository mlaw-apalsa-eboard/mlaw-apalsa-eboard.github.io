import { getEntry, render } from 'astro:content';

/** Loads a page from `src/content/pages/` along with its rendered Markdown body. */
export async function getPage(id: string) {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Missing page content: src/content/pages/${id}.md`);
  const { Content, headings } = await render(page);
  return { ...page.data, Content, headings };
}

export async function getSettings() {
  const settings = await getEntry('settings', 'site');
  if (!settings) throw new Error('Missing site settings: src/content/settings/site.yml');
  return settings.data;
}
