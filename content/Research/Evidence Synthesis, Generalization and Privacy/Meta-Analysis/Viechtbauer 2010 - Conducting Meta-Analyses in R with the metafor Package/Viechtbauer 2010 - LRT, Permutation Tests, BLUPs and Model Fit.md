---
title: "Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.5, pp. 33-38 (fit statistics, LRT, permutation tests, BLUPs; Figures 10-11)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
used_by:
  - "[[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]"
aliases:
  - permutation test in meta-analysis
  - BLUP shrinkage in meta-analysis
  - likelihood ratio test for moderators
---

# Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit

> [!summary]
> Beyond Wald tests, metafor offers likelihood-ratio tests (requiring ML, not REML, when fixed effects differ), exact or Monte Carlo permutation tests that avoid normality assumptions, and BLUPs of study-specific true effects whose shrinkage toward $\hat\mu$ grows with sampling variance and shrinks as $\tau^2$ grows. On BCG, latitude is significant by LRT ($p=0.0016$), permutation $p$-values are larger than Wald ones, and small trials are visibly shrunk.

## Overview

Section 3.5 closes with three inferential tools and a model-comparison tool. All use the BCG data of [[Viechtbauer 2010 - BCG Vaccine Worked Example]].

## Main Content

### Fit statistics and likelihood ratio tests

`fitstats()` returns the (restricted) log-likelihood, deviance ($-2\times$ log-likelihood), AIC and BIC. The unrestricted likelihood is used unless REML is used. $\tau^2$ counts as an additional parameter in random/mixed models.

> [!theorem] Likelihood ratio test of nested meta-regression models
> `anova(full, reduced)` compares nested models fitted to the same data. The LRT statistic is $2(\ell_F-\ell_R)\sim\chi^2_{\Delta df}$ under $H_0$. **Conditions:** (i) same data; (ii) nested; (iii) under REML the LRT is **not meaningful when the fixed effects differ**, so fit both with `method="ML"`. The reported proportion of heterogeneity accounted for is $100\%\times(\hat\tau^2_R-\hat\tau^2_F)/\hat\tau^2_R$.
> For $H_0:\tau^2=0$ one could compare an ML/REML fit with `method="FE"` using $\chi^2_1$ but the null lies on the boundary of the parameter space (needs a mixture adjustment), and the $Q$-test "usually keeps better control of the Type I error rate anyway and therefore should be preferred" (Viechtbauer 2007b).
^thm-lrt-meta

> [!example] LRT for latitude
> ML fits: full (latitude) df = 3, AIC 21.3713, BIC 23.0662, logLik -7.6857, $Q_E=30.7331$, $\hat\tau^2=0.0344$. Reduced (intercept only) df = 2, AIC 29.3302, BIC 30.4601, logLik -12.6651, $Q_E=152.2330$, $\hat\tau^2=0.2800$. $\text{LRT}=9.9588$, df = 1, $p=0.0016$; variance accounted for 87.73%. Latitude alone accounts for about 88% of the (ML) heterogeneity; $H_0:\beta_1=0$ is rejected.
^ex-lrt-latitude

### Permutation tests

> [!definition] Permutation tests (Follmann and Proschan 1999; Higgins and Thompson 2004)
> Alternative to Wald and LRT tests that assume normal observed (and true) effects and asymptotics.
> - **No moderators:** permute the *signs* of the observed effects; two-sided $p$ = twice the proportion of permuted statistics at least as extreme as observed.
> - **With moderators:** permute the rows of the design matrix; coefficient $p$ = twice the proportion at least as extreme; omnibus $p$ = proportion more extreme than the observed $Q_M$.
> - `permutest(res, exact=TRUE)` fits every permutation once (feasible only for small $k$: $k=5$ has 120 row permutations and 32 sign patterns; $k=8$: 40,320 and 256; $k=10$: 3,628,800 and 1,024); `exact=FALSE` (default) uses `iter` random permutations (1000 default), so results vary slightly between runs.
^def-permutation-test

