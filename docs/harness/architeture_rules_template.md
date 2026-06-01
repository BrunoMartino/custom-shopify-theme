# Architecture (from legacy analysis)

**Scope:** `my-store-theme/` only. **Out of scope:** `horizon-read-only/`, `my_docs/frontend-template/`, repo root apps outside the theme.

**Graph mode:** AST-only (`graphify update . --no-cluster`) + structural clustering (`graphify cluster-only . --no-label`). No LLM semantic extraction (no API keys). **Evidence:** `my-store-theme/graphify-out/GRAPH_REPORT.md` (2026-05-31), `my-store-theme/graphify-out/graph.json` (303 nodes · 405 edges · 19 communities after `.graphifyignore`).

## Purpose

Custom Shopify Online Store 2.0 theme implementing a FoodMart-style grocery storefront: Liquid sections/snippets, Vite-bundled front-end (Bootstrap, Swiper, Alpine, AOS, Isotope, Typed.js), and Shopify-native cart/search/account flows.

## System context

- **Runtime:** Shopify storefront (Liquid server-render + browser JS/CSS).
- **Build:** Node.js + Vite 6 (`my-store-theme/vite.config.js`) — single entry `src/js/theme.js` → `assets/theme.js` + `assets/theme.css` (`emptyOutDir: false` preserves other static assets under `assets/`).
- **Main entrypoints:**
  - **Layout:** `my-store-theme/layout/theme.liquid` — `content_for_header`, `foodmart-icons`, theme assets, `{% sections 'header-group' %}`, `content_for_layout`, `{% sections 'footer-group' %}`.
  - **Home template:** `my-store-theme/templates/index.json` — ordered FoodMart sections (hero, categories, brands, trending, promos, product carousels, newsletter, blog, advantages, search tags). **Fact:** `sections` is a high-betweenness hub in the graph (`GRAPH_REPORT.md`).
  - **JS bootstrap:** `initTheme()` in `src/js/theme.js` wires all feature modules; re-runs on `shopify:section:load` (theme editor).

## Module boundaries

| Layer | Location | Responsibility |
|--------|----------|----------------|
| Liquid sections | `sections/*.liquid`, `sections/*-group.json` | Page blocks, schema, markup; FoodMart-prefixed sections (`foodmart-*`, `fm-product-carousel`) |
| Liquid snippets | `snippets/foodmart-*.liquid`, `snippets/icon.liquid` | Reusable UI (icons, product card, offcanvas panels, nav) |
| Theme settings | `config/settings_schema.json`, `config/settings_data.json` | Global logo, fonts, colors, `main_menu` |
| Source assets | `src/css/`, `src/js/modules/` | Authoring; compiled to `assets/` |
| Static theme assets | `assets/foodmart/*`, compiled `theme.js` / `theme.css` | Images and built bundles served by Shopify |
| Locales | `locales/en.default.json` | Copy for header, footer, accessibility |

**Reference-only (do not deploy or import):** `horizon-read-only/` — behavior guide per `.cursor/rules/horizon-reference.mdc`; never `render` or `asset_url` from Horizon inside `my-store-theme/`.

## Request and data flows

1. **Page render:** Shopify resolves template JSON → renders section Liquid → snippets (`render 'foodmart-…'`).
2. **Search:** Header form `GET` → `routes.search_url` with `q` (desktop bar); mobile offcanvas duplicate (`snippets/foodmart-offcanvas-search.liquid`).
3. **Cart:** Line items from Liquid `cart` object in offcanvas (`foodmart-offcanvas-cart.liquid`); checkout via `/checkout` link (verify cart non-empty in UX).
4. **Product carousels / filters:** `initSwiper()` for `.main-swiper`, `.category-carousel`, `.brand-carousel`, `.products-carousel`; `initIsotope()` for trending product grids (`foodmart-trending-products`).
5. **Theme editor:** Section reload triggers `initTheme()` again — modules must tolerate re-init (Swiper destroys existing instance in `swiper.js`).

## Integrations

- **Shopify:** Cart, search, customer account routes (`routes.*`), `content_for_header`, section groups.
- **npm (bundled):** `bootstrap`, `swiper`, `alpinejs`, `aos`, `isotope-layout`, `typed.js` (`package.json` — Community 4 in graph).
- **Fonts:** Google Fonts (Nunito, Open Sans) linked in `layout/theme.liquid`.
- **Shopify CLI:** `npm run theme:dev`, `theme:check` (`package.json` scripts).

## Architectural decisions

| Decision | Rationale (evidence) |
|----------|----------------------|
| Vite single bundle | `vite.config.js` one input; graph Community 12 links `initTheme()` → all `init*()` modules |
| Bootstrap Offcanvas for header UX | `sections/header.liquid` + snippets; `Offcanvas` imported in `theme.js`, exposed as `window.bootstrap` |
| FoodMart CSS in dedicated file | `src/css/components/foodmart.css` imported from `src/css/theme.css` |
| Horizon as read-only reference | Project rule; not part of graph corpus |
| Graphify corpus scoped to theme | `.graphifyignore` excludes `node_modules/`, built `assets/theme.js`, `assets/theme.css` |

## Open questions

- Whether `assets/foodmart/` demo images should be replaced entirely by theme settings / Shopify files (many `demo_image` settings in `index.json`).
- Wishlist: placeholder offcanvas + URL setting — no native Shopify wishlist API in theme (confirm product requirements).
- **Unknown:** Production deploy pipeline (CI, `shopify theme push` from monorepo root vs `my-store-theme/`) — confirm in repo README or ops docs.

## References

- `my-store-theme/graphify-out/GRAPH_REPORT.md`
- `my-store-theme/layout/theme.liquid`
- `my-store-theme/src/js/theme.js`
- `my-store-theme/templates/index.json`
- `.cursor/rules/horizon-reference.mdc`
