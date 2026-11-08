---
title: "Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 4 (pp. 22-25): Thm 4, Lemma 5, Fig 4, estimation error in p"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]"
used_by:
  - "[[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]"
  - "[[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]"
aliases:
  - "Median-unbiased estimator under selective publication"
  - "Quantile-unbiased estimators and corrected confidence sets (Andrews-Kasy)"
---
# Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets

> [!summary]
> For known $p(\cdot)$ and a normal estimate, inverting the truncated CDF $F_{X|\Theta}(x|\theta)$ in $\theta$ gives an $\alpha$-quantile-unbiased estimator $\hat\theta_\alpha(X)$. Its median version and the equal-tailed interval built from two quantiles exactly correct bias and coverage for the published study's own parameter. With $p$ estimated, a Bonferroni construction keeps coverage at least $1-\alpha$.

## Overview

Section 4 turns identification into inference. This note states Theorem 4 and Lemma 5, the corrected interval (including a caveat about endpoint ordering), the continued illustrative example (Fig 4) with recomputed numbers and code, the McCrary et al. relation, the paper's stance on publication standards, and the Bonferroni interval for estimated $p$. Inference is **frequentist, conditional on $\Theta$** (standard notions of bias and size control), whereas identification used an empirical-Bayes view with $\Theta^*\sim\mu$. Supplement extensions: optimal quantile-unbiased estimators with nuisance parameters, Bayesian inference.

## Main Content

> [!definition] Truncated CDF and the quantile-unbiased estimator
> With $f_{X|\Theta}$ from Lemma 1, define
> $$
> F_{X|\Theta}(x|\theta)=\int_{-\infty}^xf_{X|\Theta}(\tilde x|\theta)\,d\tilde x=\frac{1}{E[p(X^*)|\Theta^*=\theta]}\int_{-\infty}^xp(\tilde x)f_{X^*|\Theta^*}(\tilde x|\theta)\,d\tilde x.
> $$
> For $\alpha\in(0,1)$ let $\hat\theta_\alpha(x)$ solve
> $$
> F_{X|\Theta}\big(x\,\big|\,\hat\theta_\alpha(x)\big)=\alpha,\tag{4}
> $$
> so $x$ sits at the $\alpha$-quantile of the distribution implied by $\hat\theta_\alpha(x)$. (An approach used by D. Andrews 1993 and Stock and Watson 1998.)

^def-quantile-unbiased

> [!theorem] Theorem 4
> If for all $x$, $F_{X|\Theta}(x|\theta)$ is continuous and strictly decreasing in $\theta$, tends to one as $\theta\to-\infty$ and to zero as $\theta\to\infty$, then $\hat\theta_\alpha(x)$ defined in (4) exists, is unique, and is continuous and strictly increasing in $x$. If further $F_{X|\Theta}(x|\theta)$ is continuous in $x$ for all $\theta$, then $\hat\theta_\alpha(X)$ is $\alpha$-quantile unbiased under Definition 1:
> $$
> P\big(\hat\theta_\alpha(X)\le\theta\mid\Theta=\theta\big)=\alpha\quad\text{for all }\theta.
> $$
> *Proof sketch:* $\hat\theta_\alpha(X)\le\theta\iff F(X|\hat\theta_\alpha(X))\ge F(X|\theta)\iff\alpha\ge F(X|\theta)$, and $F(X|\theta)$ is uniform on $(0,1)$ under the truncated model (probability integral transform).

^thm-quantile-unbiased

> [!theorem] Lemma 5
> If $X^*|(\Theta^*,\sigma^*)\sim N(\Theta^*,\sigma^{*2})$, $p(x)>0$ for all $x$ and $p$ is almost everywhere continuous, then the assumptions of Theorem 4 hold.

^thm-lemma5

**Estimator and interval.** The median-unbiased estimator is $\hat\theta_{1/2}(X)$. The paper states the equal-tailed level $1-\alpha$ set as $[\hat\theta_{\alpha/2}(X),\hat\theta_{1-\alpha/2}(X)]$. Other selection-corrected intervals exist: inverting UMP unbiased tests in exponential families (Fithian, Sun and Taylor 2014), weighted-average-risk-minimising unbiased estimators (Mueller and Wang 2015), or the MLE based on $f_{X|\Theta}$.

> [!warning] Endpoint ordering under convention (4)
> With $F(x|\theta)$ strictly decreasing in $\theta$, solving (4) makes $\hat\theta_\alpha(x)$ *decrease* in $\alpha$. In my numerical check (below) $\hat\theta_{0.025}(2.0)=3.075>\hat\theta_{0.975}(2.0)=-0.605$. The equal-tailed interval therefore has lower endpoint $\hat\theta_{1-\alpha/2}(X)$ and upper endpoint $\hat\theta_{\alpha/2}(X)$, i.e. $[\hat\theta_{1-\alpha/2},\hat\theta_{\alpha/2}]$, which is what the code uses. The printed order in the working paper appears to use the opposite labelling of quantiles; the coverage claim is unaffected.

### Illustrative example continued (Fig 4)

