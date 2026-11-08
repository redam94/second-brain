---
title: "Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 2.4 (p. 5), Sec. 3.3 (p. 12), Sec. 3.4 (pp. 14-15), Sec. 3.6 (pp. 38-40); DL from DerSimonian and Laird (1986), I2/H2 from Higgins and Thompson (2002)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]"
used_by:
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
  - "[[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]"
  - "[[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]"
  - "[[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]]"
aliases:
  - DerSimonian-Laird estimator
  - Higgins-Thompson I2 and H2
  - Cochran Q heterogeneity test
  - tau-squared estimators
---

# Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics

> [!summary]
> Random and mixed-effects models are fitted in two steps: estimate $\tau^2$, then weight by $1/(v_i+\hat\tau^2)$. metafor offers seven estimators (HS, HE, DL, SJ, ML, REML, EB), defaulting to REML. This note states the DerSimonian-Laird estimator, Cochran's $Q$, and the Higgins-Thompson $I^2$ and $H^2$ formally (from the cited foundational papers), and records how metafor computes and truncates them.

## Overview

The paper only names the estimators and cites sources (Sec. 2.4, 3.3); closed-form formulas for DL and the Higgins-Thompson measures are given here as foundational concepts, attributed to DerSimonian and Laird (1986) *Controlled Clinical Trials* 7(3):177-188 and Higgins and Thompson (2002) *Statistics in Medicine* 21(11):1539-1558. These are standard statements, not text of the metafor paper; the IntHout et al. paper reproduces the DL formulas in its Appendix 1 ([[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]).

## Main Content

### The estimator menu (`method=` argument)

| Code | Estimator | Source cited | Form |
|---|---|---|---|
| `HS` | Hunter-Schmidt | Hunter and Schmidt (2004); general version Viechtbauer (2005) | closed form |
| `HE` | Hedges | Hedges and Olkin (1985); Raudenbush (2009) | closed form |
| `DL` | DerSimonian-Laird | DerSimonian and Laird (1986) | closed form |
| `SJ` | Sidik-Jonkman | Sidik and Jonkman (2005a,b) | closed form (never negative) |
| `ML` | Maximum likelihood | Viechtbauer (2005) | iterative (Fisher scoring) |
| `REML` | Restricted maximum likelihood (default) | Viechtbauer (2005); "approximately unbiased and quite efficient" | iterative |
| `EB` | Empirical Bayes | Morris (1983); Berkey et al. (1995) | iterative |
| `FE` | Fixed effects ($\tau^2\equiv0$) | n/a | n/a |

### Cochran's Q

> [!definition] Cochran's $Q$ (Hedges and Olkin 1985)
> With fixed-effects weights $w_i=1/v_i$ and $\hat\mu_{FE}=\sum w_iy_i/\sum w_i$,
> $$Q=\sum_{i=1}^k w_i\,(y_i-\hat\mu_{FE})^2 .$$
> Under $H_0:\tau^2=0$, $Q\sim\chi^2_{k-1}$. For mixed models the analogue $Q_E=\sum w_i(y_i-x_i^\top\hat\beta_{FE})^2\sim\chi^2_{k-p}$ tests **residual** heterogeneity (reported as $Q_E$). The paper prefers the $Q$-test over a (boundary-adjusted) likelihood-ratio test for $\tau^2=0$ because it controls Type I error better (Viechtbauer 2007b).
^def-cochran-q

### DerSimonian-Laird

> [!theorem] DerSimonian-Laird (1986) method-of-moments estimator
> Let $w_i=1/v_i$ and $Q$ as above. Then $E[Q]=(k-1)+\tau^2\left(\sum w_i-\frac{\sum w_i^2}{\sum w_i}\right)$, so equating $Q$ to its expectation gives
> $$\hat\tau^2_{DL}=\max\!\left(0,\;\frac{Q-(k-1)}{\sum w_i-\sum w_i^2/\sum w_i}\right).$$
> *Proof sketch.* With $\theta_i$ random, $y_i\sim N(\mu,v_i+\tau^2)$ and $\hat\mu_{FE}$ has variance $\sum w_i^2(v_i+\tau^2)/(\sum w_i)^2$. Using $E\sum w_i(y_i-\hat\mu_{FE})^2=\sum w_i\text{Var}(y_i)-\sum w_i\,\text{Var}(\hat\mu_{FE})$ gives $\sum w_i(v_i+\tau^2)-\sum w_i^2(v_i+\tau^2)/\sum w_i=k+\tau^2\sum w_i-1-\tau^2\sum w_i^2/\sum w_i$. $\square$
^thm-dersimonian-laird

The random-effects mean is then $\hat\mu=\sum w_i^*y_i/\sum w_i^*$ with $w_i^*=1/(v_i+\hat\tau^2)$ and, in the classical DL analysis, $\text{Var}(\hat\mu)=1/\sum w_i^*$ with normal-based tests (the Knapp-Hartung/HKSJ correction is in [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]).

### Higgins-Thompson heterogeneity statistics

> [!definition] $H^2$, $I^2$ (Higgins and Thompson 2002)
> Let the *typical* within-study variance be
> $$s^2=\frac{(k-1)\sum w_i}{(\sum w_i)^2-\sum w_i^2}.$$
> Population-level definitions (used by metafor with $\hat\tau^2$ plugged in):
> $$H^2=\frac{\tau^2+s^2}{s^2},\qquad I^2=\frac{\tau^2}{\tau^2+s^2}=\frac{H^2-1}{H^2}.$$
> The $Q$-based sample versions are $H^2=Q/(k-1)$ and $I^2=\max\{0,(Q-(k-1))/Q\}$. $I^2$ is the share of total variability in the $y_i$ attributable to heterogeneity; $\tau^2=0\Rightarrow I^2=0\%$ and $H^2=1$.
^def-higgins-thompson

metafor output "I^2 (% of total variability due to heterogeneity)" and "H^2 (total variability / within-study variance)" use the first (population) forms; Viechtbauer warns that $\hat\tau^2$, $I^2$, $H^2$ "are often estimated imprecisely, especially when the number of studies is small" and offers `confint()` for CIs: for BCG, $\tau^2$ 95% CI 0.1197 to 1.1115, $I^2$ 81.92% to 97.68%, $H^2$ 5.53 to 43.07 (CI method from Viechtbauer 2007a).

### Computation and truncation (Sec. 3.6)

- HS, HE, DL, SJ are closed form; ML, REML, EB use **Fisher scoring** (Harville 1977; Jennrich and Sampson 1976): robust to poor starts, default start = Hedges estimate, stop when $\Delta\tau^2<10^{-5}$, max 100 iterations (`control=list(tau2.init, threshold, maxiter, stepadj, verbose)`).
- All estimators except SJ can be negative. HS/HE/DL truncate at 0; ML/REML/EB use step-halving to stay non-negative. `control=list(tau2.min=)` changes the bound; technically only $v_i+\tau^2>0$ is needed (footnote 6), but $\tau^2$ is of interpretive interest so negative values are avoided.
- Zero sampling variances break some estimators (weight $1/0$); unweighted fitting is a workaround. A "singular matrix" error means collinear moderators.

## Examples

> [!example] DL, REML and $I^2$ on the BCG data
> Using the 13 log relative risks of [[Viechtbauer 2010 - BCG Vaccine Worked Example]]: $Q=152.233$, $\sum w_i=609.70$, $\sum w_i^2=94{,}820.6$, so the DL denominator is $609.70-94{,}820.6/609.70=454.18$ and $\hat\tau^2_{DL}=(152.233-12)/454.18=0.3088$ (computed here; the paper reports REML 0.3132). The $Q$-based $I^2=(152.233-12)/152.233=92.12\%$ versus the REML-plug-in $I^2=\hat\tau^2/(\hat\tau^2+s^2)=0.3132/(0.3132+0.02642)=92.22\%$ reported by metafor, with typical $s^2=0.02642$ and $H^2=12.86$. Different estimators, slightly different answers: the choice of estimator is itself a (small) analytic decision.
^ex-bcg-heterogeneity

```python
import numpy as np
from scipy import optimize
def dl_tau2(y, v):
    w = 1/v; mu = (w*y).sum()/w.sum(); Q = (w*(y-mu)**2).sum(); k = len(y)
    return max(0, (Q-(k-1))/(w.sum()-(w**2).sum()/w.sum())), Q
def reml_tau2(y, v):
    f = lambda t: .5*(np.log(v+t).sum() + np.log((1/(v+t)).sum())
                      + ((y-((y/(v+t)).sum()/(1/(v+t)).sum()))**2/(v+t)).sum())
    return optimize.minimize_scalar(f, bounds=(0,5), method="bounded").x
def i2_h2(tau2, v):
    w = 1/v; k = len(v); s2 = (k-1)*w.sum()/(w.sum()**2-(w**2).sum())
    return tau2/(tau2+s2), (tau2+s2)/s2
```

## Connections

- DL's known failure with few studies (inflated Type I error because $\hat\tau^2$ is treated as known) motivates [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] and the fully Bayesian treatment in [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]].
- In marketing measurement, $\tau$ across geo tests is the quantity that tells you how far a new market's lift may deviate from the average, and a zero or near-zero $\hat\tau^2$ from a handful of tests is more likely a small-$k$ artefact than evidence of homogeneity (Röver notes 57% of Cochrane heterogeneity estimates were exactly zero: [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]]).
- See [[Power Analysis and Sample Size]] for why few-study meta-analyses have little power to detect heterogeneity.

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]
