---
title: "Imai 2010 - Causal Mediation Analysis - Overview"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/overview
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Whole paper, Stat. Sci. 25(1): 51-71 (arXiv:1011.1079), pp. 1-21 incl. Appendices A-E"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]]"
  - "[[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]]"
aliases:
  - Imai Keele Yamamoto 2010
  - Identification Inference and Sensitivity Analysis for Causal Mediation Effects
---

# Imai 2010 - Causal Mediation Analysis - Overview

> [!summary]
> Imai, Keele & Yamamoto (Statistical Science 2010) prove that under a **sequential ignorability** assumption the average causal mediation effect (ACME) and average natural direct effects are nonparametrically identified, show that the Baron-Kenny product of coefficients $\beta_2\gamma$ is a causal ACME under that assumption plus no treatment-mediator interaction, give nonparametric estimators, and propose a sensitivity analysis indexed by the correlation $\rho$ between the mediator-model and outcome-model errors. Key result: the data contain **no** information about $\rho$ (bounds $(-1,1)$, ACME in $(-\infty,\infty)$), so sensitivity analysis is mandatory.

## Overview

**Research question.** When a treatment $T$ affects an outcome $Y$ partly through a mediator $M$, under what conditions can the indirect (through $M$) and direct (not through $M$) effects be identified, how should they be estimated, and how robust are they to unmeasured mediator-outcome confounding?

**Contributions.**
1. Theorem 1: ACME and natural direct effects identified under sequential ignorability that does *not* condition on post-treatment confounders; compared with Pearl (2001), Robins (2003), Petersen et al. (2006), Hafeman & VanderWeele, Rubin (2004) principal strata.
2. Theorem 2: LSEM (Baron-Kenny) gives $\bar\delta=\beta_2\gamma$ under Assumptions 1-2; relaxing no-interaction gives $\bar\delta(t)=\beta_2(\gamma+t\kappa)$.
3. Nonparametric estimators (Eq. 18-20), asymptotic variance (Theorem 3), simulation (Table 2).
4. Sensitivity analysis via $\rho$ (Theorem 4, Corollary 1) and via coefficients of determination ($R^{2*}_M,R^{2*}_Y$ or $\tilde R^2_M,\tilde R^2_Y$); nonparametric version for binary $M,Y$ (Appendix E).
5. Application: Nelson, Clawson & Oxley (1997) media framing experiment, $n=136$.

## Main Content

### Source Map

| Paper section | Content | Note |
|---|---|---|
| Sec. 1 (pp. 1-2) | motivation, Cochran's eelworm example, contributions | this note |
| Sec. 2 (pp. 2-4), Table 1 | media framing experiment | [[Imai 2010 - Media Framing Application and Simulation]] |
| Sec. 3.1-3.2, Eqs. 1-5, Thm 1 | potential outcomes, ACME, sequential ignorability, identification | [[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]] |
| Sec. 3.3 | comparison with Pearl, Robins, Petersen, Hafeman, Rubin | [[Imai 2010 - Identification Compared with Pearl Robins and Principal Strata]] |
| Sec. 3.4, Eqs. 11-17, Thm 2, Asm. 2 | LSEM, Baron-Kenny, interaction | [[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]] |
| Sec. 4.1-4.2, Eqs. 18-20, Thm 3 | parametric and nonparametric estimation, variance | [[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]] |
| Sec. 4.3, Table 2 | Monte Carlo study | [[Imai 2010 - Media Framing Application and Simulation]] |
| Sec. 5.1, Eq. 24, Thm 4, Cor. 1 | $\rho$ sensitivity | [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] |
| Sec. 5.2 | $R^2$ interpretations | [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] |
| Sec. 5.3, Appendix E, Fig. 3 | nonlinear / nonparametric sensitivity, sharp bounds, $\upsilon$ analysis | [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] |
| Sec. 6, Tables 3, Figs. 1-2 | application and sensitivity results | [[Imai 2010 - Media Framing Application and Simulation]] |
| Sec. 7 | concluding remarks, future work | [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]] (limitations section) |
| Appendix A | proof of Thm 1 | [[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]] |
| Appendix B | proof of Thm 2 | [[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]] |
| Appendix C | $\rho=0$ under Asm. 1 | [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] |
| Appendix D | proof of Thm 4 | [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] |

## Motivating PyMC examples

From https://redam94.github.io/pymc-challenges/examples.html:
- **E35** "Halo effects as Bayesian causal mediation: does Meta work through branded search?" (natural direct/indirect effects; joint mediator + outcome negative-binomial model; counterfactual propagation from posterior draws; product-of-coefficients check; "search as control" vs "search left out").

## Examples

A quick worked case (full details in the linked notes): with $\beta_2=0.8$, $\gamma=0.6$ the ACME under the LSEM is $0.48$. If an unobserved $U$ confounds mediator and outcome, the naive Baron-Kenny estimate can be $0.99$ with $\rho=0$ but Theorem 4 evaluated at the true $\rho=0.473$ returns $0.479$ (see [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]).

## Connections

- Principal strata alternative: [[Instrumental Variables and Principal Stratification]]. 
- Potential outcomes background: [[Potential Outcomes Framework]], [[DAGs and Causal Identification]].
- OVB-style sensitivity for the outcome regression: [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]].
- Hierarchical/Bayesian mediation: [[Hierarchical Models]].

## See Also

[[Sensitivity Analysis in Observational Studies]], [[Omitted Variables Bias]]
