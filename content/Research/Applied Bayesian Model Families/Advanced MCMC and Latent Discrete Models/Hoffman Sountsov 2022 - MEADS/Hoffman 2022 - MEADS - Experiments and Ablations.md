---
title: "Hoffman 2022 - MEADS - Experiments and Ablations"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/example
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Sec. 5-6, pp. 7-9; Tables 1-2; Fig. 3; Appendices A-B"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]"
used_by:
aliases:
  - "MEADS experiments"
  - "MEADS Table 2"
  - "MEADS ablations"
---

# Hoffman 2022 - MEADS - Experiments and Ablations

> [!summary]
> On eight Inference Gym targets, MEADS reaches low bias in fewer gradient evaluations than NUTS on 7 of 8 and than ChEES-HMC on about half (it is 5 to 10% off best on several). Per-chain asymptotic efficiency (grads/ESS) is comparable to the others. Ablations over the step-size multiplier (0.2-0.7), damping slowdown (0.5-5) and folds (2, 4, 8) show the defaults 0.5, 1 and 4 are reasonable everywhere.

## Overview

Implementation: MEADS and ChEES-HMC in JAX on the FunMC API; NUTS from TensorFlow Probability; TPU v2 with precision HIGHEST (avoids bfloat16 matmul). All adapt per-dimension step sizes (MEADS from neighbour-fold standard deviations; ChEES/NUTS from an exponential moving average of first and second moments with decay $\beta=t/(t+8)$). ChEES and NUTS step sizes use Adam (lr 0.05) to tune the cross-iteration average of the cross-chain harmonic-mean acceptance toward about 0.8; ChEES trajectory length uses Adam lr 0.025. MEADS ran 15,000 iterations (thinned 10x) and ChEES/NUTS ran 500 iterations (adaptation frozen after 400). All used 128 chains (MEADS in four folds), 32 repetitions, initial states from 100 Adam iterations on $-\log p$ (lr 0.05).

## Main Content

> [!definition] Transient-bias metric (eq. 8)
> For statistic $f$ (here $f(\theta_d)=\theta_d^2$, sensitive to both mean and variance errors), estimate $\mathbb E[f(\theta_{t,d})]$ by averaging across 32 repetitions and 128 chains ($4096$ draws, giving squared error of order $\sigma_{f,d}^2/4096$), take $\mathbb E[f(\theta_{\infty,d})]$ from the last 100 NUTS samples over all chains and runs, and report
> $$
> \text{bias}^2_{f,t}=\max_d\big(\hat f_{t,d}-\mathbb E[f(\theta_{\infty,d})]\big)^2/\sigma^2_{f,d}.
> $$
> "Low bias" means $\le0.01$ (a hundredth of posterior variance; harmless for total ESS of about 100); "very low" means $\le0.002$ (ESS of about 500).
^def-bias-metric

### Table 1: targets (Inference Gym)

| Short name | Full name | Dim |
|---|---|---|
| Banana | Banana | 2 |
| Gaussian | IllConditionedGaussian | 100 |
| Logistic | GermanCreditNumericLogisticRegression | 25 |
| Sparse | GermanCreditNumericSparseLogisticRegression | 51 |
| Radon | RadonContextualEffectsHalfNormalIndiana | 91 |
| Brownian | BrownianMotionUnknownScalesMissingMiddleObservations | 32 |
| IRT | SyntheticItemResponseTheory | 501 |
| Volatility | VectorizedStochasticVolatilityLogSP500 | 2519 |

### Table 2: gradients to low bias and grads/ESS

| Target | Low bias: NUTS | ChEES | MEADS | Very low: NUTS | ChEES | MEADS | Grads/ESS: NUTS | ChEES | MEADS |
|---|---|---|---|---|---|---|---|---|---|
| Banana | 220 | 164 | 290 | 425 | 253 | 420 | 156 | 448 | 386 |
| Gaussian | 9746 | 5038 | 5420 | 13710 | 7180 | 8430 | 3230 | 1316 | 941 |
| Logistic | 40 | 29 | 20 | 56 | 43 | 30 | 25 | 10 | 25 |
| Sparse | 2616 | 1068 | 510 | 4200 | 1334 | 1040 | 888 | 716 | 634 |
| Radon | 2229 | 1422 | 1470 | 3164 | 1721 | 2040 | 874 | 183 | 517 |
| Brownian | 2059 | 500 | 310 | 2447 | 682 | 380 | 580 | 582 | 309 |
| IRT | 1062 | 437 | 690 | 1801 | 659 | 840 | 398 | 373 | 588 |
| Volatility | 4073 | 2980 | 2760 | - | - | - | 146 | 180 | 315 |