> [!example] BCG permutation results
> RE model, exact sign-permutation (8192 iterations, $2^{13}$): $\hat\mu=-0.7145$ with permutation $p=0.0015$ (Wald $z=-3.9744$, $p<0.0001$). Mixed model (latitude, year), 10,000 random permutations (an exact test needs more than $6\times10^9$ fits): omnibus $Q_M(2)=12.2043$, $p^*=0.0232$ (Wald 0.0022); latitude $p^*=0.0224$ (Wald 0.0062); year $p^*=0.8950$. Conclusions unchanged but permutation $p$-values are "more conservative". Fig. 10: the permutation distribution of the latitude statistic has a fatter tail than the standard normal (overlaid in red; kernel density in blue). A simulation (random unrelated moderator, 10,000 replicates $\times$ 5000 permutations = $5\times10^7$ fits) gave empirical Type I error 0.05.
^ex-bcg-permutation

### BLUPs

> [!definition] Best linear unbiased predictions of the true effects (`blup()`)
> For the random-effects model the BLUP of $\theta_i$ is
> $$
> \tilde\theta_i=\hat\mu+\frac{\hat\tau^2}{\hat\tau^2+v_i}(y_i-\hat\mu)=\lambda_iy_i+(1-\lambda_i)\hat\mu,\qquad\lambda_i=\frac{\hat\tau^2}{\hat\tau^2+v_i}.
> $$
> (For mixed models $\hat\mu$ is replaced by the fitted value $x_i^\top\hat\beta$.) Since $\hat\tau^2$ is estimated these are empirical BLUPs, unbiased and asymptotically BLUP (Kackar and Harville 1981). Bayesian reading: posterior means (and modes) of $\theta_i$ under vague priors on the coefficients, with $\tau^2$ fixed.
^def-blup

Shrinkage behaviour: if $\tau^2=0$ all BLUPs equal $\hat\mu$; for very large $\tau^2$ they approach $y_i$ (especially for small $v_i$); in general they lie between $y_i$ and $\hat\mu$.

> [!example] BCG BLUPs
> With $\hat\tau^2=0.3132$ and $\hat\mu=-0.7145$: study 1: $\lambda_1=0.3132/(0.3132+0.3256)=0.4903$, so $\tilde\theta_1=0.4903(-0.8893)+0.5097(-0.7145)=-0.8002$ (SE 0.4099, prediction interval $[-1.6037,0.0032]$). Study 4 (precise): $-1.3979$ (SE 0.1376). Study 13: $-0.1467$ (SE 0.2434). Fig. 11 shows observed values versus BLUPs, with the smaller studies shrunk most strongly toward $\hat\mu=-0.71$. Reproduced in Python to four decimals; the exact sign-permutation count with $\hat\tau^2$ held fixed is 12 of 8192, $p=0.00146$, matching the printed 0.0015.
^ex-bcg-blup

```python
import numpy as np
def blups(y, v, tau2, mu):
    lam = tau2/(tau2+v); return lam*y + (1-lam)*mu
def sign_permutation_p(y, v, tau2, n=8192):
    """Exact sign-flip permutation p-value for H0: mu=0 (all 2^k sign patterns when k=13 -> 8192)."""
    import itertools
    w = 1/(v+tau2); obs = abs((w*y).sum())/np.sqrt(w.sum()); cnt = 0
    for s in itertools.product([-1,1], repeat=len(y)):
        cnt += abs((w*np.array(s)*y).sum())/np.sqrt(w.sum()) >= obs - 1e-12
    return cnt/2**len(y)
```

## Connections

- BLUPs are the frequentist (empirical-Bayes) version of partial pooling; the full Bayesian version, which also integrates over $\tau$, is in [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] and [[Hierarchical Models]].
- Marketing: for a brand with several channel-level lift tests, shrunken (BLUP) channel effects are the sensible inputs for budget optimisation and priors for MMM channel coefficients; raw small-test estimates are overconfident outliers. Related: [[Partial Pooling as Multiple Comparisons Correction]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]]
