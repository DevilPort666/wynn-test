# CMS-Driven Website — Next.js + Contentful + Netlify

A component-driven website built as a solution to a technical assessment. Page layouts and content are fully managed through Contentful CMS — no code changes needed to update structure or content.

---

## Tech Stack

- **Next.js 14** (App Router, SSG via `generateStaticParams`)
- **TypeScript**
- **Contentful SDK** (headless CMS)
- **Netlify** (deployment + CI/CD)
- **Tailwind CSS** + **Framer Motion**

---

## Contentful Content Model

Three layers of content types were defined in Contentful:

**Global layout** — `Header`, `Footer`, and `Navigation` are fetched once in the root layout (`layout.tsx`) and shared across all pages via `Promise.all`.

**Page** — has a `slug` field (unique) and a `components` references field (many). This is the composition layer: editors control which components appear on a page and in what order, entirely from within Contentful.

**Page components** — `Hero` and `Promo` — referenced inside a Page's component list, each with their own fields as specified in the requirements.
<img width="1694" height="433" alt="image" src="https://github.com/user-attachments/assets/32b8a71f-7e4e-413b-8567-8b17807c86a3" />
<img width="1394" height="657" alt="image" src="https://github.com/user-attachments/assets/eb043e4c-282c-4170-93d9-d8d219aa3d45" />

---

## Component-Driven Rendering

To satisfy the requirement of mapping Contentful content type IDs to React components without hardcoding logic, the solution uses a registry + renderer pattern:

```ts
// registry.ts
export const componentMap = {
  hero: Hero,
  promo: Promo,
};
```

```tsx
// Renderer.tsx
const Component = componentMap[item.sys.contentType.sys.id];
return <Component key={item.sys.id} {...item.fields} />;
```

Adding a new component in the future only requires: creating the content type in Contentful → building the React component → adding one line to `registry.ts`.

---

## Data Fetching & Static Generation

A `getPage(slug)` utility fetches a Page entry by slug with all nested component references resolved in a single SDK call (`include: 2`). Pages are statically generated at build time via `generateStaticParams`, which pulls all published slugs from Contentful — satisfying the SSG requirement.

---

## Data Fetching & Nested Reference Resolution
 
Pages are fetched via the Contentful REST API using a custom `resolveIncludes` utility — no SDK dependency required.
 
### Why a custom resolver?
 
Contentful's REST API returns linked entries and assets as unresolved `Link` objects (`{ sys: { type: "Link", linkType: "Asset", id: "..." } }`). The actual data lives separately in `data.includes.Entry` and `data.includes.Asset`. To get usable data in components, these links need to be resolved recursively.
 
### How it works
 
Entries and assets are indexed into two separate maps by ID:
 
```ts
const entryMap = new Map(); // id → Entry
const assetMap = new Map(); // id → Asset
```
 
Then `resolveItem` walks the tree recursively. The key detail is that when resolving an Entry link, the resolved entry's own fields are also recursively resolved — not returned raw:
 
```ts
if (item.sys.linkType === 'Entry') {
  const resolved = entryMap.get(item.sys.id);
  return resolved ? resolveItem(resolved) : item; // ← recursive, not just map.get()
}
```
 
Without this, a nested structure like `Page → Hero (Entry) → backgroundImage (Asset)` would resolve the Hero entry but leave `backgroundImage` as an unresolved Link inside it.
 
### Static generation
 
`generateStaticParams` pulls all published slugs from Contentful at build time, and each page is statically generated via `getPage(slug)` with `include=10` to resolve deeply nested references.
 
---

## The Promo Component (Key Deliverable)

The requirement asked for a single component that renders two layout variants controlled entirely from Contentful — no code changes needed to switch between them.

The `imagePosition` field (`left` | `right`) drives the layout:

- **Variant A — Image Left**: image in the left column, title + description + CTA on the right
- **Variant B — Image Right**: text on the left, image in the right column

The flip is handled with a single Tailwind conditional:

```tsx
className={`flex md:flex-row ${isRight ? 'md:flex-row-reverse' : ''}`}
```

Framer Motion entrance animations are also keyed to `imagePosition`, so the slide-in always originates from the correct side regardless of variant.
<img width="1675" height="982" alt="image" src="https://github.com/user-attachments/assets/7b64d400-c3a2-42bb-b28a-ab3f487550ab" />

---

## Deployment (Netlify)

- Connected GitHub repo to Netlify for continuous deployment on every push to `main`
- Build command: `next build` — publish directory: `.next`
- `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are set as Netlify environment variables — never committed to the repo
<img width="1672" height="695" alt="image" src="https://github.com/user-attachments/assets/2d80613b-eb94-4743-aadf-209ad9ac4267" />

---

## Acceptance Criteria — How Each Point Is Met

| Requirement | How it's addressed |
|---|---|
| New Page in Contentful appears at correct URL | `generateStaticParams` pulls all published slugs; `getPage(slug)` fetches by slug at build time |
| Add a Hero from Contentful — no code changes | `Renderer` maps `hero` content type ID to `<Hero>` automatically |
| Toggle Promo `imagePosition` — layout reflects change | Single `md:flex-row-reverse` conditional driven by the CMS field |
<img width="1341" height="843" alt="image" src="https://github.com/user-attachments/assets/7e371066-49c1-4dd5-bdde-90ba19864fbd" />

| Publish in Contentful → appears on Netlify | Netlify rebuild triggered on push; content fetched fresh at build time |
| 404 page when slug not found | `not-found.tsx` with animated entrance via Framer Motion |
