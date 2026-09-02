---
title: "Advertising and Promotion Effects"
aliases:
  - "Advertising Elasticity Generalizations"
  - "Promotion Effects Marketing"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/advertising
  - topic/empirical-findings
  - source/hanssens-parsons-schultz-2001
date_ingested: 2026-04-11
date_updated: 2026-04-11
folder: "Market Response Models/Empirical Findings and Applications"
source: "Hanssens, Parsons & Schultz (2001) Ch. 8"
chapter: "8"
status: complete
doc_type: concept
source_location: "Ch. 8, pp. 328-355"
depends_on:
  - "[[Marketing Generalizations Overview]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Functional Forms in Marketing]]"
used_by:
  - "[[Optimal Marketing Decisions and Forecasting]]"
---

# Advertising and Promotion Effects

> [!abstract] Summary
> Empirical generalizations on advertising, consumer promotions (coupons), and trade promotions from brand-level market response studies. Key findings: short-run advertising elasticity ≈ 0.10; advertising effects approximately double in the long run; 90% of effect dissipates within 6–9 months; price elasticity > advertising elasticity; retail promotions strongly increase short-run sales; coupon elasticity is very low (0.07).

## Advertising Elasticity

> [!theorem] Core Advertising Generalizations
>
> **Generalization [LS]** (Leone & Schultz 1980):
> *The short-term elasticity of selective advertising on own brand sales of frequently purchased consumer goods is positive but low.*
>
> Meta-analytic support: average short-run elasticity = **0.10–0.22** (Assmus, Farley & Lehmann 1984: 0.22; Sethuraman & Tellis 1991: 0.10; Lodish et al. 1995: 0.13).
>
> Recommended null hypothesis for future models: **0.10** (conservative; BehaviorScan experiments suggest this is realistic for established brands).
> ^thm-ad-elasticity

> [!theorem] Long-Run Effect
> *The average long-term effect of successful advertising spending is approximately double its initial effect.*
>
> Support: the long-run multiplier = $1/(1-\lambda)$. With $\lambda = 0.5$, LRM = 2×. Aggregation-adjusted $\lambda = 0.7$, LRM = 3.3×.
> ^thm-lr-ad

> [!theorem] Duration Interval
> *The 90% duration interval for advertising of mature, frequently purchased, low-priced packaged goods is brief, averaging between six and nine months.* [C]
>
> Derivation: 90% of cumulative effect dissipates when:
> $$T \geq \frac{\log(1 - 0.9)}{\log(\lambda)} = \frac{-1}{\log(0.7)} = 6.5 \text{ months} \tag{Eq 8.13}$$
>
> This is a short duration — contradicting common managerial beliefs that advertising effects persist for years. The finding implies advertising must be maintained continuously to sustain sales levels.
> ^thm-duration

## Factors Moderating Advertising Elasticity

> [!example] Life Cycle Moderation
> *Advertising elasticities decline as a brand or market matures.* [MBI]
>
> Evidence (Shankar, Carpenter & Krishnamurthi 1999):
> - Pioneer ethical drug brands: elasticity = **0.625**
> - Growth-stage entrants: **0.496**
> - Mature-stage entrants: **0.274**
>
> Lodish et al. (1995): new products: 0.26; established products: 0.05.
>
> Implication: early-stage brands should invest heavily; diminishing returns set in as brand becomes established.
> ^ex-lifecycle-moderation

Other moderators identified by Millward Brown International:
1. Category development stage
2. Brand development level
3. Competitive context
4. Strategy effectiveness
5. Execution effectiveness

## Advertising and Price Sensitivity

Three generalizations on the advertising-price interaction [KW]:

1. *An increase in **price advertising** leads to higher price sensitivity among consumers.*
2. *An increase in **feature advertising** leads to higher price sensitivity among consumers.*
3. *An increase in **non-price advertising** leads to lower price sensitivity among consumers.*

Managerial implication: price advertising and non-price advertising have opposing effects on price elasticity. Coordinating advertising and pricing decisions requires understanding which type of advertising dominates. Heavy non-price advertising can create price inelasticity and insulate a brand from price competition.

## Consumer Promotions

> [!theorem] Coupon Elasticity
> *Elasticity of coupon spending on own brand sales is positive but very low.* [BG]
>
> Average elasticity ≈ **0.07** (Bucklin & Gupta 1999, Hudson River Group ACNielsen analyses for Quaker Oats).
>
> Corollary: *Coupon response < media response.* Coupons mainly attract the brand's own heaviest users — who would have purchased anyway.
>
> Implication: major packaged goods firms (P&G, Nestlé USA) have reduced coupon spending and shifted to targeted couponing at new product launches.
> ^thm-coupon

## Retailer Sales Promotions

> [!theorem] Temporary Price Reductions (TPR)
> *Temporary price reductions (TPRs) substantially increase sales.* [BBF]
>
> Deal discount elasticities greatly exceed regular price elasticities (Table 8-8):
> - Tuna fish average: regular price elasticity −3.08 to −4.99; deal elasticity +8.1 to +10.3
> - Margarine: regular −2.34 to −3.88; deal +4.84 to +8.65
>
> *Promotional price elasticities exceed non-promotional price elasticities.* [BBF]
> ^thm-tpr

> [!theorem] Trade Promotion Pass-Through
> *Retailers pass-through is generally less than 100% of trade deals.* [BBF]
>
> Retailers pocket some of the manufacturer-funded trade deal rather than passing it to consumers as price reductions. This partially explains why incremental sales from trade deals are often lower than expected.
> ^thm-passthrough

> [!theorem] Display and Feature Multipliers
> *Display and feature advertising have strong effects on sale items.* [BBF]
>
> Mean display multiplier for liquid dishwasher detergent: **1.69** (Crystal White Octagon: 1.5; Dove: 2.6; Ivory: 1.4; Palmolive: 1.5; Sunlight: 1.8).
>
> Promotion elasticity categories (Narasimhan, Neslin & Sen 1996): higher in paper products, canned foods, pasta; lower in health & beauty aids and miscellaneous products.
> ^thm-display

## BehaviorScan Advertising Weight Tests (Frito-Lay)

A large-scale set of 23 split-panel experiments over four years found:
- ~60% of TV commercials demonstrated sizable volume increases among advertised households
- Average gain: **15%** among advertised households vs. matched no-advertising control
- Larger brands had lower probability of sizable gain (27% vs. 88% for smaller brands)
- "News" commercials (new products/line extensions) showed significant gains 100% of the time

## Cross-Links

- Core generalizations framework: [[Marketing Generalizations Overview]]
- Carryover parameter ($\lambda$): [[Carryover Effects and Distributed Lags]]
- Price findings: [[Price and Distribution Effects]]
- Optimal advertising budget: [[Optimal Marketing Decisions and Forecasting]]
- Activity bias in advertising measurement: [[Activity Bias in Advertising]]
- Why RCTs (BehaviorScan, holdout experiments) are essential for measuring elasticities: [[Observational vs Experimental Methods in Advertising]]
- Experimental design principles behind BehaviorScan weight tests: [[The Experimental Ideal]]
- Bayesian MMM using these elasticities as prior knowledge and calibration targets: [[Bayesian Media Mix Modeling - Overview]]
- Saturation effects that bound the advertising response: [[Shape (Saturation) Effects]]
- ROAS and mROAS derived from these elasticity estimates: [[ROAS, mROAS, and Optimal Media Mix]]
