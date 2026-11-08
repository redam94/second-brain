---
title: "Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/example
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Sec. 3 and 3.1-3.2, pp. 5-8; Table 1; Figure 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Hoffman 2021 - ChEES Criterion and Algorithm 1]]"
used_by:
  - "[[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]"
aliases:
  - "ChEES-HMC Table 1"
  - "ESS per gradient benchmark"
  - "GPU throughput V100"
---

# Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput

> [!summary]
> Seven targets (two synthetic, two prior-sampled models, three real-data models) compared on ESS per gradient evaluation across grid-searched HMC, NUTS, EHMC, ESJD-HMC and ChEES-HMC, plus a throughput study. ChEES-HMC wins 5 of 7 adaptive comparisons; GPU HMC throughput scales linearly to about 50 chains while NUTS has significantly higher control-flow overhead.

## Overview

Cost is measured two ways: gradient evaluations (hardware-independent) and wall-clock on a V100 GPU in the cloud. Setup for 3.1: 100 parallel chains, step size by dual averaging to harmonic-mean acceptance 0.651; initial step size by halving from 1.0 until a one-leapfrog proposal achieves harmonic-mean acceptance $\ge0.5$; 2000 iterations with 1000 warmup; a logarithmically spaced grid of fixed maximum trajectory lengths ("HMC Grid"); 10 runs for NUTS, EHMC, ESJD-HMC and ChEES-HMC. ESS (TensorFlow Probability) is computed for $\theta_d$ and $\theta_d^2$ (the latter matters for variances); the reported number is the minimum across statistics and dimensions of the median across chains, per gradient evaluation including warmup. NUTS and EHMC use padded batched implementations and only count useful gradients.

## Main Content

### Target distributions (eqs 11-16)

| Target | $D$ | Definition |
|---|---|---|
| Ill-conditioned Gaussian | 100 | eigenvalues of $\Sigma$ drawn from Gamma(shape 0.5, scale 1), random orthogonal basis; condition number about $1.3\times10^5$ |
| Banana | 2 | $\theta_1\sim\mathcal N(0,10)$, $\theta_2\sim\mathcal N(0.03(\theta_1^2-100),1)$ (transformed 2-D normal with non-convex level sets) |
| Logistic regression | 25 | German credit (numerical), $\theta\sim\mathcal N(0,I)$, $y_n\sim\text{Bernoulli}(\sigma(\theta^\top x_n))$ |
| Probit regression | 25 | same data, $y_n\sim\text{Bernoulli}(\Phi(\theta^\top x_n))$ |
| Sparse logistic regression | 51 | $\tau\sim\text{Gamma}(0.5,0.5)$, $\lambda_d\sim\text{Gamma}(0.5,0.5)$, $\beta_d\sim\mathcal N$, $y_n\sim\text{Bernoulli}(\sigma((\tau\lambda\circ\beta)^\top x_n))$; $\tau,\lambda$ sampled in log-space |
| Item-response theory | 501 | 1PL: $\delta\sim\mathcal N(3/4,1)$, $\beta_k,\alpha_j\sim\mathcal N(0,1)$, $y_n\sim\text{Bernoulli}(\sigma(\alpha_{j_n}-\beta_{k_n}+\delta))$; $J=100$ students, $K=400$ questions, $N=30{,}105$ responses; data drawn from the prior |
| Stochastic volatility | 3003 | Kim, Shephard and Chib (1998): $\sigma\sim\text{HalfCauchy}(0,2)$, $\mu\sim\text{Exp}(1)$, $\frac{\phi+1}{2}\sim\text{Beta}(20,1.5)$, $z_n\sim\mathcal N(0,1)$, $h_1=\mu+\sigma z_1/\sqrt{1-\phi^2}$, $h_{n>1}=\mu+\sigma z_n+\phi(h_{n-1}-\mu)$, $y_n\sim\mathcal N(0,e^{h_n/2})$; $N=3000$; data drawn from the prior |

> [!definition] Compared algorithms
> **HMC Grid**: jittered HMC with fixed average trajectory length, best over the grid (an oracle, not available in practice). **NUTS**: TFP implementation (Lao and Dillon 2019). **EHMC**: empirical HMC (Wu, Stoehr and Robert 2018), whose $L_0$ hyperparameter is set to NUTS's average leapfrog count (a pilot run not charged to EHMC). **ESJD-HMC**: identical to ChEES-HMC but ascending plain ESJD. **ChEES-HMC**: this paper.
^def-compared-algorithms

### Table 1: ESS per gradient evaluation

