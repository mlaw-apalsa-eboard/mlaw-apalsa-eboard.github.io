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

Still at Squarespace for now.

1. **Verify the domain for the organization** (prevents someone else from claiming it): GitHub
   organization **Settings → Pages → Add a domain** → `mlawapalsa.com`, then add the TXT record
   it gives you in Squarespace's DNS settings.
2. In Squarespace **Domains → mlawapalsa.com → DNS**, remove the Squarespace defaults and add:

   | Type  | Host  | Value                          |
   | ----- | ----- | ------------------------------ |
   | A     | `@`   | `185.199.108.153`              |
   | A     | `@`   | `185.199.109.153`              |
   | A     | `@`   | `185.199.110.153`              |
   | A     | `@`   | `185.199.111.153`              |
   | CNAME | `www` | `mlaw-apalsa-eboard.github.io` |

3. In the repository: **Settings → Pages → Custom domain** → `www.mlawapalsa.com` → **Save**.
   Wait for the DNS check to pass (minutes to a few hours), then tick **Enforce HTTPS**.
4. Visit <https://www.mlawapalsa.com> and <https://mlawapalsa.com> and click through every page.

## 4. Move the domain to Cloudflare and cancel Squarespace

1. Check when the Squarespace plan and domain renew so you don't pay for an extra year.
2. Create a **Cloudflare** account under the shared board email and add `mlawapalsa.com`.
   Re-create the DNS records from step 3 (set the CNAME and A records to **DNS only**, the grey
   cloud, so GitHub can issue the HTTPS certificate).
3. In Squarespace, unlock the domain and get the transfer (authorization) code. Start the
   transfer in **Cloudflare → Domain Registration → Transfer Domains**.
4. Once the transfer completes, turn on **auto-renew** and add a payment method the treasurer
   controls.
5. Cancel the Squarespace website subscription.

> Domains can't be transferred within 60 days of being registered or transferred. If Squarespace
> says the domain is locked for that reason, finish steps 1–3 now and do step 4 later.

## 5. Hand off

Fill in the accounts table in [HANDOFF.md](HANDOFF.md) with what you set up.
