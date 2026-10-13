---
title: "Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §2 pp. 5-6 (eq. (2), Theorem 1), §3 pp. 7-8 (Figs. 1-3), Appendix A p. 21 (proof of Theorem 1)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Permute-and-Predict Extrapolation in Variable Importance]]"
  - "[[Copula Estimation]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]"
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
aliases:
  - Hooker Mentch Zhou simulation design
  - Theorem 1 permutation importance linear model
  - Permutation importance of least-squares fits
---

# Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1

> [!summary]
> The benchmark is a 10-feature **linear** truth with coefficients $(1,1,1,1,1,0,0.5,0.8,1.2,1.5)$, $U[0,1]$ marginals, and $x_1,x_2$ joined by a **Gaussian copula** with correlation $\rho$. **Theorem 1** shows that for a least-squares linear fit, expected permutation importance is $2\hat\beta_j^2\sum_i(x_{ij}-\bar x_j)^2$ and PD/ICE are lines of slope $\hat\beta_j$, so a linear model's PaP ranking ignores correlation. In simulation, linear models recover the true ranking at $\rho=0.9$. **Random forests and neural networks** instead push $x_1,x_2$ above $x_3$-$x_5$ (equal coefficients) and often above $x_9$ (coefficient 1.2). The inflation is worst at small $N$ and for **OOB** importance.
^summary-hmz-linear-sim

## Overview

§2 builds a setting where the "right answer" is known. §3 shows that PaP diagnostics from flexible learners miss it. The authors' claim (p. 6) is that PaP tools mislead only when **both** a flexible learner **and** correlated features are present. Neither alone causes large bias, but the combination "is in fact very common in practice." Theorem 1 covers the "linear learner" half of that claim.

## Main Content

### Data-generating process (§2, eq. (2), p. 5)

> [!definition] Definition: Simulation model (eq. (2))
> $$y_i=x_{i1}+x_{i2}+x_{i3}+x_{i4}+x_{i5}+0x_{i6}+0.5x_{i7}+0.8x_{i8}+1.2x_{i9}+1.5x_{i10}+\epsilon_i,\qquad \epsilon_i\sim N(0,0.1^2).$$
> - Each $x_{ij}\sim U[0,1]$ marginally.
> - All features are independent **except** $(x_1,x_2)$, which are coupled by a Gaussian copula with correlation parameter $\rho$.
> - The noise is deliberately small so the effects are clear.
^def-sim-model

**Design logic** (p. 6):
- $(x_3,x_4,x_5)$ share the coefficient of $x_1,x_2$ and act as a **reference** group.
- $x_6$ has no influence.
- $(x_7,\dots,x_{10})$ bracket $x_1,x_2$ with coefficients 0.5, 0.8, 1.2, 1.5, which gives a clear ordering.
- With equal scales, importance should follow $|\beta_j|$; see Gregorutti et al. (2015) and Theorem 1.

### Theorem 1

