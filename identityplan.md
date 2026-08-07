# Identity & privacy plan — Martín Cogo Belver

Consolidated checklist. Your two proposals are good instincts; both need one adjustment each, noted in place.

**Sequencing warning before anything else:** the rebuild is a fun project that will take weeks. The phone number is public today. Do Part 0 this evening and let the rebuild happen on its own schedule. Do not couple the urgent fix to the enjoyable one — that is how leaks stay live for six months.

---

## Part 0 — Tonight, 30 minutes

- [ ] Delete the phone line from `index.html`
- [ ] Delete the phone line from `index.es.html`
- [ ] Delete the `phone:` field from the RenderCV YAML under `code/`
- [ ] Commit and push
- [ ] Purge history — easiest route is to delete the repo and recreate it from a fresh `git init`. History on a CV repo is worth nothing; the exposure is worth removing.
- [ ] After the purge, email GitHub Support and ask them to garbage-collect unreachable objects. Force-pushed commits stay fetchable by direct SHA until they do.
- [ ] WhatsApp → Settings → Privacy → Profile photo / About / Last seen → **My contacts**

That last one takes twenty seconds and closes the single worst path: anyone holding your published number can currently open a chat and see your profile photo.

Everything below can take as long as you like.

---

## Part 1 — The naming decision

Your instinct to add *Belver* is right, and the research backs it: `Martin Cogo` drowns in noise — a world-champion Argentine boxer named Coggi, a CONICET researcher named Jorge Cogo, and 683 GitHub accounts matching the surname, mostly Brazilian. `Cogo Belver` together returned nothing but you. It is effectively a globally unique string.

But `martin-cogo-belver` as a *handle* has a flaw: `martin-cogo-belver.github.io` is long, hyphen-heavy, and painful to say on a phone call or read off a slide.

**The deeper issue is that handles are the wrong thing to optimise.** GitHub owns your handle. If you rename again, or GitHub changes something, every URL you have ever printed breaks. That is exactly the incoherence you are trying to eliminate.

### Recommendation: buy the domain, and let handles be implementation details

None of these currently resolve in DNS, which strongly suggests they are unregistered — confirm at a registrar before celebrating:

`cogobelver.com` · `cogobelver.dev` · `cogobelver.io` · `cogobelver.ar` · `martincogo.dev` · `martincogobelver.com` · `cogo-belver.com`

`cogobelver.dev` is the one I would take. Short, unique, unambiguous, and `.dev` reads correctly for what you do.

Then your identity has one permanent anchor and everything else hangs off it:

| Layer | Value | Notes |
|---|---|---|
| Canonical name | Martín Cogo Belver | Same everywhere, accent included |
| Canonical URL | `cogobelver.dev` | The only thing that ever goes on a CV or business card |
| Email | `martin@cogobelver.dev` | Yours permanently, independent of any provider |
| GitHub | `martincogobelver` | No hyphens — also valid for npm, PyPI, Docker Hub |
| LinkedIn | `martin-cogo-belver` | LinkedIn hyphenates by convention; its URL is read, not typed |

All four GitHub variants are free right now: `martincogo`, `martincogobelver`, `martin-cogo-belver`, `mcogobelver`.

The point of the domain is that if you ever leave GitHub, change hosts, or rename again, `cogobelver.dev` still resolves and every printed copy of your CV still works.

**Checklist:**

- [ ] Register the domain
- [ ] Rename GitHub `MrtC101` → `martincogobelver`
- [ ] **Immediately re-register `MrtC101` as an empty placeholder account.** GitHub releases old usernames. Yours is printed on every copy of your CV already in circulation, and an abandoned handle that people still have links to is an impersonation vector.
- [ ] Change the LinkedIn vanity URL to `martin-cogo-belver` — do it now while your profile is barely shared and old links breaking costs you nothing
- [ ] Rename the repo to `martincogobelver.github.io`, add a `CNAME` file containing `cogobelver.dev`, point DNS at GitHub Pages
- [ ] Enable **Enforce HTTPS** in the repo's Pages settings

