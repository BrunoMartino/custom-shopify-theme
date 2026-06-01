# Graph Report - .  (2026-05-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 303 nodes · 405 edges · 19 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `demo_image` - 42 edges
2. `header` - 23 edges
3. `badge` - 15 edges
4. `sections` - 12 edges
5. `blocks` - 11 edges
6. `filter_group` - 10 edges
7. `blocks` - 9 edges
8. `blocks` - 9 edges
9. `settings` - 7 edges
10. `blocks` - 7 edges

## Surprising Connections (you probably didn't know these)
- `initTheme()` --calls--> `initAlpine()`  [EXTRACTED]
  src/js/theme.js → src/js/modules/alpine.js
- `initTheme()` --calls--> `initAOS()`  [EXTRACTED]
  src/js/theme.js → src/js/modules/aos.js
- `initTheme()` --calls--> `initIsotope()`  [EXTRACTED]
  src/js/theme.js → src/js/modules/isotope.js
- `initTheme()` --calls--> `initSwiper()`  [EXTRACTED]
  src/js/theme.js → src/js/modules/swiper.js
- `initTheme()` --calls--> `initTyped()`  [EXTRACTED]
  src/js/theme.js → src/js/modules/typed.js

## Import Cycles
- None detected.

## Communities (19 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (36): bp1, p1, p10, p2, p3, p4, p5, p6 (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (29): bp4, jp1, jp2, jp3, jp4, jp5, jp6, jp7 (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (28): copyright, account_dashboard, account_login, account_logout, account_register, account_title, all_categories, browse_menu (+20 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (23): cat_1, cat_2, cat_3, cat_4, cat_5, cat_6, settings, type (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (20): dependencies, alpinejs, aos, bootstrap, isotope-layout, swiper, typed.js, devDependencies (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (19): blocks, bp2, bp3, bp5, bp6, bp7, bp8, settings (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (18): type, block_order, settings, type, block_order, settings, type, order (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (18): side_1, side_2, slide_1, slide_2, slide_3, block_order, blocks, type (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (17): settings, type, settings, type, b1, b2, settings, type (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (16): settings, type, settings, type, settings, type, a1, a2 (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (16): brand_1, brand_2, brand_3, brand_4, settings, type, settings, type (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (16): t1, t2, t3, t4, block_order, blocks, type, search_tags (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.26
Nodes (8): initTheme(), initAlpine(), initAOS(), initIsotope(), getNavigation(), getOptions(), initSwiper(), initTyped()

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (7): close, skip_to_content, general, accessibility, meta, page, tags

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (6): current, color_body_bg, color_primary, color_secondary, logo_max_width, main_menu

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (6): type, name, order, sections, footer, type

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (6): type, name, order, sections, header, type

## Knowledge Gaps
- **129 isolated node(s):** `color_primary`, `color_secondary`, `color_body_bg`, `logo_max_width`, `main_menu` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `demo_image` connect `Community 0` to `Community 1`, `Community 3`, `Community 5`, `Community 7`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.212) - this node is a cross-community bridge._
- **Why does `sections` connect `Community 6` to `Community 3`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `title` connect `Community 3` to `Community 8`, `Community 9`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `color_primary`, `color_secondary`, `color_body_bg` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08412698412698413 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._