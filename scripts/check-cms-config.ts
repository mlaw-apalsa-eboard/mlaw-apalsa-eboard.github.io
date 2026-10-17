/**
 * Checks that `.pages.yml` (the Pages CMS editor config) matches the site's content.
 *
 * Pages CMS rewrites a file using only the fields listed in `.pages.yml`, so a field
 * that exists in the content but not in the config would be silently deleted the next
 * time someone saves that page. This catches that, plus a few other mismatches.
 *
 * Run with: npm run check:cms
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { BOARD_ROLES } from '../src/lib/board.ts';

interface Field {
  name: string;
  type?: string;
  component?: string;
  list?: unknown;
  fields?: Field[];
  options?: { media?: string; values?: unknown[] };
}

interface Entry {
  name: string;
  type: 'collection' | 'file' | 'group';
  path: string;
  fields: Field[];
  items?: Entry[];
}

interface Config {
  media: { name: string }[];
  components: Record<string, Omit<Field, 'name'>>;
  content: Entry[];
}

const CONTENT_DIRS = [
  'src/content/pages',
  'src/content/settings',
  'src/content/board',
  'src/content/events',
];

const config = YAML.parse(fs.readFileSync('.pages.yml', 'utf8')) as Config;
const problems: string[] = [];

const resolve = (field: Field): Field =>
  field.component ? { ...config.components[field.component], ...field } : field;

const flatten = (entries: Entry[]): Entry[] =>
  entries.flatMap((entry) => (entry.type === 'group' ? flatten(entry.items ?? []) : [entry]));

const filesOf = (entry: Entry): string[] =>
  entry.type === 'collection'
    ? fs.readdirSync(entry.path).map((file) => path.join(entry.path, file))
    : [entry.path];

function readContent(file: string): Record<string, unknown> {
  const text = fs.readFileSync(file, 'utf8');
  if (!file.endsWith('.md')) return YAML.parse(text) ?? {};
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const body = match[2]?.trim() ? { body: match[2] } : {};
  return { ...YAML.parse(match[1]!), ...body };
}

function checkData(data: unknown, fields: Field[], where: string) {
  const defs = new Map(fields.map((field) => [field.name, resolve(field)]));
  for (const [key, value] of Object.entries((data ?? {}) as Record<string, unknown>)) {
    const def = defs.get(key);
    if (!def) {
      problems.push(
        `${where}: "${key}" is not in .pages.yml, so saving in Pages CMS would delete it`,
      );
    } else if (def.type === 'object' && def.fields && value != null) {
      const items = def.list ? (value as unknown[]) : [value];
      items.forEach((item) => checkData(item, def.fields!, `${where} → ${key}`));
    }
  }
}

function checkMedia(fields: Field[], where: string) {
  for (const field of fields.map(resolve)) {
    const media = field.options?.media;
    if (field.type === 'image' && !config.media.some((source) => source.name === media)) {
      problems.push(`${where} → ${field.name}: unknown media source "${media}"`);
    }
    if (field.fields) checkMedia(field.fields, `${where} → ${field.name}`);
  }
}

const entries = flatten(config.content);

for (const entry of entries) {
  checkMedia(entry.fields, entry.name);
  for (const file of filesOf(entry)) checkData(readContent(file), entry.fields, file);
}

// Every content file should be editable.
const editable = new Set(entries.flatMap(filesOf));
for (const dir of CONTENT_DIRS) {
  for (const file of fs.readdirSync(dir)) {
    if (!editable.has(path.join(dir, file)))
      problems.push(`${dir}/${file} is not editable in Pages CMS`);
  }
}

// Board positions in the editor must match the ones the site knows how to sort.
const roleField = entries
  .find((entry) => entry.name === 'board')
  ?.fields.find((field) => field.name === 'role');
const cmsRoles = JSON.stringify(roleField?.options?.values ?? []);
if (cmsRoles !== JSON.stringify(BOARD_ROLES)) {
  problems.push('Board positions in .pages.yml do not match BOARD_ROLES in src/lib/board.ts');
}

if (problems.length > 0) {
  console.error(`✗ .pages.yml has ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ .pages.yml matches the site content (${entries.length} entries checked)`);
