---
title: "Roever 2020 - Priors for the Effect and Heterogeneity"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.2 (pp. 7-13, Eq. 4-12, Table 1, Fig. 1), Sec. 3.4 (pp. 29-32, Fig. 5), App. A.1-A.2 (pp. 38-39)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]"
used_by:
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - priors for between-study heterogeneity
  - tau priors in meta-analysis
  - unit information prior
  - Jeffreys prior for heterogeneity
---

# Roever 2020 - Priors for the Effect and Heterogeneity

> [!summary]
> The effect $\mu$ gets a uniform (improper) or normal prior; the heterogeneity $\tau$ gets one of four classes: proper informative (half-normal, half-$t$, half-Cauchy, log-normal, exponential), proper "non-informative" depending on the $\sigma_i$ (uniform shrinkage, DuMouchel, Berger-Deely conventional), improper $\sigma$-dependent (Jeffreys/Tibshirani, Berger-Deely) and improper scale-invariant ($\tau^a$). For small $k$ an informative prior is recommended; the improper uniform prior is "conservative" in a provable sense (Appendix A.2).

## Overview

Prior independence is assumed, $p(\mu,\tau)=p(\mu)p(\tau)$, for computational convenience (dependent priors: Senn 2007; Pullenayegum 2011). Improper priors may give improper posteriors.

## Main Content

### Prior for the effect $\mu$

Uniform on $\mathbb R$ (non-informative location prior), or normal $N(\mu_p,\sigma_p^2)$ (conditionally conjugate), the two cases supported in the package. Uniform is the limit $\sigma_p\to\infty$.

> [!definition] Unit information prior (Kass and Wasserman 1995; App. A.1)
> A vague prior whose variance equals that of a single observational unit. For a log-OR, set the 2x2 allocation $a=b=c=d=N/4$ (neutral effect, equal allocation) and $N=1$: $\text{SE}=\sqrt{1/a+1/b+1/c+1/d}=4$, so $\mu\sim N(0,4^2)$; 95% of log-ORs fall in $\pm7.84$, i.e. ORs from about $1/2500$ to $2500$. With event probability $p$ ($a=c=pN/2$, $b=d=(1-p)N/2$): $\text{SD}=2/\sqrt{p(1-p)}$, never below 4. For a log-RR, $a=b=c=d=N/4$ gives SD 2 and with $p$: $2\sqrt{(1-p)/p}$ (larger for $p<1/2$).
^def-unit-information-prior

### Priors for the heterogeneity $\tau$

