---
title: "Index: Paid Search Field Experiment (Blake et al 2015)"
tags:
  - type/index
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
parent: "[[../_Index|User-Level Ad Experiments]]"
date_updated: 2026-10-13
concept_count: 9
---

# Paid Search Field Experiment (Blake et al 2015)

> [!abstract] Routing Summary
> Full capture of Blake, Nosko & Tadelis, "Consumer Heterogeneity and Paid Search Effectiveness: A Large Scale Field Experiment" (NBER WP 20171, 2014; Econometrica 83(1), 2015). The folder has 9 notes (plus this index) covering eBay's brand-keyword shutdowns, the 68-of-210-DMA non-brand geo experiment, OLS vs IV elasticities, heterogeneity by user frequency, recency and product category, traffic substitution, the ROI formula and Table 4, the discussion, and a map of the working paper onto the Econometrica version.
> - Need the headline numbers, the section map or a one-paragraph summary? → [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
> - Need *why* pay-per-click spend is endogenous, SEM mechanics, or the informative/persuasive/complementary views of advertising? → [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]]
> - Need the brand-keyword evidence (99.5% retention, Table 1, Germany Table 5)? → [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]]
> - Need the geo design, the assignment algorithm, the DiD/TWFE equations, Table 2 or the candidacy IV/placebo checks (Tables 6-7)? → [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]
> - Need the OLS 0.885 vs IV 0.002 comparison (Table 3) or the levels ROI (Table 8)? → [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]]
> - Need who responds (new and infrequent users, lapsed buyers) or the null over 378 product categories? → [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]
> - Need clicks vs visits, the 42% newly acquired clicks, or the substitution elasticities 0.5 and 0.23? → [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]]
> - Need the ROI formula, its derivation, Table 4, or a calculator? → [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]
> - Need why firms overspend, the brand-bidding Prisoner's Dilemma, Google's AdWords ROI advice (full quote), the literature footnotes, limitations, or an MMM checklist? → [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]
> - Citing the journal version, or need to know which tables and equations were renumbered and which passages exist only in the working paper? → [[Blake 2015 - Working Paper vs Econometrica Version Differences]]
> - Need JEL codes, affiliations or the eBay employment/data-access context? → [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
^index-routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Click-priced spend endogeneity | [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] | definition | Selection problem; OVB | Spend is a function of consumer intent, so spend–sales correlation exists with zero causal effect |
| Brand vs non-brand keywords | [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] | definition | — | Brand ads intercept navigational searches |
| Paid–organic substitution (brand) | [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]] | result | DiD | 99.5% of brand click traffic retained; Germany DiD on sales about 0 |
| Geo assignment algorithm | [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]] | algorithm | Geo experiments | 133 random candidates → 68/65 split stratified on serial correlation → coin flip |
| DiD / TWFE effect of non-brand SEM | [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]] | result | Common trends | $\hat\beta_1=0.00659$ (0.0055) |
| Candidacy IV and placebo | [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]] | robustness | IV | Smaller effects; main estimate is an upper bound; no assignment bias |
| Endogeneity gap | [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] | theorem | IV; OVB | Elasticity 0.885 (OLS) → 0.126 (FE) → 0.002-0.004 (IV) |
| Frequency/recency heterogeneity | [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]] | result | Segment-interacted DiD | Effect only for new and 1-2-purchase users; +0.02 pp per month absent |
| Attribution concentration | [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]] | result | — | Heavy buyers dominate attributed sales but do not respond |
| Product-category null | [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]] | result | Multiple testing | Under 5% of 378 categories significant |
| Clicks vs visits substitution | [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]] | result | IV | 42% of paid clicks new, but visits recovered via organic (0.5) and direct (0.23) |
| ROI from log effect | [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]] | theorem | ROI definition | $\text{ROI}\approx\frac{\beta_1}{1+\beta_1}\frac{R_1}{S_1}-1$; −63% [−124%, −3%] |
| Brand-bidding Prisoner's Dilemma | [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]] | definition | — | Mutual brand bidding is rent paid to the platform |
| Infra-marginal consumers | [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] | definition | — | Click pricing concentrates spend on buyers who would buy anyway |
| Clicks-vs-visits reconciliation | [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]] | result | IV | Recovery ratio $\rho=(0.5O+0.23D)/P$; repeat referring clicks explain 42% "new" clicks |
| Version map (WP vs Econometrica) | [[Blake 2015 - Working Paper vs Econometrica Version Differences]] | reference | — | Estimates identical; Tables 2-8 → Table 1 and A.I-A.VI; AdWords quote dropped |

## Notes

- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] — CONTAINS: bibliographic details (NBER date, JEL codes, affiliations, eBay employment and data-access context), research question, four contributions, key-numbers table, argument flow, full Source Map (every section, equation, table, figure → note), worked "reading the paper as an analyst" example.
- [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] — CONTAINS: market context (IAB, Google, top-10 spenders), Wanamaker quote and infra-marginal consumers, 100M keywords via daily algorithms (fn. 6) and keyword examples, search vs display (fn. 14), the targeting and measurement promise, definitions of classical vs click-priced endogeneity, SEM mechanics (PageRank, bid × quality score, position auctions), brand vs non-brand definitions, Fig. 1 with eBay's paid and organic placements, Bagwell's three views of advertising, results preview, constructed example.
- [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution]] — CONTAINS: MSN/Yahoo! halt, pre-post and cross-platform DiD definitions, Table 1 transcribed with nuisance rows and N values read, 99.5% result (fn. 16-17), Google halt/resume (Fig. 2b), Germany 8/16-state test (Fig. 6, Table 5 transcribed, timing and N reconciled, with the "narrowing reduces magnitude" claim checked against col 2), 16 Feb 2013 brand-ad examples and fn. 4, cost-per-incremental-click example.
- [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]] — CONTAINS: assignment algorithm (6 steps), outcome measurement (zip code, fixed-price only), misclassification, Fig. 3a-b with axis units and approximate levels, eq. (1)-(2), common-trends assumption, DMA size examples, Table 2 transcribed with N decompositions, Search Group vs 30%-larger reconciliation, Experiment Period sign flip and col (4) FE structure, candidacy IV eq. (7)-(8) plus reconstructed intensive-margin equation with Table 6, candidacy DiD and placebo Table 7 with unidentified-coefficient warning, Python simulation sketch.
- [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] — CONTAINS: eq. (3)-(4), Table 3 transcribed, Log Revenue vs ln(Sales) label, IV s.e. drop and col 3 anomaly, OLS-bias proposition with proof sketch, first stage 3.51 (spend about 33×), elasticity-to-DiD conversion check, Table 8 levels ROI −80%, MMM-style example.
- [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]] — CONTAINS: eq. (5), Fig. 4a-b with plotted estimates and CIs tabulated (frequency 0-10, recency 0-360 days), frequency and recency results (spline fn. 26), the authors' informative-advertising interpretation of Fig. 4 quoted, Fig. 5a-b axes, buckets and line values and the attribution-incrementality mismatch, zip demographics, §4.3 framing, 38 and 378 category scans, blended-ROI and multiple-comparisons examples.
- [[Blake 2015 - Non-Brand Traffic Substitution (Clicks vs Visits)]] — CONTAINS: why non-brand substitution is possible (Fig. 1a placements), click changes (−41%, −2%, 42% new), referring click vs visit definitions, visit-substitution IV and elasticities, list of unreported IV details, clicks-vs-visits reconciliation, recovery-ratio formula, comparison with Google's incremental-clicks studies, corrected channel-mix example.
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]] — CONTAINS: ROI definition eq. (9), ROI theorem eq. (6)/(11) with derivation, $\alpha_1\tilde\alpha_1=\beta_1$ conversion, public revenue and spend inputs (fn. 28-29) with the total-vs-Marketplaces wording and 2010-vs-2012 timing mismatch, the appendix's $D_i$ regression and its sign/identification slips, Table 4 transcribed with the row-G formula correction, the conflicting OLS + FE ROI figures (1,400% / 1500% / 1632%) and the col 3 IV interval spanning zero, CI mapping, Python calculator, break-even lift 1.8%.
- [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]] — CONTAINS: generalisation and the small-entrant exception (fn. 30), long-term and CLV argument (fn. 34), brand-bidding Prisoner's Dilemma (fn. 31), Lewis et al. 2011 comparison (fn. 32), attribution, Google AdWords ROI advice quoted in full (fn. 33), content of fn. 10-12 and 14, incentive misalignment, design limitations, related-literature table, published version and later developments, how Gordon et al. 2019 and Lewis & Rao 2015 use the paper, MMM checklist.
- [[Blake 2015 - Working Paper vs Econometrica Version Differences]] — CONTAINS: front-matter comparison, section/table/equation renumbering map (Tables 2-8 → Table 1, A.I-A.VI; eq. (1)-(11) → (1)-(4), (A.1)-(A.7)), content added (DiD 95% CI [−0.42%, 1.74%], frequency slope −0.0038), content dropped (AdWords quote, user-level paragraph, CLV and Lewis et al. footnotes), list of numbers verified as identical, citation guidance.

## Sources
- [[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]] — NBER Working Paper 20171 (May 2014), 35 pp.; the journal version is Econometrica 83(1):155-174 (2015).
- Comparison only (not stored in the vault): the authors' accepted manuscript (12 Aug 2014) and the Econometrica online supplement (DOI 10.3982/ECTA12423). See [[Blake 2015 - Working Paper vs Econometrica Version Differences]].

## See Also
- [[User-Level Ad Experiments - Overview]] — parent cluster
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] — published Lewis & Rao (2013) power critique cited in fn. 12; calls this the largest published ad experiment
- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] — user-level RCT benchmark that contrasts itself with this geo design
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — cites this paper as an ITT search-blackout design
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — design choice
- [[Geo-Experiment Methodology - Overview]] — geo-experiment cluster
- [[Experimental Benchmarks for Observational Ad Measurement]] — RCT vs observational gaps in social ads
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — paid search selection bias in MMM
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — simulator with paid/organic search