> [!theorem] Theorem 1: PaP diagnostics for a least-squares linear model (§2, p. 6)
> Let $f(x)=\hat\beta_0+\sum_{j=1}^p\hat\beta_jx_j$ be fit by least squares. Then
> 1. $E_\pi\mathrm{VI}^\pi_j=2\hat\beta_j^2\sum_{i=1}^N(x_{ij}-\bar x_j)^2$, where $E_\pi$ is the expectation over permutations and $\bar x_j$ is the mean of feature $j$;
> 2. $\mathrm{PD}_j(x)=C_j+\hat\beta_jx$, with $C_j=\sum_{j'\ne j}\beta_{j'}\bar x_{j'}$;
> 3. $\mathrm{ICE}_{i,j}(x)=C_{i,j}+\hat\beta_jx$, with $C_{i,j}=\sum_{j'\ne j}\beta_{j'}x_{ij'}$.
>
> Here $\mathrm{VI}^\pi_j$ uses squared-error loss. Part 1 appears in Gregorutti et al. (2015) and Fisher et al. (2019); parts 2-3 follow directly. The analogous **population** statement holds when the diagnostics are applied to data generated from a linear model.
^thm-1

> [!warning] Hats in the printed Theorem 1 constants (p. 6, checked against the rendered PDF)
> The theorem concerns the fitted model, and parts 1-3 print the slope as $\hat\beta_j$. The constants, however, are printed **without** hats: $C_j=\sum_{j'\ne j}\beta_{j'}\bar x_{j'}$ and $C_{i,j}=\sum_{j'\ne j}\beta_{j'}x_{ij'}$. For PD and ICE of $f$ to be exact, they must be $C_j=\hat\beta_0+\sum_{j'\ne j}\hat\beta_{j'}\bar x_{j'}$ and $C_{i,j}=\hat\beta_0+\sum_{j'\ne j}\hat\beta_{j'}x_{ij'}$. The source also leaves the intercept $\hat\beta_0$ out of both constants. The transcription above keeps the printed form. Two further notes:
> - The rendered PDF typesets the ICE constant correctly as $\sum_{j'\ne j}\beta_{j'}x_{ij'}$. Only the PDF's text layer garbles it (primes are pushed to a separate line, so it extracts as "$\beta_j x_{ij}$"). Use the rendered page, not copied text, as the reference.
> - None of this affects the conclusions. PD and ICE are lines with slope $\hat\beta_j$ whatever the intercept constant is, and part 1 is stated correctly with $\hat\beta_j^2$.
^warn-thm-1-hats

> [!theorem] Proof sketch (Appendix A, p. 21)
> Note $E_\pi x^{\pi,j}_{ij}=\bar x_j$. Expand
> $$\mathrm{VI}^\pi_j=\sum_i\big(f(x_i)-f(x_i^{\pi,j})\big)^2+2\big(y_i-f(x_i)\big)\big(f(x_i)-f(x_i^{\pi,j})\big).$$
> The cross term has zero permutation expectation: least-squares residuals are orthogonal to $x_i$, so $\sum_i(y_i-x_i\hat\beta)x_i=0$, and $E_\pi\sum_i(y_i-x_i\hat\beta)x^{\pi,j}_{ij}=\sum_i(y_i-x_i\hat\beta)\bar x_j=0$. The first term equals $\hat\beta_j^2\sum_i(x_{ij}-x^{\pi,j}_{ij})^2$. Add and subtract $\bar x_j$: its permutation expectation is $2\hat\beta_j^2\sum_i(x_{ij}-\bar x_j)^2$, because the original and the permuted value each contribute one variance. PD and ICE follow by direct calculation.
^proof-thm-1

**Reading.** A linear model's permutation importance is the squared coefficient times the marginal sum of squares. With standardized covariates this is the coefficient magnitude, close to how linear models are usually read. Nothing in it depends on the correlation between $x_j$ and the other features. The bias seen with RF/NN is therefore **not** a property of the permutation estimand for linear truth. It comes from the learner.

### Simulation protocol (§2, p. 6)

> [!algorithm] Simulation protocol (§2-§3)
> 1. For each $(\rho, N)$, draw training data from eq. (2).
> 2. Fit (a) a random forest (`randomForest` in R), (b) a single-hidden-layer neural network with **20 hidden nodes** (`nnet`), (c) a least-squares linear model.
> 3. Compute $\mathrm{VI}^\pi_j$ on the **training** data for every model, and the original **OOB** importance $\mathrm{VI}^o_j$ for the forest (from `importance`). OOB importance uses out-of-bag residuals per tree, so it is specific to bagging.
> 4. Record $\mathrm{PD}$ for $x_1,x_2$, and ICE curves for 11 reference points with $x_{i1}=x_{i2}=(i-1)/10$, $i=1,\dots,11$, and $x_{i3},\dots,x_{i10}$ drawn uniformly once and **held fixed across simulations**, so the references lie in the bulk of the data.
> 5. Convert importances to **ranks** (lowest = 1, highest = 10) so that scale does not matter, as in screening.
> 6. Repeat 50 times and average.
^alg-sim-protocol

### Results (§3, pp. 7-8)

**Theoretical ranks** under eq. (2), lowest to highest: $x_6=1$, $x_7=2$, $x_8=3$, $x_1$-$x_5$ tied at ranks 4-8 (average 6), $x_9=9$, $x_{10}=10$.

**Figure 1** (p. 7). Average importance rank per feature, $N=2000$. Series: random forest (r), neural network (n), linear model (l), RF OOB (o); dashed lines show the theoretical rank. The caption says "over 10 models" while the text says 50 simulations, a discrepancy in the source.

| Setting | Linear model | RF / NN / OOB permutation |
|---|---|---|
| $\rho=0$ | Theoretical ordering, including the $x_1$-$x_5$ tie | Agree with the linear model and with Theorem 1 |
| $\rho=0.9$ | **Unchanged**, matches the coefficients | $x_1,x_2$ ranked **above** $x_3,x_4,x_5$ and **frequently above $x_9$** (coef 1.2) |

Average ranks read from the Fig. 1 plot (p. 7, rendered at 300 dpi and enlarged; approximate to about ±0.1 rank). Theoretical ranks: $x_1$-$x_5$ about 6 (tied ranks 4-8), $x_6=1$, $x_7=2$, $x_8=3$, $x_9=9$, $x_{10}=10$. "1, 2, 3" means the marker sits on the integer to within plotting resolution. The RF (r) markers at $\rho=0$ are mostly hidden under the OOB (o) markers, so the two rows are nearly identical there.

| Panel | Series | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $x_6$ | $x_7$ | $x_8$ | $x_9$ | $x_{10}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $\rho=0$ | RF (r) | 5.5 | 6.45 | 5.85 | 5.9 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| $\rho=0$ | NN (n) | 6.35 | 6.1 | 5.4 | 5.35 | 5.4 | **3.7** | **4.3** | **3.95** | **6.8** | **7.5** |
| $\rho=0$ | Linear (l) | 5.85 | 5.65 | 6.05 | 6.1 | 6.3 | 1 | 2 | 3 | 9 | 10 |
| $\rho=0$ | RF OOB (o) | 5.5 | 6.45 | 5.7 | 5.95 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| $\rho=0.9$ | RF (r) | **7.9** | **8.45** | 4.95 | 4.95 | 5.1 | 1 | 2 | 3 | **7.7** | 10 |
| $\rho=0.9$ | NN (n) | **7.45** | **7.45** | 5.3 | 5.0 | 5.3 | 2.85 | 3.6 | 3.6 | 6.95 | 7.15 |
| $\rho=0.9$ | Linear (l) | 6.15 | 5.85 | 6.05 | 5.95 | 5.9 | 1 | 2 | 3 | 9.05 | 10 |
| $\rho=0.9$ | RF OOB (o) | **8.8** | **9.1** | 4.85 | 4.95 | 5.15 | 1 | 2 | 3 | **7.05** | **9.05** |

Reading the full table:
- At $\rho=0.9$, RF and OOB push $x_1,x_2$ to ranks 8-9 and push $x_3$-$x_5$ down to about 5. OOB places $x_2$ (coefficient 1) level with or slightly above $x_{10}$ (coefficient 1.5) on average (about 9.1 vs 9.05). The ranks of the uncorrelated low-signal features $x_6$-$x_8$ do not move for RF, OOB or the linear model (1, 2, 3 in both panels). The distortion is confined to the correlated pair and the features whose rank slots they take ($x_3$-$x_5$, $x_9$, $x_{10}$).
- The NN is mis-ranked at **both** correlations. At $\rho=0$ it already ranks the null feature $x_6$ at about 3.7 and $x_7$ (4.3) above $x_8$ (3.95). At $\rho=0.9$ the pair rises to about 7.45, above $x_9$ (about 6.95) and $x_{10}$ (about 7.15).
- The linear model is unchanged between panels (all within ±0.2 of theory), as Theorem 1 predicts.

The plot also shows that the 20-node NN **compresses** rankings toward the middle even at $\rho=0$. The paper does not comment on this.

**Why Figure 2 exists** (p. 7). The authors anticipate the objection that the Fig. 1 result "may be viewed as being due to the very high correlation parameter employed, and the specific sample size", and so vary both. They attribute the Fig. 1 pattern to permuting only one of the correlated features, which breaks its relationship with the other and evaluates the function "in regions which, by construction, have no data nearby" (see Fig. 4).

**Figure 2** (p. 8). Joint effect of $\rho$ and $N$. Eq. (2) is modified so that $x_1$ and $x_2$ each have coefficient **0.8**, making them less important than $x_3$-$x_5$; their theoretical rank is **4**.

| Design element | Values |
|---|---|
| $\rho$ | 0, 0.1, 0.25, 0.35, 0.5, 0.75, 0.9 |
| $N$ | 100, 200, 500, 1000, 2000, 5000 |
| Replicates | 20 per cell |
| Panels | (1) avg rank of $x_1,x_2$ vs $\rho$ at $n=2000$; (2) RF; (3) NN; (4) RF-OOB, each vs $N$ by $\rho$ |

Findings:
- For small $N$, any nonzero correlation makes $x_1,x_2$ look more important than $x_3$-$x_5$, especially under OOB importance.
- For small $\rho$ the effect disappears at larger $N$.
- For large $\rho$ the rank falls with $N$ but never below 5, still above the theoretical value of 4.

> [!note] Fig. 2 caption fidelity (p. 8)
> The caption reads "Left: change in the average rank of $x_1$ and $x_2$ as correlation increases with $n = 2000$. Remaining plots (left to right): average importance for each $\rho$ as a function of $N$ for fandom forests, neural networks, and random forests using OOB importance measures, respectively." "fandom forests" is a typo for "random forests". The caption's panel order was checked against the panel titles printed in the figure: left to right they are "Average Importance Rank of X1 and X2 by $\rho$", then "RF:", "NN:" and "RFo:" "Average Importance Rank of X1 and X2 by $\rho$ and n". This matches the caption and the Panel 1-4 numbering used below. The caption mixes $n$ (panel 1) and $N$ (remaining panels) for the same sample size.
^note-fig2-caption

**Figure 2, transcribed.** All values below were read from the rendered plot points (p. 8, 400 dpi), so they are approximate to about ±0.1 rank. The theoretical rank is 4 in every panel. Panel titles: "Average Importance Rank of $X_1$ and $X_2$ by $\rho$" and "RF / NN / RFo: Average Importance Rank of $X_1$ and $X_2$ by $\rho$ and n"; y-axis "Importance Rank"; x-axis of panels 2-4 on a log scale.

*Panel 1: average rank vs $\rho$ at $n=2000$.*

| $\rho$ | 0 | 0.1 | 0.25 | 0.35 | 0.5 | 0.75 | 0.9 |
|---|---|---|---|---|---|---|---|
| Random forest (r) | 4.05 | 4.35 | 4.6 | 4.95 | 5.75 | 6.5 | 6.9 |
| Neural network (n) | 4.3 | 5.05 | 5.05 | 4.95 | 4.75 | 6.6 | 6.4 |
| Linear model (l) | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | 4.1 | 3.95 |
| RF OOB (o) | 4.05 | 4.25 | 4.9 | 5.65 | 6.6 | 7.65 | 8.0 |

*Panel 2: random forest ($\mathrm{VI}^\pi$ on training data), rank by $N$ and $\rho$.*

| $\rho$ \ $N$ | 100 | 200 | 500 | 1000 | 2000 | 5000 |
|---|---|---|---|---|---|---|
| 0 | 4.6 | 4.55 | 3.95 | 3.9 | 4.05 | 3.95 |
| 0.1 | 5.0 | 5.05 | 4.35 | 4.15 | 4.4 | 4.4 |
| 0.25 | 5.3 | 5.5 | 5.0 | 4.65 | 4.6 | 4.55 |
| 0.35 | 5.85 | 6.05 | 5.5 | 5.05 | 4.95 | 4.6 |
| 0.5 | 6.2 | 6.4 | 6.2 | 5.85 | 5.75 | 4.9 |
| 0.75 | 6.85 | 7.3 | 7.0 | 6.8 | 6.5 | 5.75 |
| 0.9 | 7.4 | 7.45 | 7.2 | 7.15 | 6.95 | 6.1 |

*Panel 3: neural network.* The curves for $\rho\le0.5$ cross repeatedly and overlap, so individual values are rougher (about ±0.2).

| $\rho$ \ $N$ | 100 | 200 | 500 | 1000 | 2000 | 5000 |
|---|---|---|---|---|---|---|
| 0 | ~4.45 | ~4.3 | ~4.5 | ~4.6 | 4.35 | ~4.3 |
| 0.1 | ~4.45 | ~4.45 | ~4.55 | 4.05 | ~5.0 | ~4.5 |
| 0.25 | ~4.45 | ~4.3 | 5.2 | ~4.55 | ~5.05 | ~4.5 |
| 0.35 | ~4.3 | ~4.35 | 4.75 | ~4.6 | ~4.9 | ~4.2 |
| 0.5 | ~4.45 | ~4.35 | 4.0 | ~5.25 | 4.75 | ~4.5 |
| 0.75 | 4.95 | 5.2 | 5.2 | ~5.2 | 6.6 | ~4.5 |
| 0.9 | 5.4 | 5.7 | **7.4** | 6.75 | 6.3 | ~4.75 |

*Panel 4: random forest OOB importance ("RFo").*

| $\rho$ \ $N$ | 100 | 200 | 500 | 1000 | 2000 | 5000 |
|---|---|---|---|---|---|---|
| 0 | 4.45 | 4.55 | 4.0 | 3.9 | 4.1 | 4.0 |
| 0.1 | 4.85 | 5.1 | 4.45 | 4.25 | 4.3 | 4.4 |
| 0.25 | 5.7 | 5.85 | 5.35 | 5.0 | 4.95 | 4.7 |
| 0.35 | 6.05 | 6.3 | 5.85 | 5.6 | 5.65 | 5.25 |
| 0.5 | 6.85 | 6.8 | 6.7 | 6.65 | 6.65 | 6.6 |
| 0.75 | 7.35 | 7.75 | 7.8 | 7.65 | 7.65 | 7.6 |
| 0.9 | 7.9 | 8.4 | 8.15 | 8.1 | 8.0 | 8.0 |

**Reading the panels against the text.**
- *"For small $N$, nonzero correlation makes $x_1$ and $x_2$ appear more important than $(x_3,x_4,x_5)$, particularly for OOB."* Confirmed: at $N\le200$ every $\rho\ge0.1$ gives rank ≥5 for RF and RF-OOB, versus 4 in theory. Even $\rho=0$ gives about 4.5-4.6 at $N\le200$.
- *"For small $\rho$ this effect is removed at larger $N$."* Confirmed for RF and RF-OOB at $\rho\le0.1$ (back to about 4-4.4 from $N=500$). At $\rho=0.25$-0.35 the RF rank only falls to about 4.6 by $N=5000$.
- *"For large $\rho$, the importance rank decreases with $N$, though never below 5."* True for RF at $\rho\ge0.75$ (lowest 5.75) and for RF-OOB at $\rho\ge0.5$, where OOB barely decreases at all (0.9: 8.4 → 8.0). It does **not** hold in the NN panel: at $N=5000$ all NN curves, including $\rho=0.9$ (about 4.75), are between about 4.2 and 4.75. The NN panel is also non-monotone in $N$, peaking at $N=500$ for $\rho=0.9$ (about 7.4). The paper does not comment on either point.
- RF-OOB is the worst-behaved measure: at $\rho=0.9$ it ranks the coefficient-0.8 features about 8th of 10 at every $N$, i.e. above $x_8$ (0.8) and $x_9$ (1.2) in expectation.
- Previously recorded values in this note (RF at $\rho=0.9$: "about 6.9 at $N=5000$"; linear model "near 4.5") were misreadings and are corrected by the tables above: the RF value at $N=5000$ is about 6.1 and the linear model sits at 4.0.

**Figure 3** (p. 8). Average PD for $x_1$ over 50 simulations, $\rho=0$ (solid) vs $\rho=0.9$ (dashed), plus the SD of the estimated PD. ICE examples for RF (middle-right) and NN (far right): dotted lines for $\rho=0$, dashed for $\rho=0.9$, letters pair curves. Solid segments mark the range of $x_1$ conditional on the other features, black lines are PD, blue is the truth.
- **RF**: under correlation, edge-effect attenuation of PD appears smaller. But those PDs will be compared with PDs of other features that are still attenuated, so the comparison is unequal.
- **NN**: PD variability grows with correlation. High-correlation ICE curves diverge considerably from the true line even though each is an average of 50 replicates, so a single ICE curve is very noisy. This is clearer in the lower-dimensional Fig. 6 (see [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]).

**Figure 3, approximate readings** (p. 8, read from the rendered plot; truth is $\mathrm{PD}_1(x)=4+x$, a line from 4.0 to 5.0). Panel titles: "Partial Dependence Examples at $\rho=0$ and $\rho=0.9$" and "Partial Dependence Standard Deviation at $\rho=0$ and $\rho=0.9$" (log-scale y-axis, 0.01 to about 2.5).

| Panel / series | Solid line | Dashed line |
|---|---|---|
| PD, random forest: value at $x_1=0$ → $x_1=1$ | 4.12 → 4.87 (range 0.75) | 4.21 → 4.78 (range 0.57) |
| PD, neural network | below 4.0 (off the plot) for $x_1<0.17$; 4.92 at $x_1=1$ | 4.14 at 0, dips to 4.08 at 0.05; 4.84 at 1 |
| PD, linear model | 4.0 → 5.0, on the truth | (overlaps) |
| PD SD, neural network | about 2.5 at $x_1=0$; minimum about 0.04 at $x_1\approx0.5$; about 0.6 at $x_1=1$ | about 0.45 at 0, about 0.15 by 0.1; minimum about 0.035 near 0.45-0.5; about 0.3 at 1 |
| PD SD, random forest | about 0.03-0.035, with a bump to about 0.055 at $x_1\approx0.45$ | about 0.03-0.04, dipping to about 0.025 near 0.5 |
| PD SD, linear model | flat at about 0.022 | (overlaps) |

ICE panels (11 reference points with $x_{i1}=x_{i2}=(i-1)/10$; letters A-E pair the two correlation settings; solid segments mark the conditionally supported range):
- **RF ICE**: curves are shallower than the truth (slope roughly 0.5-0.75 against 1) and flatten at both ends, i.e. edge attenuation. Paired curves differ by up to about 0.2 (e.g. pair A: about 3.15 vs 2.93 at $x_1=0$) and converge in the middle. The two RF PD lines in this panel run 4.13 → 4.87 and 4.22 → 4.77.
- **NN ICE**: the B, C, D, E pairs are near-parallel straight lines of roughly the right slope **inside** their solid segments. Outside them some unsupported dotted/dashed curves swing wildly: one starts near 3.3 at $x_1=0$, jumps to about 4.2 by 0.15 and falls back, and another leaves the plot below 3.0 after $x_1\approx0.65$. The two NN PD lines run about 3.95 → 4.6 (bending down after 0.9) and 4.15 → 4.83, both flatter than the truth.

> [!warning] Line-type ambiguity in Fig. 3
> The caption assigns solid = $\rho=0$ and dashed = $\rho=0.9$ in the PD panels, and dotted = $\rho=0$, dashed = $\rho=0.9$ in the ICE panels. The legend inside the NN ICE panel instead reads "ICE 0" (dashed), "ICE 0.9" (dotted), "PD 0" (long dash), "PD 0.9" (dotted). Read literally with the caption, the PD panels show the **opposite** of the text: the RF $\rho=0.9$ PD would be the **more** attenuated one (range 0.57 vs 0.75), and the NN PD SD would be **larger at $\rho=0$** (about 2.5 vs 0.45 at $x_1=0$). The text's claims (less RF edge attenuation and greater NN variability under correlation) match the plot only if the solid and dashed lines are swapped. We record the readings as they appear and flag the inconsistency instead of resolving it.
^warn-fig3-line-types

## Examples

> [!example] Example: applying Theorem 1 to an equal-coefficient pair
> In eq. (2), $\beta_1=\beta_3=1$ and every $x_j\sim U[0,1]$ has variance $1/12$. By Theorem 1, $E_\pi\mathrm{VI}^\pi_1\approx E_\pi\mathrm{VI}^\pi_3\approx 2\cdot1^2\cdot N/12=N/6$, whatever $\rho$ is. A linear fit therefore gives $x_1$ and $x_3$ the same expected importance. Any gap a random forest shows between them at $\rho=0.9$ comes from the learner and the off-data evaluation points, not from the truth.
^ex-thm1-equal-coef

## Connections

- The ADEMP structure for writing up a design like this: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Simulation Studies for Evaluating Statistical Methods (ADEMP)]].
- Simulating from a known truth to check a method: [[Designing Simulated-Data Experiments]].
- Gaussian copulas for building dependent uniforms: [[Copula Estimation]].
- Tied coefficients $x_1$-$x_5$ show how unstable importance rankings are; compare [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also
- [[Permute-and-Predict Extrapolation in Variable Importance]] — definitions of $\mathrm{VI}^\pi$, PD, ICE
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] — Theorem 3 extends Theorem 1 to the alternatives; Fig. 7 reruns this design
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
