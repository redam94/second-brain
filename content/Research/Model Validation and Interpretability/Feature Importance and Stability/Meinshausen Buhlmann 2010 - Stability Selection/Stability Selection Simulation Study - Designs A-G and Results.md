---
title: "Stability Selection Simulation Study - Designs A-G and Results"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/simulation-studies
  - type/example
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §4 Numerical Results (pp. 17-20): designs (A)-(G) (pp. 17, 19), Fig. 5 (p. 17), Fig. 6 (p. 18), Fig. 7 (p. 19), results text (p. 20); per-cell values read from the figures"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection PFER Bound (Theorem 1) and Its Proof]]"
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
  - "[[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Stability Selection Figs 5-6 - Per-Cell Power Readings]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Stability Selection Numerical Results
  - Meinshausen-Buhlmann Simulation Designs
---

# Stability Selection Simulation Study - Designs A-G and Results

> [!summary]
> Seven design matrices (five simulated, two real: motif regression and riboflavin) with synthetic sparse $\beta$ give 64 scenarios. Each is run 100 times for the Lasso (regression and logistic classification) and OMP, each in three variants: plain, stability selection with subsampling, and stability selection with subsampling plus randomisation (Lasso $\alpha=0.5$, OMP $\alpha=0.9$). That is about 20,000 simulations per method. **Power:** stability selection recovers as many or more true variables (without any false one) than the base method in every design except the near-orthogonal design (A), where it is about equal. That is the paper's verdict. Plot readings confirm it for Lasso regression (Fig. 5 averages at $0.1s$: Lasso 0.40, SS 0.63, SS+rand 0.67). For classification and OMP (Fig. 6) they show a few exceptions outside (A), and the OMP gain is small. Randomisation helps most where many variables violate the irrepresentable condition (design E). **Error control:** on the real designs (F, G), stability selection with $E(V)\le2.5$ keeps nearly the same true-positive rate as CV-tuned Lasso while cutting false selections from about 11-75 down to about 0-2 ($\alpha=0.5$) or about 1.5-4 ($\alpha=1$).
^summary-ss-stability-selection-simulation-study-des

## Overview

§4 checks three things: (i) the power of stability selection relative to the best possible single-$\lambda$ solution of the base method, (ii) whether randomisation helps where theory predicts, and (iii) whether Theorem 1's bound holds when exchangeability is implausible. In ADEMP terms (see [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]):

| ADEMP | This study |
|---|---|
| **Aims** | Compare variable recovery and false-selection control of stability selection vs base selectors and CV |
| **Data-generating mechanisms** | 7 designs × sparsity $s$ × SNR (or Bayes error) × $n$ → 64 scenarios. Real X with synthetic $\beta$ for F-G |
| **Estimands** | The true support $S$ |
| **Methods** | Lasso, OMP (and logistic Lasso); + subsampling; + subsampling + randomisation; CV-Lasso (Fig. 7) |
| **Performance measures** | $P(\text{first }\lceil\gamma s\rceil\text{ correct})$ for $\gamma\in\{0.1,0.4\}$; average #false selections vs proportion of relevant variables selected |

## Main Content

### Designs (pp. 17, 19)

> [!definition] Design matrices (A)-(G) (§4)
> - **(A) Independent:** $p=1000$ i.i.d. $\mathcal N(0,1)$ predictors; $n=100$ and $1000$.
> - **(B) Block structure, 10 blocks:** $p=1000$, $X\sim\mathcal N(0,\Sigma)$ with $\Sigma_{km}=0.5$ if $k\equiv m\pmod{10}$ ($k\ne m$), else 0; $n=200$ and $1000$.
> - **(C) Toeplitz:** $p=1000$, $\Sigma_{km}=\rho^{|k-m|}$, $\rho=0.99$; $n=200$ and $1000$.
> - **(D) Factor model, 2 factors:** $X_k=f_{k,1}\phi_1+f_{k,2}\phi_2+\eta_k$ with $\phi_1,\phi_2,f_{k,\cdot},\eta_k$ i.i.d. $\mathcal N(0,1)$; $p=1000$ (the Fig. 5 header also lists a $p=100$ block); $n=200$ and $1000$.
> - **(E) Factor model, 10 factors:** as (D) with 10 factors.
> - **(F) Motif regression (real):** $p=660$ motif abundance scores, $n=2587$ genes, from a yeast heat-shock experiment (Conlon et al. 2003).
> - **(G) Riboflavin gene expression (real):** $p=4088$. The text says $n=158$; the Fig. 5 header and §2.2 give $n=115$.
^def-ss-designs

