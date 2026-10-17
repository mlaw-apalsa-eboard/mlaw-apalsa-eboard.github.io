export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => 'links' in item;

/** Main site navigation. Mirrors the structure of the original Squarespace site. */
export const NAVIGATION: NavItem[] = [
  {
    label: 'About',
    links: [
      { label: 'Mission', href: '/mission/' },
      { label: 'Board', href: '/board/' },
      { label: 'Constitution', href: '/constitution/' },
    ],
  },
  {
    label: 'Students',
    links: [
      { label: 'Prospective Students', href: '/prospectives/' },
      { label: 'Public Interest Fellowship', href: '/fellowship/' },
    ],
  },
  {
    label: 'Events',
    links: [
      { label: 'Upcoming Events', href: '/events/' },
      { label: 'Origins Banquet', href: '/origins/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
];

/** True if `href` is the current page or a parent of it (e.g. /events/ for /events/retreat/). */
export function isCurrent(href: string, pathname: string): boolean {
  const normalize = (path: string) => (path.endsWith('/') ? path : `${path}/`);
  const current = normalize(pathname);
  return href === '/' ? current === '/' : current.startsWith(normalize(href));
}
