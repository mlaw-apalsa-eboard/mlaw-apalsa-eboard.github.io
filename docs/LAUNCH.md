# Launch checklist (one-time setup)

How mlawapalsa.com moved from Squarespace to this site. Steps 1–3 are done; this guide is kept
as a record and in case any of it has to be redone.

## 1. GitHub

1. Sign in to GitHub with an account under the **shared board email**. Create one if needed.
2. Create a free **organization** (`mlaw-apalsa-eboard`): <https://github.com/organizations/plan>.
   Add at least one other board member as an **Owner**.
3. Create a **public** repository in the organization named `mlaw-apalsa-eboard.github.io` and
   push this project to its `main` branch. (That exact name makes GitHub serve the site at the
   root of `https://mlaw-apalsa-eboard.github.io/`, a free address that always works.)
4. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
5. **Actions** tab: the **Deploy** workflow should run and finish green. The site is now live at
   <https://mlaw-apalsa-eboard.github.io/>.

## 2. Pages CMS

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with the board GitHub account.
2. Install the Pages CMS GitHub App on the organization and grant it the
   `mlaw-apalsa-eboard.github.io` repository.
3. Open the repository. The editor sidebar should list Board members, Events, Pages, and Site
   settings.
4. Invite board members by email from the site's **Collaborators** settings.
5. Make a small test edit (e.g. fix a typo) and confirm it appears on the site about 2 minutes
   later.

## 3. Point the domain at GitHub Pages

`mlawapalsa.com`'s DNS is run by **U-M ITS** (nameservers `dns*.itd.umich.edu` /
`dns*.umich.org`), not Squarespace, so record changes go through an ITS request. This was
completed on 2026-10-30 with these records:

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
| TXT   | `_github-pages-challenge-mlaw-apalsa-eboard.mlawapalsa.com` | _(from GitHub, see step 2)_    |

If this ever has to be set up again:

1. In the repository: **Settings → Pages → Custom domain** → `www.mlawapalsa.com` → **Save**.
   Do this before or right when DNS changes, so nobody else can claim the domain.
2. **Verify the domain for the organization** (prevents someone else from claiming it): GitHub
   organization **Settings → Pages → Add a domain** → `mlawapalsa.com`, then add the TXT record
   it shows and click **Verify**.
3. Ask U-M ITS to set the records above. The `www` CNAME must point **directly** at
   `mlaw-apalsa-eboard.github.io`. An alias of `mlawapalsa.com` still loads the site, but GitHub
   treats it as proxied and won't issue an HTTPS certificate.
4. Once GitHub reports the DNS check passing, tick **Enforce HTTPS**. GitHub renews the
   certificate automatically.

**If the certificate doesn't appear** after the DNS is right: remove the custom domain and add it
back in **Settings → Pages**. GitHub only requests a certificate when the domain is saved, so a
domain saved before DNS was correct needs this nudge. The site is down for a few seconds.

## 4. Cancel Squarespace

1. Check when the Squarespace plan renews so you don't pay for an extra year.
2. Once the new site is live on the domain, cancel the Squarespace website subscription. The
   domain itself is registered outside Squarespace, so cancelling doesn't affect it.

## 5. Hand off

Fill in the accounts table in [HANDOFF.md](HANDOFF.md) with what you set up.
