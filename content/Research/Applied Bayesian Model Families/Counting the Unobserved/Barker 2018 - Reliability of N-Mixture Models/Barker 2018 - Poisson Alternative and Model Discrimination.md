---
title: "Barker 2018 - Poisson Alternative and Model Discrimination"
tags:
  - source/ingested
  - topic/population-estimation
  - type/theorem
  - doc/paper
source: "[[raw/Barker 2018 - On the Reliability of N-Mixture Models for Count Data.pdf]]"
source_location: "Sec. 3 and 3.1, pp. 371-374, Eq. 3-4, Table 1, Fig. 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Barker 2018 - Reliability of N-Mixture Models"
doc_type: paper
depends_on:
  - "[[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]"
used_by:
  - "[[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]]"
aliases:
  - N-mixture nonidentifiability
  - double Poisson lognormal counterexample
---

# Barker 2018 - Poisson Alternative and Model Discrimination

> [!summary]
> If counts are Poisson given $N$ (sampling with replacement) only the product $\lambda=Np$ is estimable. Binomial and Poisson are near-identical for sparse counts, and a two-parameter double Poisson-lognormal model with identical first and second moments is often preferred or indistinguishable (within 1 AIC) from the generating N-mixture model: 82%, 59%, 41% of runs in scenarios A, B, C.

## Overview

Section 3 shows that what identifies $N$ and $p$ separately in N-mixtures is the binomial assumption, and that data are weak at checking it. Section 3.1 quantifies this by simulation.

## Main Content

### Single site, Poisson counts (Eq. 3-4)
> [!theorem] Identifiability fails under Poisson sampling
> Binomial: $n_j\mid N\overset{iid}{\sim}\text{Binomial}(N,p)$ gives $[n_1,\dots,n_J\mid N,p]=\prod_j\binom{N}{n_j}p^{n_j}(1-p)^{N-n_j}$, identifiable provided $p_1=\dots=p_J$ and binomial variation holds (Eq. 3). Poisson: $n_j\sim\text{Poisson}(Np)$ gives, with $t=\sum n_j$,
> $$
> [n_1..n_J\mid N,p]=\frac{t!}{\prod_j n_j!}\left(\frac1J\right)^{t}\times\frac{e^{-JNp}(JNp)^t}{t!}.\tag{4}
> $$
> The first factor does not involve $N$ or $p$ (the $n_j$ given $t$ are ancillary), and the second depends on $(N,p)$ only through $\lambda=Np$. So only $\lambda$ is estimable. Replication in space or time cannot repair this.
^thm-nmixture-poisson-nonid

Contrast: in capture-recapture, modelling counts as Poisson does not make abundance non-identifiable, because recaptures supply the extra information (Cormack 1992; Schofield and Barker 2016).

The Poisson is the limit of the binomial as $N\to\infty$, $p\to0$ with $Np=\lambda$ fixed. For sparse data (small $E[n_j]$) the two are near indistinguishable, which also explains the instability of the binomial fit when the sample mean and variance are close (Dennis et al. 2015). N-mixtures were designed for sparse data, so the Poisson alternative is plausible exactly where they are used.

### Site-level Poisson model (Eq. 6)
$$
[\{n_{ij}\}\mid\{\lambda_i\}]=\prod_{i=1}^{I}\prod_{j=1}^{J}\frac{e^{-\lambda_i}\lambda_i^{n_{ij}}}{n_{ij}!}.
$$
Same marginal mean=variance as the N-mixture marginal (Eq. 5), but covariances among counts at the same site are zero here and non-zero in the N-mixture; and conditional on $N_i$ the N-mixture allows variance below the mean while the Poisson does not. Under constant $p$, $\lambda_i/\lambda_h$ estimates relative abundance. The hierarchical model on $N_i$ is needed in N-mixtures *for identifiability*; the ability to separate $N_i$ from $p$ rests entirely on the covariance structure it induces.

