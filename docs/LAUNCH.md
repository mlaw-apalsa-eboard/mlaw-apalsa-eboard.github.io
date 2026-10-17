# Launch checklist (one-time setup)

Steps to move mlawapalsa.com from Squarespace to this site. Do them in order; the old site keeps
working until step 4.

## 1. GitHub

1. Sign in to GitHub with an account under the **shared board email**. Create one if needed.
2. Create a free **organization** (`mlaw-apalsa-eboard`): <https://github.com/organizations/plan>.
   Add at least one other board member as an **Owner**.
3. Create a **public** repository in the organization named `mlawapalsa` and push this project
   to its `main` branch.
4. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
5. **Actions** tab: the **Deploy** workflow should run and finish green. The site is now live at
   `https://mlaw-apalsa-eboard.github.io/mlawapalsa/`. Pages will look unstyled at that address because
   the site expects to be served from the root of a domain; that's fixed by step 3.

## 2. Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with the board GitHub account.
2. Install the Pages CMS GitHub App on the organization and grant it the `mlawapalsa`
   repository.
3. Open the repository. The editor sidebar should list Board members, Events, Pages, and Site
   settings.
4. Invite board members by email from the site's **Collaborators** settings.
5. Make a small test edit (e.g. fix a typo) and confirm it appears on the site about 2 minutes
   later.

## 3. Point the domain at GitHub Pages

`mlawapalsa.com`'s DNS is run by **U-M ITS** (nameservers `dns*.itd.umich.edu` /
`dns*.umich.org`), not Squarespace, so record changes go through an ITS request.

1. In the repository: **Settings → Pages → Custom domain** is set to `www.mlawapalsa.com`
   (done 2026-10-17). Do this _before_ changing DNS so nobody else can claim the domain.
2. **Verify the domain for the organization** (prevents someone else from claiming it): GitHub
   organization **Settings → Pages → Add a domain** → `mlawapalsa.com`. Copy the TXT record it
   shows; don't click **Verify** until ITS has added it.
3. Ask U-M ITS to replace the existing Squarespace records with:

   | Type  | Name                                                        | Value                          |
   | ----- | ----------------------------------------------------------- | ------------------------------ |
   | A     | `mlawapalsa.com`                                            | `185.199.108.153`              |
   | A     | `mlawapalsa.com`                                            | `185.199.109.153`              |
   | A     | `mlawapalsa.com`                                            | `185.199.110.153`              |
   | A     | `mlawapalsa.com`                                            | `185.199.111.153`              |
   | AAAA  | `mlawapalsa.com`                                            | `2606:50c0:8000::153`          |
   | AAAA  | `mlawapalsa.com`                                            | `2606:50c0:8001::153`          |
   | AAAA  | `mlawapalsa.com`                                            | `2606:50c0:8002::153`          |
   | AAAA  | `mlawapalsa.com`                                            | `2606:50c0:8003::153`          |
   | CNAME | `www.mlawapalsa.com`                                        | `mlaw-apalsa-eboard.github.io` |
   | TXT   | `_github-pages-challenge-mlaw-apalsa-eboard.mlawapalsa.com` | _(value from step 2)_          |

   The `www` name currently has A records; those must be removed for the CNAME to work.

4. Once ITS confirms, click **Verify** on the organization's domain page. In the repository's
   **Settings → Pages**, wait for the DNS check to pass (minutes to a few hours), then tick
   **Enforce HTTPS**.
5. Visit <https://www.mlawapalsa.com> and <https://mlawapalsa.com> and click through every page.

## 4. Cancel Squarespace

1. Check when the Squarespace plan renews so you don't pay for an extra year.
2. Once the new site is live on the domain, cancel the Squarespace website subscription. The
   domain itself is registered outside Squarespace, so cancelling doesn't affect it.

## 5. Hand off

Fill in the accounts table in [HANDOFF.md](HANDOFF.md) with what you set up.
