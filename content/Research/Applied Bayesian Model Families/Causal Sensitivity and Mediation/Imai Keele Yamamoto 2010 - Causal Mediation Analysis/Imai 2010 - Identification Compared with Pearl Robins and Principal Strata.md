---
title: "Imai 2010 - Identification Compared with Pearl Robins and Principal Strata"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 3.3, pp. 6-8; Eqs. 6-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]]"
used_by:
  - "[[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]]"
aliases:
  - mediation identification assumptions compared
  - FRCISTG no-interaction trade-off
---

# Imai 2010 - Identification Compared with Pearl Robins and Principal Strata

> [!summary]
> Assumption 1 gives the same ACME expression as Pearl's (2001) conditions, is easier to interpret, and needs no no-interaction assumption, but cannot condition on observed post-treatment confounders. Robins' FRCISTG model can condition on them but then needs $Y_i(1,m)-Y_i(0,m)=B_i$ (no interaction). Petersen et al. weaken (4) at the cost of another assumption; Rubin's principal strata define direct effects only for a latent subpopulation.

## Overview

Section 3.3 compares Theorem 1 with five existing identification routes. The trade-off table below collects them.

## Main Content

| Source | Assumptions | Post-treatment confounders $Z$ | Extra assumption | Remark |
|---|---|---|---|---|
| This paper (Asm. 1) | (4)-(5) | not allowed | none | any mediator type; any treatment regime |
| Pearl (2001, Thm 2) | (6) $p(Y(t,m)|X=x)$ and $p(M(t^*)|X=x)$ identifiable; (7) $Y_i(t,m)\perp M_i(t^*)|X_i=x$ | not allowed | none | Asm. 1 implies (6)-(7); converse only technical; equivalent when $T$ randomised given $X$ and both $\bar\delta(1),\bar\delta(0)$ wanted. (7) is cross-world independence, hard to interpret ("meaningfully substantiated only when cast in structural form") |
| Robins (2003) FRCISTG | (4) plus (8) $Y_i(t,m)\perp M_i(t)|T_i=t,Z_i=z,X_i=x$ | allowed (observed) | (9) $Y_i(1,m)-Y_i(0,m)=B_i$ with $B_i$ independent of $m$ (no interaction) | no-interaction "very restrictive and unrealistic" (Petersen et al.) |
| Petersen, Sinisi & van der Laan (2006) | keep (5); replace (4) with (10) $Y_i(t,m)\perp T_i|X_i$, $M_i(t)\perp T_i|X_i$ | not allowed | $E\{Y_i(1,m)-Y_i(0,m)|M_i(t^*)=m,X_i=x\}=E\{Y_i(1,m)-Y_i(0,m)|X_i=x\}$ | irrelevant in randomised experiments where (4) and (10) coincide |
| Hafeman & VanderWeele (2010) | weaker set for **binary** $M$ | - | - | not shown to generalise to non-binary $M$ |
| Rubin (2004) principal strata | direct effect $E\{Y(1,M(1))-Y(0,M(0))|M(1)=M(0)\}$ | - | - | defined on a latent subpopulation; no obvious mediation effect unless direct effect is zero; proportion with $M(1)=M(0)$ may be ~0 for continuous $M$ |

**Key trade-off.** "Allowing for conditioning on observed post-treatment confounders requires an additional assumption for the identification of the ACME."

**Sobel (2008)** (also Albert 2008; Jo 2008) uses an instrumental-variables approach to mediation in an LSEM but assumes the direct effect is zero for every unit a priori, which is undesirable when the natural direct effect is itself of interest.

## Examples

> [!example] Choosing an identification route for a marketing funnel
> Treatment: a randomised geo-test of Meta spend. Mediator: branded-search clicks. Observed post-treatment confounder: e.g. a Google brand-campaign spend change triggered by the test. Asm. 1 would be violated (the post-treatment confounder is not conditioned on); Robins' route allows conditioning on it but needs no spend-search interaction in the outcome. The analyst must pick which assumption is more defensible, or run the $\rho$ sensitivity analysis of [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] on top.

## Connections

- For principal-strata ideas in Bayesian causal inference see [[Instrumental Variables and Principal Stratification]].
- Graphical treatment of mediators and colliders: [[DAGs and Causal Identification]], [[Summary Causal DAGs]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]], [[Potential Outcomes Framework]]
