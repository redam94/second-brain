---
title: Doubly-Robust Estimands for ATT(g,t)
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 2.4, pp. 10-13; Sec. 4, pp. 19-20; App. A, pp. 33-37"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Identifying Assumptions for Staggered DiD]]"
  - "[[Group-Time Average Treatment Effects]]"
used_by:
  - "[[Aggregating Group-Time Effects]]"
  - "[[Simultaneous Inference via Multiplier Bootstrap]]"
aliases:
  - DR estimand DiD
  - outcome regression DiD
  - IPW DiD
  - Theorem 1 Callaway Sant'Anna
---

# Doubly-Robust Estimands for ATT(g,t)

> [!summary]
> Theorem 1 shows the group-time ATT is nonparametrically point-identified three observationally-equivalent ways — **outcome regression (OR)**, **inverse probability weighting (IPW)**, and **doubly-robust (DR)** — extending Heckman et al. (1997/98), Abadie (2005), and Sant'Anna & Zhao (2020) to multiple groups and periods. The reference period is $g-\delta-1$ (the last period before anticipation could matter); the comparison group is the never-treated under Assumption 4 or the not-yet-treated under Assumption 5. The DR form is preferred in practice because it stays consistent if **either** the propensity-score model **or** the outcome-regression model is correct, not necessarily both.

## Overview

CS's identification results are **constructive**: each estimand is a population expectation that becomes a plug-in estimator by replacing nuisance functions (propensity score $p_g$, outcome regression $m_{g,t,\delta}$) with parametric fits and the expectation with a sample average. The three approaches differ in *which* part of the data-generating process they model: OR models the comparison group's outcome evolution; IPW models the probability of group membership; DR models both but needs only one correct (Robins-style double robustness).

## Main Content

Define the population outcome regressions for the comparison groups:
$$
m_{g,t,\delta}^{nev}(X) = \mathbb{E}[Y_t - Y_{g-\delta-1}\mid X, C=1], \qquad m_{g,t,\delta}^{ny}(X) = \mathbb{E}[Y_t - Y_{g-\delta-1}\mid X, D_{t+\delta}=0, G_g=0].
$$

> [!definition] The three estimands (never-treated comparison)
> Let the change be the "long difference" $Y_t - Y_{g-\delta-1}$. Then:
> $$
> ATT_{or}^{nev}(g,t;\delta) = \mathbb{E}\!\left[\frac{G_g}{\mathbb{E}[G_g]}\big(Y_t - Y_{g-\delta-1} - m_{g,t,\delta}^{nev}(X)\big)\right] \tag{2.3}
> $$
> $$
> ATT_{ipw}^{nev}(g,t;\delta) = \mathbb{E}\!\left[\left(\frac{G_g}{\mathbb{E}[G_g]} - \frac{\frac{p_g(X)C}{1-p_g(X)}}{\mathbb{E}\!\left[\frac{p_g(X)C}{1-p_g(X)}\right]}\right)(Y_t - Y_{g-\delta-1})\right] \tag{2.2}
> $$
> $$
> ATT_{dr}^{nev}(g,t;\delta) = \mathbb{E}\!\left[\left(\frac{G_g}{\mathbb{E}[G_g]} - \frac{\frac{p_g(X)C}{1-p_g(X)}}{\mathbb{E}\!\left[\frac{p_g(X)C}{1-p_g(X)}\right]}\right)\big(Y_t - Y_{g-\delta-1} - m_{g,t,\delta}^{nev}(X)\big)\right] \tag{2.4}
> $$
> The not-yet-treated analogues (2.5)–(2.7) replace $\frac{p_g(X)C}{1-p_g(X)}$ with $\frac{p_{g,t+\delta}(X)(1-D_{t+\delta})(1-G_g)}{1-p_{g,t+\delta}(X)}$ and use $m_{g,t,\delta}^{ny}$.
> ^estimands

> [!theorem] Theorem 1 — Nonparametric identification of $ATT(g,t)$
> Let Assumptions 1, 2, 3, 6 hold.
> **(i)** If Assumption 4 (never-treated) holds, then for all $g \in \mathcal{G}_\delta$, $t \in \{2,\dots,\mathcal{T}-\delta\}$ with $t \ge g-\delta$,
> $$
> ATT(g,t) = ATT_{ipw}^{nev}(g,t;\delta) = ATT_{or}^{nev}(g,t;\delta) = ATT_{dr}^{nev}(g,t;\delta).
> $$
> **(ii)** If Assumption 5 (not-yet-treated) holds, then for all $g \in \mathcal{G}_\delta$, $t\in\{2,\dots,\mathcal{T}-\delta\}$ with $g-\delta \le t < \bar g -\delta$,
> $$
> ATT(g,t) = ATT_{ipw}^{ny}(g,t;\delta) = ATT_{or}^{ny}(g,t;\delta) = ATT_{dr}^{ny}(g,t;\delta).
> $$
> Here $\mathcal{G}_\delta = \mathcal{G}\cap\{2+\delta, 3+\delta,\dots,\mathcal{T}\}$ (drops early-treated groups when anticipation is allowed). The three estimands are identical *as identification targets*, but generally **differ** as estimators once nuisance functions are fitted (Remark 5).
> ^theorem-1

