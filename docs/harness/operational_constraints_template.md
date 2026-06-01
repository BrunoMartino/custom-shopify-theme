# Operational constraints (from legacy analysis)

**Scope:** Developing, building, and deploying `my-store-theme/` only.

**Graph mode:** AST-only (`graphify update` + `cluster-only --no-label`). **Evidence:** `my-store-theme/graphify-out/GRAPH_REPORT.md` (2026-05-31).

## Purpose

Operational limits and workflows for agents and developers working on the Shopify theme.

## Environments and configuration

| Item | Constraint |
|------|------------|
| **Theme path** | Run Shopify CLI with `--path my-store-theme` (or `cd my-store-theme` for `npm run theme:dev`) |
| **Node** | `engines.node >= 22.0.0` in `package.json` — local CI may need `NPM_CONFIG_ENGINE_STRICT=false` on Node 20 |
| **Secrets** | Do **not** commit or edit `.env`; document vars only in `.env.example` at repo root (project rule) |
| **Theme settings** | `config/settings_data.json` is environment-specific; merchant overrides via admin |
| **Graphify API keys** | Optional; without `GEMINI_API_KEY` / etc., use AST-only graph (current state) |

## External services and quotas

- **Shopify Admin / Storefront:** Theme upload, `theme dev` preview, live cart/checkout — standard platform limits apply.
- **Google Fonts:** Loaded from CDN in `layout/theme.liquid` (network dependency).
- **No custom backend** in theme scope — no API keys in theme JS.

## Jobs, queues, schedules

- **Build:** Manual / CI — `npm run build` (Vite production bundle).
- **Watch:** `npm run dev` → `vite build --watch` for asset development.
- **Graph refresh:** `cd my-store-theme && graphify update . --no-cluster` then `graphify cluster-only . --no-label --no-viz`.

## Storage and data retention

- **Generated:** `assets/theme.js`, `assets/theme.css` — commit or regenerate before deploy (team policy **unknown**).
- **Graph artifacts:** `my-store-theme/graphify-out/` — local analysis; add to `.gitignore` if repo should stay clean (**assumption:** not deployed to Shopify).
- **Cache:** `graphify-out/cache/` — safe to delete for full regen.

## Deployment and runtime assumptions

1. Edit source in `src/`, `sections/`, `snippets/`, `templates/`.
2. `npm run build` updates compiled assets.
3. `shopify theme push` or `theme dev` from theme directory.
4. Shopify serves Liquid + static `assets/`; JS runs deferred (`defer` on `theme.js`).

**Not deployed:** `horizon-read-only/`, `my_docs/`, `src/` (source only), `node_modules/`, `graphify-out/`.

## Observability

- **Theme Check:** `npm run theme:check` (Shopify CLI).
- **No** structured logging in theme JS.
- Browser DevTools for Swiper/Isotope/Alpine issues.

## Security and compliance notes (factual only)

- Checkout and payment handled by Shopify hosted checkout (link from cart offcanvas).
- Customer PII not stored in theme files; account links use `routes.account_*`.
- **Verify** third-party script exposure via `content_for_header` (Shopify-injected apps) separately from theme code.

## Graphify corpus (this repo)

| Path | Role |
|------|------|
| `my-store-theme/.graphifyignore` | Excludes `node_modules/`, built bundles, `graphify-out/` |
| `my-store-theme/graphify-out/graph.json` | 303 nodes / 405 edges (post-ignore run) |
| `my-store-theme/graphify-out/GRAPH_REPORT.md` | Human navigation hub |

**Excluded by user directive:** `horizon-read-only/`, `my_docs/frontend-template/` — do not run `graphify` on those paths for this project.

## Open questions

- Monorepo `npm run theme:dev` from root vs theme-only scripts — confirm root `package.json` if present.
- Whether compiled `assets/theme.*` are git-tracked or CI-built on deploy.

## References

- `my-store-theme/package.json`
- `my-store-theme/.graphifyignore`
- `my-store-theme/graphify-out/GRAPH_REPORT.md`
- `.cursor/rules/dont-write-env.mdc`
- `.cursor/rules/horizon-reference.mdc`
