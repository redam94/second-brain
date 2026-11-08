---
title: "Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 1.1 Summary of Results (Tables 1-2, pp. 3-4), Sec. 7 Example (Figure 1, pp. 18-19), Sec. 8 Conclusion (pp. 19-20)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Histogram Release Mechanisms]]"
  - "[[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]"
  - "[[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]"
used_by: []
aliases:
  - Wasserman Zhou results tables
  - Private histogram simulation Beta(10,10)
  - Open questions in statistical differential privacy
---

# Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions

> [!summary]
> The paper's two results tables compare releases by convergence rate: only perturbation under $L_2$ loss reaches the minimax rate. The Beta(10,10) simulation shows that even the minimax-rate perturbed histogram has integrated squared error several times to over ten times that of the non-private histogram, grows with the number of bins, and depends mainly on $n\alpha$ (with $m$): the constants and the bin count matter, not just the rate. Four open questions close the paper.

## Overview

Rates are the paper's yardstick for comparing mechanisms: "it is useful to compare these schemes by computing the rate of convergence of distributions and densities constructed from the released data." Rates hide constants, so the simulation (Sec. 7) is essential for practice.

## Main Content

### Table 1 (p. 4) - data in $\mathbb{R}^r$, Lipschitz density

| Distance | smoothed histogram | perturbed histogram | exponential mechanism | minimax rate |
|---|---|---|---|---|
| $L_2$ | $n^{-2/(2r+3)}$ | $n^{-2/(2+r)}$ | NA (see Table 2 for $r=1$) | $n^{-2/(2+r)}$ |
| Kolmogorov-Smirnov | $\sqrt{\log n}\times n^{-2/(6+r)}$ | $\log n\times n^{-2/(2+r)}$ ($\sqrt{\log n/n}$ for $r=1$) | $n^{-1/3}$ | $n^{-1/2}$ |

### Table 2 (p. 4) - $r=1$, density in a Sobolev space of order $\gamma$, squared $L_2$ only

| Distance | exponential mechanism | perturbed orthogonal series estimator | minimax rate |
|---|---|---|---|
| $L_2$ | $n^{-\gamma/(2\gamma+1)}$ | $n^{-2\gamma/(2\gamma+1)}$ | $n^{-2\gamma/(2\gamma+1)}$ |

**Paper's reading (p. 4).** "In general, privacy schemes seem not to yield minimax rates. Two exceptions are perturbation methods evaluated under $L_2$ loss which do yield minimax rates. An open question is whether the slower than minimax rates are intrinsic to the privacy methods. It is possible, for example, that our rates are not tight. This question could be answered by establishing lower bounds on these rates."

### Exponents by dimension (own derived comparison)

Exponent $e$ in the rate $n^{-e}$ (larger is better; log factors ignored):

| $r$ | $L_2$ smoothed $\frac{2}{2r+3}$ | $L_2$ perturbed = minimax $\frac2{2+r}$ | KS smoothed $\frac2{6+r}$ | KS perturbed $\min(\frac2{2+r},\frac12)$ | KS exponential mech. | KS minimax |
|---|---|---|---|---|---|---|
| 1 | 0.400 | 0.667 | 0.286 | 0.500 | 0.333 | 0.5 |
| 2 | 0.286 | 0.500 | 0.250 | 0.500 | 0.333 | 0.5 |
| 3 | 0.222 | 0.400 | 0.222 | 0.400 | 0.333 | 0.5 |
| 4 | 0.182 | 0.333 | 0.200 | 0.333 | 0.333 | 0.5 |
| 5 | 0.154 | 0.286 | 0.182 | 0.286 | 0.333 | 0.5 |
| 6 | 0.133 | 0.250 | 0.167 | 0.250 | 0.333 | 0.5 |

