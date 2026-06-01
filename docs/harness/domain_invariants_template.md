# Domain invariants (from legacy analysis)

**Scope:** `my-store-theme/` storefront behavior and Shopify theme constraints.

**Graph mode:** AST-only. **Evidence:** `graphify-out/GRAPH_REPORT.md`, Liquid/JSON sources cited below.

## Purpose

Rules that must hold for the theme to behave correctly on Shopify and match the FoodMart UX contract.

## Core entities and relationships

| Entity | Source | Notes |
|--------|--------|-------|
| **Section** | `sections/*.liquid` + schema | Composes pages; registered in JSON templates |
| **Block** | Section schema `blocks` | Hero slides, categories, brands, promo tiles, manual products |
| **Snippet** | `snippets/*.liquid` | Shared UI; not directly merchant-configurable |
| **Cart** | Shopify `cart` in Liquid | Item count, line prices, `routes.cart_url` |
| **Menu** | `linklists[settings.main_menu]` | Header nav + optional `department_menu` section setting |
| **Product** | Shopify `product` in sections/snippets | Carousel and trending grids |

**Template composition (home):** `templates/index.json` `order` array lists section instance keys → types like `foodmart-hero-banners`, `foodmart-category-carousel`, `fm-product-carousel` (×2 presets). **Fact:** `sections` / `blocks` bridge multiple communities in the graph.

## Business rules

| Rule | Enforcement |
|------|-------------|
| Section schema `name` ≤ 25 characters | Shopify platform; use shortened names (`FM Product carousel`) |
| FoodMart blocks use `demo_image` / `demo_background` until merchant uploads | Section settings + `foodmart-asset-img.liquid` |
| Header search submits to Shopify search | `action="{{ routes.search_url }}"`, `name="q"` in `sections/header.liquid` |
| Department `<select>` navigates on change | JS `change` → `window.location.href` (header + offcanvas search) |
| Cart offcanvas shows live `cart.items` | `snippets/foodmart-offcanvas-cart.liquid`; empty state CTA to collection |
| Account offcanvas reflects login state | `{% if customer %}` branches in `foodmart-offcanvas-account.liquid` |
| Product compare-at display | `foodmart-product-item.liquid`: show sale when `compare_at_price > price` |
| Swiper carousels | Classes: `.main-swiper`, `.category-carousel`, `.brand-carousel`, `.products-carousel`; nav selectors `*-carousel-prev/next` |
| Trending filters | Isotope layout on DOM from `foodmart-trending-products` (verify section when changing markup) |

## State machines or lifecycles

- **Theme editor:** `shopify:section:load` → re-run `initTheme()` — Swiper must destroy prior instance before re-create (`element.swiper` check in `swiper.js`).
- **Customer session:** Guest vs logged-in only affects account offcanvas links (no custom auth layer in theme).

## Permissions and roles

- **Merchant:** Theme Customizer edits section settings and `config/settings_data.json`.
- **Buyer:** Shopify handles checkout, account, search — theme does not implement custom permissions.

## Edge cases and failures

- Missing `main_menu` / empty linklists → header nav renders empty (no fallback in `foodmart-header-nav.liquid`).
- Wishlist URL unset → offcanvas still opens; CTA may be hidden (`wishlist_url != blank`).
- **Assumption:** Compare-at and money filters follow shop currency — no multi-currency logic in theme JS.
- Block type `product` renamed to `product_card` where required to satisfy Shopify schema (historical fix — confirm in `fm-product-carousel.liquid` schema).

## Horizon / reference boundaries (domain)

| Invariant | Source |
|-----------|--------|
| No Horizon assets in theme bundle | `.cursor/rules/horizon-reference.mdc` |
| Implement only under `my-store-theme/` | Same |
| FoodMart HTML in `my_docs/` is reference only, not in graph corpus | User scope + project layout |

## Open questions

- Official wishlist behavior (app vs page) not modeled in Shopify core.
- Inventory / variant selection on product cards — confirm add-to-cart forms in `foodmart-product-item.liquid` for all templates.
- **Unknown:** GDPR / cookie banner — not found in scoped graph.

## References

- `my-store-theme/templates/index.json`
- `my-store-theme/sections/header.liquid`
- `my-store-theme/snippets/foodmart-product-item.liquid`
- `my-store-theme/src/js/modules/swiper.js`
- `my-store-theme/graphify-out/GRAPH_REPORT.md`
