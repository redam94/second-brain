---
title: "Roever 2020 - Posterior Predictive Checks and Frequentist Connection"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.10 (pp. 17-18), Sec. 3.5 (pp. 32-33), Sec. 3.6 (pp. 33-37), Figures 6-7"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
used_by:
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - posterior predictive p-values for meta-analysis
  - Bayesian and frequentist meta-analysis link
  - pppvalue
---

# Roever 2020 - Posterior Predictive Checks and Frequentist Connection

> [!summary]
> Two bridges to classical practice. (1) A frequentist REML random-effects fit equals the Bayesian conditional posterior $\mu\mid\tau=\hat\tau_{REML}$ under a uniform effect prior; the Bayesian result differs by integrating over $\tau$. (2) Posterior predictive $p$-values test hypotheses such as $\mu\ge0$, $\tau=0$ or $\theta_i=0$ by simulating replicate data from the posterior restricted to the null; with Cochran's $Q$ as statistic for $\tau=0$ the result matches the classical test.

## Overview

Posterior predictive checks (Gelman et al. 1996; Gelman et al. 2014) compare actual data to data simulated from the posterior; a discrepancy signals misfit. For a one-dimensional statistic, the share of replicate values above or below the observed value is a posterior predictive $p$-value, closely related to classical $p$-values (Meng 1994; Berkhof et al. 2000).

## Main Content

### Frequentist link (Sec. 3.5)

> [!theorem] REML fit as a conditional posterior
> With a uniform prior for $\mu$, the conditional posterior mean and SD of $\mu$ at $\tau=\hat\tau$ equal the usual random-effects estimate and its standard error: $\hat\mu(\hat\tau)=\sum w_i(\hat\tau)y_i/\sum w_i(\hat\tau)$, $\hat\sigma(\hat\tau)=(\sum w_i(\hat\tau))^{-1/2}$. The choice of heterogeneity prior is irrelevant for this conditional statement. Both approaches share the likelihood; the Bayesian one adds a prior on both parameters and integrates over $\tau$ rather than plugging in.
^thm-reml-conditional-posterior

> [!example] Transplant data: REML vs Bayes
> `rma(crins.es)` (REML): $\hat\tau=0.4670$, $\hat\mu=-1.5915$, SE 0.3341. `ma03$cond.moment(tau=sqrt(ma04$tau2))` (uniform $\mu$ prior, Jeffreys $\tau$ prior, irrelevant here) returns mean $-1.591513$ and SD $0.3340882$: identical. Reproduced in Python: REML $\hat\tau=0.46703$, $\hat\mu=-1.59151$, SE $0.33409$. The Bayesian marginal (half-normal(0.5), $N(0,4^2)$) is $-1.576\pm0.330$ with a mixture shape reflecting $\tau$ uncertainty.
^ex-reml-bayes-link

### Posterior predictive $p$-values (Sec. 2.10, 3.6)

> [!definition] Posterior predictive $p$-value for the NNHM
> Given a null hypothesis $H_0$ about $\mu$, $\tau$ or $\theta_i$ and a discrepancy statistic $T$: (1) draw $(\mu^*,\tau^*,\theta^*)\sim p(\cdot\mid\vec y,H_0)$, i.e. from the posterior conditional on $H_0$; (2) simulate $y^*\sim p(y\mid\mu^*,\tau^*,\theta^*)$; (3) compute $T(y^*)$; (4) the $p$-value is the fraction of replicates with $T(y^*)$ at least as extreme as the observed $T(y)$ in the rejection region. Implemented by `pppvalue(bmr, parameter, value, alternative, statistic, n)`.
^def-pp-pvalue

**Setup of the example (two randomised studies).** Restricting the six studies to the two randomised ones (Heffron 2003, Spada 2006) gives (half-normal(0.5), $N(0,4^2)$): posterior mean $-1.78$, 95% interval $[-2.86,-0.69]$, prediction $-1.78$ $[-3.25,-0.28]$ (Fig. 6: raw intervals Heffron $-2.31$ $[-3.48,-1.13]$, Spada $-1.26$ $[-2.52,-0.00]$).

| Hypothesis | Statistic | Result | Interpretation |
|---|---|---|---|
| $H_0:\mu\ge0$ vs $\mu<0$ | $P(\mu<0\mid y)=0.9975$ (posterior CDF at 0) | $p=0.01$ (10 of 1000 replicates exceed it; binomial 95% interval about 0.5% to 2%) | data inconsistent with no/harmful effect |
| $H_0:\tau=0$ vs $\tau>0$ | Cochran's $Q$ | $p=0.244$ (classical $\chi^2$-based value would be identical) | no evidence of heterogeneity from 2 studies |
| $H_0:\tau=0$ vs $\tau>0$ | Bayes factor for $\tau=0$ (rejection region: lower tail) | $p=0.222$ | similar |
| $H_0:\theta_{Spada}\ge0$ | $P(\theta_2<0\mid y)$ | $p\approx0.161$ | the *latest study alone*, judged against prior evidence, is not conclusive |

Notes: the posterior CDF at $\tau=0$ is always 0, so it cannot test $\tau=0$; use $Q$ or a Bayes factor. Using a Bayes factor requires matching prior settings inside the statistic function and `interval.type="central"` for speed; `n=1000` replications "may take a few minutes", `n` of about 100 is usually enough for rough values. Figure 7 visualises replicate $(\tau^*,\mu^*)$ draws confined to $\mu\ge0$ (left) and the empirical CDF of the statistic with the observed value 0.9975 in the upper tail (right).

## Examples

```python
import numpy as np
def ppp_cochran_q(y, sigma, n=2000, seed=0):
    """Posterior predictive p for H0: tau=0 with Cochran's Q. Under H0 Q ~ chi2(k-1): simulate and compare."""
    rng = np.random.default_rng(seed); k = len(y); w = 1/sigma**2
    def Q(yy): m = (w*yy).sum()/w.sum(); return (w*(yy-m)**2).sum()
    mu = (w*y).sum()/w.sum()                      # plug-in; Q is pivotal under H0 so mu is irrelevant
    q_obs = Q(y)
    reps = np.array([Q(rng.normal(mu, sigma)) for _ in range(n)])
    return (reps >= q_obs).mean()
```

## Connections

- Marketing: the $H_0:\tau=0$ question ("does lift transfer exactly across markets?") is rarely answerable with 2-6 tests. The better question is the posterior of $\tau$ and the predictive distribution, as in [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]].
- The Q-based test and its power limits: [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]; the posterior-predictive-check philosophy is in [[Posterior Sampling and Summarization]].

## See Also

- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
- [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]]
