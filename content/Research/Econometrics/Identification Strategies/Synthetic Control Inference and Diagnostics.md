---
title: "Synthetic Control Inference and Diagnostics"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Abadie 2021 - Using Synthetic Controls.pdf]]"
source_location: "Abadie (2021), Sections 3.5 and 7, pp. 403–405, 414–415"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Synthetic Control Bias Theory]]"
used_by:
  - "[[Synthetic Control Requirements]]"
  - "[[Synthetic Control Extensions]]"
aliases:
  - "synthetic control permutation test"
  - "RMSPE ratio"
  - "synthetic control placebo test"
---

# Synthetic Control Inference and Diagnostics

> [!summary]
> With aggregate data and small donor pools, asymptotic inference is unavailable for synthetic controls. Abadie, Diamond, and Hainmueller (2010) propose **permutation inference** based on the RMSPE ratio — the ratio of post-intervention fit to pre-intervention fit. This statistic is preferred over the raw treatment effect because it accounts for heterogeneous pre-treatment fit across donor units. Diagnostic checks (backdating, leave-one-out robustness) assess the credibility of the synthetic control counterfactual.

## Overview

Standard inference for treatment effects relies on large-sample approximations. Synthetic control studies typically have one treated unit and a small donor pool ($J \approx 10$–$50$) — not nearly enough for asymptotic theory. Moreover, the units are aggregate entities (states, countries), not random draws from a well-defined population, making classical randomization-based inference theoretically problematic.

The solution is **permutation inference** (Fisher 1935): iteratively reassign treatment to each donor unit, estimate a "placebo effect," and compare the true effect to the distribution of placebo effects.

## The RMSPE Ratio Test Statistic

The raw treatment effect $\hat{\tau}_{1t}$ is a poor test statistic for permutation inference because units with **poor pre-treatment fit** naturally generate large post-intervention gaps — even without any real treatment effect. The RMSPE ratio corrects for this.

> [!definition] Definition: RMSPE (Root Mean Squared Prediction Error)
> For unit $j$ and time interval $[t_1, t_2]$:
> $$R_j(t_1, t_2) = \left(\frac{1}{t_2 - t_1 + 1}\sum_{t=t_1}^{t_2}\left(Y_{jt} - \hat{Y}_{jt}^N\right)^2\right)^{1/2}$$
> where $\hat{Y}_{jt}^N = \sum_{k \neq j} w_{jk} Y_{kt}$ is the synthetic control estimate for unit $j$.
^def-rmspe

> [!definition] Definition: RMSPE Ratio (Abadie 2021, Eq. 12)
> For unit $j$, the **RMSPE ratio** is:
> $$r_j = \frac{R_j(T_0+1, T)}{R_j(1, T_0)}$$
> That is, the ratio of the **post-intervention RMSPE** to the **pre-intervention RMSPE**. This measures the fit of the synthetic control in the posttreatment period *relative to* its fit in the pretreatment period.
^def-rmspe-ratio

**Why the ratio matters:**
- A large post-treatment gap ($R_j(T_0+1, T)$ large) is only meaningful if the pre-treatment fit was good ($R_j(1, T_0)$ small)
- A unit with poor pre-treatment fit might generate a large post-treatment deviation purely by chance — this would falsely inflate significance if we used the raw gap
- The ratio scales the treatment effect signal by the noise level specific to each placebo unit

## Permutation Inference Procedure

> [!theorem] Theorem: Permutation Inference for Synthetic Controls (Abadie, Diamond, and Hainmueller 2010)
> **Procedure:**
> 1. For each unit $j = 1, \ldots, J+1$ (treated unit + all donor units), estimate a synthetic control as if $j$ were the treated unit, using all other units as the donor pool
> 2. Compute $r_j$ for each unit
> 3. The **p-value** for the two-sided test is:
> $$p = \frac{1}{J+1}\sum_{j=1}^{J+1} \mathbf{1}_+(r_j - r_1)$$
> where $\mathbf{1}_+(\cdot)$ returns 1 for nonnegative arguments and 0 otherwise; $r_1$ is the RMSPE ratio for the actual treated unit
>
> **Interpretation**: $p$ is the fraction of units (including the treated unit) that have an RMSPE ratio at least as large as the treated unit's. Under the null of no treatment effect, the treated unit's $r_1$ should be typical among the $J+1$ units.
^thm-permutation-inference