| Target | HMC Grid | NUTS | EHMC | ESJD-HMC | ChEES-HMC |
|---|---|---|---|---|---|
| Banana | 1.16e-2 | 4.62e-3 | 5.92e-3 | 4.22e-3 | 9.04e-3 |
| Gaussian | 4.50e-4 | 1.60e-4 | 1.70e-4 | 3.41e-4 | 4.80e-4 |
| Item-Response | 2.71e-3 | 1.19e-3 | 4.89e-4 | 2.46e-3 | 1.77e-3 |
| Logistic Regr. | 4.80e-2 | 2.45e-2 | 1.67e-2 | 3.44e-2 | 5.23e-2 |
| Probit Regr. | 4.95e-2 | 2.50e-2 | 1.58e-2 | 3.64e-2 | 5.19e-2 |
| Sparse Logistic | 9.49e-4 | 4.07e-4 | 7.00e-4 | 6.72e-4 | 5.36e-4 |
| Stochastic Vol. | 1.71e-3 | 6.95e-4 | 8.08e-5 | 1.16e-3 | 1.94e-3 |

(Standard errors, three each, are in the paper; omitted here. Entries are the minimum across dimensions and moments of median ESS, averaged over 10 runs.)

> [!theorem] Reading Table 1 (computed from the table)
> Ratio ChEES/NUTS: banana 1.96, Gaussian 3.0, IRT 1.49, logistic 2.13, probit 2.08, sparse logistic 1.32, stochastic vol. 2.79. ChEES-HMC beats NUTS on every target. Among adaptive methods it is best on 5 of 7 (Banana, Gaussian, logistic, probit, stochastic volatility; it slightly exceeds even the oracle grid on Gaussian, logistic, probit and stochastic volatility), loses to ESJD-HMC on IRT (1.77e-3 vs 2.46e-3), and to EHMC and ESJD-HMC on sparse logistic (7.00e-4 and 6.72e-4 vs 5.36e-4); in those two cases it is within a factor of two of the grid. ESJD-HMC twice slightly outperforms ChEES but underperforms more dramatically when it loses (e.g. banana). EHMC does not consistently beat NUTS; the authors suspect the contrary results of Wu et al. come from only looking at ESS for means, noting EHMC's ESS for means is more than twice its ESS for variances on the logistic target.
^thm-table1-reading

### Wall-clock study (3.2, Figure 3)

GPU runs: TFP HMC and NUTS with 10, 20, 50, 75, 100 chains on logistic, probit, IRT and stochastic volatility (synthetic and sparse-logistic targets omitted, the latter because its gradient costs the same as plain logistic). Each target/chain-count pair ran 3 times; Stan ran the same targets with 4 chains 60 times. Metric: total gradient evaluations per second summed across chains.

- GPU HMC throughput rises **linearly with chain count to at least 50 chains** on all targets, rooflining at about 75-100 chains only for the higher-dimensional IRT and stochastic-volatility targets.
- NUTS on GPU scales well with chains but has **significantly higher overhead** than HMC (elaborate control flow and padding).
- Stan's CPU NUTS has fine per-chain throughput but on a 4-core CPU cannot compete in total throughput.
- ChEES adaptation overhead is negligible, so it is not distinguished from HMC in Figure 3.

**Conclusion (paper).** ChEES-HMC on a GPU can yield ESS-per-second orders of magnitude higher than NUTS on a 4-core CPU.

```python
# Reproduce the ratio column of Table 1
import numpy as np
nuts  = np.array([4.62e-3,1.60e-4,1.19e-3,2.45e-2,2.50e-2,4.07e-4,6.95e-4])
chees = np.array([9.04e-3,4.80e-4,1.77e-3,5.23e-2,5.19e-2,5.36e-4,1.94e-3])
print(np.round(chees/nuts, 2))   # [1.96 3.   1.49 2.13 2.08 1.32 2.79]
```

## Examples

The stochastic-volatility row is the most relevant to quantitative finance and to **E12** ([[Hoffman 2021 - ChEES-HMC - Overview]]): $D=3003$ with 3000 latent log-volatilities is a funnel-prone state-space model, where ChEES-HMC reaches 1.94e-3 ESS/gradient vs 6.95e-4 for NUTS and 8.08e-5 for EHMC.

## Connections

See [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] for the algorithm; [[Hoffman 2022 - MEADS - Experiments and Ablations]] reuses several of these targets (plus Radon, Brownian motion) with a bias-vs-gradients metric.

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Betancourt 2015 - HMC for Hierarchical Models - Overview]]
