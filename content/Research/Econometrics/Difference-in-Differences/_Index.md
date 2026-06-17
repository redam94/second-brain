---
title: "Index: Difference-in-Differences"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-06-17
concept_count: 6
---

# Difference-in-Differences

> [!abstract] Routing Summary
> This folder covers staggered/multi-period Difference-in-Differences, centered on Callaway & Sant'Anna (2020). Six interconnected notes on the group-time ATT framework, its assumptions, doubly-robust estimands, aggregation schemes, and simultaneous inference.
> - Need the big picture, the three-step framework, or the TWFE critique? -> [[Difference-in-Differences with Multiple Time Periods - Overview]]
> - Need the disaggregated building block $ATT(g,t)$ and notation? -> [[Group-Time Average Treatment Effects]]
> - Need parallel trends, no-anticipation, or overlap conditions? -> [[Identifying Assumptions for Staggered DiD]]
> - Need the OR / IPW / doubly-robust identification (Theorem 1) and estimators? -> [[Doubly-Robust Estimands for ATT(g,t)]]
> - Need event-study / group / calendar / overall ATT aggregation? -> [[Aggregating Group-Time Effects]]
> - Need asymptotics, the multiplier bootstrap, uniform bands, or the minimum-wage results? -> [[Simultaneous Inference via Multiplier Bootstrap]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| Three-step framework & TWFE critique | [[Difference-in-Differences with Multiple Time Periods - Overview]] | overview | The Experimental Ideal; Difference in differences | Separate identify→aggregate→infer bypasses TWFE negative weights |
| Group-time ATT building block | [[Group-Time Average Treatment Effects]] | concept | Overview; Estimands in Longitudinal Research | $ATT(g,t)=\mathbb{E}[Y_t(g)-Y_t(0)\mid G_g=1]$, no heterogeneity restriction |
| Identifying assumptions | [[Identifying Assumptions for Staggered DiD]] | definition | Group-Time ATT; DAGs | Limited anticipation (A3) + conditional parallel trends (A4/A5) + overlap (A6) |
| OR / IPW / DR identification | [[Doubly-Robust Estimands for ATT(g,t)]] | theorem | Identifying Assumptions; Group-Time ATT | **Theorem 1**: three equivalent estimands; reference period $g-\delta-1$ |
| Aggregation schemes | [[Aggregating Group-Time Effects]] | concept | Group-Time ATT; DR Estimands | $\theta=\sum w(g,t)ATT(g,t)$: event-study, group, calendar, overall |
| Asymptotics & multiplier bootstrap | [[Simultaneous Inference via Multiplier Bootstrap]] | theorem | DR Estimands; Aggregation | **Thm 2–3, Cor 1**: uniform bands; min-wage application |

## Notes

- [[Difference-in-Differences with Multiple Time Periods - Overview]] — CONTAINS: staggered-adoption problem, the static/dynamic TWFE critique (Goodman-Bacon, Sun-Abraham, de Chaisemartin-D'Haultfœuille), the identify→aggregate→infer framework, R `did` package, minimum-wage headline result.
- [[Group-Time Average Treatment Effects]] — CONTAINS: full setup/notation (group $G$, never-treated $C$, $\bar g$, generalized propensity score $p_g(X)$), Assumptions 1–2 (irreversibility, random sampling), potential-outcomes Eq. (2.1), definition of $ATT(g,t)$, why it avoids TWFE bias.
- [[Identifying Assumptions for Staggered DiD]] — CONTAINS: Assumption 3 (limited anticipation, horizon $\delta$), Assumption 4 (conditional parallel trends, never-treated), Assumption 5 (conditional parallel trends, not-yet-treated), Assumption 6 (overlap), conditional-vs-unconditional discussion, Roth (2020) no-pre-testing warning.
- [[Doubly-Robust Estimands for ATT(g,t)]] — CONTAINS: OR (2.3), IPW (2.2), DR (2.4) estimands + not-yet-treated analogues (2.5–2.7), **Theorem 1** (nonparametric identification, both comparison groups), unconditional collapse (2.8–2.9), Remarks 3–4 TWFE-is-not-ATT(g,t), Hájek DR plug-in estimators (4.1–4.2).
- [[Aggregating Group-Time Effects]] — CONTAINS: general weighting (3.1), event-study $\theta_{es}(e)$ (3.4) + composition decomposition (3.5) + balanced $\theta_{es}^{bal}$ (3.6), group-specific $\theta_{sel}(\tilde g)$ (3.7), calendar-time $\theta_c$/$\theta_c^{cumu}$ (3.8–3.9), overall $\theta_W^O$ (3.10) and recommended $\theta_{sel}^O$ (3.11), Table 1 weights, equality-only-under-homogeneity result.
- [[Simultaneous Inference via Multiplier Bootstrap]] — CONTAINS: **Theorem 2** (DR influence function, joint normality, Assumptions 7–8), **Theorem 3** + Mammen weights + bootstrap draw (4.6), **Algorithm 1** (studentized simultaneous band), **Corollary 1** (uniform coverage), Corollary 2 (summary-parameter inference), Remark 12 (pre-treatment placebos), and the full minimum-wage empirical findings (Tables 2–3, Fig. 1).

## Sources

- [[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]] — Callaway & Sant'Anna (2020), "Difference-in-Differences with Multiple Time Periods," *Journal of Econometrics*. JEL C14, C21, C23, J23, J38. 45 pp. Open-source R package `did` (CRAN). Supplementary Appendix at pedrohcgs.github.io.

## See Also

- [[../Identification Strategies/_Index|Identification Strategies]] — IV, RD, synthetic control, and the canonical DiD
- [[Synthetic Control]] — alternative for staggered policy adoption
- [[Difference in differences]] — PyMC Bayesian DiD tutorial (2x2 baseline)
- [[Mostly Harmless Econometrics]] — DiD chapter (Angrist & Pischke)
- [[The Experimental Ideal]] — randomization benchmark
- [[Estimands in Longitudinal Research]] — choosing potential-outcome targets
