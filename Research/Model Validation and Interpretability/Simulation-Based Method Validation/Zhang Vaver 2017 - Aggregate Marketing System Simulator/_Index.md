---
title: "Index: Zhang Vaver 2017 - Aggregate Marketing System Simulator"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Simulation-Based Method Validation]]"
date_updated: 2026-10-13
concept_count: 10
---

# Zhang Vaver 2017 - Aggregate Marketing System Simulator

> [!abstract] Routing Summary
> This folder fully captures Zhang & Vaver (2017), *Introduction to the Aggregate Marketing System Simulator* (AMSS). AMSS
> is a hidden-state Markov simulator of aggregate marketing time series, with counterfactual ground truth for ROAS and
> mROAS. The folder has 10 notes: an overview with a complete source map, motivation, the segmentation and migration
> formalism, natural migration and lag, two media modules, the sales event, ground truth, the MMM evaluation study, and
> discussion.
> - Need the big picture or a section → note map? → [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
> - Why simulate, and what is a virtual experiment? → [[AMSS Motivation - Virtual Experiments for Marketing Measurement]]
> - The 198 segments, the event sequence, multinomial migration (Eqs. 1-2)? → [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]
> - Seasonality/market rate, de-satiation, how carryover arises (row-identical matrices, $Q_\alpha$)? → [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]
> - TV/radio: reach, frequency, the Hill effect, GRPs? → [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]
> - Paid search: auction, SOV/CPC, organic vs paid incrementality? → [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]
> - Demand curves, competitor strength and substitutability, satiation after purchase? → [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]]
> - How ground-truth ROAS/mROAS is computed, and which interventions are well defined? → [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]
> - Tables 4-7 and the regression MMM results with and without lag? → [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]
> - Limitations and a protocol for validating an MMM or SHAP pipeline with a simulator? → [[AMSS Discussion, Limitations and Validation Practice]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Event sequence / sequential interaction | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] | definition | — | Each event affects all later ones through the segmentation |
| 198 mindset segments | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] | definition | — | 6 category × 33 brand segments |
| Multinomial migration law | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] | definition | — | Eqs. 1-2: $m\sim\text{Mult}(a,q_{s,\cdot})$, $n'=n-a+\sum m$ |
| Market-rate targeting | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] | definition | Migration law | $E[r_{t,2}]=\rho_t$ with minimal migration |
| No-lag theorem / lag family | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] | theorem | Migration law | No lag iff row-identical; $Q_\alpha^\top n=(1-\alpha)\|n\|x+\alpha n$ |
| Hill effect on frequency | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] | definition | Migration law | $H(f)=1/(1+(f/\kappa)^{-\zeta})$, EC50 $\kappa$ |
| Reach from Poisson exposures | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] | algorithm | — | Miss probability $\approx e^{-v/a}$; reach $=a^*-U$, $U\approx N(\mu_1,\mu_2-\mu_1^2)$ |
| Search auction (CPC, SOV) | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]] | definition | — | $c_t=\eta^{(m)}\vee c^*\wedge\eta^{(M)}$; linear SOV |
| Organic vs paid exposure effect | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]] | definition | Search auction | $e=\psi_w(\cdot)+\psi_u(\cdot)+\psi_v(\cdot)$ |
| Competitor strength/substitutability | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]] | definition | — | $r^{(z)}=\{\gamma-(1-\omega)r^{(y^*)}\}\vee0$ |
| Counterfactual types / total effect | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] | definition | All modules | Set budgets, not search spend or sales |
| Simulated ROAS estimator | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] | theorem | Counterfactuals | Pairwise-ratio average $\to\theta$ by LLN; mROAS = 5% cut |
| Lag-omission bias | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] | result | Lag family, ROAS | TV-ROAS MSE 0.025 → 1.618 (no-lag model) vs 0.002 → 0.067 (lags) |
| Simulator validation protocol | [[AMSS Discussion, Limitations and Validation Practice]] | algorithm | Ground truth | Freeze pipeline, vary one difficulty, score with MC SEs |

## Notes

- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — CONTAINS: research question, contribution, key findings, full Source Map (every §, Tables 1-8, Figs. 1-14, Eqs. 1-14), placement in ADEMP, grouped reference list, worked reading of the headline lag result
- [[AMSS Motivation - Virtual Experiments for Marketing Measurement]] — CONTAINS: Abstract and §1 argument (limits of experiments, unverifiable assumptions), virtual experiment definition (fn. 1), purpose of a simulated ad system
- [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] — CONTAINS: Fig. 1 event architecture, sequential-interaction principle, Table 1 (six dimensions), Fig. 2, Tables 2-3 (198 segments), purchase-state brand-choice drivers, favorability vs loyalty statements, Eqs. 1-2, App. A notation (Table 8), the l=5/6 index inconsistency
- [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] — CONTAINS: market rate and App. B.1 entry/exit matrices (Eq. 10), de-satiation (Eq. 11), natural migration (Eq. 12) and origin restrictions, no-lag theorem (Eq. 13) with proof, $Q_\alpha$ lag family (Eq. 14), marketing-actionable dimensions, lag arithmetic example
- [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] — CONTAINS: Fig. 3, the six-step algorithm (audience, budget, flighting, gamma unit cost, GRPs, Poisson reach/frequency, effect), Eq. 3 Hill, budget notation and Q4 newspaper example, reach = audience minus unreached with variance mu2 - mu1^2, the beta notation clash, extensibility to new modules, effect-scaled matrix, product construction of the maximal matrix, TV parameterisation of §4 and Fig. 9
- [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]] — CONTAINS: Fig. 4, the ten-step algorithm (campaign settings, queries, CPC/SOV, binomial impressions, NegBin click cap, hypergeometric clicks, multinomial allocation), App. C.2 max-CPC = bid and the two ways to cut budget, the weekly vs daily cap inconsistency, the chained query/impression/click occupancy draws, exposure-type effect formula, incrementality via zero budget, §4 search parameterisation, Figs. 10-11
- [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]] — CONTAINS: linear demand curves, Fig. 5, competitor strength $\gamma$ and substitutability $\omega$, Fig. 6, multinomial purchase and Poisson units, revenue, profit (named but undefined), post-purchase satiation and brand update, §4 sales settings, worked competition arithmetic
- [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] — CONTAINS: prediction/attribution/optimization, scenario definition, three counterfactual types, total-effect pathways, ROAS estimator with remarks (ratio of means, total spend), mROAS and base sales, Table 4
- [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] — CONTAINS: ADEMP mapping, full §4.1.1 parameter table (Eqs. 4-5, Figs. 7-9), Figs. 10-13, Tables 4-7, Model 1 (Eq. 6), Model 2 (Eq. 7), lag manipulation, Fig. 14 bias readings, findings, bias-variance example, Table 5 vs 7 caveat
- [[AMSS Discussion, Limitations and Validation Practice]] — CONTAINS: §5 conclusions, table of acknowledged simplifications, critical limitations, simulator-validation protocol, illustrative SHAP-pipeline and Rashomon-check examples

## Sources

- [[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]] — Zhang, S. & Vaver, J. (2017). *Introduction to the Aggregate Marketing System Simulator.* Google technical report, 13 April 2017, 43 pp.

## See Also

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — how to design and report the simulation study that AMSS feeds
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the companion catalogue of MMM challenges to simulate
- [[Bayesian Media Mix Modeling - Overview]] — model-side Hill, adstock and ROAS
- [[Geo-Experiment Methodology - Overview]] — experimental methods AMSS can also evaluate
- [[Dillon et al - SHAP and Causal Insights - Overview]] — predictive attribution vs causal effect
