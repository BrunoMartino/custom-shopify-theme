# Coding conventions (from legacy analysis)

**Scope:** `my-store-theme/` only.

**Graph mode:** AST-only + `--no-label` clustering. **Evidence:** `my-store-theme/graphify-out/GRAPH_REPORT.md` (2026-05-31).

## Purpose

Conventions for Liquid, JS, and CSS in the custom Shopify theme so changes stay consistent with the FoodMart implementation and Shopify OS 2.0 constraints.

## Repo layout

```
my-store-theme/
├── assets/           # Built theme.js/css + static foodmart images (do not hand-edit theme.js)
├── config/           # settings_schema.json, settings_data.json
├── layout/           # theme.liquid
├── locales/          # en.default.json
├── sections/         # OS 2.0 sections + header-group.json, footer-group.json
├── snippets/         # foodmart-* partials
├── src/
│   ├── css/          # Authoring (theme.css imports base + components)
│   └── js/
│       ├── theme.js  # Entry
│       └── modules/  # Feature init (swiper, isotope, alpine, …)
├── templates/        # JSON templates (e.g. index.json)
├── vite.config.js
└── graphify-out/     # Code graph (generated; not deployed)
```

**Excluded from analysis / deploy:** `horizon-read-only/`, `my_docs/`, `node_modules/`.

## Naming

- **Sections:** `foodmart-<feature>.liquid` for FoodMart home blocks; shorter prefix when schema name length is limited (e.g. `fm-product-carousel.liquid` — Shopify section `name` max **25 characters**).
- **Snippets:** `foodmart-<part>.liquid` for branded partials; generic `icon.liquid` / `product-card.liquid` for legacy/generic pieces.
- **JS modules:** `src/js/modules/<library>.js` exporting `init<Feature>()`.
- **CSS:** `src/css/components/foodmart.css` for FoodMart-specific rules; variables in `src/css/base/variables.css`.
- **Schema block types:** Descriptive handles (e.g. `product_card`, not `product` if conflicting with Shopify reserved patterns — verify in `theme check`).

## Layering

- **Liquid:** Presentation + Shopify objects (`product`, `cart`, `linklists`, `settings`). Minimal logic; prefer `{% liquid %}` for multi-assign when readable.
- **Snippets:** Parameterized via `@param` comments and `render` kwargs (`slide: true`, `carousel_nav: 'products'`).
- **JS:** Thin init layers only — no SPA router; DOM ready + `shopify:section:load`.
- **CSS:** Bootstrap utilities first; FoodMart overrides in `foodmart.css`; Swiper bundle imported in `theme.css`.

## Error handling

- **JS:** No global error boundary; modules assume DOM selectors exist (e.g. Swiper skips if no matching `.swiper.*`).
- **Liquid:** Use `default` filters and `blank` checks for optional settings/images (`foodmart-asset-img.liquid`).
- **Build:** Run `npm run build` before theme push when changing `src/`; `emptyOutDir: false` avoids wiping unrelated `assets/`.

## Dependencies and tooling

| Tool | Version / note | Evidence |
|------|----------------|----------|
| Node | `>=22.0.0` in `package.json` `engines` | May require `NPM_CONFIG_ENGINE_STRICT=false` on older hosts |
| Vite | ^6.2.0 | `vite.config.js` |
| Shopify CLI | ^3.84.0 devDependency | `theme:dev`, `theme:check` scripts |
| Graphify | `graphifyy` CLI | `my-store-theme/graphify-out/` |

**Do not** add Horizon or FoodMart HTML template paths to Vite `input` or Shopify theme assets.

## Comments and documentation style

- Snippet top: `{% comment %}` with `@param` list when `render` accepts arguments.
- JS: Rare comments; prefer self-explanatory function names (`getOptions`, `getNavigation` in `swiper.js`).
- Harness / agent rules: `.cursor/rules/harness-docs.mdc`, `horizon-reference.mdc`.

## Divergences from ideal (legacy debt)

- **`icon.liquid` / `product-card.liquid`:** Graph reports `icon.liquid` as orphaned vs FoodMart stack — prefer `foodmart-icon` / `foodmart-product-item` for new work.
- **Inline `<script>` in `sections/header.liquid`:** Department `<select>` redirect + search offcanvas focus — candidate to move to `src/js` module.
- **Checkout link:** Hard-coded `/checkout` in cart offcanvas — acceptable for Shopify but should stay in sync with `routes` if multi-market.
- **Demo content:** `templates/index.json` uses `demo_image` filenames heavily (graph “god node” `demo_image`) — not merchant-ready without editor replacement.

## Open questions

- Standardize on English-only locales or add `pt-BR`?
- ESLint/Prettier for `src/js` — not present in graph corpus.

## References

- `my-store-theme/package.json`
- `my-store-theme/vite.config.js`
- `my-store-theme/src/js/theme.js`
- `my-store-theme/graphify-out/GRAPH_REPORT.md`
