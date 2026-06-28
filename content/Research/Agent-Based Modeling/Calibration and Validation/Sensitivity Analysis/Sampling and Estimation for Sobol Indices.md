---
title: Sampling and Estimation for Sobol Indices
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[raw/Review of Global Sensitivity Analysis Methods 2024.pdf]]"
source_location: "Sec. 1.1.2-1.1.3 (FAST, RBD/FAST_RBD), Method (SALib), Table 1, pp. 3-7"
date_ingested: 2026-06-28
folder: "Agent-Based Modeling/Calibration and Validation/Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
  - "[[Global Sensitivity Analysis - Overview]]"
used_by:
  - "[[Morris Elementary Effects Screening]]"
aliases:
  - Saltelli Sampling
  - Sobol Estimation
  - FAST
  - Fourier Amplitude Sensitivity Test
  - RBD
  - SALib
  - Sample Cost
---

# Sampling and Estimation for Sobol Indices

> [!summary]
> Sobol indices are integrals that must be **estimated** from model runs. The **Saltelli scheme** builds two independent sample matrices $A$ and $B$ plus $p$ hybrid matrices $A_B^{(i)}$, giving first- and total-order indices at a cost of **$N(p+2)$ model evaluations** (or $N(2p+2)$ if second-order indices are also wanted). **FAST** (Fourier Amplitude Sensitivity Test) instead encodes each factor on a distinct integer frequency and recovers variance shares from the **Fourier spectrum** of the output, often converging faster than Monte-Carlo Sobol; **RBD/FAST_RBD** use a single frequency with random permutations to cut cost in high dimensions. All are implemented in the Python **SALib** library used by the paper.

## Overview

The variance terms behind $S_i$ and $S_{Ti}$ (see [[Variance-Based Sensitivity and Sobol Indices]]) are conditional-variance integrals with no closed form for a general simulator, so they are estimated numerically. The paper's case study used the **Sensitivity Analysis Library in Python (SALib)** for all methods. Two estimation routes dominate: **Monte-Carlo with the Saltelli design** (Sobol) and **spectral analysis** (FAST/RBD).

## Main Content

> [!definition] Saltelli sampling scheme & cost ^saltelli-scheme
> Draw two independent $(N \times p)$ quasi-random (Sobol-sequence) matrices $A$ and $B$. For each factor $i$, form $A_B^{(i)}$ = matrix $A$ with **only column $i$ replaced by column $i$ of $B$**. Running the model on $A$, $B$, and all $p$ matrices $A_B^{(i)}$ yields estimators
> $$
> V_i \approx \frac{1}{N}\sum_{j=1}^{N} f(B)_j\,\big(f(A_B^{(i)})_j - f(A)_j\big), \qquad
> E[V(Y\mid X_{\sim i})] \approx \frac{1}{2N}\sum_{j=1}^{N}\big(f(A)_j - f(A_B^{(i)})_j\big)^2
> $$
> giving $S_i = V_i/V(Y)$ and $S_{Ti}=1-\dfrac{V(\mathbb{E}[Y\mid X_{\sim i}])}{V(Y)}$.
> **Total model evaluations = $N(p+2)$** for first- + total-order; **$N(2p+2)$** if second-order $S_{ij}$ are also estimated. $N$ is the base sample size (often $N=2^m$, e.g. 1024).

> [!definition] FAST — Fourier Amplitude Sensitivity Test ^fast
> FAST "is based on periodic search sampling using a period search function and applies a decomposition of variance based on Fourier Transform." Each factor is driven along a search curve at a distinct **integer frequency** $\omega_i$:
> $$
> X_i(s_j) = G_i\!\big(\sin(\omega_i s_j)\big),\quad Y = f\big(X_1(s),\dots,X_k(s)\big)
> $$
> By Parseval's theorem the output variance is recovered from Fourier coefficients $A_p, B_p$:
> $$
> V(Y) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f^2(s)\,ds - [\mathbb{E}(Y)]^2 \approx 2\sum_{p=1}^{\infty}\big(A_p^2 + B_p^2\big)
> $$
> and the first-order index reads off the spectral power at $X_i$'s frequency and its harmonics:
> $$
> S_i = \frac{V_i}{V(Y)} \approx \frac{\sum_{q=1}^{M}\big(A_{q\omega_i}^2 + B_{q\omega_i}^2\big)}{\sum_{i=1}^{n}\sum_{q=1}^{M}\big(A_{q\omega_i}^2 + B_{q\omega_i}^2\big)}, \qquad S_{Ti} = S_i + S_{i,\sim i}.
> $$
> FAST "achieves a better estimate in terms of robustness and speed of convergence than Sobol" and handles nonlinear, non-monotonic models.