### Discrimination by counterexample (Sec. 3.1)
> [!definition] Competing models
> Model 1 (N-mixture): $n_{ij}\mid N_i\sim\text{Binomial}(N_i,p)$, $N_i\sim\text{Poisson}(\nu)$.
> Model 2 (DPLN, double Poisson-lognormal): $n_{ij}\mid\lambda_i,\theta\sim\text{DoublePoisson}(\lambda_i,\theta)$ (Efron 1986), $\lambda_i\sim\text{Lognormal}(\mu,\sigma^2)$, with restriction $\theta=\mu/(\mu-\sigma^2)$. The double Poisson adds a dispersion parameter $\theta$ ($\theta>1$ under-dispersed, $\theta<1$ over-dispersed, $\theta=1$ Poisson). The restriction matches first and second moments with the N-mixture; it is for comparison, not recommended for fitting.
^def-nmixture-dpln

**Table 1 (moments common to both models).**

| Scenario | $\nu$ | $p$ | $\mu=E[n]$ | $\sigma^2=\text{Var}(n)$ | $\text{Cov}(n_{ij},n_{ik})$ |
|---|---|---|---|---|---|
| A | 30 | 0.1 | 3 | 3 | 0.3 |
| B | 30 | 0.3 | 9 | 9 | 2.7 |
| C | 30 | 0.5 | 15 | 15 | 7.5 |

(The covariance equals $\nu p^2$: $30\times0.01=0.3$, $30\times0.09=2.7$, $30\times0.25=7.5$.) Scenarios are ordered by decreasing realism. Realism check from the paper: the Swiss mallard data in R `unmarked` has 239 sites, 3 visits, mean count 0.24 and median 0; the great-tit data (Kery and Royle 2016, Ch. 6) has 263 sites, mean 6.45, median 4; the early simulation in Kery and Royle Ch. 6 has 150 sites, 2 visits, mean 1.0.

**Design.** 1000 simulations per model and scenario, 50 sites, $J=5$; both models fitted by marginal likelihood (2 marginal parameters each, so twice the log-likelihood difference is the AIC difference). Code is in the Biometrics supplement.

> [!example] Results (Figure 2, stated percentages)
> | Data generated by | Scenario A ($E[n]=3$) | Scenario B (9) | Scenario C (15) |
> |---|---|---|---|
> | N-mixture: double Poisson preferred or within 1 AIC | 82% | 59% | 41% |
> | Double Poisson: N-mixture preferred or within 1 AIC | 77% | 51% | 42% |
>
> **Interpretation.** Even at $E[n]=15$ with $J=5$ (far richer than typical data), the non-generating model is chosen or tied about 40% of the time, and "even in the best scenario we prefer the non-generating model about 25% of the time". Model fit alone cannot discriminate between families with very different implications for $N$ (cf. Gelman et al. 2014, p. 190).
^ex-nmixture-discrimination

## Examples

> [!example] Why the covariance carries the identification
> For the N-mixture, $\text{Cov}(n_{ij},n_{ik})=\text{Var}(N_i)p^2=\nu p^2$ and $E[n]=\nu p$. Given the empirical mean $m$ and within-site covariance $c$: $p=c/m$ and $\nu=m/p$. Under Poisson, $c=0$ so no $p$ exists. Sparse data make $c$ essentially unmeasurable (a few off-diagonal pairs of small counts), so $\hat p$ is dominated by noise: this is how the model produces $\hat N=\infty$ in Dennis et al. (2015).

```python
import numpy as np
rng = np.random.default_rng(0)
I, J, nu, p = 50, 5, 30, 0.1
N = rng.poisson(nu, I); n = rng.binomial(N[:, None], p, (I, J))
m = n.mean(); c = np.mean([np.cov(n[i, :], n[i, :][::-1])[0, 1] for i in range(I)])
# crude moment check: cov across visits within a site, pooled
cc = np.mean([(n[i, j]-m)*(n[i, k]-m) for i in range(I) for j in range(J) for k in range(J) if j != k])
print("mean", m, "pooled cross-visit cov", cc, "-> p_hat", cc/m, "(truth", p, ")")
```

## Connections

- Sparse-count N-mixture vs Poisson regression: [[Monsters and Mixtures]] (overdispersion).
- Model comparison caveats: [[Posterior Predictive Checking]].

## See Also

- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
- [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]]
