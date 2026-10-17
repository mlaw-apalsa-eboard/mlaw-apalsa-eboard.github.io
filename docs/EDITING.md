# Editing the website

You can change everything on the site (board bios, events, fellowship recipients, sponsors,
photos, page text) from your browser, without touching any code.

## Getting access

1. Ask a current board member who manages the site to invite you to **Pages CMS** using your
   email address. You don't need a GitHub account.
2. Open the invitation email and sign in at **[app.pagescms.org](https://app.pagescms.org)**.
3. Choose the **mlawapalsa** site.

The left sidebar lists everything you can edit:

| Sidebar item      | What it controls                                                       |
| ----------------- | ---------------------------------------------------------------------- |
| **Board members** | Everyone on the Board page: name, position, headshot, bio              |
| **Events**        | The Events page and the "Upcoming events" section of the home page     |
| **Pages**         | Text and photos for each page, plus fellowship recipients and sponsors |
| **Site settings** | Board email, Instagram link, mailing list link, office address         |

## After you save

Each save publishes automatically. **Your change is live in about 2 minutes.** Refresh the
page to see it (you may need a hard refresh: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> on a
Mac, <kbd>Ctrl</kbd>+<kbd>F5</kbd> on Windows).

If your change hasn't shown up after 5 minutes, see [If something goes wrong](#if-something-goes-wrong).

---

## Common tasks

### Add an event

1. Open **Events** and add a new entry.
2. Fill in:
   - **Event name**
   - **Starts**: date and time, in Ann Arbor time
   - **Ends** (optional): leave blank if there's no set end time
   - **Location** (optional)
   - **Description**: the first paragraph is shown on the events list
3. **Save.**

The event appears under "Upcoming" until it ends, then moves to "Past events" by itself. You
don't need to delete old events, but you can if the list gets long.

### Update the board for a new year

Do this after elections (1L Representatives in the fall, everyone else at the end of winter
semester).

- **New member:** open **Board members** and add a new entry. Enter their name, pick their **Position**,
  upload a **Headshot** (square photos look best), and paste their **Bio**.
- **Changed position:** open their entry and change **Position**.
- **Someone left the board:** open their entry and delete it.
- **Update the year in the heading:** **Pages → Board (intro text)** and change the **Page
  title**, e.g. "The APALSA Executive Board, 2027–2028".

Members are sorted automatically by position (President first, then Vice President, and so on),
and alphabetically by name within each position.

> **Need a position that isn't in the list?** It has to be added once in the code. Ask whoever
> manages the site's GitHub (see [HANDOFF.md](HANDOFF.md)).

### Add fellowship recipients

1. **Pages → Fellowship.**
2. Under **Past recipients**, add an entry: enter the **Year**, then add each **Fellow** with
   their **Organization**.
3. Also update the dates in the **Eligibility** section of the **Page text** (dues year and
   summer).
4. **Save.**

Years are sorted newest-first automatically.

### Update Origins Banquet sponsors

**Pages → Origins Banquet.** Edit the **Sponsors thank-you line** (update the year), then edit
the **Sponsors** levels and names. Photos are at the bottom of the same page.

### Add or change photos

On pages with a **Photos** section (Mission, Prospective Students, Origins Banquet):

1. Add an item and choose or upload a **Photo**.
2. Fill in **Photo description**: a short description of what's in the photo for people using
   screen readers, e.g. "The 2026 board at the Origins Banquet". This is required.
3. Add a **Caption** if you want text shown under the photo.

Large photos are fine. The site resizes and compresses them automatically.

### Change the email, Instagram, or mailing list link

**Site settings.** These are used in the header, footer, Contact page, and buttons across the
site. To add a "Send us a message" button to the Contact page, paste a Google Form link into
**Contact form link**.

---

## Formatting text

Text areas labeled **Page text** or **Description** support bold, italics, links, headings, and
lists through the toolbar. Keep it simple; the site's design handles the rest.

## If something goes wrong

**The live site never breaks from an edit.** If a change has a problem, it simply doesn't
publish, and the site stays as it was.

If your change doesn't appear after 5 minutes:

1. Check that you filled in every required field (marked with \*).
2. If it still doesn't appear, ask the site manager to check the **Actions** tab on GitHub. A red
   ✗ next to your change shows exactly which field has a problem.

**To undo a change:** edit the content back. Every version is kept in GitHub's history, so the
site manager can also restore anything from any point in time.