Observations (derived): perturbation dominates for $L_2$ at every $r$; for KS, perturbation beats the exponential mechanism for $r\le3$, ties (up to $\log n$) at $r=4$, and loses for $r\ge5$ (the exponential mechanism's $n^{-1/3}$ does not depend on dimension). The paper's remark that "the exponential mechanism based method achieves a better rate [than perturbation in KS distance]" therefore holds only for $r\ge5$; the smoothed histogram is dominated by the exponential mechanism for all $r$ in the KS column. All schemes degrade with $r$ because the Lipschitz-class minimax rate $n^{-2/(2+r)}$ does (curse of dimensionality), while the private overhead stays within a log factor for perturbation.

### Section 7 - the simulation (pp. 17-19)

> [!example] Beta(10,10) histogram study (Fig. 1)
> **Setup.** $r=1$; true density Beta$(10,10)$; sample sizes $n=100$ and $n=1000$; privacy levels $\alpha=0.1$ and $\alpha=0.01$; $\rho$ = squared-error distance; the perturbed-histogram release (Sec. 4.2); 1,000 simulations for numbers of bins $m=5,\dots,25$. Figure 1 plots the mean integrated squared error of the histogram against $m$: lower line = histogram from the original data, upper line = perturbed histogram.
> **Results as read from Figure 1 (approximate values read off the plotted curves).**
>
> | $n$ | $\alpha$ | perturbed MISE at $m=5$ | at $m=25$ | non-private MISE (any $m$) |
> |---|---|---|---|---|
> | 100 | 0.1 | $\approx1.0$ | $\approx3.1$ | $\approx0.15$-$0.25$ |
> | 100 | 0.01 | $\approx3.1$ | $\approx4.3$ | $\approx0.15$-$0.25$ |
> | 1000 | 0.1 | $\approx0.25$ | $\approx0.3$ | $\approx0.03$-$0.25$ |
> | 1000 | 0.01 | $\approx0.9$ | $\approx3.0$ | $\approx0.03$-$0.25$ |
>
> **Paper's conclusions.** Smaller $\alpha$ induces larger information loss. "Despite the fact that the perturbed histogram achieves the minimax rate, the error is substantially inflated by the perturbation. This means that the constants in the risk are important, not just the rate." The risk of the sanitised histograms is much more sensitive to the number of cells than that of the original histogram. A repeat with a bimodal density (equal mixture of Beta(10,3) and Beta(3,10)) gave nearly identical results.
^ex-wz-simulation

**Re-running the study (own code, 200 replications; the paper used 1,000).** Integrated squared error against the true Beta(10,10) density, with the non-private histogram in parentheses:

| $n$ | $\alpha$ | $m=5$ | $m=15$ | $m=25$ |
|---|---|---|---|---|
| 100 | 0.1 | 0.95 (0.26) | 2.21 (0.16) | 2.95 (0.23) |
| 100 | 0.01 | 3.18 (0.26) | 4.18 (0.16) | 4.15 (0.23) |
| 1000 | 0.1 | 0.25 (0.23) | 0.17 (0.05) | 0.32 (0.04) |
| 1000 | 0.01 | 0.82 (0.23) | 2.42 (0.05) | 3.01 (0.03) |

This reproduces Figure 1 closely (for example $n=100$, $\alpha=0.1$: 0.95 to 2.95 versus the plotted 1.0 to 3.1).

**Own observation: error is governed by $n\alpha$.** The Laplace noise per bin has sd $\approx2\sqrt2/\alpha$ while the typical count per bin is $n/m$, so the noise-to-signal ratio is of order $m/(n\alpha)$. The table confirms it: $(n,\alpha)=(100,0.1)$ and $(1000,0.01)$ share $n\alpha=10$ and have similar perturbed errors (0.95 vs 0.82 at $m=5$, 2.95 vs 3.01 at $m=25$) although their non-private errors differ (0.23 vs 0.23 at $m=5$, 0.23 vs 0.03 at $m=25$). In practice, 10 times less privacy budget costs about as much accuracy as 10 times less data.

```python
import numpy as np
from scipy.stats import beta
rng = np.random.default_rng(1)

def mise(n, alpha, m, reps=200):
    grid = np.linspace(0, 1, 2001); truth = beta.pdf(grid, 10, 10)
    idx = np.minimum((grid * m).astype(int), m - 1)
    e_np, e_p = [], []
    for _ in range(reps):
        X = rng.beta(10, 10, n)
        C = np.histogram(X, bins=m, range=(0, 1))[0]
        D = np.maximum(C + rng.laplace(0, 2 / alpha, m), 0)             # Lap(2/alpha) per bin, clip at 0
        q = D / D.sum() if D.sum() > 0 else np.full(m, 1 / m)
        e_np.append(np.trapezoid((truth - (C / n)[idx] * m) ** 2, grid))
        e_p.append(np.trapezoid((truth - q[idx] * m) ** 2, grid))
    return np.mean(e_np), np.mean(e_p)

for n in (100, 1000):
    for a in (0.1, 0.01):
        print(n, a, [tuple(round(v, 2) for v in mise(n, a, m)) for m in (5, 15, 25)])
```

### Section 8 - conclusion and open questions (pp. 19-20)

The paper presents DP "in statistical language" and shows that loss functions based on distributions and densities compare mechanisms usefully. Sampling from a histogram yields DP if the histogram is shifted away from $0$ by $\delta$ or cells are perturbed; the latter attains the faster $L_2$ rate but "the risk can nonetheless be quite large", and the choice of the smoothing parameter (the number of cells) matters more for the sanitised than for the original histogram. The connection between DP and small ball probabilities "has not been observed before". No complete minimax theory for DP exists yet and that is the authors' ongoing work.

> [!remark] Open questions listed (pp. 19-20)
> 1. When is it possible for $\rho(F,\hat F_Z)$ to have the same rate as $\rho(F,\hat F_X)$?
> 2. When adaptive minimax methods are used, such as adapting to $\gamma$ in Sec. 6, or wavelet estimation methods, is some form of adaptivity preserved after sanitisation?
> 3. Many statistical methods involve risk minimisation (for example choosing a bandwidth by cross-validation). What is the effect of sanitisation on these procedures?
> 4. Are there other, better methods of sanitisation that preserve differential privacy?
^rem-wz-open-questions

*Later developments (outside the paper, from the companion sources):* the Gaussian and advanced-composition machinery of [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] and the minimax-rate programme for private estimation address parts of questions 1 and 4; they are not captured here.

## Examples

**Choosing the bin count under privacy (own illustration using the table above).** For $n=100$, $\alpha=0.1$ the non-private optimum is around $m=15$ (MISE 0.16), but the private optimum is the smallest $m$ tried ($m=5$, MISE 0.95) and likely below. Coarser bins are favoured because each bin carries Laplace noise of fixed size. A rule of thumb from the noise-to-signal ratio $m/(n\alpha)$: choose $m$ so that $n/m\gg2\sqrt2/\alpha$, i.e. the expected count per bin well above the noise sd; here $n/m\gg28$, which for $n=100$ means $m$ of about 3 or fewer.

## Connections

- **Marketing measurement.** The simulation is a template for sizing privatised reporting: decide cell granularity so that expected counts per cell are well above the noise scale ($\approx2\sqrt2/\alpha$ per cell for replace-one neighbours, $\approx\sqrt2/\alpha$ for add/remove). Reports that are too fine-grained are dominated by noise, and the noise is more damaging than the same cell sizes would suggest for non-private estimation. If the noise law is public, treat released cells as observations with known additive Laplace error in the hierarchical model (partial pooling across cells) rather than as exact data ([[Bayesian Estimation and Priors for MMM]], [[Geo-Experiment Design and Power Analysis]]).
- Open question 3 (the effect of sanitisation on cross-validation and tuning) matters in practice: hyperparameters tuned on privatised aggregates may select over-smooth models.

## See Also

- [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]]
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]]
- [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]
