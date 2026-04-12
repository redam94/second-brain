---
title: "Price and Distribution Effects"
aliases:
  - "Price Elasticity Generalizations"
  - "Distribution Response Marketing"
tags:
  - type/concept
  - topic/market-response
  - topic/price
  - topic/distribution
  - topic/empirical-findings
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 8"
chapter: "8"
status: complete
doc_type: concept
source_location: "Ch. 8, pp. 328-355"
depends_on:
  - "[[Marketing Generalizations Overview]]"
  - "[[Market Share Models]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
  - "[[Multivariate Persistence and Cointegration]]"
used_by:
  - "[[Optimal Marketing Decisions and Forecasting]]"
---

# Price and Distribution Effects

> [!abstract] Summary
> Empirical generalizations on price own-elasticities, cross-price elasticities, asymmetric price effects, and distribution effects. Key findings: own-price elasticity ≈ −2.5; cross-price elasticity ≈ 0.5; cross-effects are asymmetric; brands closer in price have larger cross-effects; distribution elasticity exceeds advertising elasticity.

## Own-Price Elasticity

> [!theorem] Price Elasticity Generalization
> *The elasticity of price on own brand sales is negative and elastic.*
>
> Meta-analytic mean: approximately **−2.5**
> - Tellis (1988) meta-analysis: −2.5 (correcting for method biases)
> - Bolton (1989): −2.5 (frozen waffles −1.74, liquid bleach −2.41, bathroom tissue −3.12, ketchup −2.55)
> - Ehrenberg & England (1990): −2.6 (weighted mean across cereal, confectionery, soup, tea, biscuits)
> - Hamilton, East & Kalafatis (1997) UK 100 markets: −2.5
>
> Brand-specific variation (tuna fish in Chicago, Table 8-4): Star Kist −3.30, Chicken of the Sea −3.62, Bumble Bee −4.19. Within-brand geographic variation (Star Kist, Table 8-5): Boston −2.53, Chicago −3.30, Houston −1.51, Los Angeles −3.19.
>
> **Key contrast with advertising**: $|\eta_{\text{price}}| \gg |\eta_{\text{advertising}}|$, approximately 25:1. This has led to debates about whether price cutting is more cost-effective than advertising (Broadbent 1989; Tellis 1989).
> ^thm-price-elasticity

> [!theorem] Upside vs. Downside Price Asymmetry
> *A brand's upside and downside own-price elasticity can differ.*
>
> Consumers notice price cuts more readily than price increases when they are not well-informed about the prevailing price. This asymmetry implies the brand may face a kinked demand curve (Sweezy model — see [[Reaction Functions and Competitive Dynamics]]).
> ^thm-price-asymmetry

## Cross-Price Elasticity

> [!theorem] Cross-Price Elasticity
> *The cross-elasticity of price on rival brand sales is nonnegative.*
>
> Mean cross-price elasticity: approximately **0.52** (Sethuraman, Srinivasan & Kim 1999, 1,060 elasticities across 280 brands, 19 grocery categories).
>
> ~70% between 0 and 1; ~15% between 1 and 2. Mean cross-elasticity for liquid dishwasher detergent: 0.6 (Kopalle, Mela & Marsh 1999).
> ^thm-cross-price

> [!theorem] Cross-Price Asymmetry
> *Price cross-effects are asymmetric.*
>
> A national brand's price promotion draws heavily from store brands, but store brand price promotions have much weaker effects on national brand sales (Kadiyali, Chintagunta & Vilcassim 2000, Table 8-6: refrigerated juice in Chicago).
>
> This phenomenon is captured by competitive clout and vulnerability measures (Cooper 1988):
>
> $$
> \text{competitive clout}_i = \sum_{j \neq i} \eta_{ji}^2 \tag{Eq 8.14}
> $$
>
> $$
> \text{vulnerability}_i = \sum_{j \neq i} \eta_{ij}^2 \tag{Eq 8.15}
> $$
>
> where $\eta_{ji}$ = cross-price elasticity of brand $j$ with respect to brand $i$'s price.
> ^thm-cross-asymmetry

> [!theorem] Neighborhood Price Effects [SSK]
> *Brands that are closer to each other in price have larger cross-price effects than brands that are priced further apart.*
>
> *A brand is affected the most by discounts of its closest higher-priced brand, followed closely by discounts of its closest lower-priced brand.* [SSK]
>
> The category-adjusted cross-effects response sensitivity (Eq 8.16):
> $$
> \gamma_{ij} = \frac{\partial MS_i}{\partial P_j} \times (0.01 P_C) = \eta_{MS,ij} \times \frac{MS_i}{P_j} \times (0.01 P_C)
> $$
>
> where $P_C$ is the category-weighted average price. Using this measure eliminates the "scaling bias" that makes national brand cross-effects appear larger.
> ^thm-neighborhood

## Life Cycle and Price Elasticity

> [!theorem] Life Cycle Price Dynamics
> *Brand-level and category-level price elasticities first decrease in absolute value then ultimately increase in absolute value as the product life cycle enters the decline phase.*
>
> Two patterns (Parker 1992, 17 durable categories):
> 1. For necessities or categories with penetration >90%: elasticity constant or declining across life cycle
> 2. For non-necessities facing decline or non-necessities with stable penetration: elasticity increasing in absolute value
> ^thm-lifecycle-price

## Distribution Effects

Distribution is consistently found to be a **strong driver of long-run market performance**:

> [!example] Distribution and Market Share
> From the long-run time series literature (Bronnenberg et al. 2000, 5-year weekly panel):
>
> *Distribution coverage drives long-run market shares, especially the coverage evolution early in the life cycle.*
>
> Distribution elasticity typically exceeds advertising elasticity for new products — gaining distribution in new stores provides incremental reach that advertising alone cannot achieve.
>
> In the VAR framework, distribution gains have non-zero multivariate persistence (they are "sticky" — brands hold distribution once gained), while promotional gains have near-zero persistence.
> ^ex-distribution

## Price Competition Structure (Russell-Kamakura LSES Model)

The **Latent Symmetric Elasticity Structure (LSES)** model decomposes cross-price elasticity as:

$$\eta_{ij} = \text{clout}_j \times \text{substitution index}_{ij}$$

Powdered detergents example (Table 8-7, Russell & Kamakura 1994):
- Tide: highest momentum (0.294), highest vulnerability
- Private label: lowest momentum (0.029), extreme vulnerability
- Cross-elasticities: Tide vs. Surf (0.396), Tide vs. Oxydol (0.13), reflecting price-tier proximity

## Cross-Links

- Advertising effects: [[Advertising and Promotion Effects]]
- Market share model foundations: [[Market Share Models]]
- Reaction functions and competitive structure: [[Reaction Functions and Competitive Dynamics]]
- Long-run distribution effects in VAR: [[Multivariate Persistence and Cointegration]]
- Optimal pricing decisions: [[Optimal Marketing Decisions and Forecasting]]