> [!definition] RBD and FAST_RBD (HFR) ^rbd
> As $p$ grows, classic FAST suffers error and cost from resolving all higher-order harmonics. **RBD** uses a **single frequency $\omega$ for all parameters** (set to 1 for simplicity) with **random permutation** of the sample-point coordinates to restore stochasticity:
> $$
> X_i(s_j) = G_i\!\big(\sin(\omega s_{i_j})\big),\quad i=1,\dots,k.
> $$
> **Hybrid FAST_RBD (HFR)** groups the $k$ parameters into equal partitions, assigning one frequency per partition — "a balance between the accuracy of FAST and the computational efficiency of RBD."

> [!theorem] Choosing a budget (case-study sampling sizes) ^budget-table
> Table 1 of the paper lists the sample sizes used (MNIST, 784 factors):
> | Method | Samples |
> |---|---|
> | Morris | 50 (in 4 levels) |
> | Sobol | 300 |
> | FAST | 100 |
> | RBD | 400 |
> | Delta | 1000 |
> | DGSM | 1000 |
>
> These were grid-searched "to strike a balance between optimizing performance and minimizing the number of samples required." General rule: **Morris screens cheapest; FAST/RBD are economical for first-order; full Sobol total-effect is the most expensive but most informative** ($N(p+2)$).

> [!definition] SALib ^salib
> The **Sensitivity Analysis Library (SALib)** in Python (https://salib.readthedocs.io) implements Morris, Sobol (Saltelli sampling), FAST, RBD-FAST, Delta (DMIM), and DGSM. Typical pattern: define a `problem` dict (names, bounds), call the method's `sample()` to generate the design, run the model on every row, then `analyze()` to obtain $S_i$, $S_{Ti}$ (Sobol) or $\mu^*$, $\sigma$ (Morris).

## Examples

Quantifying 5 surviving ABM parameters (after Morris screening, see [[Morris Elementary Effects Screening]]) with Sobol at $N=1024$:

- Cost = $N(p+2) = 1024 \times 7 = 7168$ model runs for first- + total-order.
- Adding second-order indices would cost $N(2p+2)=1024\times12=12288$ runs.
- If each ABM run takes 30 s, that is ~60 h serial — motivating either a coarser $N$, a FAST/RBD first-order screen, or a cheap emulator. SALib code:
  ```python
  from SALib.sample import saltelli
  from SALib.analyze import sobol
  param_values = saltelli.sample(problem, 1024)      # -> N(p+2) rows
  Y = run_abm(param_values)                          # one output per row
  Si = sobol.analyze(problem, Y)                     # Si['S1'], Si['ST']
  ```

## Connections

- [[Variance-Based Sensitivity and Sobol Indices]] — the indices these schemes estimate.
- [[Global Sensitivity Analysis - Overview]] — cost positions Sobol/FAST in the screen-then-quantify pipeline.
- [[Morris Elementary Effects Screening]] — cheap pre-screen that shrinks $p$ and thus Saltelli cost.
- [[Uncertainty Quantification for ABM Calibration]] — emulators/surrogates make large Saltelli budgets feasible for ABMs.
- [[Approximate Bayesian Computation for ABMs]] — shared reliance on many simulator runs / quasi-random designs.

## See Also

- [[History Matching for ABMs]] — emulator-based designs amortize the run budget GSA needs.
- Saltelli (2002), "Making best use of model evaluations to compute sensitivity indices."
- Tarantola, Gatelli & Mara (2006), "Random balance designs for the estimation of first order global sensitivity indices."
