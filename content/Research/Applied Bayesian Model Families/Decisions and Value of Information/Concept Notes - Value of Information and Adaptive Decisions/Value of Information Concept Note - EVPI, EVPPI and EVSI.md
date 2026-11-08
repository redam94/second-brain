---
title: "Value of Information Concept Note - EVPI, EVPPI and EVSI"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]"
  - "[[Decision Analysis]]"
used_by:
  - "[[Value of Information Concept Note - Pricing a Model with EVPI]]"
  - "[[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]"
aliases:
  - Value of information hierarchy
  - EVSI definition
---

# Value of Information Concept Note - EVPI, EVPPI and EVSI

> [!summary]
> Concept note, no raw source. The value-of-information hierarchy is $0\le\text{EVSI}\le\text{EVPPI}\le\text{EVPI}$: the value of a specific finite study, of perfectly learning a parameter subset, and of perfectly learning everything. Subtract a study's cost from EVSI to get the expected net benefit of sampling (ENBS). A closed form for a normal prior and normal data is verified numerically below.

## Overview

Heath, Manolopoulou and Baio (2015) cover EVPI and EVPPI computation ([[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]); EVSI is introduced in the same literature (Ades, Lu and Claxton 2004; Raiffa and Schlaifer 1961 for the decision-theoretic roots; Strong, Oakley and Brennan 2014 and Heath et al. for modern computation). This note states the definitions and an analytic case. Marked as a concept note: formulas are standard, derivations are this vault's.

## Main Content

> [!definition] EVPI
> $\text{EVPI}=\mathbb{E}_\theta[\max_tNB_t(\theta)]-\max_t\mathbb{E}_\theta[NB_t(\theta)]$: the expected gain from knowing $\theta$ exactly before deciding. It is the most any study, model or forecast could ever be worth.
^def-evpi-concept

> [!definition] EVPPI
> $\text{EVPPI}(\phi)=\mathbb{E}_\phi[\max_t\mathbb{E}_{\psi\mid\phi}NB_t]-\max_t\mathbb{E}NB_t$ for a parameter subset $\phi$ ([[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] gives the regression estimator).
^def-evppi-concept

> [!definition] EVSI
> For a planned study producing data $D$ from $p(D\mid\theta)$,
> $$
> \text{EVSI}=\mathbb{E}_D\Big[\max_t\ \mathbb{E}_{\theta\mid D}NB_t(\theta)\Big]-\max_t\ \mathbb{E}_\theta NB_t(\theta).
> $$
> The outer expectation is over the *preposterior* distribution of the data. Expected net benefit of sampling: $\text{ENBS}=\text{EVSI}-\text{cost}(D)$; run the study iff $\text{ENBS}>0$, and choose the sample size maximising it.
^def-evsi

> [!theorem] Hierarchy
> For any study $D$ informative about $\phi\subseteq\theta$: $0\le\text{EVSI}(D)\le\text{EVPPI}(\phi)\le\text{EVPI}$. *Sketch.* Data about $\phi$ gives posterior expectations $\mathbb{E}_{\theta\mid D}NB_t$ that are conditional expectations of $g_t(\phi)=\mathbb{E}_{\psi\mid\phi}NB_t$ given $D$; by the convexity of $\max$ (Jensen), averaging first and then maximising cannot beat maximising $g_t$ with $\phi$ known, which in turn cannot beat maximising $NB_t(\theta)$ pointwise. Non-negativity by Jensen in the other direction.
^thm-voi-hierarchy

> [!theorem] Closed form: two options, normal prior, normal data
> Let the incremental net benefit of option 1 over option 0 be $\mu\sim N(m,s_0^2)$ and data $\bar y\mid\mu\sim N(\mu,\sigma^2/n)$. The posterior variance is $s_1^2=(1/s_0^2+n/\sigma^2)^{-1}$ and the posterior mean $m'$ is, preposteriorly, $N(m,\tau^2)$ with $\tau^2=s_0^2-s_1^2$. Then
> $$
> \text{EVSI}(n)=\tau\,\varphi(m/\tau)+m\,\Phi(m/\tau)-\max(m,0),\qquad \text{EVPI}=s_0\varphi(m/s_0)+m\Phi(m/s_0)-\max(m,0).
> $$
^thm-evsi-normal

*Proof.* The decision after the study is option 1 iff $m'>0$, so the value is $\mathbb{E}[\max(m',0)]=\tau\varphi(m/\tau)+m\Phi(m/\tau)$ for $m'\sim N(m,\tau^2)$; subtract the no-study value $\max(m,0)$. EVPI is the limit $n\to\infty$ ($\tau\to s_0$).

## Examples

**Verified numbers** ($m=0.3$, $s_0^2=0.5$, $\sigma^2=1$): EVPI $=0.1571$.

| $n$ observations | $s_1^2$ | $\tau$ | EVSI closed form | EVSI Monte Carlo | Share of EVPI |
|---|---|---|---|---|---|
| 1 | 0.333 | 0.408 | 0.0550 | 0.0553 | 35% |
| 4 | 0.167 | 0.577 | 0.1107 | 0.1105 | 71% |
| 16 | 0.0556 | 0.667 | 0.1424 | 0.1435 | 91% |
| 64 | 0.0152 | 0.696 | 0.1532 | 0.1518 | 98% |

Diminishing returns in $n$ are the reason ENBS has an interior optimum: if each observation costs $c$, choose $n$ where the marginal EVSI equals $c$.

```python
import numpy as np
from scipy import stats
def emax(m, s): return s*stats.norm.pdf(m/s) + m*stats.norm.cdf(m/s)
def evsi_normal(m, s02, sig2, n):
    s1 = 1/(1/s02 + n/sig2); tau = np.sqrt(s02 - s1)
    return emax(m, tau) - max(m, 0)
```

PyMC-style sketch (untested) for non-conjugate EVSI: simulate $D^{(j)}\sim p(D\mid\theta^{(j)})$ from prior draws, summarise by a statistic, regress $NB_t(\theta^{(j)})$ on that statistic (the regression-EVPPI trick applied to the data summary; Strong et al. 2015 EVSI by regression, Heath et al. moment matching), and apply the five-step formula of [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]].

## Connections
- Relevance to marketing measurement: a geo or lift test is a study $D$; EVSI prices it against the budget decision it could change, and ENBS chooses its size and duration. A prior concentrated far from the decision threshold has small EVPI and no test pays.
- Decision framing: [[Decision Analysis]], [[From Inference to Decision]]; information-based design: [[Expected Information Gain]].
- E89 uses this closed form for a monitor reading: [[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]].

## See Also
- [[Value of Information Concept Note - Pricing a Model with EVPI]]
- [[Research/Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]

## Sources
- Raiffa and Schlaifer (1961), *Applied Statistical Decision Theory*. Ades, Lu and Claxton (2004), *Med Decis Making* 24:207-227. Strong, Oakley and Brennan (2014), *Med Decis Making* 34:311-326. Strong, Oakley, Brennan and Breeze (2015), EVSI by regression, *Med Decis Making* 35:570-583 (citation from memory; verify). Heath, Manolopoulou and Baio, EVSI by moment matching (arXiv:1611.01373). Closed form derived here.