> [!example] Corrected estimator and interval in the ten-fold-selectivity model
> *Setup.* $Z\sim N(\theta,1)$ latent; $p(z)=1$ for $|z|>1.96$, $0.1$ otherwise. For observed published $z$ compute the median-unbiased estimate and the 95% interval; compare with $z$ and $[z-1.96,z+1.96]$.
> *Solution (recomputed with the code below).*
>
> | published $z$ | median-unbiased $\hat\theta_{1/2}$ | corrected 95% CI | naive 95% CI |
> |---|---|---|---|
> | 2.0 | 0.717 | [-0.605, 3.075] | [0.04, 3.96] |
> | 2.5 | 1.832 | [-0.178, 4.345] | [0.54, 4.46] |
> | 3.0 | 2.758 | [0.342, 4.939] | [1.04, 4.96] |
> | 4.0 | 3.975 | [1.735, 5.959] | [2.04, 5.96] |
> | 5.0 | 4.999 | [2.977, 6.960] | [3.04, 6.96] |
>
> *Interpretation.* The corrected estimate lies below $z$ for small positive $z$ and converges to $z$ (the paper: the difference "is eventually decreasing"); the corrected interval has exactly correct coverage, is *narrower* than the usual one for small $z$ (width 3.68 vs 3.92 at $z=2$), *wider* for moderate $z$ (4.52 at $z=2.5$), and essentially identical from $z\approx5$. This matches the description of Fig 4. Under selection, a $z\approx2$ is not evidence against zero: the corrected interval at $z=2.0$ contains 0.

^ex-fig4

```python
import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

C, P_INS = 1.96, 0.1          # p(z) = 0.1 on [-C, C], 1 outside

def mass(a, b, th): return norm.cdf(b - th) - norm.cdf(a - th)

def trunc_cdf(x, th):
    xi = min(max(x, -C), C)
    num = P_INS * mass(-C, xi, th) + mass(-np.inf, min(x, -C), th) + (mass(C, x, th) if x > C else 0.0)
    den = P_INS * mass(-C, C, th) + mass(-np.inf, -C, th) + mass(C, np.inf, th)
    return num / den

def theta_hat(x, a):          # solve F(x | theta) = a   (equation 4)
    return brentq(lambda t: trunc_cdf(x, t) - a, -15, 15)

for z in [2.0, 2.5, 3.0, 4.0, 5.0]:
    lo, hi = theta_hat(z, .975), theta_hat(z, .025)       # F decreases in theta
    print(f"z={z}: median-unbiased={theta_hat(z, .5):.3f}, 95% CI=[{lo:.3f}, {hi:.3f}]")
```

### Relation to McCrary et al. (2016)

McCrary et al. propose conservative tests under an extreme publication bias in which insignificant results are never published. Take $p(z)$ as in that model ($p=0$ on insignificant results). Then for testing $\theta=0$ the equal-tailed interval contains zero if and only if the McCrary test fails to reject. So the present method generalises it to partial selection.

### What this does not recommend

> [!note] Do not change publication standards to match corrected cut-offs
> The paper does not advocate adjusting publication standards to reflect the corrected critical values: if more stringent cut-offs were used in publication, the corrections would have to be adjusted (an "arms race" of selectivity). The purpose is for **readers** of published research to draw valid inferences taking the publication rule as given. The rule itself can be chosen on other grounds (welfare, incentives) - see [[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]].

### Estimation error in $p(\cdot)$

If $p_\eta(\cdot)$ is indexed by a finite-dimensional $\eta$ with a consistent asymptotically normal $\hat\eta$ and $\hat\theta_\alpha(x;\eta)$ is continuously differentiable in $\eta$ (true for the paper's specifications), median-unbiased estimation is hard but valid confidence sets are straightforward.

> [!theorem] Bonferroni interval for estimated $p$
> For $0<\gamma<\alpha$ consider
> $$
> \Big[\hat\theta_{1-\frac{\alpha-\gamma}2}(X;\hat\eta)-c_{1-\frac\gamma2}\hat\sigma_L(X),\;\;\hat\theta_{\frac{\alpha-\gamma}2}(X;\hat\eta)+c_{1-\frac\gamma2}\hat\sigma_U(X)\Big],
> $$
> where $c_{1-\gamma/2}$ is the $1-\gamma/2$ quantile of $N(0,1)$ and $\hat\sigma_L,\hat\sigma_U$ are delta-method standard errors of the two endpoint estimators (endpoint labelling follows the convention in the warning above). If the model for $p$ is correctly specified, Bonferroni's inequality gives coverage at least $1-\alpha$ in large samples. For a fully nonparametric $p$ (no asymptotically normal estimator), take an initial level-$(1-\gamma)$ confidence set $CS$ for $\eta$ and use $\big[\inf_{\eta\in CS}\hat\theta_{\text{lower}}(X;\eta),\;\sup_{\eta\in CS}\hat\theta_{\text{upper}}(X;\eta)\big]$ at level $\alpha-\gamma$.

^thm-bonferroni

I reconstructed the exact endpoint indices from the surrounding text (subscripts were not recoverable from the PDF text layer); the structure (level $\alpha-\gamma$ on the quantile, normal critical value at $\gamma$) follows the stated Bonferroni logic: total miss probability $(\alpha-\gamma)+\gamma=\alpha$.

## Examples

Fig 4 example above; empirical use in the economics lab data: the paper's Fig 6 compares original, adjusted (using $\bar p=0.029$) and replication estimates for 18 studies ([[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]).

## Connections

- Where $p$ comes from: [[Andrews Kasy 2019 - Identification Using Replication Studies]], [[Andrews Kasy 2019 - Identification Using Meta-Studies]].
- Selection-adjusted inference is the frequentist cousin of shrinkage in hierarchical models: [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]].
- The winner's-curse flavour of the problem: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

### Relevance to marketing measurement

For a reported lift with $z\approx2$ from a library with a known preference for significant winners, the corrected estimate is roughly a third of the headline in the paper's stylised model ($0.72$ vs $2.0$ in z units). Using such a corrected value, with its wider interval, as an informative prior in a Bayesian MMM is more defensible than the raw headline number. Choosing $p$ is the hard part; the paper's identification results are how to estimate it.

## See Also

- [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Bayesian Estimation and Priors for MMM]]
