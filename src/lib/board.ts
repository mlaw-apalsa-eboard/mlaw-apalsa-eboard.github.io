/**
 * Board positions, in the order they appear on the Board page.
 *
 * To add a position, add it here AND to the `role` select options in `.pages.yml`
 * so it shows up in the editor.
 */
export const BOARD_ROLES = [
  'President',
  'Co-President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'Internal Relations Chair',
  'External Relations Chair',
  'Private Practice Chair',
  'Public Interest Chair',
  'Political Action Chair',
  'Development Chair',
  'Social Chair',
  '3L Representative',
  '2L Representative',
  '1L Representative',
] as const;

export type BoardRole = (typeof BOARD_ROLES)[number];

/** Sorts board members by position, then alphabetically by name within a position. */
export function compareBoardMembers(
  a: { role: BoardRole; name: string },
  b: { role: BoardRole; name: string },
): number {
  return BOARD_ROLES.indexOf(a.role) - BOARD_ROLES.indexOf(b.role) || a.name.localeCompare(b.name);
}
