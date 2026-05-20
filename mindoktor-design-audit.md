Below is the complete **Markdown file** — copy the entire block and save it as `mindoktor-design-audit.md`.

***

````markdown
# mindoktor-design-audit.md

# Min Doktor (mindoktor.se) — Complete UI/UX Design Audit Report
**Audited:** 2026-05-20  
**Auditor:** Automated UI/UX Extraction Agent  
**Site:** https://www.mindoktor.se  
**Viewport (default):** 1320 × 900 desktop  
**Framework detected:** Gatsby (React SSG)  
**Primary language:** Swedish (EN translation available)

---

## TABLE OF CONTENTS

1. [Phase 1 — Visual Design System](#phase-1--visual-design-system)
   - [Color Palette](#color-palette)
   - [Typography](#typography)
   - [Spacing & Layout](#spacing--layout)
   - [Iconography & Imagery](#iconography--imagery)
2. [Phase 2 — Component Inventory](#phase-2--component-inventory)
3. [Phase 3 — User Flow Mapping](#phase-3--user-flow-mapping)
4. [Phase 4 — Interaction & Motion Audit](#phase-4--interaction--motion-audit)
5. [Phase 5 — Responsive Design Audit](#phase-5--responsive-design-audit)
6. [Phase 6 — Accessibility Audit](#phase-6--accessibility-audit)
7. [Phase 7 — Content Strategy Audit](#phase-7--content-strategy-audit)
8. [Design Tokens JSON](#design-tokens-json)
9. [Improvement Opportunities](#improvement-opportunities)

---

## Phase 1 — Visual Design System

### Color Palette

| Token Name               | Hex Value   | Usage                                                             |
|--------------------------|-------------|-------------------------------------------------------------------|
| `primary`                | `#E8251F`   | CTA buttons ("Seek care"), body links, chevron icons, checkmarks  |
| `primary-hover`          | `#C41F1A`   | Button hover state (darkened red)                                 |
| `primary-light-bg`       | `#FDE8E8`   | Blush pink section backgrounds, hero blob, accordion bg           |
| `secondary-dark-nav`     | `#1A2B35`   | Top navigation bar background, dark promo sections                |
| `accent-teal`            | `#2C5364`   | Suggestion chip/tag backgrounds, secondary nav icons              |
| `background-white`       | `#FFFFFF`   | Primary page bg, hero, card backgrounds                           |
| `background-blush`       | `#FDF0EF`   | Alternating section bg (feature areas, condition page hero)       |
| `background-footer`      | `#F2F2F2`   | Footer background                                                 |
| `text-heading`           | `#1A1A1A`   | All headings (H1–H4)                                              |
| `text-body`              | `#2D2D2D`   | Body paragraph text                                               |
| `text-muted`             | `#6B7280`   | Secondary/helper text, captions                                   |
| `text-link`              | `#E8251F`   | All body links, breadcrumb links, CTA text links                  |
| `text-on-dark`           | `#FFFFFF`   | Nav links, button text, chip text                                 |
| `border-card`            | `#E5E7EB`   | Card borders, dividers                                            |
| `border-input`           | `#D1D5DB`   | Search input border (default state)                               |
| `border-dashed`          | `#E5C6C6`   | Dashed dividers between accordion items                           |
| `status-success`         | `#22C55E`   | Green checkmarks (trust signals)                                  |
| `status-checkmark-red`   | `#E8251F`   | Red checkmark icons (feature list on condition pages)             |
| `chip-bg`                | `#2C5364`   | Suggestion chip background (homepage hero)                        |
| `chip-text`              | `#FFFFFF`   | Suggestion chip text                                              |

**Note:** No explicit CSS custom properties (`--color-*`, `--brand-*`) are surfaced in the DOM — styles are compiled via build pipeline (likely Tailwind CSS or a PostCSS setup within the Gatsby project). Colors are inlined or emitted as utility classes.

---

### Typography

**Primary Font Family:** `Sora`  
**Source:** Google Fonts (`//fonts.googleapis.com">`)  
**Style:** Geometric rounded sans-serif — modern, approachable, medical-adjacent  
**Fallback stack:** `Sora, system-ui, -apple-system, sans-serif`

#### Type Scale (Desktop, observed)

| Element         | Size (approx) | Weight | Line Height | Letter Spacing | Color        |
|-----------------|---------------|--------|-------------|----------------|--------------|
| H1 Hero         | 52–56px       | 800    | 1.10        | -0.02em        | `#1A1A1A`    |
| H1 Page         | 40–48px       | 800    | 1.15        | -0.01em        | `#1A1A1A`    |
| H2 Section      | 28–32px       | 700    | 1.20        | 0              | `#1A1A1A`    |
| H3 Card/Sub     | 20–24px       | 700    | 1.30        | 0              | `#1A1A1A`    |
| H4              | 18px          | 600    | 1.40        | 0              | `#1A1A1A`    |
| Body            | 16px          | 400    | 1.60        | 0              | `#2D2D2D`    |
| Body small      | 14px          | 400    | 1.50        | 0              | `#6B7280`    |
| Button/CTA      | 15–16px       | 600    | 1.00        | 0.01em         | `#FFFFFF`    |
| Nav link        | 15px          | 500    | 1.00        | 0              | `#FFFFFF`    |
| Tab label       | 13px          | 500    | 1.00        | 0.02em         | `#2C5364`    |
| Body link       | 15px          | 500    | —           | 0              | `#E8251F`    |
| Breadcrumb      | 13px          | 400    | —           | 0              | `#E8251F`    |
| Footer link     | 14px          | 400    | 1.60        | 0              | `#2D2D2D`    |

**Modular scale ratio:** ~1.25–1.333 between heading levels  
**Base size:** 16px

---

### Spacing & Layout

| Property                   | Value                          |
|----------------------------|-------------------------------|
| Base unit                  | 8px                           |
| Grid system                | 12-column CSS Grid/Flexbox    |
| Max content width          | ~1200px (centered)            |
| Section padding (vertical) | 64px–96px                     |
| Card padding               | 24–32px                       |
| Hero padding top           | ~80px                         |
| Navbar height              | ~56px                         |
| Secondary tab nav height   | ~48px                         |
| Card gutter                | 24px                          |
| Hero 2-col split           | ~50% / 50%                    |
| Condition page split       | ~65% content / 30% sidebar    |

**Breakpoints (inferred from layout reflow):**

| Name         | Width   |
|--------------|---------|
| mobile-sm    | 320px   |
| mobile       | 375px   |
| tablet       | 768px   |
| desktop-sm   | 1024px  |
| desktop      | 1440px  |

---

### Iconography & Imagery

**Navigation icons:**  
- Style: Custom SVG line icons (thin stroke ~1.5–2px)  
- Size: ~28×28px  
- Color: Dark teal `#2C5364` (inactive), red underline on active  
- Icons: Stethoscope (Seek care), Syringe (Vaccination), Fork+Heart (Recipe), Female symbol (Women's health), Scale (Weight loss)

**Condition page icons:**  
- Style: Hand-drawn line art — thin stroke, character-based (coughing face, hand with X, stressed face)  
- Size: ~60×60px rendered  
- Color: Dark `#1A2B35` on blush background  
- Placement: Top-right of condition hero area

**Hero photography:**  
- Style: Warm lifestyle photography (female doctor in white coat, home/office setting)  
- Format: WebP / JPEG  
- Dimensions: ~350×520px (right column, desktop)  
- Doctor wears branded red heart pin (brand consistency)

**Feature card images:**  
- Style: Editorial lifestyle photography (tick on leaf, woman eating, woman scratching arm)  
- Dimensions: ~330×210px (3-up grid)  
- Border radius: 0px (sharp corners)

**Illustration style summary:** Mixed — line art for condition icons, lifestyle photography for marketing. No flat vector illustrations.

**Lazy loading:** `loading="lazy"` confirmed on below-fold images.

**Partner logos:** APOTEK Hjärtat+ICA, SYNLAB/Unilabs, Skandia — grayscale SVG/PNG.

**Trust badges:** LegitScript Certified (shield badge, footer), BankID logo (nav login button, body copy).

---

## Phase 2 — Component Inventory

### 1. Top Navigation Bar

```
Structure: <header> sticky
├── Logo: SVG heart + "Min Doktor" wordmark (white text)
├── [Seek care] — primary pill button (#E8251F, white text)
├── [How it works] — text link (white)
├── [Log in] — text link (white) OR pill outline with BankID icon
└── [☰ menu] — hamburger button (white 3-line icon)
```

| Property         | Value                                   |
|------------------|-----------------------------------------|
| Height           | ~56px                                   |
| Background       | `#1A2B35` (dark navy)                   |
| Logo area width  | ~180px                                  |
| CTA button       | Pill, `#E8251F`, ~120×40px              |
| Hamburger        | 3-line, opens full menu overlay         |
| `aria-label`     | "menu" on hamburger button ✓            |

**Hamburger overlay contents:** Seek care, Vaccination, How it works, Vaccination clinics, Health center, Price list, Health & diseases, Tips & health advice, Work with us, Support, Log in.

---

### 2. Secondary Tab Navigation

```
Structure: <div role="tablist">
├── <button role="tab"> Seek care [stethoscope icon]  ← selected
├── <button role="tab"> Vaccination [syringe icon]
├── <button role="tab"> Recipe [fork+heart icon]
├── <button role="tab"> Women's health [female symbol icon]
└── <button role="tab"> Weight loss [scale icon]
```

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| Height          | ~48px                                              |
| Background      | `#FFFFFF`                                          |
| Active state    | Red bottom-border underline, `#E8251F`             |
| Icon size       | ~24×24px                                           |
| Tab font        | 13px, weight 500                                   |
| ARIA            | `role="tablist"`, `role="tab"`, `selected` attr ✓  |

---

### 3. Hero Search Input

```
Structure:
<div class="search-container">
  <input type="text" aria-label="What can we help you with?" placeholder="What can we help you with?" />
  <button type="submit"> → (red circle, white arrow) </button>
</div>
<div class="chips">
  <button>allergy</button>
  <button>contraceptive</button>
  <button>opening hours</button>
  <button>recipe</button>
  <button>Depression</button>
  <button>vaccination</button>
  <button>weight loss</button>
</div>
```

| Property         | Value                                     |
|------------------|-------------------------------------------|
| Input width      | ~350px                                    |
| Input height     | ~52px                                     |
| Border radius    | 8px                                       |
| Background       | `#FFFFFF`                                 |
| Border           | 1px solid `#D1D5DB`                       |
| Submit button    | Red circle (#E8251F), 40×40px, white →    |
| Chips bg         | `#2C5364` (teal)                          |
| Chip text        | `#FFFFFF`, 13px, pill radius              |
| `aria-label`     | "What can we help you with?" ✓            |

---

### 4. Hero Section

```
Structure: <section> 2-column grid
├── Left column (~50%)
│   ├── <h1> "Care & vaccines for the whole family"
│   ├── <SearchInput /> (see above)
│   ├── <ChipGroup /> (7 suggestion chips)
│   ├── ✓ Trust signal: "Easy contact with doctors... 24/7"
│   ├── <a> "Our treatment areas →"
│   └── <a> "How it works →"
└── Right column (~50%)
    └── <img> Doctor in white coat (lifestyle photo)
```

| Property             | Value                      |
|----------------------|----------------------------|
| Section height       | ~520px (desktop)           |
| Background           | `#FFFFFF`                  |
| H1 size              | ~52px, weight 800          |
| Trust signal icon    | Red checkmark ✓            |
| Secondary CTA color  | `#E8251F` with `>` chevron |
| Doctor image format  | WebP, right column         |

---

### 5. Feature Highlight Cards (3-Column Grid)

```
Structure: <div css-grid 3-col>
  <article> (repeated ×3–4)
    ├── <img> editorial photo (no border-radius)
    ├── <h3> headline
    ├── <p> body text
    ├── <a> "Primary link >"
    └── <a> "Secondary link >"
  </article>
```

| Property        | Value                              |
|-----------------|------------------------------------|
| Card width      | ~330px                             |
| Image height    | ~210px                             |
| Card bg         | `#FFFFFF`                          |
| Heading size    | ~22px, weight 700                  |
| Link color      | `#E8251F`                          |
| Border radius   | 0px (sharp corners on images)      |
| Hover state     | Box-shadow lift + possible translate|

---

### 6. Chat Mock / Trust Widget

```
Structure: <section> dark bg
├── Simulated chat interface
│   ├── Avatar (branded heart)
│   ├── Doctor name "Vibeke Billing"
│   ├── Chat bubble: "Lubricate the area..."
│   ├── Patient reply: "Ok, do you think..."
│   └── Doctor reply: "If it hasn't disappeared..."
├── Bullet trust list:
│   ├── -  Open every day, 24 hours a day
│   ├── -  Safe and secure with BankID
│   └── -  Recipes directly on
Continuing the Markdown file from exactly where it was cut off:

***

````markdown
│   └── • Recipes directly on your mobile
└── App download badges: [iOS] [Google Play]
```

| Property       | Value                                 |
|----------------|---------------------------------------|
| Background     | `#1A2B35` (dark navy)                 |
| Text color     | `#FFFFFF`                             |
| Chat bubble bg | White (doctor) / Light grey (patient) |
| Badge width    | ~135×40px each                        |
| Link target    | `https://mdlink.se/ladda-ner-appen`   |

***

### 7. Testimonial Block

```
Structure: <blockquote>
├── Opening curly quote mark (large, decorative)
├── <p> Quote text (Swedish)
└── ite> Attribution — first name + last name
```

| Property      | Value                                                                           |
|---------------|---------------------------------------------------------------------------------|
| Background    | `#FFFFFF` or section blush                                                      |
| Quote text    | Swedish — "Att kunna kontakta vården när som helst på dygnet öppnade en helt ny värld för mig." (Linda Sikström) / "För mig sparade det värdefull tid och gav mig nya positiva insikter om modern sjukvård." (Jonas Klevhag) |
| Text size     | ~18–20px, italic                                                                |
| Layout        | Centered, max-width ~700px                                                      |
| Multiple      | At least 2 quotes visible (possible carousel/slider)                           |

***

### 8. Condition Link List

```
Structure: <section>
  <h2> "Care for you. Care for the family." </h2>
  <div css-grid 2-col>
    <div> <h3> Cold-related complaints </h3>
      <ul>
        ><a href="/halsa-sjukdomar/astma/">Asthma</a></li>
        ><a href="/halsa-sjukdomar/bihaleinflammation/">Sinusitis</a></li>
        ... (5 items)
      </ul>
    </div>
    <div> <h3> Skin problems </h3>
      <ul> ... (9 items) </ul>
    </div>
    ... (9 more category groups)
  </div>
```

**Full condition category list:**

| Category                    | Item Count | Sample conditions                                          |
|-----------------------------|------------|------------------------------------------------------------|
| Cold-related complaints     | 5          | Asthma, Sinusitis, Cough, Sore throat, Eye inflammation    |
| Skin problems               | 9          | Acne, Lyme disease, Eczema, Rash, Birthmark, Nail fungus   |
| Women's health              | 8          | Midwife, Postpone menstruation, Herpes, PMS, UTI           |
| Stomach upset               | 4          | Hemorrhoids, Diarrhea, Gastric catarrh, GI problems        |
| Muscles & joints            | 2          | Back problems, Osteoarthritis                              |
| Men's Health                | 4          | Erectile dysfunction, Premature ejaculation, Hair loss     |
| Mental health               | 4          | Sleep problems, Stress, Mental illness, Burnout            |
| Lifestyle                   | 4          | Healthy habits, Overweight, Nicotine, Alcohol addiction    |
| Other                       | 6          | Headache, Hypothyroidism, Contraceptive, Chickenpox        |
| Children                    | 14         | Lyme, Chickenpox, Asthma, Constipation, Insect bites       |
| Allergy & hypersensitivity  | 5          | Gluten, Lactose, Pollen, Fur allergy                       |

***

### 9. Partner / Collaboration Logos Section

```
Structure: <section>
  <h2> "We collaborate with" </h2>
  <p> Intro text + link to /samarbeten/ </p>
  <div css-grid 2x2>
    <img> APOTEK Hjärtat + ICA logo
    <img> SYNLAB logo
    <img> Unilabs logo
    <img> Skandia logo
  </div>
```

| Property     | Value                      |
|--------------|----------------------------|
| Grid         | 2×2                        |
| Logo style   | Grayscale                  |
| Background   | `#FFFFFF`                  |
| Logo height  | ~40–50px                   |

***

### 10. Footer

```
Structure: <footer role="contentinfo" aria-label="partners">
  <div col-1> Min Doktor heart logo (SVG, red) </div>
  <div col-2> The company
    About My Doctor, Physical receptions, Work with us,
    Our quality work, Press, For businesses,
    Whistleblower function, Commenting rules, Our collaborations
  </div>
  <div col-3> The service
    Cookies, Privacy Policy, Terms of Use, User rules,
    Range and prices, Availability
  </div>
  <div col-4> Support
    Frequently asked questions, Contact us, Views on healthcare
  </div>
  <div full-width>
    <p> Legal disclaimer text </p>
    <img> LegitScript Certified badge (linked)
  </div>
```

| Property          | Value                                                |
|-------------------|------------------------------------------------------|
| Background        | `#F2F2F2` (warm grey)                                |
| Text color        | `#2D2D2D`                                            |
| Columns           | 4 (logo + 3 link groups)                             |
| Link font         | 14px, weight 400                                     |
| Column headers    | 14–16px, weight 600                                  |
| LegitScript badge | ~140×160px shield, bottom-left                       |
| ARIA              | `role="contentinfo"`, `<nav role="navigation" aria-label="footer">` |

***

### 11. Condition Page Template (Reusable Pattern)

Observed on: `/halsa-sjukdomar/hosta/` (Cough), `/halsa-sjukdomar/eksem/` (Eczema), `/halsa-sjukdomar/stress/` (Stress)

```
Structure:
├── <nav> Breadcrumb: Home > Health and diseases > [Category] > [Condition]
├── <section> Hero (blush bg, decorative blob shape)
│   ├── <h1> Condition name (e.g. "Cough")
│   ├── <img> Condition line-art icon (top-right, ~60×60px)
│   ├── <p> 2–3 sentence intro paragraph
│   ├── <button> "Read more about [condition]" — outline style
│   ├── <button> "Seek care for [condition]" — solid red (#E8251F)
│   └── <a> "How a digital healthcare visit works >"
├── <section> Content body (65% width)
│   ├── <h2> "What is [condition]?"
│   ├── <p> Detailed explanation
│   ├── <h2> "Causes of [condition]"
│   ├── <h2> "Symptoms of [condition]"
│   ├── <h2> "Treatment for [condition]"
│   └── ... (more H2 sections)
└── <aside> Content sidebar (30% width)
    ├── <h3> "Content"
    └── <ul>
        ><a> What is [condition]? </a></li>
        ><a> Causes </a></li>
        ><a> Symptoms </a></li>
        ><a> Treatment </a></li>
        ... (TOC links, all red #E8251F)
```

| Property              | Value                                  |
|-----------------------|----------------------------------------|
| Hero bg               | Blush pink `#FDF0EF` with blob shape   |
| Outline button bg     | `#FFFFFF`, border `#1A1A1A` or `#E5E7EB` |
| Outline button text   | `#1A1A1A`                              |
| Solid CTA button      | `#E8251F`, white text, pill radius     |
| Sidebar bg            | `#FFFFFF`, border `#F3F4F6`, radius 12px |
| Sidebar link color    | `#E8251F`                              |
| Content width         | ~65% (700px max)                       |
| Sidebar width         | ~30% (320px)                           |
| Icon style            | Thin line art, hand-drawn aesthetic    |

***

## Phase 3 — User Flow Mapping

### Flow A — "I Have a Symptom" (Main CTA Flow)

| Step | URL | Action | Observation |
|------|-----|--------|-------------|
| 1 | `/` | Land on homepage | Hero search input is above-fold, centered in left column. 7 suggestion chips visible below input. |
| 2 | `/` | Observe search field | Placeholder: "What can we help you with?". Single-line input, white bg, red submit arrow button on right. |
| 3 | `/` | Click suggestion chip (e.g. "vaccination") | Chips are pill-shaped, dark teal bg. Click routes to relevant condition/guide page. |
| 4 | `/halsa-sjukdomar/hosta/` | Arrive at condition page (Cough) | Breadcrumb nav, H1, line-art icon, intro text, dual CTA stack: outline + solid red + tertiary link. |
| 5 | `guides.mindoktor.se` | Click red "Seek care" CTA | Routes to external subdomain `guides.mindoktor.se`. |
| 6 | `guides.mindoktor.se` | BankID gate reached | Hard login wall — BankID required. No guest preview mode. Zero glimpse of consultation form. |

**Pain points:**
- Hard BankID auth wall immediately on entry — no preview of what the form looks like
- Autocomplete behavior unclear (no dynamic suggestions confirmed without typing)
- 7 chips may not cover the most common searches (no seasonal or analytics-driven rotation visible)
- No "I'm not sure what I have" guided triage path

**Improvement opportunities:**
- Show 2–3 step preview of consultation form before requiring BankID
- Implement live autocomplete with top 5 condition suggestions as user types
- Add guided triage: "Not sure what you have? Answer 3 quick questions →"
- Rotate suggestion chips seasonally (pollen in spring, flu in winter)

***

### Flow B — "How Does This Work?" (Onboarding / Trust Flow)

| Step | URL | Action | Observation |
|------|-----|--------|-------------|
| 1 | `/sa-funkar-det/` | Click "How it works" in nav | Page: "Digital eller fysisk vård?" — partially Swedish even on EN site. |
| 2 | `/sa-funkar-det/` | Read intro paragraph | Short text explaining digital vs physical split. 3 accordion sections follow. |
| 3 | `/sa-funkar-det/` | Expand "Digital vård" accordion | 3 numbered steps: 1) Answer questions + BankID login, 2) Chat with doctor, 3) Get diagnosis + prescription. |
| 4 | `/sa-funkar-det/` | Scan trust signals | BankID mentioned, "Open 24/7" stated, LegitScript badge in footer, Pharmacy Hjärtat named for prescriptions. |

**Pain points:**
- Page partially in Swedish on EN-language site — language inconsistency erodes trust
- Accordion pattern hides key process information by default — requires active discovery
- No visual progress stepper or numbered graphic — purely text-based
- No video or animation demo of the chat consultation UI

**Improvement opportunities:**
- Add an animated 3-step visual timeline with branded iconography
- Add a 30–60 second demo video or animated GIF of the chat interface
- Surface BankID logo inline with tooltip: "Why do we need BankID?"
- Enforce consistent English language across all pages

***

### Flow C — "Find a Treatment Area" (Browse / Discovery Flow)

| Step | URL | Action | Observation |
|------|-----|--------|-------------|
| 1 | `/` | Click "Our treatment areas" from hero | Routes to `/guides/adult/` — external guide subdomain. |
| 2 | `/` | Alternatively: scroll homepage condition link list | 11 categories, 2-col grid, 50+ total condition links. Red text links, no hover underline. |
| 3 | `/halsa-sjukdomar/hosta/` | Click condition link | Condition page with breadcrumb, H1, dual CTA, long-form content, sidebar TOC. |
| 4 | `guides.mindoktor.se` | Click red "Seek care" CTA | BankID login gate. |

**Full condition URL slugs inventory:**

```
/halsa-sjukdomar/astma/              /halsa-sjukdomar/akne/
/halsa-sjukdomar/bihaleinflammation/ /halsa-sjukdomar/borrelia/
/halsa-sjukdomar/hosta/              /halsa-sjukdomar/eksem/
/halsa-sjukdomar/ont-i-halsen/       /halsa-sjukdomar/utslag/
/halsa-sjukdomar/ogoninflammation/   /halsa-sjukdomar/fodelsemarke/
/halsa-sjukdomar/barnmorska/         /halsa-sjukdomar/insektsbett/
/halsa-sjukdomar/forskjuta-mensen/   /halsa-sjukdomar/getingstick-och-bistick/
/halsa-sjukdomar/graviditetsbesvar/  /halsa-sjukdomar/nagelsvamp/
/halsa-sjukdomar/herpes/             /halsa-sjukdomar/kondylom/
/halsa-sjukdomar/klimakteriebesvar/  /halsa-sjukdomar/hemorrojder/
/halsa-sjukdomar/svampinfektion-i-underlivet/ /halsa-sjukdomar/los-mage-diarre/
/halsa-sjukdomar/pms-och-pmds/       /halsa-sjukdomar/magkatarr/
/halsa-sjukdomar/urinvagsinfektion/  /halsa-sjukdomar/mag-och-tarmbesvar/
/halsa-sjukdomar/ryggbesvar/         /halsa-sjukdomar/artros/
/halsa-sjukdomar/impotens/           /halsa-sjukdomar/somnbesvar/
/halsa-sjukdomar/tidig-utlosning/    /halsa-sjukdomar/stress/
/halsa-sjukdomar/haravfall/          /halsa-sjukdomar/psykisk-ohalsa/
/halsa-sjukdomar/levnadsvanor/       /halsa-sjukdomar/utmattningssyndrom-utbrandhet/
/halsa-sjukdomar/overvikt-och-fetma/ /halsa-sjukdomar/nikotinberoende/
/halsa-sjukdomar/alkoholberoende/    /halsa-sjukdomar/huvudvark/
/halsa-sjukdomar/hypotyreos/         /halsa-sjukdomar/ledvark/
/halsa-sjukdomar/receptfornyelse/    /halsa-sjukdomar/preventivmedel/
/halsa-sjukdomar/vattkoppor/


````markdown
+ 14 children variants: /halsa-sjukdomar/[condition]-hos-barn/
+ 5 allergy variants: /halsa-sjukdomar/allergi-och-intolerans/ etc.
```

**Pain points:**
- Condition list is 50+ items with no filter, search, or alphabet index
- All discovery paths terminate at a BankID gate — no softer conversion step
- Condition page sidebar TOC is text-only with no visual anchor progress indicator

**Improvement opportunities:**
- Add filterable/searchable condition index with alphabet tabs or category pills
- Add estimated consultation time ("~5 min") on condition page CTAs
- Add sticky sidebar TOC with scroll-spy progress highlighting
- Show "X people consulted about this condition this week" social proof

***

### Flow D — "Vaccination" (Service-Specific Flow)

| Step | URL | Action | Observation |
|------|-----|--------|-------------|
| 1 | `/vaccination/` | Navigate to vaccination landing page | Split layout: large photo left (child being vaccinated), text right. H1 "Vaccination at My Doctor". |
| 2 | `/vaccination/` | Scan page for vaccine types | Copy mentions: TBE, shingles, chickenpox, HPV, travel vaccines. No vaccine grid or catalogue. |
| 3 | `/vaccination/` | Identify booking entry point | 3 red text links: "Find the nearest reception >", "Vaccinations price list >", "The vaccine bus >". No inline booking widget. |
| 4 | `/kliniken/mottagningar/` | Click "Find nearest reception" | Routes to clinic finder page (not audited further — no booking attempted). |

**Pain points:**
- No inline clinic-finder map or postcode search on the vaccination landing page
- No vaccine catalogue grid — user cannot browse available vaccines without navigating away
- CTA hierarchy is flat — three equally weighted text links, no primary action button
- No price displayed on landing page (requires extra click to /utbud-och-priser/)
- No indication of drop-in vs. appointment availability

**Improvement opportunities:**
- Add a postcode/city input field directly on landing page to surface nearest clinic
- Create a vaccine type card grid (TBE, HPV, Flu, Travel, Shingles, etc.) with brief description + price
- Elevate "Find nearest clinic" to a solid red primary CTA button
- Add an availability badge: "Drop-ins available today"

***

### Flow E — "Pricing" (Decision / Conversion Flow)

| Step | URL | Action | Observation |
|------|-----|--------|-------------|
| 1 | `/utbud-och-priser/` | Navigate to pricing page | Hero: split image-text layout. H1 "Fees and prices". |
| 2 | `/utbud-och-priser/` | Read pricing content | Prices in prose/paragraph format, not a table. |
| 3 | `/utbud-och-priser/` | Note CTA placement | No conversion CTA at end of page. Purely informational. |

**Full pricing extracted:**

| Service | Age Group | Cost |
|---------|-----------|------|
| Digital visit (Doctor / Psychologist / Nurse) | 20–84 years | 100 SEK |
| Digital visit | 0–19 or 84+ years | FREE (0 kr) |
| Medical assessment / prescription renewal | 20–84 years | 100 SEK |
| Contraceptive visit | All ages | FREE (0 kr) |
| Health center visit (physical) | 20–84 years | 260 SEK |
| Health center visit (physical) | 0–19 or 84+ years | FREE (0 kr) |
| Vaccination clinic — nurse visit | From 2 years | 300 SEK |
| Blood pressure measurement | From 16 years | 100 SEK |
| Ear irrigation | From 16 years | 500 SEK |
| No Swedish personnummer (patient fee) | All | 550 SEK |

**Note:** Free card (frikort) applies — mentioned in copy but not displayed prominently.

**Pain points:**
- Pricing is buried in paragraph prose — not scannable
- No visual pricing card layout or comparison table
- Free card eligibility not given prominent callout
- No conversion CTA after pricing info ("Start a consultation for 100 SEK →")
- Vaccination prices require navigating to a separate page

**Improvement opportunities:**
- Replace prose with a 3-column pricing table (Digital / Vaccination / Health Center)
- Add age-toggle: "I am under 20" → show FREE pricing dynamically
- Add a "Free card applies" badge/chip
- Add bold conversion CTA at bottom: "Start care now — from 100 SEK →"

***

## Phase 4 — Interaction & Motion Audit

| Element | Trigger | Animation / Effect | Duration |
|---------|---------|-------------------|----------|
| Primary CTA button ("Seek care") | hover | Background darkens `#E8251F` → `#C41F1A`; possible subtle scale(1.02) | ~200ms |
| Nav text links ("How it works") | hover | Opacity reduces to ~0.75 or underline appears | ~150ms |
| Hero search input | focus | Border shifts to `#E8251F` or blue outline glow; placeholder persists | ~150ms |
| Search submit button (→) | hover | Slight scale or background shift | ~150ms |
| Suggestion chips (allergy, etc.) | hover | Bg lightens slightly; cursor: pointer | ~150ms |
| Accordion sections | click | Chevron rotates 180°; content max-height expands; opacity 0→1 | ~300ms |
| Feature highlight cards (3-up) | hover | box-shadow: 0 4px 20px rgba(0,0,0,0.10); translate-y(-2px) | ~200ms |
| Red text links with chevron | hover | Chevron shifts right ~3–4px; text may underline | ~150ms |
| Secondary tab nav items | click | Red bottom-border underline slides in; icon color shifts | ~200ms |
| Sections entering viewport | scroll | fade-in + translate-y (upward) entrance animation on cards/headings | ~400–600ms |
| Mobile hamburger menu | click | Full-screen overlay fades/slides in; ☰ morphs to ✕ | ~300ms |
| Outline button ("Read more") | hover | Border darkens; possible bg fill on hover | ~200ms |
| App store badges | hover | Opacity shift; slight scale | ~150ms |

**CSS transition pattern (inferred):**
```css
transition: background-color 0.2s ease,
            transform 0.15s ease,
            box-shadow 0.2s ease,
            opacity 0.15s ease;
```

**Performance notes:**

| Metric | Estimated Value | Notes |
|--------|----------------|-------|
| Framework | Gatsby (React SSG) | Pre-rendered HTML — fast initial paint |
| FCP (First Contentful Paint) | < 1.5s | Static HTML served instantly |
| LCP (Largest Contentful Paint) | ~1.8–2.5s | Hero doctor image (WebP, right column) |
| CLS (Cumulative Layout Shift) | Low | Static layout, no ads or dynamic injection above fold |
| Lazy loading | Applied | Confirmed on below-fold images via `loading="lazy"` |
| Font loading | Google Fonts (Sora) | Minor render-blocking risk — `preconnect` hint present |

***

## Phase 5 — Responsive Design Audit

| Breakpoint | Navigation | Hero Layout | Card Grid | Footer | Notable Changes |
|------------|-----------|-------------|-----------|--------|-----------------|
| **320px** (small mobile) | Hamburger + logo only; secondary tab nav scrolls horizontally (5th tab partially hidden) | Single column stacked; H1 ~28px; doctor image below text; search input full-width | 1 column | All 3 link columns stack vertically | Very tight — chip tags wrap to 3+ rows; "Weight loss" tab truncated |
| **375px** (iPhone standard) | Same as 320px; slightly more breathing room | Single column; H1 ~32px; chips wrap 2 rows; image below | 1 column | Stacked columns | Tab nav still scrollable, tabs clip at right edge |
| **768px** (tablet) | Hamburger still shown; secondary tab nav fully visible (all 5 tabs) | 2-col layout begins; text left ~55%, image right ~45%; H1 ~38px | 2 columns | 2-column footer layout | Major layout shift vs mobile — hero becomes side-by-side |
| **1024px** (small desktop) | Full nav visible: logo + Seek care button + How it works + Log in + hamburger | Full 2-col hero; H1 ~46px; all chips in 2 rows | 3 columns | 3-column footer + logo column | Desktop nav fully visible; hamburger still present for extended nav |
| **1440px** (full desktop) | Full nav at max width ~1200px centered | Full 2-col hero; H1 ~52px; more whitespace | 3 columns (wider cards) | 4-column footer | Maximum whitespace; optimal reading line length |

**Specific responsive observations:**

- **Secondary tab nav on mobile:** The 5 tabs overflow and the last tab ("Weight loss") is partially clipped — requires horizontal scroll, which is not discoverable. No scroll indicator shown.
- **Search input:** Scales to full container width on mobile — adequate tap target.
- **CTA buttons:** Pill buttons scale to full-width on mobile (good for tap targets ≥44×44px).
- **Condition link list:** Collapses from 2-column to 1-column on mobile — long scroll required.
- **Footer:** Gracefully collapses to stacked single-column list on mobile.
- **Hero image:** Moves below text on mobile — adds significant page length but preserves readability.
- **Font scaling:** H1 scales from ~52px (desktop) to ~28px (320px) — good proportional reduction.
- **Tap target sizes:** Most interactive elements meet 44×44px minimum. Exception: breadcrumb links (~28px height on mobile) may be too small.

***

## Phase 6 — Accessibility Audit

### Heading Hierarchy

| Check | Result | Notes |
|-------|--------|-------|
| Exactly one `<h1>` per page | ✓ Pass | "Care & vaccines for the whole family" on homepage; condition name on condition pages |
| H2s follow logically after H1 | ✓ Pass | Section headings (TBE, Eating habits, Skin, etc.) are H2 |
| H3s used for sub-sections | ✓ Pass | Category headers in condition list use H3 |
| No heading levels skipped | ✓ Pass | H1 → H2 → H3 observed consistently |

### Images & Alt Text

| Check | Result | Notes |
|-------|--------|-------|
| Hero doctor image has descriptive alt | ✓ Pass | "A female doctor is sitting in a lab coat in front of a computer at home, looking into the camera with a smile..." — verbose and accurate |
| Partner logos have alt text | ✓ Pass | "Pharmacy Heart", "Aleris", "Unilabs", "Skandia" |
| App store badges have alt text | ✓ Pass | "iOS badge", "Google badge" — minimal but present |
| Condition icons have alt text | ~ Partial | Line art icons observed without confirmed descriptive alt |
| Decorative images marked `aria-hidden` | ~ Unconfirmed | Blob background shapes not verified |

### Keyboard Navigation

| Check | Result | Notes |
|-------|--------|-------|
| All interactive elements reachable via Tab | ~ Likely Pass | Gatsby-generated HTML uses semantic elements |
| Skip-to-content link present | ✗ Fail | No skip link detected in DOM — `#gatsby-focus-wrapper` is present but no visible skip link |
| Focus indicators visible | ~ Partial | Default browser focus ring may be suppressed by CSS resets — needs verification with keyboard testing |
| Tab order logical | ~ Likely Pass | DOM order matches visual order on most pages |

### Color Contrast

| Element | Foreground | Background | Ratio (est.) | WCAG AA |
|---------|-----------|------------|--------------|---------|
| Body text | `#2D2D2D` | `#FFFFFF` | ~13:1 | ✓ Pass |
| H1 headings | `#1A1A1A` | `#FFFFFF` | ~17:1 | ✓ Pass |
| Red links | `#E8251F` | `#FFFFFF` | ~4.6:1 | ✓ Pass (just) |
| CTA button text | `#FFFFFF` | `#E8251F` | ~4.6:1 | ✓ Pass (just) |
| Chip text | `#FFFFFF` | `#2C5364` | ~7.2:1 | ✓ Pass |
| Nav links | `#FFFFFF` | `#1A2B35` | ~12:1 | ✓ Pass |
| Muted text | `#6B7280` | `#FFFFFF` | ~4.6:1 | ~ Borderline |
| Red links on blush | `#E8251F` | `#FDF0EF` | ~3.9:1 | ✗ Fail (AA requires 4.5:1) |

### Forms & Labels

| Check | Result | Notes |
|-------|--------|-------|
| Search input has label | ✓ Pass | `aria-label="What can we help you with?"` |
| Login form labels | N/A | Not audited (BankID gate — not interacted with) |
| Error/validation states | ~ Unconfirmed | Could not trigger without submission |

### ARIA Landmarks

| Landmark | Present | Notes |
|----------|---------|-------|
| `<nav>` / `role="navigation"` | ✓ | Footer nav has `role="navigation" aria-label="footer"` |
| `<main>` / `role="main"` | ~ Likely | Gatsby wraps content — `#gatsby-focus-wrapper` present |
| `<footer>` / `role="contentinfo"` | ✓ | `role="contentinfo" aria-label="partners"` |
| `role="tablist"` / `role="tab"` | ✓ | Secondary tab nav correctly implemented |
| `role="search"` on search container | ✗ Missing | Search form wrapper does not have `role="search"` |
| `aria-live` regions | ✓ | `#gatsby-announcer` with `aria-live="assertive"` for route changes |

### Language Attribute

| Check | Result |
|-------|--------|
| `<html lang="sv">` | ✓ Pass — Swedish confirmed |
| English pages use `lang="en"` | ~ Unconfirmed — some pages render in EN without confirmed lang override |

### Summary Accessibility Score

| Category | Status |
|----------|--------|
| Heading hierarchy | ✓ Pass |
| Alt text | ~ Partial |
| Keyboard navigation | ~ Partial (no skip link) |
| Color contrast | ~ Mostly pass (red on blush fails) |
| ARIA landmarks | ~ Mostly pass (missing `role="search"`) |
| Form labels | ✓ Pass |
| Language | ✓ Pass |
| Skip link | ✗ Fail |
| Focus indicators | ~ Unconfirmed |

***

## Phase 7 — Content Strategy Audit

### Homepage Copy

| Element | Text |
|---------|------|
| H1 Headline | "Care & vaccines for the whole family" |
| Hero trust signal | "Easy contact with doctors directly on your mobile phone. 24/7, wherever you are." |

***

````markdown
| Primary CTA label | "Seek care" (nav button) |
| Secondary CTA labels | "Our treatment areas →", "How it works →" |
| Feature section CTAs | "Vaccination against TBE →", "Frequently asked questions about TBE →", "More about dietary advice →", "Dietary advice for weight loss →", "More about skin problems →", "Birthmark check →" |
| App section trust bullets | "Open every day, 24 hours a day", "Safe and secure with BankID", "Recipes directly on your mobile" |
| Testimonial (EN version) | "Att kunna kontakta vården när som helst på dygnet öppnade en helt ny värld för mig." — Linda Sikström |
| Testimonial 2 | "För mig sparade det värdefull tid och gav mig nya positiva insikter om modern sjukvård." — Jonas Klevhag |
| Collaboration section headline | "We collaborate with" |
| Footer disclaimer | "My Doctor offers digital primary care that is included in the free choice of care via subcontractor agreements with My Doctor Health Center & BVC in Sörmland." |

---

### CTA Labels (Full Inventory)

| Label | Type | Color | Location |
|-------|------|-------|----------|
| "Seek care" | Pill button | `#E8251F` | Top nav |
| "Get started" | Pill button | `#E8251F` | Condition landing pages (e.g. weight loss) |
| "Seek care for cough" | Solid pill button | `#E8251F` | Condition page hero |
| "Seek care" | Solid pill button | `#E8251F` | Condition page hero (generic) |
| "Seek treatment for stress" | Solid pill button | `#E8251F` | Condition page hero |
| "Read more about cough" | Outline pill button | `#1A1A1A` border | Condition page hero |
| "Read more about eczema" | Outline pill button | `#1A1A1A` border | Condition page hero |
| "How a digital healthcare visit works >" | Text link | `#E8251F` | Below dual CTA on condition pages |
| "Our treatment areas >" | Text link | `#E8251F` | Homepage hero |
| "How it works >" | Text link | `#E8251F` | Homepage hero |
| "Find the nearest reception >" | Text link | `#E8251F` | Vaccination page |
| "Vaccinations price list >" | Text link | `#E8251F` | Vaccination page |
| "The vaccine bus >" | Text link | `#E8251F` | Vaccination page |
| "Log in" | Text link / outline button | `#FFFFFF` or with BankID icon | Top nav |
| "Seek care digitally" | Solid pill button | `#E8251F` | How it works page |
| "Find reception" | Solid pill button | `#E8251F` | How it works page |
| "List me" | Text link | `#E8251F` | Homepage health center promo |
| "Read more about health and diseases" | Text link | `#E8251F` | Bottom of condition list |
| "Fees and prices" | Text link | `#E8251F` | Bottom of condition list |

---

### Trust Signals (Full Inventory)

| Signal | Format | Placement |
|--------|--------|-----------|
| BankID | Logo icon on "Log in" button + text mentions in body | Nav, How it works page, Chat section |
| "Open every day, 24 hours a day" | Bullet point with dot | Chat/app section |
| "Safe and secure with BankID" | Bullet point with dot | Chat/app section |
| "4.8 out of 5 ratings on the App Store" | ★★★★★ star rating + text | Weight loss page hero |
| "Together with APOTEK Hjärtat+ICA" | Partner logo | Weight loss page |
| LegitScript Certified | Badge/shield image (linked) | Footer, every page |
| "Nyköping's best health center & BVC" | Award mention (SKR patient survey 2023) | Homepage promo card |
| Pharmacy Hjärtat partnership | Body text mention | How it works page |
| SYNLAB / Unilabs / Skandia | Partner logos | Homepage collaboration section |
| "We accept children from 6 months" | Body text | How it works page |

---

### Microcopy

| Element | Text |
|---------|------|
| Search input placeholder | "What can we help you with?" |
| Suggestion chips | "allergy", "contraceptive", "opening hours", "recipe", "Depression", "vaccination", "weight loss" |
| Breadcrumb separator | `›` (›) |
| Tab "selected" indicator | Red underline border-bottom |
| Accordion expand icon | `˅` chevron (rotates to `˄` when open) |
| Condition page tertiary link | "How a digital healthcare visit works >" |
| Footer legal text | "My Doctor offers digital primary care that is included in the free choice of care via subcontractor agreements with My Doctor Health Center & BVC in Sörmland." |
| Error/validation messages | Not observable (BankID form not interacted with) |
| Loading/skeleton states | Not observed (Gatsby SSG — pages are pre-rendered) |
| Empty states | Not observed |
| App store CTA | Links to `https://mdlink.se/ladda-ner-appen` (redirector URL) |

---

### Condition Page Content Template (Replicable Pattern)

Confirmed consistent across all 3 audited condition pages (Cough, Eczema, Stress):

```
TEMPLATE STRUCTURE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Breadcrumb] Home > Health and diseases > [Category] > [Condition]

[HERO SECTION — blush pink bg]
  [H1]  {Condition Name}           [Line-art icon, top-right]
  [p]   2–3 sentence intro
  [p]   1 supplementary sentence

  [Button — outline]  "Read more about {condition}"
  [Button — solid red] "Seek care for {condition}" / "Seek treatment for {condition}"
  [Link]  "How a digital healthcare visit works >"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CONTENT BODY — 65% width]     [SIDEBAR — 30% width]
                                ┌─────────────────────┐
[H2] What is {condition}?      │ Content              │
[p]  Detailed body text        │ ─────────────────── │
                               │ > What is {cond}?    │
[H2] Causes of {condition}     │ > Causes             │
[p]  Detailed body text        │ > Symptoms           │
                               │ > Treatment          │
[H2] Symptoms of {condition}   │ > [Additional TOC]   │
[p]  May include <ul> list     └─────────────────────┘

[H2] Treatment for {condition}
[p]  Treatment options

[H2] When to seek care
[p]  Red flags / escalation guidance

[CTA — solid red, full width or centered]
  "Seek care for {condition}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**H1 examples:**
- "Cough" — `/halsa-sjukdomar/hosta/`
- "Eczema" — `/halsa-sjukdomar/eksem/`
- "Stress" — `/halsa-sjukdomar/stress/`

**Intro paragraph pattern:** 2 sentences — (1) definition, (2) scope/context or prognosis note.  
**Icon style:** Thin-stroke line art, body-part or character based, dark on blush.  
**Sidebar:** White card, border-radius 12px, red link list, sticky on desktop scroll.

---

## Design Tokens JSON

```json
{
  "design_tokens": {
    "colors": {
      "primary": "#E8251F",
      "primary_hover": "#C41F1A",
      "primary_light_bg": "#FDE8E8",
      "secondary_dark_nav": "#1A2B35",
      "accent_teal": "#2C5364",
      "background_white": "#FFFFFF",
      "background_blush": "#FDF0EF",
      "background_footer": "#F2F2F2",
      "text_heading": "#1A1A1A",
      "text_body": "#2D2D2D",
      "text_muted": "#6B7280",
      "text_link": "#E8251F",
      "text_on_dark": "#FFFFFF",
      "border_card": "#E5E7EB",
      "border_input": "#D1D5DB",
      "border_dashed": "#E5C6C6",
      "status_success_green": "#22C55E",
      "chip_bg": "#2C5364",
      "chip_text": "#FFFFFF"
    },
    "typography": {
      "font_families": ["Sora", "system-ui", "sans-serif"],
      "font_source": "Google Fonts",
      "type_scale": {
        "h1_hero":    { "size": "52–56px", "weight": 800, "line_height": "1.10" },
        "h1_page":    { "size": "40–48px", "weight": 800, "line_height": "1.15" },
        "h2_section": { "size": "28–32px", "weight": 700, "line_height": "1.20" },
        "h3_card":    { "size": "20–24px", "weight": 700, "line_height": "1.30" },
        "h4":         { "size": "18px",    "weight": 600, "line_height": "1.40" },
        "body":       { "size": "16px",    "weight": 400, "line_height": "1.60" },
        "body_small": { "size": "14px",    "weight": 400, "line_height": "1.50" },
        "button":     { "size": "15–16px", "weight": 600, "line_height": "1.00" },
        "nav_link":   { "size": "15px",    "weight": 500, "line_height": "1.00" },
        "tab_label":  { "size": "13px",    "weight": 500, "line_height": "1.00" },
        "body_link":  { "size": "15px",    "weight": 500, "color": "#E8251F" },
        "breadcrumb": { "size": "13px",    "weight": 400, "color": "#E8251F" }
      }
    },
    "spacing": {
      "base_unit": "8px",
      "grid_columns": 12,
      "max_content_width": "1200px",
      "section_padding_vertical": "64px–96px",
      "card_padding": "24px–32px",
      "nav_height": "56px",
      "secondary_nav_height": "48px",
      "hero_padding_top": "80px",
      "card_gutter": "24px",
      "breakpoints": {
        "mobile_sm": "320px",
        "mobile":    "375px",
        "tablet":    "768px",
        "desktop_sm":"1024px",
        "desktop":   "1440px"
      }
    },
    "border_radius": {
      "button_pill":       "9999px",
      "chip_pill":         "9999px",
      "search_input":      "8px",
      "card_image":        "0px",
      "content_sidebar":   "12px",
      "app_badge":         "8px",
      "accordion":         "0px"
    },
    "shadows": {
      "card_hover":    "0 4px 20px rgba(0,0,0,0.10)",
      "search_input":  "0 1px 4px rgba(0,0,0,0.08)",
      "nav":           "0 2px 8px rgba(0,0,0,0.08)",
      "button":        "none"
    },
    "transitions": {
      "fast":   "0.15s ease",
      "normal": "0.20s ease",
      "slow":   "0.30s ease",
      "enter":  "0.40s ease"
    }
  },
  "components": [
    {
      "name": "TopNavBar",
      "dimensions": { "width": "100%", "height": "56px" },
      "css_classes": ["sticky", "top-nav", "dark-bg"],
      "states": {
        "default": "Dark navy bg, white text/icons",
        "scrolled": "Same (no transparency change observed)",
        "mobile": "Shows logo + 3 buttons (Seek care, Log in, Hamburger)"
      },
      "accessibility": { "role": "banner", "aria_label": "main navigation" }
    },
    {
      "name": "SecondaryTabNav",
      "dimensions": { "width": "100%", "height": "48px" },
      "states": {
        "default": "White bg, teal icons/text",
        "active": "Red bottom-border underline on selected tab",
        "mobile": "Horizontal scroll, last tab may clip"
      },
      "accessibility": { "role": "tablist", "children_role": "tab", "aria_selected": "true on active" }
    },
    {
      "name": "HeroSearchInput",
      "html_structure": "<div><input type='text' aria-label='What can we help you with?' /><button type='submit'>→</button></div>",
      "dimensions": { "width": "350px", "height": "52px" },
      "css_classes": ["search-input", "rounded-8"],
      "states": {
        "default": "White bg, grey border #D1D5DB, grey placeholder text",
        "focus": "Border shifts to #E8251F, shadow glow",
        "hover": "Subtle border darkening"
      },
      "accessibility": { "aria_label": "What can we help you with?", "role": "searchbox" }
    },
    {
      "name": "PrimaryCTAButton",
      "html_structure": "<button class='btn-primary'>Label</button>",
      "dimensions": { "width": "~120–200px", "height": "40–44px" },
      "states": {
        "default": "bg #E8251F, text white, pill radius",
        "hover": "bg #C41F1A, possible scale(1.02)",
        "focus": "Visible focus ring",
        "disabled": "Not observed"
      },
      "accessibility": { "role": "button", "tabindex": "0" }
    },
    {
      "name": "OutlineCTAButton",
      "html_structure": "<button class='btn-outline'>Label</button>",
      "dimensions": { "width": "~200–340px", "height": "44–48px" },
      "states": {
        "default": "White bg, dark border,

***

````markdown
        "hover":   "Slight bg fill (#F5F5F5), border darkens",
        "focus":   "Visible focus ring",
        "disabled": "Not observed"
      },
      "accessibility": { "role": "button", "tabindex": "0" }
    },
    {
      "name": "SuggestionChip",
      "html_structure": "<button class='chip'>label</button>",
      "dimensions": { "width": "auto (content-fit)", "height": "36px" },
      "states": {
        "default": "bg #2C5364, text #FFFFFF, pill radius 9999px",
        "hover":   "bg lightens to ~#3A6B7E, cursor pointer",
        "focus":   "Visible focus ring"
      },
      "accessibility": { "role": "button", "tabindex": "0" }
    },
    {
      "name": "FeatureHighlightCard",
      "html_structure": "<article><img /><h3></h3><p></p><a></a><a></a></article>",
      "dimensions": { "width": "~330px", "height": "auto (~480px)" },
      "states": {
        "default": "White bg, no shadow",
        "hover":   "box-shadow: 0 4px 20px rgba(0,0,0,0.10); translateY(-2px)"
      },
      "accessibility": { "role": "article" }
    },
    {
      "name": "ConditionPageSidebar",
      "html_structure": "<aside><h3>Content</h3><ul>><a></a></li>...</ul></aside>",
      "dimensions": { "width": "~300–320px", "height": "auto" },
      "states": {
        "default": "White bg, border-radius 12px, border #F3F4F6",
        "desktop": "Sticky on scroll",
        "mobile":  "Collapses above content body"
      },
      "accessibility": { "role": "navigation", "aria_label": "Table of contents" }
    },
    {
      "name": "AccordionItem",
      "html_structure": "<div><button aria-expanded='false'><h2></h2><svg chevron /></button><div class='content'></div></div>",
      "dimensions": { "width": "100%", "height": "56px collapsed / auto expanded" },
      "states": {
        "collapsed": "Chevron points down, content hidden (max-height: 0)",
        "expanded":  "Chevron rotates 180°, content visible",
        "hover":     "Slight bg shift on button"
      },
      "accessibility": {
        "aria_expanded": "true/false",
        "role": "button",
        "controls": "accordion-content-id"
      }
    },
    {
      "name": "BreadcrumbNav",
      "html_structure": "<nav aria-label='breadcrumb'><ol>><a>Home</a></li>>›</li>><a>Category</a></li>>›</li>>Current</li></ol></nav>",
      "dimensions": { "width": "auto", "height": "~28px" },
      "states": {
        "default": "Links in #E8251F, current page in #2D2D2D (no link)",
        "hover":   "Link underlines"
      },
      "accessibility": {
        "aria_label": "breadcrumb",
        "aria_current": "page on last item"
      }
    },
    {
      "name": "FooterNav",
      "html_structure": "<footer role='contentinfo'><nav role='navigation' aria-label='footer'>...</nav></footer>",
      "dimensions": { "width": "100%", "height": "auto (~360px)" },
      "states": {
        "desktop": "4-column grid: logo + 3 link groups",
        "tablet":  "2-column grid",
        "mobile":  "Single stacked columns"
      },
      "accessibility": {
        "role": "contentinfo",
        "nav_aria_label": "footer"
      }
    }
  ]
}
```

***

## Improvement Opportunities

### Priority: HIGH

| # | Area | Current State | Suggested Improvement |
|---|------|--------------|----------------------|
| H1 | Auth Gate UX | BankID login wall is the very first thing users hit after clicking any "Seek care" CTA — no preview of the consultation form | Show a 2–3 step preview/teaser of the questionnaire before requiring BankID login. Display something like: "You'll answer ~8 questions about your symptoms. Takes 3 minutes." |
| H2 | Search Autocomplete | Static search input — no confirmed live autocomplete / suggestions as user types | Implement real-time autocomplete dropdown showing top 5 matching conditions (with icons) as the user types. Use debounced API call or pre-loaded condition list. |
| H3 | Mobile Tab Nav Overflow | The 5th tab ("Weight loss") is clipped/partially hidden on mobile (<375px) with no scroll indicator | Add horizontal scroll snap with a fade/gradient indicator on right edge, OR collapse tabs into a dropdown selector on mobile |
| H4 | Pricing Page Layout | All pricing is buried in paragraph prose — not scannable, not comparable | Replace prose with a structured pricing table: rows = service type, columns = age groups (0–19, 20–84, 84+). Add "Free card applies" callout chip. |
| H5 | Skip-to-Content Link | No skip link detected — keyboard users must Tab through entire nav on every page load | Add a visually hidden `<a href="#main-content">Skip to main content</a>` as the very first DOM element, visible on focus |
| H6 | Vaccination Landing Page | No inline booking entry or vaccine catalogue — users must navigate away to find clinics or specific vaccines | Add a postcode/city search field for nearest clinic directly on `/vaccination/`. Add a vaccine type grid (cards: TBE, HPV, Travel, Flu, Shingles) with descriptions and prices. |
| H7 | Red-on-Blush Contrast | Red links (#E8251F) on blush background (#FDF0EF) yield ~3.9:1 contrast ratio — fails WCAG AA (requires 4.5:1) | Darken red link color on blush backgrounds to ~#C41F1A or darken the blush to pure white for text areas. Target ≥4.5:1. |

***

### Priority: MEDIUM

| # | Area | Current State | Suggested Improvement |
|---|------|--------------|----------------------|
| M1 | How It Works Page | Accordion hides all process steps by default; no visual progress stepper | Replace or augment accordion with always-visible numbered step timeline using brand icons. Add animated entrance. |
| M2 | Language Consistency | `/sa-funkar-det/` (How it works) renders in Swedish on an English-language session | Ensure all pages respect the active language session or URL locale prefix (e.g. `/en/sa-funkar-det/`). |
| M3 | Condition List Discoverability | 50+ condition links in a flat 2-column list — no filter, search, or alphabet index | Add a filter bar above the condition list: filter by body area / category, or alphabet quick-jump. |
| M4 | No Triage Path | User has to know their condition to find care — no "I don't know what I have" path | Add a guided symptom checker entry: "Not sure what you have? Answer 3 quick questions →" prominent in the hero. |
| M5 | Social Proof Depth | Only 2 testimonials visible; no review count or platform score visible on homepage | Show aggregate review score (e.g. "4.8/5 from 12,000+ App Store reviews") in hero or trust bar. Add more recent/diverse testimonials. |
| M6 | Vaccination CTA Hierarchy | Three equally-weighted red text links on vaccination page — no primary action button | Promote "Find nearest clinic" to a solid red pill CTA button. Demote secondary links. |
| M7 | No Estimated Response Time | No indication of how long users wait for a doctor response after submitting a consultation | Add "Average response time: 2 hours" or similar trust signal near consultation CTAs. |
| M8 | `role="search"` Missing | The hero search container does not have `role="search"` on the wrapper element | Wrap the search input + submit button in `<div role="search">` or use `<form role="search">` |
| M9 | Focus Indicator Visibility | Default browser focus rings may be suppressed by CSS reset — unconfirmed | Audit `:focus-visible` styles across all interactive elements. Ensure a 2px `#E8251F` or `#2C5364` outline is always visible when navigating by keyboard. |
| M10 | Condition Page CTA Repetition | "Seek care" CTA only appears once at the top of condition pages — long pages don't repeat it | Add a second sticky or inline "Seek care" CTA after the main content body, especially after the "When to seek care" section. |

***

### Priority: LOW

| # | Area | Current State | Suggested Improvement |
|---|------|--------------|----------------------|
| L1 | App Download Visibility | App badges are buried in the chat mock section — easy to miss | Surface App Store and Google Play badges in the footer or in a dedicated "Download the app" banner. |
| L2 | Hero Image Accessibility | Hero doctor image has detailed alt text — but no `aria-hidden="true"` for decorative blob background shape | Mark purely decorative SVG/CSS blob shapes with `aria-hidden="true"` to reduce screen reader noise. |
| L3 | Suggestion Chip Randomness | Chips appear to be static — no seasonal rotation or personalization visible | Rotate chips based on time of year (e.g., "pollen allergy" in spring, "flu" in autumn/winter) or based on region. |
| L4 | Footer Logo | Only the heart SVG is shown in footer — no "Min Doktor" wordmark | Add wordmark beside heart icon in footer for brand reinforcement on scroll-to-bottom. |
| L5 | Condition Page Video | No multimedia content on condition pages | Consider adding a short 30–60s explainer video on high-traffic condition pages (cough, UTI, eczema). |
| L6 | Partner Section Interactivity | Partner logos are static/unlinked | Link each logo to the relevant partnership/collaboration page or the partner's website. |
| L7 | No Dark Mode | No dark mode media query support detected | Add `@media (prefers-color-scheme: dark)` support — particularly impactful for night-time health app usage. |
| L8 | No Cookie Banner Observed | Cookie consent banner was not observed during audit | Verify cookie consent implementation complies with GDPR — ensure it appears for first-time visitors and cannot be pre-accepted. |
| L9 | Page Transition Animation | No page transition animation between routes | Add a subtle fade or progress bar for Gatsby route transitions to reduce perceived loading time. |
| L10 | Breadcrumb `aria-current` | Not verified on all pages | Ensure `aria-current="page"` is set on the last breadcrumb item on all condition and informational pages. |

***

## Prototype Recommendations Summary

Based on this audit, a next-generation digital healthcare platform prototype should prioritize:

### 1. Design System
- Use **Sora** font family — it tests well for healthcare contexts (friendly, legible, modern)
- Primary red `#E8251F` is strong and distinctive — retain it but fix contrast on blush backgrounds
- Implement a proper **design token system** with CSS custom properties:
  ```css
  :root {
    --color-primary: #E8251F;
    --color-primary-hover: #C41F1A;
    --color-nav-bg: #1A2B35;
    --color-accent-teal: #2C5364;
    --color-bg-blush: #FDF0EF;
    --color-text-heading: #1A1A1A;
    --color-text-body: #2D2D2D;
    --color-text-muted: #6B7280;
    --color-text-link: #E8251F;
    --radius-pill: 9999px;
    --radius-card: 12px;
    --radius-input: 8px;
    --shadow-card-hover: 0 4px 20px rgba(0,0,0,0.10);
    --transition-fast: 0.15s ease;
    --transition-normal: 0.20s ease;
  }
  ```

### 2. Key UX Improvements to Build Into Prototype
1. **Pre-auth consultation preview** — show form structure before BankID gate
2. **Live search autocomplete** — typed suggestions with condition icons
3. **Guided symptom triage** — "Not sure? Answer 3 questions" path
4. **Dynamic pricing table** — visual, scannable, age-group toggled
5. **Vaccination clinic map** — inline postcode search on `/vaccination/`
6. **Sticky condition CTA** — repeating "Seek care" at end of long condition articles
7. **Seasonal chip rotation** — relevant suggestions by month/region
8. **Skip link + focus indicators** — full keyboard nav compliance
9. **Progress stepper** on How It Works — visual numbered timeline

### 3. Component Priority Build Order
```
1. DesignTokens (CSS custom properties setup)
2. TopNavBar
3. SecondaryTabNav
4. HeroSearchInput (with autocomplete)
5. SuggestionChips
6. HeroSection
7. PrimaryCTAButton + OutlineCTAButton
8. FeatureHighlightCard
9. ConditionPageTemplate (hero + body + sidebar)
10. PricingTable
11. AccordionItem
12. ChatMockWidget
13. TestimonialBlock
14. PartnerLogosGrid
15. Footer
```

***

## Audit Metadata

```json
{
  "audit_metadata": {
    "audited_url": "https://www.mindoktor.se",
    "audit_date": "2026-05-20",
    "auditor": "Automated UI/UX Extraction Agent",
    "pages_audited": [
      "https://www.mindoktor.se/",
      "https://www.mindoktor.se/sa-funkar-det/",
      "https://www.mindoktor.se/utbud-och-priser/",
      "https://www.mindoktor.se/vaccination/",
      "https://www.mindoktor.se/halsa-sjukdomar/hosta/",
      "https://www.mindoktor.se/halsa-sjukdomar/eksem/",
      "https://www.mindoktor.se/halsa-sjukdomar/stress/",
      "https://www.mindoktor.se/hjalp-med-viktnedgang/"
    ],
    "framework": "Gatsby (React SSG)",
    "primary_font": "Sora (Google Fonts)",
    "primary_language": "sv (Swedish)",
    "secondary_language": "en (English — partial translation)",
    "auth_system": "BankID (Swedish national eID)",
    "external_subdomains": ["guides.mindoktor.se", "mdlink.se"],
    "trust_certifications": ["LegitScript Certified"],
    "partner_integrations": ["APOTEK Hjärtat+ICA", "SYNLAB", "Unilabs", "Skandia"],
    "total_conditions_catalogued": 55,
    "total_cta_labels_documented": 19,
    "accessibility_violations_found": 4,
    "accessibility_warnings_found": 6,
    "improvement_opportunities_total": 27,
    "improvement_priority_high":

Continuing from the exact cut-off point — the last line was `"improvement_priority_high":` inside the `audit_metadata` JSON block. This is the **final section** that completes the entire report:

***

````markdown
    "improvement_priority_high": 7,
    "improvement_priority_medium": 10,
    "improvement_priority_low": 10,
    "wcag_aa_violations": [
      "Red links on blush background (#E8251F on #FDF0EF) — contrast ratio ~3.9:1, fails 4.5:1 threshold",
      "No skip-to-content link present",
      "role='search' missing on hero search container",
      "Focus indicator visibility unconfirmed — possible suppression via CSS reset"
    ],
    "wcag_aa_warnings": [
      "Muted text (#6B7280 on #FFFFFF) borderline at ~4.6:1",
      "Breadcrumb links on mobile may be below 44×44px tap target",
      "Language consistency — some EN-session pages serve Swedish content",
      "Condition icon alt text not fully verified",
      "aria-current='page' on breadcrumb not confirmed on all pages",
      "Decorative background blobs not confirmed aria-hidden"
    ],
    "wcag_aa_passed": [
      "Exactly one H1 per page",
      "Heading hierarchy H1 > H2 > H3 logical throughout",
      "Hero doctor image has verbose descriptive alt text",
      "Search input has aria-label",
      "Tab nav uses role=tablist and role=tab with aria-selected",
      "Footer uses role=contentinfo and aria-label=footer",
      "Gatsby route announcer uses aria-live=assertive",
      "Body text (#2D2D2D on #FFFFFF) passes at ~13:1",
      "Nav text (#FFFFFF on #1A2B35) passes at ~12:1",
      "Chip text (#FFFFFF on #2C5364) passes at ~7.2:1",
      "CTA button (#FFFFFF on #E8251F) passes at ~4.6:1",
      "html lang=sv set correctly",
      "Lazy loading applied to below-fold images",
      "Hamburger button has aria-label='menu'"
    ]
  }
}
```

***

## Quick-Reference Visual Summary

```
┌─────────────────────────────────────────────────────────────┐
│              MIN DOKTOR — DESIGN AUDIT SUMMARY              │
├─────────────────────────────────────────────────────────────┤
│  PRIMARY COLOR     │ #E8251F (Red)                          │
│  DARK NAV          │ #1A2B35 (Navy)                         │
│  ACCENT TEAL       │ #2C5364                                │
│  BLUSH BG          │ #FDF0EF                                │
│  FONT              │ Sora (Google Fonts) — weight 400–800   │
│  BASE SIZE         │ 16px body / 52–56px H1 hero            │
│  BORDER RADIUS     │ 9999px buttons | 8px inputs | 12px cards│
│  MAX WIDTH         │ ~1200px                                 │
│  GRID              │ 12-column, 24px gutter                  │
├─────────────────────────────────────────────────────────────┤
│  PAGES AUDITED     │ 8                                       │
│  CONDITIONS        │ 55 catalogued                           │
│  COMPONENTS        │ 15 documented                           │
│  USER FLOWS        │ 5 mapped (A–E)                          │
│  CTA LABELS        │ 19 documented                           │
│  TRUST SIGNALS     │ 10 identified                           │
├─────────────────────────────────────────────────────────────┤
│  IMPROVEMENTS      │ 27 total                                │
│    HIGH priority   │ 7 (auth gate, autocomplete, contrast…)  │
│    MEDIUM priority │ 10 (triage, pricing table, focus…)      │
│    LOW priority    │ 10 (dark mode, app badges, chips…)      │
├─────────────────────────────────────────────────────────────┤
│  ACCESSIBILITY     │                                         │
│    Violations      │ 4 (skip link, search role, contrast…)   │
│    Warnings        │ 6 (tap targets, lang, focus ring…)      │
│    Passed          │ 14 checks                               │
├─────────────────────────────────────────────────────────────┤
│  TOP 3 PROTOTYPE   │ 1. Pre-auth consultation preview        │
│  PRIORITIES        │ 2. Live search autocomplete             │
│                    │ 3. Visual pricing table                 │
└─────────────────────────────────────────────────────────────┘
```

***

## File Info

```
filename:  mindoktor-design-audit.md
version:   1.0.0
date:      2026-05-20
audited:   https://www.mindoktor.se
sections:  7 phases + JSON tokens + improvement log + summary
lines:     ~900
encoding:  UTF-8
```

***

*End of report — mindoktor-design-audit.md*
````

---

The report is now **complete**. Here is a summary of everything the full `mindoktor-design-audit.md` file contains across all 7 phases:

| Phase | Content | Status |
|-------|---------|--------|
| **Phase 1** | Full color palette (18 tokens), typography scale (Sora, 12 levels), spacing/grid, breakpoints, iconography & imagery | ✅ Complete |
| **Phase 2** | 15 components documented — NavBar, TabNav, SearchInput, HeroSection, FeatureCards, ChatMock, Testimonial, ConditionList, Partners, Footer, ConditionPageTemplate, AccordionItem, Breadcrumb, CTAButtons, Sidebar | ✅ Complete |
| **Phase 3** | 5 user flows (A–E) mapped step-by-step with URLs, observations, pain points, and improvement opportunities; full 55-condition URL slug inventory | ✅ Complete |
| **Phase 4** | 12 interaction/animation entries with durations and CSS; performance metrics (FCP, LCP, CLS, lazy loading) | ✅ Complete |
| **Phase 5** | 5 breakpoints (320/375/768/1024/1440px) — layout changes per breakpoint, tap target notes, tab nav overflow issue | ✅ Complete |
| **Phase 6** | Full WCAG AA accessibility audit — heading hierarchy, alt text, contrast ratios (table), ARIA landmarks, keyboard nav, 14 passed / 4 violations / 6 warnings | ✅ Complete |
| **Phase 7** | Homepage copy, 19 CTA labels, 10 trust signals, microcopy, replicable condition page template pattern | ✅ Complete |
| **Design Tokens JSON** | Full structured JSON block with colors, typography, spacing, border-radius, shadows, transitions, and all 15 component specs | ✅ Complete |
| **Improvement Opportunities** | 27 prioritized improvements (7 HIGH / 10 MEDIUM / 10 LOW) in tabular format | ✅ Complete |
| **Prototype Recommendations** | CSS custom properties code block, 9 key UX improvements, 15-component build order priority list | ✅ Complete |
| **Audit Metadata JSON** | All counts, violation lists, pages audited, framework, partners, certification info | ✅ Complete |
| **Visual Summary** | ASCII quick-reference table of all key metrics and findings | ✅ Complete |