**Proper informative.** Because $k$ is usually tiny, information about $\tau$ from data is weak, so informative priors help.
- For log-OR-type endpoints, $\tau$ above $\log(10)\approx2.3$ is implausible (a tenfold OR spread). Spiegelhalter et al. (2004, Sec. 5.7): $\tau\in[0.1,0.5]$ "reasonable", $[0.5,1.0]$ "fairly high", $>1.0$ "fairly extreme". Same logic for log-RR, log-HR, log-variance.
- Maximum-entropy prior for a given $E[\tau]$: exponential with rate $1/E[\tau]$. Half-normal with scale 0.5 or 1.0 recommended and shown to work well (Friede et al. 2017a,b). Log-normal, or heavy-tailed half-Student-$t$, half-Cauchy, Lomax (discount the prior when data conflict: O'Hagan and Pericchi 2012; Schmidli et al. 2014; Gelman 2006; Polson and Scott 2012).
- Inverse-Gamma is generally *not* recommended (Gelman 2006; Polson and Scott 2012).
- **Empirical priors** from the Cochrane Database: Rhodes et al. (2015, mean-difference endpoints) and Turner et al. (2015, log-OR endpoints; log-normal/log-Student-$t$), available as `RhodesEtAlPrior()` and `TurnerEtAlPrior()`.

**Proper "non-informative".** Scale-invariant but dependent on the $\sigma_i$ (logically awkward: Senn 2007). With the harmonic-mean squared standard error
$$s_0^2=\frac{k}{\sum_{i=1}^k\sigma_i^{-2}}\qquad\text{(Eq. 4)}$$
> [!definition] Uniform shrinkage, DuMouchel and Berger-Deely conventional priors
> - **Uniform shrinkage** (Daniels 1999): uniform on the average shrinkage $S(\tau)=s_0^2/(s_0^2+\tau^2)$, equivalently uniform in $1-S=\tau^2/(s_0^2+\tau^2)$, a quantity much like $I^2$ of Higgins-Thompson ([[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]). Density (Eq. 5): $p(\tau)=\dfrac{2\tau s_0^2}{(s_0^2+\tau^2)^2}$, median $s_0$.
> - **DuMouchel** (DuMouchel and Normand 2000), Eq. 6: $p(\tau)=\dfrac{s_0}{(s_0+\tau)^2}$, log-logistic, mode 0, median $s_0$.
> - **Conventional (Berger and Deely 1988)**, Eq. 7: $p(\tau)\propto\left(\prod_{i=1}^k\dfrac{\tau}{(\sigma_i^2+\tau^2)^{3/2}}\right)^{1/k}$; proper, intended for testing/model selection.
^def-proper-noninformative-tau-priors

**Improper priors.**
- *Scale-invariance family* (Eq. 8-9): requiring $\frac1sp(\tau/s)=f(s)p(\tau)$ gives $p(\tau)\propto\tau^a$, $a\in\mathbb R$. $a=-1$: log-uniform (improper posterior in this problem, Gelman 2006). $a=0$: uniform on $[0,\infty)$ (Gelman's default for large $k$; needs $k\ge3$ with an improper uniform $\mu$ prior, and no proper posterior when $k\le2$). $a=-1/2$ (Eq. 10): $p(\tau)\propto1/\sqrt\tau$, uniform in $\sqrt\tau$, a pole at the origin. $a=1$: uniform in $\tau^2$, needs $k\ge4$, not recommended.
- **Jeffreys/Tibshirani** (Eq. 11): treating the orthogonal location parameter $\mu$ as fixed (the general Jeffreys $\sqrt{\det J}$ is not recommended with a location parameter),
$$p(\tau)\propto\sqrt{\sum_{i=1}^k\left(\frac{\tau}{\sigma_i^2+\tau^2}\right)^2}.$$
Also the Berger-Bernardo reference prior (Bodnar et al. 2016, 2017). Improper (tail $\sim1/\tau$), locally integrable with $p(0)=0$; posterior proper for $k\ge2$. With equal $\sigma_i=\sigma$ its mode is at $\tau=\sigma$; otherwise near the smallest $\sigma_i$, possibly multimodal. Scales with the $\sigma_i$.
- **Berger-Deely** (Eq. 12): $p(\tau)\propto\left(\prod_{i}\dfrac{\tau}{\sigma_i^2+\tau^2}\right)^{1/k}$, equals Jeffreys when all $\sigma_i$ are equal.

> [!definition] Table 1: four classes of heterogeneity priors
> | | proper informative | proper non-informative | improper non-informative | improper scale-invariant |
> |---|---|---|---|---|
> | examples | half-normal, half-$t$, half-Cauchy, log-normal, exponential | uniform shrinkage (5), DuMouchel (6), conventional (7) | Jeffreys (11), Berger-Deely (12) | uniform in $\tau$, in $\sqrt\tau$, ... (9) |
> | depends on $\sigma_i$? | no | yes | yes | no |
> | scale-invariant? | no | scales with $\sigma_i$ | scales with $\sigma_i$ | yes |
> | $k$ restrictions | none | $k\ge1$ | $k\ge2^*$ | $k\ge3^*$ |
> $^*$ less if combined with a proper effect prior.
^def-table-tau-priors

### Choosing

Proper prior wanted when marginal likelihoods or Bayes factors are needed or $k$ is small. Gelman (2006) recommends the improper uniform for $\tau$ unless $k$ is small or an informative prior is desired, in which case half-$t$ (half-Cauchy, half-normal as special/limiting cases; half-Cauchy supported by Polson and Scott 2012). Jeffreys is the default non-informative choice (proper posterior for $k\ge2$). For a log-OR, half-normal(0.5) leaves roughly 95% of mass below $\tau\approx0.98$ (about 5% "fairly extreme").

### Conservatism of the uniform prior (Appendix A.2)

> [!theorem] Uniform prior is the stochastically largest posterior
> Let the parameter domain be $[a,\infty)$, the likelihood $f(x)\ge0$ with $\int_a^\infty f<\infty$, and the prior density $p$ monotonically decreasing with $0<p(a)<\infty$. Let $F_1$ and $F_p$ be the posterior CDFs under the improper uniform prior and under $p$. Then for all $y>a$,
> $$F_p(y)=\frac{\int_a^yf(x)p(x)\,dx}{\int_a^\infty f(x)p(x)\,dx}\ \ge\ \frac{\int_a^yf(x)\,dx}{\int_a^\infty f(x)\,dx}=F_1(y)\qquad(\text{paper Eq. 30-31}),$$
> so the uniform-prior posterior is stochastically larger than the posterior under any prior in this class (provided the uniform one is proper); quantiles and expectations are larger. The class includes exponential, half-normal, half-$t$, half-Cauchy, Lomax and bounded uniform priors.
> *Proof sketch (restated).* Write $F_p(y)=A/(A+B)$ with $A=\int_a^yfp$ and $B=\int_y^\infty fp$. Since $p$ is decreasing, $A\ge p(y)\int_a^yf$ and $B\le p(y)\int_y^\infty f$. Because $A/(A+B)$ increases in $A/B$, $F_p(y)\ge\int_a^yf\big/\int_a^\infty f$. (The paper's printed chain bounds numerator and denominator separately via $p(a)$; the ratio argument here is the form that makes the final inequality hold.) $\square$
^thm-uniform-prior-conservative

Interpretation: overestimating heterogeneity is "conservative" (wider intervals), though large $\tau$ also shifts $\hat\mu(\tau)$ so intervals need not nest (Poole and Greenland 1999); the uniform prior can nonetheless put too much weight on implausibly large $\tau$.

### Prior predictive implications (Sec. 3.4)

A fixed $\tau$ implies $\theta_i\sim N(\mu,\tau^2)$; a prior on $\tau$ implies a normal scale mixture for $\theta_i$ (prior predictive), evaluated by `normalmixture()`. For $\mu=0$ the 97.5% quantile of the prior predictive $\theta_i$:

| $\tau$ prior | $q_{0.975}(\theta_i)$ | $\exp(q_{0.975})$ |
|---|---|---|
| half-normal(0.5) | 1.092 | 2.98 |
| half-normal(1.0) | 2.185 | 8.89 |
| half-Cauchy(0.5) | 5.051 | 156.1 |

So half-normal(0.5) places 95% of OR-scale study effects within a factor of about 3 (13 for the full 95% range) of the mean OR, while half-Cauchy(0.5) allows absurdly large heterogeneity. The empirical Turner et al. prior for "surgical / device-related success/failure", pharmacological vs placebo, has median 0.343 and 95% range [0.0623, 1.887] (log-normal; Fig. 1 parameters $\text{log-normal}(-1.07,0.87)$).

## Examples

> [!example] Choosing a $\tau$ prior for log-lift in marketing experiments
> For a log-relative-lift endpoint where plausible between-experiment OR-like variation is up to about 2x (a ratio of true lifts), $\tau\approx\log2/1.96\approx0.35$ is the 95% scale. A half-normal with scale 0.25 to 0.5 puts mass there; the first prior-predictive check is: does the implied 97.5% quantile of $\theta_i$ correspond to a ratio you would believe? This is the same workflow as [[Constructing Priors for Effect Sizes]]. Reproduce the check with:
^ex-tau-prior-marketing

```python
import numpy as np
from scipy import stats, optimize
def prior_pred_q(cdf_tau_pdf, upper=50, q=0.975):
    tt = np.linspace(1e-6, upper, 400001); pp = cdf_tau_pdf(tt)
    F = lambda x: np.trapezoid(pp*stats.norm.cdf(x/tt), tt) - q
    return optimize.brentq(F, 1e-3, 100)
print(prior_pred_q(lambda t: stats.halfnorm.pdf(t, scale=0.5)))   # 1.091 here (paper: 1.092)
print(prior_pred_q(lambda t: stats.halfnorm.pdf(t, scale=1.0)))   # 2.182 here (paper: 2.185)
```

## Connections

- [[Constructing Priors for Effect Sizes]] and [[Hierarchical Models]] (the half-Cauchy/half-$t$ recommendation originates in Gelman 2006).
- Sensitivity of results to these choices is demonstrated in [[Roever 2020 - Pediatric Liver Transplant Worked Example]].

## See Also

- [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