**Key structural insights from Theorem 1 (proved in Appendix A via Lemmas A.1–A.2):**
- **Reference period $g-\delta-1$.** This is the most recent period before anticipation could matter; the more anticipation allowed (larger $\delta$), the further back the reference goes.
- **Comparison-group choice = parallel-trends choice.** Assumption 4 → never-treated as a fixed comparison; Assumption 5 → not-yet-treated-by-$t+\delta$. Under Assumption 5 with everyone eventually treated ($\bar g < \infty$), one can only identify $ATT(g,t)$ for $t < \bar g - \delta$ (the last cohort's effect is unidentified).
- **The DR proof.** The DR estimand equals $ATT_{ipw}$ minus a term that vanishes by the law of iterated expectations whenever the weights are correctly normalized; symmetrically it equals $ATT_{or}$ minus a vanishing term — hence consistent if **either** model is right.

> [!definition] Unconditional collapse (no role for covariates)
> When Assumptions 3–5 hold unconditionally on $X$, (2.2)–(2.4) collapse to the intuitive 2x2-style contrast
> $$
> ATT_{unc}^{nev}(g,t;\delta) = \mathbb{E}[Y_t - Y_{g-\delta-1}\mid G_g=1] - \mathbb{E}[Y_t - Y_{g-\delta-1}\mid C=1], \tag{2.8}
> $$
> and (2.5)–(2.7) collapse to $ATT_{unc}^{ny}(g,t;\delta) = \mathbb{E}[Y_t-Y_{g-\delta-1}\mid G_g=1] - \mathbb{E}[Y_t-Y_{g-\delta-1}\mid D_{t+\delta}=0]$. (2.9)
> ^unconditional

> [!warning] A TWFE regression is NOT $ATT(g,t)$ with covariates
> Remarks 3–4: subsetting to periods $\{g-1, t\}$ and groups $\{G_g=1 \text{ or } C=1\}$ and running $Y = \alpha_1 + \alpha_2 G_g + \alpha_3 \mathbf{1}\{T=t\} + \beta(G_g\times\mathbf{1}\{T=t\}) + \epsilon$ gives $\beta = ATT(g,t)$ in the **unconditional** case. But adding covariates linearly ($+\tilde\gamma X$) does **not** recover $ATT(g,t)$ unless one assumes homogeneous-in-$X$ effects AND rules out covariate-specific trends (Słoczyński 2018). The estimands above need neither restriction.
> ^twfe-warning

> [!definition] Doubly-robust plug-in estimators (Sec. 4)
> The feasible DR estimators are Hájek-type (weights sum to one, improving finite-sample behavior):
> $$
> \widehat{ATT}_{dr}^{nev}(g,t;\delta) = \mathbb{E}_n\!\left[(\hat w_g^{treat} - \hat w_g^{comp,nev})\big(Y_t - Y_{g-\delta-1} - \hat m_{g,t,\delta}^{nev}(X;\hat\beta_{g,t,\delta}^{nev})\big)\right] \tag{4.1}
> $$
> with $\hat w_g^{treat} = \frac{G_g}{\mathbb{E}_n[G_g]}$ and $\hat w_g^{comp,nev} = \frac{\hat p_g(X;\hat\pi_g)C / (1-\hat p_g(X;\hat\pi_g))}{\mathbb{E}_n[\hat p_g(X;\hat\pi_g)C/(1-\hat p_g(X;\hat\pi_g))]}$, where $\hat p_g$ is a fitted (e.g. logit) propensity score and $\hat m_{g,t,\delta}^{nev}$ a fitted (e.g. OLS) outcome regression. Estimation is two-step: (1) fit nuisances per $(g,t)$; (2) plug into the sample analogue. The not-yet-treated version (4.2) is symmetric.
> ^dr-estimators

## Examples

> [!example] Minimum wage: which estimand for which assumption
> Under **unconditional** parallel trends (Panel a) covariates play no role, so the simple contrast (2.8) is used. Under **conditional** parallel trends (Panel b) the **DR** estimator (4.1) is used: a logit generalized propensity score per characteristic (with quadratic terms for population and median income) and an OLS outcome regression with the same covariates. The whole exercise (all $g,t$ plus 1000 bootstrap iterations) runs in ~3.0 seconds on a laptop.
> ^min-wage-dr

## Connections

- Identifies the target of [[Group-Time Average Treatment Effects]] under [[Identifying Assumptions for Staggered DiD]].
- DR estimators feed the asymptotics in [[Simultaneous Inference via Multiplier Bootstrap]].
- Aggregated into summaries in [[Aggregating Group-Time Effects]].
- Generalizes the regression-adjustment logic in [[Mostly Harmless Econometrics]].

## See Also

- Sant'Anna & Zhao (2020) — the 2-period DR DiD estimator extended here
- Abadie (2005) — semiparametric IPW DiD
- [[How to use Bayesian propensity scores and inverse probability weights]] — Bayesian IPW counterpart