**Practical filtering:** Donor units with very high pre-treatment RMSPE $R_j(1, T_0)$ — that is, units whose synthetic controls fit poorly even before the intervention — are typically excluded from the permutation distribution. Including them would dilute the significance of the treated unit's ratio. A common threshold is $R_j(1, T_0) < c \cdot R_1(1, T_0)$ for some $c$ (e.g., $c = 5$).

**One-sided inference:** Replacing $Y_{jt} - \hat{Y}_{jt}^N$ with its positive or negative parts before computing RMSPE yields one-sided tests with potential power gains. This is useful in comparative case study settings where the direction of the effect is known a priori.

> [!note] Design-Based Interpretation
> This inference is **design-based**, not sampling-based. The randomness comes from the assignment mechanism — which unit was treated — not from sampling. Abadie, Diamond, and Hainmueller (2010) use a uniform benchmark (each assignment equally probable), but one could incorporate domain knowledge about assignment probabilities.

## Robustness Checks and Diagnostics

### 1. Backdating

> [!definition] Definition: Backdating (Abadie 2021, Section 7)
> **Backdating** artificially moves the intervention date backward in time. If the synthetic control is credible, applying it with the intervention backdated should produce **near-zero estimated effects** for the backdated periods (before the actual intervention).
>
> **Use**: A synthetic control that shows large "effects" in the backdated period is likely misspecified — either the pre-treatment fit is spurious, or the parallel-trends analog is violated. Conversely, near-zero effects in the backdated period lend credibility to the synthetic control.
^def-backdating

In the German reunification example (Abadie 2021, Figure 3), backdating the reunification to 1980 shows that the synthetic control closely tracks West Germany's GDP from 1960–1990 (the backdated post-treatment period), providing evidence that the estimated post-1990 gap is not a statistical artifact.

### 2. Leave-One-Out Robustness

> [!definition] Definition: Leave-One-Out Robustness (Abadie 2021, Section 7)
> Reestimate the synthetic control repeatedly, each time excluding one of the units that contributes positively to the synthetic control (i.e., one of the units with $w_j > 0$).
>
> If the main result is **robust to leave-one-out**, the estimated treatment effects across these runs should be negative and closely clustered around the full-sample estimate (Figure 4 in Abadie 2021).
>
> If the main conclusion **reverses** when a single unit is excluded, this warrants investigation: the excluded unit may have experienced an unrelated shock, or the treated unit's characteristics may be too close to a single donor unit.
^def-leave-one-out

### 3. In-Time Placebo Tests

A related diagnostic: estimate a synthetic control for the actual treated unit but with the intervention date moved to a period when no intervention occurred. If the synthetic control's "effect" in the placebo post-period is comparable to the actual estimated effect, the credibility of the original estimate is weakened.

This is distinct from the in-space placebo tests (permutation inference above), which iterate over donor units. In-time placebos iterate over **intervention dates** for the same treated unit.

## Confidence Intervals

Point estimates and p-values are the primary inferential outputs. Confidence intervals can be constructed via **test inversion** (Firpo and Possebom 2018): invert the permutation test over a range of treatment effect magnitudes $\tau_0$ to find all values not rejected at level $\alpha$.

Cattaneo, Feng, and Titiunik (2021) propose predictive intervals for $\hat{\tau}_{it}$ that account for estimation uncertainty in $P_t^N$ (the untreated potential outcome model) and irreducible uncertainty from the unobserved $u_t$.

## Connections

- **[[Synthetic Control Bias Theory]]**: The bias bound theory explains why the RMSPE ratio is the right test statistic — the bound depends on pre-treatment fit, so the ratio normalizes by that fit
- **[[Synthetic Control]]**: The California Prop 99 example uses the permutation p-value ≈ 0.029 (1 of 35 placebo states more extreme)
- **[[Differences-in-Differences]]**: DiD uses standard errors from panel regression; SC uses permutation inference because the small-$J$ setting makes asymptotics unavailable
- **[[Synthetic Control Extensions]]**: The multi-unit extensions generalize permutation inference to $I > 1$ treated units

## See Also

- [[Synthetic Control]] — core estimator with Python implementation of permutation test
- [[Synthetic Control Bias Theory]] — the linear factor model that motivates this inference approach
- [[Synthetic Control Requirements]] — conditions under which inference is valid
- [[Abadie 2021 - Overview]] — full paper overview