---

## Part 2 — Email

Your SimpleLogin instinct is correct, but **one alias used everywhere recreates exactly the problem you are fixing.** The power of aliasing comes from using a *different* alias per service — that is what stops a breach at one service being correlated with your account at another. A single alias used everywhere just becomes the new join key, the same role `martincogo3@gmail.com` plays today.

### Three tiers, three different jobs

**Public / professional — `martin@cogobelver.dev`**
Stable, memorable, meant to be given out and recognised. Branding requires stability, so this one is *not* an obfuscated alias. Goes on the CV, LinkedIn, GitHub, commits, conference badges. Because you own the domain, you keep this address forever regardless of which provider sits behind it.

**Service signups — a unique SimpleLogin alias per service**
`netflix.abc@yourdomain`, `bank.xyz@yourdomain`. This is where aliasing earns its keep: one service leaks, you burn that alias and nothing else is affected, and you learn exactly who sold your address.

**Personal correspondence — keep your existing Gmail, and never publish it again**
It stays useful. It just stops being a public identifier.

SimpleLogin supports custom domains on paid plans, and Proton bundles it, so you can run `*@cogobelver.dev` through it and get both a stable public address and per-service aliasing from one setup. Check current plans and pricing yourself — those change.

### Migration, in an order that avoids locking yourself out

- [ ] Register domain, verify it in Proton/SimpleLogin, set DNS records (MX, SPF, DKIM, DMARC)
- [ ] **Send and receive a test message before trusting it.** Misconfigured SPF/DKIM means your applications land in spam and you never find out.
- [ ] Set Gmail to forward to the new address, and keep Gmail alive for at least a year. Do not delete it.
- [ ] Update account *recovery* addresses one service at a time, verifying each before moving on. Losing recovery access is the classic self-inflicted wound in this migration.
- [ ] **Do not use the professional address as the recovery address for personal accounts.** Recovery addresses create exactly the linkage you are trying to break — if `martin@cogobelver.dev` recovers your personal Instagram, the two identities are joined again.
- [ ] Set git to the new address, or GitHub's noreply:
      `git config --global user.email "martin@cogobelver.dev"`
- [ ] GitHub → Settings → Emails → tick **Keep my email addresses private** and **Block command line pushes that expose my email**
- [ ] Update the address on both CV versions and LinkedIn

Expect the public address to attract spam. That is the cost of being contactable, and good filtering handles it. Because you own the domain you can always change what sits behind the address without changing the address itself.

---

## Part 3 — Close the lookup paths

The number has been public. Assume it is in someone's scrape and shut the doors it opens.

- [ ] WhatsApp → Privacy → Groups → **My contacts**
- [ ] Telegram → Privacy and Security → Phone number → *Who can find me by my number* → **My contacts**
- [ ] Instagram → Accounts Center → turn off discoverability by phone and email
- [ ] Facebook → Privacy → *Who can look you up using the phone number / email you provided?* → **Only me**; and *Do you want search engines outside Facebook to link to your profile?* → **No**
- [ ] Review your Google account profile photo — a published Gmail can expose it in Gmail, Chat and Docs sharing dialogs
- [ ] Run both addresses through `haveibeenpwned.com` (free via the website)

---

## Part 4 — GitHub profile

