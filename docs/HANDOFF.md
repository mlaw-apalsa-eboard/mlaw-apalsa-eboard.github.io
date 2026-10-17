# Yearly handoff checklist

The website costs about $10–11 a year (the domain) and needs very little upkeep. What keeps it
alive is making sure **access and billing pass to the next board** every year. Do this at the
winter board transition.

## Accounts

All accounts should be under the **shared board email** (`apalsaeboard@umich.edu`), never a
personal email, so nothing is lost when someone graduates.

| Account                                                      | What it's for                    | Handoff                                                                                                                                              |
| ------------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GitHub organization** (`mlaw-apalsa-eboard`)               | Stores the site; runs publishing | Add the incoming site manager as an **Owner**. Keep at least **two** owners at all times. Remove graduating members.                                 |
| **Pages CMS** ([app.pagescms.org](https://app.pagescms.org)) | Web editor for content           | Invite incoming board members by email (the **Collaborators** settings for the site). Remove graduating members.                                     |
| **Cloudflare** (domain registrar)                            | Owns `mlawapalsa.com`            | Make sure the login lives in the shared board account, auto-renew is **on**, and the card on file belongs to the current treasurer (or org account). |
| **Google Form** (mailing list / contact)                     | Sign-ups and messages            | Owned by the shared board Google account.                                                                                                            |

## Every year

- [ ] Transfer the accounts above.
- [ ] Update the board (see [EDITING.md](EDITING.md#update-the-board-for-a-new-year)).
- [ ] Update the fellowship eligibility years and sponsors.
- [ ] Check the domain's renewal date in Cloudflare and confirm auto-renew is on.
- [ ] Open the site on your phone and click through every page.

## Every few months (site manager)

- [ ] **Merge Dependabot pull requests.** GitHub opens one each month to keep the code up to
      date. If the checks are green, click **Merge**. If they're red, it's safe to leave it
      and ask someone technical. The live site is unaffected.
- [ ] **Check that daily rebuilds are on.** GitHub pauses scheduled workflows on repositories
      with no commits for 60 days (common over the summer). If the **Actions → Deploy**
      workflow shows a banner saying it's disabled, click **Enable workflow**. (Even when it's
      paused, past events are hidden from "Upcoming" in visitors' browsers, so nothing looks
      wrong; this just keeps the published site fresh.)

## Things that need someone technical

Rare, but here's what they are so you know what to ask for:

- **Adding a new board position:** add it to `BOARD_ROLES` in `src/lib/board.ts` _and_ to
  the `role` options in `.pages.yml`.
- **Adding a new page** or changing the layout or design.
- **A failing build** that isn't explained by a blank or invalid field.

See the [README](../README.md) for how the code is organized.