**Response generation.** Real responses are not used, since the truth must be known.
- $\beta_k=0$ except on a random set $S$, where $\beta_k\sim U[0,1]$ independently.
- $s=|S|$ ranges from 4 to 50 by design.
- **Regression:** $\varepsilon_i\sim\mathcal N(0,\sigma^2/n)$. The $1/n$ reflects unit-norm columns. $\sigma^2$ is set to give **SNR 0.5 or 2**.
- **Classification:** logistic model, with $\beta$ scaled to Bayes misclassification rate **1/8 or 1/3**.

**Performance measure.**
- **Base method:** recovering $\gamma s$ variables "without error" means there is *some* $\lambda$ at which at least $\lceil\gamma s\rceil$ variables of $S$ are non-zero and all of $N$ are zero. This is an oracle choice of $\lambda$, which favours the base method.
- **Stability selection:** the $\lceil\gamma s\rceil$ variables with the highest selection probability over $\lambda\ge\lambda_{min}$ must all lie in $S$. $\lambda_{min}$ is set so that at most $\sqrt{0.8p}$ variables are selected on the path. (The source writes "$\max_{\lambda\ge\lambda_{min}}\hat\beta^\lambda_k$", evidently meaning $\max\hat\Pi^\lambda_k$.)

**Difficulty measures reported in Fig. 5.** **"violations"** is the median number of variables violating the irrepresentable condition (12). **"max cor"** is the average over randomly chosen variables of the maximal correlation with all other variables.

### Fig. 5 - Lasso regression (p. 17)

Bars show P(first $0.1s$ correct) (top) and P(first $0.4s$ correct) (bottom). Dark red = Lasso, light grey = stability selection (subsampling), black × = stability selection + randomised Lasso ($\alpha=0.5$). SNR alternates 0.5 / 2 within each $s$.

**Header values transcribed from Fig. 5** (one "violations" entry per SNR pair; "max cor" per $n$ block):

| Design | $p$ | $n$ blocks | $s$ values | violations (median) | max cor |
|---|---|---|---|---|---|
| (A) | 1000 | 100; 1000 | 4, 10, 20, 50 | 0, 2, 0, 0 | 0.34; 0.11 |
| (B) | 1000 | 200; 1000 | 4, 10, 20, 50 | 0, 5, 1, 44 | 0.6; 0.54 |
| (C) | 1000 | 200; 1000 | 4, 10, 20, 50 | 14, 108, 131, 302 | 0.99; 0.99 |
| (D) | 100; 1000 | 200; 200; 1000 | 10, 30; 4, 10; 20, 50 | 1, 4, 2, 11, 0, 2 | 0.7; 0.69; 0.69 |
| (E) | 200; 1000 | 200; 200; 1000 | 10, 30; 4, 10; 20, 50 | 66, 37, 103, 342, 259, 62 | 0.73; 0.78; 0.77 |
| (F) | 660 | 2587 | 4, 10, 20, 50 | 0, 4, 70, 159 | 0.48 |
| (G) | 4088 | 115 | 4, 10 | 118, 477 | 0.82 |