- [ ] Pin, in this order: `Thesis_DL_for_BDA`, `LLM-Generated-Text-Detector`, `stream-inference-engine`, `digesto-semantic-chat`, `proyecto-gestion-de-inventario`
- [ ] Archive `MergeSort_Paralelo_2023`, `spatial-data-mining`, `ia2` — marks them inactive rather than hiding them, which reads as honest
- [ ] Add a README to every pinned repo: problem, approach, result. One paragraph. A repo without a README reads as abandoned no matter how good the code is — this is the highest-value hour available to you.
- [ ] Create a repo named `martincogobelver` with a `README.md` — GitHub renders it at the top of your profile. Four or five lines and a link to `cogobelver.dev`.
- [ ] **Clear `stream-inference-engine` with MindColab.** It is publicly described as technical specifications for their MVP. Have that conversation before someone else does; your CV already describes the work in capability terms, so you lose nothing if it goes private.
- [ ] Check that LinkedIn dates and titles match the CV exactly — mismatches between the two are the most common coherence failure, and I could not verify yours because LinkedIn blocks automated fetching.

---

## Part 5 — The rebuild

Worth doing, and worth doing for the right reason. RenderCV already turns YAML into a PDF, so "YAML-driven" alone is not the win. The win is **structural prevention of the leak that started all this**, plus a legitimate portfolio piece.

### The core idea: make private data impossible to publish by accident

Your phone leaked because private and public data lived in the same file, and that file was built into a public artefact. Split them at the schema level so the public build physically cannot contain private fields.

```
cogobelver.dev/
├── content/
│   ├── cv.en.yaml          # public content — committed
│   ├── cv.es.yaml          # public content — committed
│   └── private.yaml        # phone, address, references — GITIGNORED
├── schema.py               # pydantic models; PublicCV has no phone field
├── templates/
│   └── cv.html.jinja       # one template, both languages
├── build.py                # --target=public | --target=private
├── .gitignore              # private.yaml
├── .pre-commit-config.yaml # secret scan
└── .github/workflows/deploy.yml
```

- `build.py --target=public` → what deploys to Pages. Loads only `cv.*.yaml`, and `PublicCV` has no phone field at all, so there is nothing to leak.
- `build.py --target=private` → merges `private.yaml`, renders locally, never committed. This is the PDF you attach to a direct application where a phone number is appropriate.

The distinction that matters: a phone number on a CV you *send to a specific person* is fine. A phone number on a CV you *publish to the internet* is not. Your current setup cannot tell those apart. This one can.

### Worth adding

- [ ] **Pydantic schema validation** — a typo in the YAML fails the build instead of silently rendering an empty section
- [ ] **Pre-commit secret scan** — `gitleaks`, or a custom hook grepping for your phone number and personal address. Belt and braces behind the gitignore.
- [ ] **One template, both languages.** You currently maintain `index.html` and `index.es.html` by hand, which guarantees they drift. Two YAML files, one Jinja template.
- [ ] **HTML as the single source, PDF via print CSS.** The `index.html` I sent already has the print stylesheet — `playwright` or `weasyprint` renders it to PDF. One template, two outputs, no second renderer to keep in sync.
- [ ] **GitHub Actions** — build and deploy on push to `master`, and run the secret scan in CI so a bad commit fails loudly
- [ ] **`CNAME` in the output** — otherwise every deploy drops your custom domain

### Stack

You know Python (with `uv` already in this repo) and Bun/TS. For a static document I would go Python: `uv` + `pydantic` + `jinja2` + `playwright`. React buys you nothing on a page with no interactivity and adds a build step and hydration you would have to maintain. Bun is a fine choice if you would rather the repo showcase your web stack — just do not reach for React here.

If you want the repo to read as a portfolio piece rather than a CV, the README should lead with the public/private schema split. That is an actual engineering idea and it is the part a reviewer will find interesting.

---

## Part 6 — Verify when done

- [ ] `curl -s https://cogobelver.dev | grep -iE '7341|gmail'` returns nothing
- [ ] `git log -p --all | grep -c '7341'` returns 0 in a fresh clone
- [ ] Every link on the live CV resolves — especially the portfolio link that is currently a 404
- [ ] The page prints to a clean PDF with Ctrl+P
- [ ] LinkedIn, GitHub profile and CV agree on every date, title and employer
- [ ] Open the CV in a private window and read it as a stranger would: is it obvious within ten seconds what you do and what you are good at?
