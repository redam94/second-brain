---
title: "Caron 2012 - Plackett-Luce Model for Full Rankings"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Sec. 4, pp. 10-11"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]"
used_by:
  - "[[Caron 2012 - Experiments NASCAR and Chess]]"
aliases:
  - Plackett-Luce EM and Gibbs
  - exploded logit ranking model
---

# Caron 2012 - Plackett-Luce Model for Full Rankings

> [!summary]
> The Plackett-Luce (PL) model generalises Bradley-Terry to ranked lists: pick the winner among all items with probability proportional to skill, remove it, repeat. A latent exponential variable per ranking *position* gives a Gamma Gibbs sampler and Hunter's MM update as EM.

## Overview

Racing results, preference orderings from surveys, and ranked search results are lists $\rho_i=(\rho_{i1},\dots,\rho_{ip_i})$ over $p_i\le K$ of the $K$ items. PL is the "exploded logit" of choice modelling: a sequence of multinomial-logit choices from shrinking choice sets ([[Discrete Choice Models]]).

## Main Content

> [!definition] Plackett-Luce likelihood
> $$
> P(\rho_i\mid\lambda)=\prod_{j=1}^{p_i-1}\frac{\lambda_{\rho_{ij}}}{\sum_{k=j}^{p_i}\lambda_{\rho_{ik}}}.
> $$
> The last position contributes a factor 1, so only $p_i-1$ stages appear.
> ^def-plackett-luce

> [!definition] Latent variables
> For each ranking $i$ and stage $j=1,\dots,p_i-1$: $Z_{ij}\sim\text{Exp}\bigl(\sum_{k=j}^{p_i}\lambda_{\rho_{ik}}\bigr)$ (waiting time until the first of the remaining items arrives).
> Complete log-likelihood: $\ell(\lambda,z)=\sum_i\sum_{j<p_i}\bigl[\log\lambda_{\rho_{ij}}-(\sum_{k\ge j}\lambda_{\rho_{ik}})z_{ij}\bigr]$.
> ^def-pl-latent

> [!theorem] EM and Gibbs for Plackett-Luce
> Let $w_k$ = number of rankings in which item $k$ is *not* in the last position, and $\delta_{ijk}=\mathbf 1\{k\in\{\rho_{ij},\dots,\rho_{ip_i}\}\}$.
> - EM (MAP, prior $\mathcal G(a,b)$): $\displaystyle\lambda_k^{(t)}=\frac{a-1+w_k}{\,b+\sum_{i=1}^n\sum_{j=1}^{p_i-1}\delta_{ijk}\Big/\sum_{k'=j}^{p_i}\lambda^{(t-1)}_{\rho_{ik'}}}$. For $a=1,b=0$ this is the Hunter (2004, p. 398) MM update.
> - Gibbs: $Z_{ij}\sim\text{Exp}(\sum_{k\ge j}\lambda_{\rho_{ik}}^{(t-1)})$, then $\lambda_k\sim\mathcal G\bigl(a+w_k,\;b+\sum_{i,j}\delta_{ijk}Z_{ij}\bigr)$.
> ^thm-pl-em-gibbs

*Proof sketch.* The numerator count $w_k$ is the number of stages at which $k$ is the "winner"; the rate accumulates exposure $\sum\delta_{ijk}Z_{ij}$. This is the Poisson-process/exponential-family analogue of a Gamma-Poisson conjugate pair.

**Extensions** (stated in the paper): mixtures of PL models (Gormley & Murphy 2008) reuse the same augmentation for the within-component update.

## Examples

> [!example] Ranking four creatives
> **Setup.** Five panelists rank creatives A-D: ABCD, ABCD, BACD, ABCD, ACBD. Flat prior.
> **Solution.** Wins in the sense of $w_k$: A is not last in 5 rankings, B in 5, C in 5, D in 0 (D is last in all five). So $w_D=0$ and the MLE for $\lambda_D$ is zero; the MLE does not exist as a finite positive value. Under the Gamma prior ($a>1$), $\lambda_D$ gets the posterior $\mathcal G(a+0,\,b+\ldots)$, positive and shrunk.
> **Interpretation.** This is exactly the NASCAR issue (drivers always last) discussed in [[Caron 2012 - Experiments NASCAR and Chess]]; Hunter's MLE required deleting such drivers, the Bayesian model does not.
> ^ex-pl-creatives

```python
import numpy as np
def pl_em(rankings, K, a=1.0, b=0.0, iters=300):
    lam = np.full(K, 1.0/K)
    w = np.zeros(K)
    for r in rankings:
        for k in r[:-1]: w[k] += 1
    for _ in range(iters):
        denom = np.full(K, b)
        for r in rankings:
            tail = np.array([lam[r[j:]].sum() for j in range(len(r)-1)])
            for j in range(len(r)-1):
                for k in r[j:]: denom[k] += 1.0/tail[j]
        lam = (a-1+w)/denom
        lam /= lam.sum()
    return lam
print(pl_em([[0,1,2,3],[0,1,2,3],[1,0,2,3],[0,1,2,3],[0,2,1,3]], 4, a=2, b=3))
```

PyMC-style sketch (untested): PL log-likelihood can be written with `pm.math.logsumexp` over suffix sets, or via `pm.Potential`; E67 applies it to Formula 1 finishing orders.

## Connections

- PL with covariates is a rank-ordered (exploded) multinomial logit; see [[Discrete Choice Models]] and [[Random Coefficients Logit Model]] for heterogeneity beyond mixtures.
- PL is the likelihood behind some RLHF reward-model objectives when more than two responses are ranked ([[Reward Modeling from Human Preferences]]).

## See Also

[[Caron 2012 - Home Advantage, Ties and Team Comparisons]] · [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]]