(Volatility "very low bias" is unavailable: dimension too high to estimate small biases. Bold entries within 10% of best in the original are not marked here.)

> [!theorem] Reading Table 2 (computed)
> - **Low bias:** MEADS is best or within 10% on Logistic (20 vs 29/40), Sparse (510 vs 1068/2616), Brownian (310 vs 500/2059), Radon (1470 vs 1422, within 4%) and Volatility (2760 vs 2980/4073). ChEES is best on Banana (164 vs 290/220) and Gaussian (5038 vs 5420, MEADS 8% behind) and on IRT (437 vs 690/1062). MEADS needs fewer gradients than NUTS on every target except Banana (290 vs 220).
> - **Speed-up factors over NUTS (low bias):** Sparse 5.1x, Brownian 6.6x, Logistic 2.0x, Gaussian 1.8x, IRT 1.5x, Volatility 1.5x, Radon 1.5x.
> - **Asymptotics:** grads/ESS is "generally comparable to grads to very low bias", so for many-chain workflows convergence speed matters more than asymptotic per-chain ESS (Monte Carlo error scales inversely with both per-chain ESS and number of chains, and there is little point in beating posterior uncertainty). ChEES on Radon has substantially lower grads/ESS (183), likely reflecting poor early preconditioning.
^thm-table2-reading

> [!example] Figure 3 interpretation (sparse logistic regression)
> Squared bias vs gradient evaluations on a log axis: bias decays roughly exponentially for all three samplers until it falls below the detection floor (about $10^{-3}$ with 4096 samples). MEADS crosses the 0.01 and 0.002 thresholds first (510 and 1040 gradients per Table 2), ChEES next (1068 and 1334), NUTS last (2616 and 4200). Other targets are in Appendix B / Figure 7.
^ex-figure3

### Appendix A: ablations
MEADS has three user-selectable constants: step-size multiplier (0.5), damping slowdown (1.0), number of folds $K$ (4). Metric: gradients to bias$^2<0.01$.
1. **Step-size multiplier 0.2-0.7:** 0.5 is reasonable everywhere though occasionally conservative (IRT, stochastic volatility).
2. **Damping slowdown 0.5, 1, 2, 5:** 1 is reasonable; stochastic volatility would prefer a more conservative ramp-up of momentum.
3. **Folds 2, 4, 8:** four is consistently better than two (two folds leave half the chains idle; idle chains are charged the same cost as active ones, assuming parallel resources); eight has little effect. The apparent large effect on logistic regression is a quantisation artifact from thinning by 10.

### Appendix B
Figure 7 shows bias curves for all targets; once true bias is tiny the estimate is variance-dominated and cannot be measured.

### Discussion (Sec. 6)
MEADS makes turnkey GHMC competitive with turnkey HMC. Future directions: interleave GHMC with Gibbs steps on discrete latents (Neal 2020), quasi-Newton preconditioning (Zhang and Sutton 2011; Leimkuhler et al. 2018), stochastic gradients.

```python
import numpy as np
cols = ["NUTS","ChEES","MEADS"]
low = {"Banana":(220,164,290),"Gaussian":(9746,5038,5420),"Logistic":(40,29,20),"Sparse":(2616,1068,510),
       "Radon":(2229,1422,1470),"Brownian":(2059,500,310),"IRT":(1062,437,690),"Volatility":(4073,2980,2760)}
for k,v in low.items(): print(k, "MEADS speed-up vs NUTS: %.1fx" % (v[0]/v[2]), "best:", cols[int(np.argmin(v))])
```

## Examples (PyMC-style / marketing)

E86 reports GPU vs CPU timing by chains and size for a 20,000-cell log-Gaussian Cox process; the practical lesson that carries from Table 2 is that fixed per-chain cost is small compared with convergence cost, so judge samplers by gradients to low bias and by wall-clock at your chain count, not by ESS/s alone. For marketing models (hierarchical MMM with $10^3$-$10^5$ latents) the same logic applies when one gradient is a batched matrix product.

## Connections

Algorithms: [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]. Baseline: [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]. Stochastic volatility as an inference-frontier target: [[Stochastic Volatility and the Inference Frontier]].

## See Also
[[Hoffman 2022 - MEADS - Overview]], [[Hoffman 2021 - ChEES-HMC - Overview]]