The grouping of $s$ values into $p/n$ blocks for (D) and (E) is read from the header layout. The paper gives bar heights only graphically. **Approximate values for all 60 plotted cells × 2 rows** are read off the plot in [[Stability Selection Figs 5-6 - Per-Cell Power Readings#^tbl-ss-fig5-cells]]. The figure shows 60 bar pairs per row although the text says 64 settings ([[Stability Selection Figs 5-6 - Per-Cell Power Readings#^note-ss-60-cells|cell-count note]]).

**Reading of Fig. 5** (approximate values, Lasso / SS / SS+rand; full tables in [[Stability Selection Figs 5-6 - Per-Cell Power Readings]]). Averaged over the 60 cells: 0.40 / 0.63 / 0.67 at $0.1s$ and 0.20 / 0.32 / 0.31 at $0.4s$.
- **(A)** The three methods are about equal in every cell, which is what a near-orthogonal design predicts: selection decomposes into nearly univariate decisions. They are near 1 only in the easy cells. At $0.4s$ two cells are near 0 for all methods: ($n=100$, $s=10$, SNR 0.5) is 0 / 0 / 0, and ($n=1000$, $s=50$, SNR 0.5) is 0 / 0.08 / 0.05. Others are mid-range, e.g. ($n=100$, $s=4$, SNR 0.5) is 0.44 / 0.42 / 0.39.
- **(B)** Large gains at larger $s$. ($n=1000$, $s=50$, SNR 2) at $0.1s$ is 0.13 / 0.85 / 0.90. ($s=20$, SNR 2) at $0.4s$ is 0.44 / 0.99 / 1.
- **(C)** Extreme correlation ($\rho=0.99$): **almost all cells are below 0.5.** The best is ($s=4$, SNR 2) at $0.1s$: 0.30 / 0.51 / 0.45. The $0.4s$ row is about 0 everywhere except 0.05 / 0.10 / 0.11.
- **(D)** SS typically doubles or triples the Lasso. ($p=1000$, $n=1000$, $s=50$, SNR 2) at $0.1s$ is 0.14 / 0.99 / 1.
- **(E)** Many irrepresentable violations. At $0.1s$ the randomised crosses reach about 0.94-0.96 in three cells where the grey bars are 0.24-0.80 and the Lasso is ≤0.39, e.g. ($n=1000$, $s=20$, SNR 2): 0.01 / 0.24 / 0.95. In other cells the crosses are about 0.5-0.8 against bars of about 0.1-0.6. This is the case the theory predicts.
- **(F)** At $s=4$ and $10$ the Lasso and SS are both about 1, apart from the Lasso at ($s=10$, SNR 0.5): 0.74. At $s=20$ the Lasso drops to 0.07-0.13 while SS stays about 1. At $s=50$ the Lasso is 0. SS is 0.02 and 0.24, and the randomised cross is 0.07 and **about 0.68** (SNR 2).
- **(G)** At $0.1s$ SS improves on the Lasso, e.g. ($s=4$, SNR 2): 0.48 / 0.79 / 0.71, and ($s=10$, SNR 2): 0.18 / 0.47 / 0.47. The randomised cross is close to, or slightly below, the grey bar in every (G) cell; it is not clearly above both bars. At $0.4s$ all methods are ≤0.22.

### Fig. 6 - Lasso classification and OMP regression (p. 18)

The layout is the same as Fig. 5. Top two rows: logistic Lasso, with Bayes error 1/3 or 1/8 in place of SNR. Bottom two rows: OMP for regression. Randomised OMP uses $\alpha=0.9$. The caption reads "The equivalent plot to Fig. 2", evidently meaning Fig. 5. Per-cell values are in [[Stability Selection Figs 5-6 - Per-Cell Power Readings#^tbl-ss-fig6-class-cells|classification table]] and [[Stability Selection Figs 5-6 - Per-Cell Power Readings#^tbl-ss-fig6-omp-cells|OMP table]].

**Reading of Fig. 6.**
- **Classification (rows 1-2).** Averages over the 60 cells: 0.33 / 0.46 / 0.47 at $0.1s$ and 0.13 / 0.19 / 0.19 at $0.4s$. Large gains appear in (D), (E) and (F), e.g. (F) $s=20$, Bayes 1/3, $0.1s$: 0.13 / 0.80 / 0.84. **There are visible exceptions where the Lasso wins**, all in $n=1000$ cells with Bayes error 1/8:
  - (A) $s=20$, $0.4s$: Lasso about 1.0, SS about 0.49, SS+rand about 0.88.
  - (A) $s=50$, $0.4s$: 0.71 / 0.12 / 0.13.
  - (B) $s=20$, $0.4s$: 0.18 / 0.03 / 0.02.
  - (D) $s=20$, $0.4s$: 0.19 / 0.02 / 0.02.
  - (D) $s=50$, $0.1s$: 0.26 / 0.09 / 0.10.
- **OMP regression (rows 3-4).** Averages: 0.43 / 0.53 / 0.53 at $0.1s$ and 0.27 / 0.26 / 0.27 at $0.4s$. The gain is much smaller than for the Lasso. Large gains appear at larger $s$, e.g. (B) $n=1000$, $s=50$, SNR 2: 0.20 / 0.89 / 0.84, and (F) $s=50$, SNR 2: 0.06 / 0.66 / 0.67. ROMP ($\alpha=0.9$) adds clearly beyond subsampling mainly in (E), e.g. $n=1000$, $s=20$, SNR 2: 0 / 0.37 / 0.66. **Exceptions where OMP wins:**
  - (A) $n=100$, $s=4$, SNR 0.5, $0.4s$: about 0.52 / 0.27 / 0.31.
  - (A) $n=100$, $s=10$, SNR 2, $0.4s$: 0.46 / 0.13 / 0.23.
  - (G) $s=4$: OMP 0.30 against 0 (SNR 0.5, $0.1s$), and 0.52 / 0.30 / 0.25 (SNR 2, $0.1s$).
  - (C) $s=4$, SNR 0.5, $0.1s$: 0.14 / 0.06 / 0.03.

The paper's one-sentence verdict (stability selection as good or better except in (A)) therefore holds for Fig. 5 but has exceptions in Fig. 6. See [[Stability Selection Figs 5-6 - Per-Cell Power Readings#^note-ss-fig6-vs-text]].

> [!theorem] §4 headline findings (p. 20)
> 1. "Stability selection identifies as many or more correct variables than the underlying method itself in all cases except for scenario (A), where it is about equivalent."
> 2. The gain under subsampling is often substantial, "irrespective of the sparsity of the signal and the signal-to-noise-ratio."
> 3. Additional randomisation helps where many variables violate the irrepresentable condition, e.g. (E), "in line with our theory".
^thm-ss-sim-findings

### Fig. 7 - Error control vs cross-validation on real designs (pp. 19-20)

> [!example] Error-control experiment (§4, p. 20; Fig. 7)
> **Designs:** (F) motif and (G) riboflavin, with synthetic responses.
> **Grid:** SNR in {0.5, 1, 2}; $s$ from 1 to 12 in steps of 1; non-zero $\beta_k\sim\mathcal N(0,1)$. That is 72 settings, each run 20 times.
> **Comparison:** CV-tuned standard Lasso (dot) vs stability selection (red triangle) with $q_\Lambda=\sqrt{0.8p}$ and $\pi_{thr}=0.6$, stated to correspond to $E(V)\le2.5$. Left panel: randomised Lasso $\alpha=0.5$. Right panel: $\alpha=1$.
> **Axes:** x = average number of wrongly selected variables (0-70); y = average proportion of relevant variables selected. Each setting is a line joining its dot and triangle. A dashed vertical line marks $E(V)=2.5$.
> **Result (approximate readings of the plot):**
> - **CV dots** span about 11 to 75 wrongly selected variables. None is below about 10. Their proportion of relevant variables selected spans about 0.40-0.94.
> - **Stability-selection triangles** span about 0.15-0.93 in proportion selected. They sit at about 0-2 false selections in the left panel ($\alpha=0.5$), left of the dashed 2.5 line. In the right panel ($\alpha=1$, i.e. subsampling without weight randomisation) they sit at about 1.5-4, clustered on or slightly right of the 2.5 line. So $\alpha=0.5$ is somewhat more conservative, but both panels show the same order-of-magnitude reduction.
> - The CV dots are identical in the two panels, since CV-Lasso does not depend on $\alpha$.
> - No line falls from triangle to dot. CV therefore has equal or somewhat higher power: the gap in proportion selected runs from about 0 (top settings) to about 0.3 (low-power settings), and CV pays for it with about 10-70 extra false selections.
> - "Stability selection reduces the number of falsely selected variables dramatically, while maintaining almost the same power to detect relevant variables."
> - The false-selection count is "remarkably well controlled at the desired level", evidence that the bound is useful beyond exchangeability.
^ex-ss-fig7

For the arithmetic of $q_\Lambda=\sqrt{0.8p}$ with $\pi_{thr}=0.6$, see the calibration check in [[Stability Selection PFER Bound (Theorem 1) and Its Proof#^note-ss-calibration-check]].

## Examples

> [!example] Replicating the design for a media-mix feature screen
> **Setup:** Take a real weekly design matrix (e.g. 120 weeks × 60 candidate drivers). Following (F)/(G), keep the real $X$ and simulate $Y=X\beta+\varepsilon$ with random sparse $\beta$ ($s\in\{3,6,10\}$, SNR in {0.5, 2}).
> **Compare:** CV-Lasso vs stability selection at $E(V)\le1$. Record false selections and the share of true drivers recovered.
> **Why:** Real collinearity among adstocked channels is the condition the paper's (F)/(G) experiment probes. The simulation tells you how much a "selected driver" claim is worth *for your design*. It is a design-specific check of the type described in [[Designing Simulated-Data Experiments]] and [[Simulation Studies for Evaluating Statistical Methods (ADEMP)]].
^example-ss-replicating-the-design-for

## Connections

- The "oracle $\lambda$" comparison is generous to the base method. Stability selection still wins, which strengthens the conclusion.
- CV picking up to about 70 false variables is the high-dimensional version of [[Model Selection and Overfitting]]. Prediction-oriented tuning is not selection-oriented tuning ([[Model Selection Using Predictive Performance]]).
- Simulation-study reporting standards (Monte Carlo SE, number of repetitions) are not given here. Only 20-100 repetitions per cell are used and no MCSEs are shown. See [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Selection Figs 5-6 - Per-Cell Power Readings]]
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]]
- [[Randomised Lasso and the Irrepresentable Condition]]
