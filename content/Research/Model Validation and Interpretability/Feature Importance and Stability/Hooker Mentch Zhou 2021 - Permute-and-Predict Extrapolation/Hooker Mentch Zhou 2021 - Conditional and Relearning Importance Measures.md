---
title: "Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §5 'Variable Importance Alternatives' pp. 10-14 (definitions p. 12, Theorems 2-3 p. 13, local explanations p. 13, Fig. 7 p. 14); Appendix A pp. 21-22 (proofs of Theorems 2-3)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Permute-and-Predict Extrapolation in Variable Importance]]"
  - "[[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]"
  - "[[Regression and the CEF]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]"
  - "[[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]"
aliases:
  - Condition-and-Relearn Importance
  - Permute-and-Relearn Importance
  - Dropped Variable Importance
  - LOCO variable importance (Hooker Mentch Zhou)
  - Compensation effect in variable importance
---

# Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures

> [!summary]
> Four importance measures avoid evaluating the original model off the data. Each needs **one more model**: a model of $x_j\mid x_{-j}$, a refit of $f$, or both.
> - **Conditional** importance $\mathrm{VI}^C_j$: resample $x_j$ given $x_{-j}$, then predict with the original model.
> - **Dropped**/LOCO importance $\mathrm{VI}^D_j$: refit without $x_j$.
> - **Permute-and-relearn** $\mathrm{VI}^{\pi L}_j$: permute $x_j$, then refit.
> - **Condition-and-relearn** $\mathrm{VI}^{CL}_j$: resample conditionally, then refit.
>
> **Theorem 2**: under squared error all four target $E(f(x)-f_{-j}(x_{-j}))^2$ with $f_{-j}=E[f\mid x_{-j}]$. **Theorem 3**: for linear models they scale with $\hat\beta_j^2$ times the **residual** variation of $x_j$ given the other features. This is the **compensation effect**: correlated features lose importance, the opposite of PaP. In simulation (Fig. 7) the four measures agree on rankings for RF, NN and linear models.
^summary-hmz-conditional-relearn

## Overview

The paper's subtitle is "variable importance requires at least one more model, or there is no free variable importance". Every remedy in §5 follows one of two ideas (p. 10):

1. **Generate $x_j$ from its conditional distribution** given the rest. Examples: Strobl et al. (2008), first; Tuv et al. (2009), tree ensembles for non-redundant feature sets; Wu et al. (2007), pseudovariables to tune linear models; the knockoff framework of Barber et al. (2015) and Candès et al. (2018); and Fisher et al.'s (2019) **conditional** model class reliance, which the results here favour ([[Permute-and-Predict Extrapolation in Variable Importance#^def-mcr-hmz|MCR definition]]).

> [!definition] Definition: The two modes of the knockoff framework (§5 item 1, p. 10)
> The paper describes the knockoff framework of Barber et al. (2015) and Candès et al. (2018) as working in one of two ways:
> 1. **Swap-and-test.** The original features are swapped out for **randomized replacements** (knockoffs), drawn so that they mimic the dependence structure of the real features but carry no extra information about $y$. Importance is then assessed by a **conditional randomization test**. This is the mode used in §5.1, where Model-X knockoffs serve as the substitute $x_2^*$ ([[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application#^ex-noise-test-sim]]).
> 2. **Augment-and-filter.** The feature space is **augmented with null copies** of the original features, a model is fit on originals plus copies, and a **knockoff filter** is applied to eliminate non-important features. In Barber et al. (2015), *Controlling the false discovery rate via knockoffs* (Annals of Statistics 43(5)), the filter compares each feature's statistic with its copy's and picks a threshold that **controls the false discovery rate**. The paper does not use this mode.
>
> Both modes belong to the "generate conditionally" family because the knockoffs respect the joint feature distribution, so the model is never queried off the data.
^def-knockoff-modes
2. **Remove $x_j$ and refit** (leave-one-covariate-out, LOCO). This is classical in statistics (Lehmann & Romano 2006) and was proposed in a conformal-inference setting by Lei et al. (2018).

The two can be **combined**. Mentch & Hooker (2016) compare a forest trained on the original data with one trained on data where $x_j$ is **permuted**. The permutation only makes the feature irrelevant, and both models are evaluated inside the bulk of the data. They permuted rather than dropped the feature so that both fits have the **same complexity** and are statistically comparable.

## Main Content

### Definitions (§5, p. 12)

> [!definition] Definition: Conditional variable importance $\mathrm{VI}^C_j$
> Build $X^{c,j}$ by drawing $x^{c,j}_{ij}\sim x_{ij}\mid x_{i,-j}$, then
> $$
> \mathrm{VI}^C_j=\sum_{i=1}^N L\big(y_i,f(x^{c,j}_i)\big)-L\big(y_i,f(x_i)\big).
> $$
> In the Gaussian-copula simulation the conditional law is known in closed form. Strobl et al. (2008) fit here: for each tree they permute $X_j$ **within cells of a partition** built from all cut points on $X_{-j}$ in that tree. Fisher et al.'s conditional model reliance also fits here.
^def-vi-c

> [!definition] Definition: Dropped variable importance $\mathrm{VI}^D_j$ (LOCO)
> Fit $f^{-j}$ on $(y, X_{-j})$, then
> $$
> \mathrm{VI}^D_j=\sum_{i=1}^N L\big(y_i,f(x_i)\big)-L\big(y_i,f^{-j}(x_i)\big)\quad\text{(as printed).}
> $$
> This uses **training** error and is equivalent to the LOCO methods of Lei et al. (2018).
^def-vi-d

> [!definition] Definition: Permute-and-relearn importance $\mathrm{VI}^{\pi L}_j$
> Fit $f^{\pi,j}$ on $(y,X^{\pi,j})$, then
> $$
> \mathrm{VI}^{\pi L}_j=\sum_{i=1}^N L\big(y_i,f(x_i)\big)-L\big(y_i,f^{\pi,j}(x_i)\big)\quad\text{(as printed).}
> $$
> Mentch & Hooker (2016) used this together with distributional results for random forests to test the significance of $f(x)-f^{\pi,j}(x)$.
^def-vi-pil

> [!definition] Definition: Condition-and-relearn importance $\mathrm{VI}^{CL}_j$
> Fit $f^{c,j}$ on $(y,X^{c,j})$, then
> $$
> \mathrm{VI}^{CL}_j=\sum_{i=1}^N L\big(y_i,f(x_i)\big)-L\big(y_i,f^{c,j}(x_i)\big)\quad\text{(as printed).}
> $$
^def-vi-cl

**Sign convention.** For $\mathrm{VI}^D,\mathrm{VI}^{\pi L},\mathrm{VI}^{CL}$ the source writes (loss of original) $-$ (loss of refit). The intended quantity, as for $\mathrm{VI}^\pi$, is the **increase** in loss when the feature is muted. Read these with the sign reversed, or as magnitudes.

**Costs** (p. 12): each measure requires training a new model and/or estimating and sampling $x_{ij}\mid x_{i,-j}$. The simulation has this conditional law analytically, which "will rarely if ever be the case in practice."

> [!algorithm] Condition-and-relearn importance (assembled from the §5 definitions and the §1 "gold standard" remark; the paper gives no numbered algorithm)
> 1. Fit $f$ on $(y,X)$ and record its loss on the evaluation set.
> 2. Fit a model $\hat q_j$ for $x_j\mid x_{-j}$, for example a Gaussian or copula model, a knockoff generator, or a within-partition permutation.
> 3. Draw $x^{c,j}_{ij}\sim\hat q_j(\cdot\mid x_{i,-j})$ to build $X^{c,j}$.
> 4. Refit $f^{c,j}$ on $(y,X^{c,j})$ with the **same** learning algorithm and settings.
> 5. Importance = loss of $f^{c,j}$ minus loss of $f$ on the evaluation data. Repeat steps 3-5 and average.
> 6. If you need significance, compare the two losses with a test that accounts for refitting (see [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]).
^alg-condition-relearn

### Theorem 2: a shared target

> [!theorem] Theorem 2: Common population target under squared error (§5, p. 13)
> Let $x^*$ be $x$ with $x_j$ replaced by some $x^*_j$ satisfying $x^*_j\perp y\mid x_{-j}$, and let $f(x)=E(y\mid x)$. Then the minimum least-squares predictor of $y$ from $x^*$ is
> $$
> f_{-j}(x^*)=\int f(x)\,p(x_j\mid x_{-j})\,dx_j,
> $$
> and for this $f$
> $$
> \mathrm{VI}^C_j=\mathrm{VI}^D_j=\mathrm{VI}^{\pi L}_j=\mathrm{VI}^{CL}_j=E_{y,x}\big(f(x)-f_{-j}(x_{-j})\big)^2.
> $$
> Outside squared-error loss, the loss-minimizing predictor from $x^*$ need not be $f_{-j}$, and the four definitions may differ.
^thm-2

> [!theorem] Proof sketch (Appendix A, p. 21)
> $$
> \arg\min_m E_{y\mid x^*}(y-m)^2=\arg\min_m E_{y\mid x_{-j}}(y-m)^2=E_{y\mid x_{-j}}y=E_{x_j\mid x_{-j}}E_{y\mid x}y=f_{-j}(x_{-j}).
> $$
> The first equality uses $x^*_j\perp y\mid x_{-j}$. $\mathrm{VI}^C_j$ estimates this directly. A permuted $x_j^{\pi,j}$, a conditional draw $x_j^{c,j}$, and, for $\mathrm{VI}^D$, any **constant** in place of $x_j$ all satisfy $x^*_j\perp y\mid x_{-j}$, which gives the result.
^proof-thm-2

> [!note] How dropping a column fits Theorem 2 (from the proof, Appendix A, p. 21)
> The theorem statement is phrased in terms of a replacement $x^*_j$ with $x^*_j\perp y\mid x_{-j}$. That obviously covers $\mathrm{VI}^C$ (conditional draw, refit not needed), $\mathrm{VI}^{\pi L}$ (permuted copy) and $\mathrm{VI}^{CL}$ (conditional draw). The link to $\mathrm{VI}^D$ is made only in the proof: dropping $x_j$ is equivalent to replacing it with **any constant**. A constant is independent of everything, so it trivially satisfies $x^*_j\perp y\mid x_{-j}$, and the best predictor from $(x_{-j},\text{const})$ is the best predictor from $x_{-j}$ alone, i.e. $f_{-j}(x_{-j})$. The proof also says explicitly that $f_{-j}(x_{-j})$ "is the quantity we estimate directly in" $\mathrm{VI}^C_j$: conditional importance plugs in a sample of $x_j\mid x_{-j}$ without refitting, whereas the other three reach $f_{-j}$ by refitting. A caution the proof does not raise (vault gloss): Theorem 2 is a **population** statement about the best predictor. It does not rule out the finite-sample behaviour in §5.1, where a learner refit on permuted features can still reject a true null far too often.
^note-vid-in-thm-2

**Contrast with PaP.** Here $f_{-j}$ integrates against the **conditional** density $p(x_j\mid x_{-j})$. The PaP target in [[Permute-and-Predict Extrapolation in Variable Importance#^def-pap-targets]] uses the **marginal** $p_j(x_j)$. That one change is the whole difference between staying on the data and extrapolating. The target is the variance of $f$ that $x_{-j}$ cannot explain, which links it to the total-effect Sobol index ([[Variance-Based Sensitivity and Sobol Indices]]) and to the conditional expectation function ([[Regression and the CEF]]).

### Figure 7: agreement in simulation (p. 14)

Average importance rank by measure for random forests (left), neural networks (middle) and linear models (right). Data: **10 simulated data sets of size 200**. Top row: independent features. Bottom row: $x_1,x_2$ with Gaussian-copula $\rho=0.9$.
- All four measures agree on the ordering, within Monte Carlo variability, across all models.
- Unlike PaP, they **reduce** the importance of $x_1,x_2$ as correlation rises.
  - For LOCO, $x_1$ can absorb part of $x_2$'s signal.
  - For conditional measures, $x_2\mid x_1$ has a much smaller variance than the marginal of $x_2$ (see the points in Fig. 5).

Approximate average ranks read from the Fig. 7 plot. Series: π = PaP, C, D, πL, CL; o = RF OOB, shown for RF only. Under PaP the theoretical rank of $x_1,x_2,x_3$-$x_5$ is about 6.

| Panel ($\rho=0.9$) | $x_1,x_2$: PaP (π) | $x_1,x_2$: C / D / πL / CL | $x_3$-$x_5$: π | $x_3$-$x_5$: alternatives | $x_9$: π vs alternatives |
|---|---|---|---|---|---|
| Random forest | ~7.9, ~8.4 (OOB ~8.8, ~9.1) | ~3.5 | ~5 | ~7 | ~7.7 (OOB ~7) vs ~9 |
| Neural network | ~7.5, ~7.5 | ~3.2-4.8 | ~5-5.4 | ~6-7 | ~6.9 vs ~7.5 |
| Linear model | ~6.1, ~5.9 | ~2.5 | ~6 | ~7 | ~9 vs ~9 |

**Figure 7, transcribed in full.** All six panels were read from the rendered plot points (p. 14, 300 dpi, enlarged), so values are approximate to about ±0.1 rank (±0.2 for the NN panels, where markers overlap). Legend symbols: π black circle, C red triangle, D green plus, πL blue cross, CL cyan diamond, o magenta inverted triangle (RF only). "1, 2, 3" for $x_6$-$x_8$ means the marker sits on the integer to within plotting resolution. Theoretical PaP ranks (Theorem 1, eq. (2)): $x_1$-$x_5$ about 6, $x_6=1$, $x_7=2$, $x_8=3$, $x_9=9$, $x_{10}=10$. For the alternatives at $\rho=0.9$, Theorem 3 scales $x_1,x_2$ by their residual variance given the other features. As a rough Gaussian approximation (our calculation, not the paper's) that is about $1-\rho^2=0.19$ of the marginal variance, so the expected importances are proportional to $1^2\times0.19=0.19$ for $x_1,x_2$, against $0.5^2=0.25$ for $x_7$, $0.8^2=0.64$ for $x_8$ and $1$ for $x_3$-$x_5$. The implied ordering is $x_6<x_1\approx x_2<x_7<x_8<x_3,x_4,x_5<x_9<x_{10}$, i.e. ranks 1, 2.5, 2.5, 4, 5, 6-8, 9, 10. The linear panel matches this exactly.

*Top row, $\rho=0$ (independent features).*

| Learner | Measure | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $x_6$ | $x_7$ | $x_8$ | $x_9$ | $x_{10}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RF | π | 5.55 | 6.45 | 5.85 | 5.9 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| RF | C | 5.5 | 6.45 | 5.8 | 6.15 | 6.1 | 1 | 2 | 3 | 9 | 10 |
| RF | D | 5.75 | 6.05 | 6.0 | 5.85 | 6.35 | 1 | 2 | 3 | 9 | 10 |
| RF | πL | 5.8 | 6.1 | 5.9 | 5.9 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| RF | CL | 5.7 | 6.15 | 6.0 | 5.8 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| RF | o (OOB) | 5.5 | 6.5 | 5.7 | 5.95 | 6.25 | 1 | 2 | 3 | 9 | 10 |
| NN | π | 6.35 | 6.1 | 5.4 | 5.3 | 5.45 | 3.7 | 4.3 | 3.95 | 6.85 | 7.55 |
| NN | C | 5.6 | 6.0 | 5.35 | 5.6 | 5.45 | 3.75 | 4.2 | 4.3 | 6.6 | 8.3 |
| NN | D | 5.5 | 5.35 | 6.2 | 5.05 | 5.7 | 4.25 | 3.75 | 4.35 | 7.0 | 7.85 |
| NN | πL | 6.5 | 5.05 | 6.05 | 5.8 | 5.8 | 3.3 | 3.55 | 3.9 | 7.1 | 7.85 |
| NN | CL | 6.3 | 5.75 | 5.65 | 6.1 | 6.3 | 2.6 | 3.05 | 4.0 | 7.4 | 7.75 |
| Linear | π | 5.85 | 5.65 | 6.05 | 6.1 | 6.3 | 1 | 2 | 3 | 9 | 10 |
| Linear | C | 5.7 | 5.85 | 6.15 | 6.1 | 6.15 | 1 | 2 | 3 | 9 | 10 |
| Linear | D / πL / CL (overlap) | 5.7 | 5.95 | 5.9 | 5.95 | 6.5 | 1 | 2 | 3 | 9 | 10 |

*Bottom row, $\rho=0.9$ ($x_1,x_2$ Gaussian-copula correlated).*

| Learner | Measure | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $x_5$ | $x_6$ | $x_7$ | $x_8$ | $x_9$ | $x_{10}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RF | π | 7.9 | 8.45 | 4.95 | 4.95 | 5.05 | 1 | 2 | 3 | 7.65 | 10 |
| RF | C | 3.5 | 3.75 | 7.0 | 6.9 | 7.1 | 1 | 2 | 4.8 | 9 | 10 |
| RF | D | 3.4 | 3.6 | 7.0 | 7.0 | 7.05 | 1 | 2 | 5 | 9 | 10 |
| RF | πL | 3.55 | 3.5 | 7.05 | 6.9 | 7.05 | 1 | 2 | 5 | 9 | 10 |
| RF | CL | 3.4 | 3.6 | 7.0 | 6.8 | 7.15 | 1 | 2 | 5 | 9 | 10 |
| RF | o (OOB) | 8.8 | 9.1 | 4.9 | 4.95 | 5.15 | 1 | 2 | 3 | 7.0 | 9.1 |
| NN | π | 7.45 | 7.45 | 5.4 | 5.0 | 5.35 | 2.9 | 3.65 | 3.65 | 6.95 | 7.2 |
| NN | C | 3.4 | 3.65 | 6.6 | 6.3 | 6.3 | 3.35 | 4.85 | 5.0 | 7.55 | 7.95 |
| NN | D | 4.8 | 3.2 | 6.75 | 6.3 | 5.8 | 3.5 | 4.3 | 5.05 | 7.45 | 7.85 |
| NN | πL | 3.9 | 3.35 | 6.45 | 6.95 | 6.35 | 3.05 | 4.55 | 4.8 | 7.55 | 8.0 |
| NN | CL | 4.0 | 4.35 | 6.45 | 6.1 | 5.65 | 3.55 | 4.45 | 5.8 | 6.85 | 7.8 |
| Linear | π | 6.1 | 5.9 | 6.1 | 5.95 | 5.9 | 1 | 2 | 3 | 9 | 10 |
| Linear | C / D / πL / CL (overlap) | 2.55 | 2.5 | 7.0 | 6.85 | 7.05 | 1 | 4 | 5 | 9 | 10 |

**What the full transcription adds to the text.**
- *Top row.* For RF and the linear model all measures coincide on $x_6$-$x_{10}$ and scatter only within the $x_1$-$x_5$ tie (ranks 5.5-6.5), i.e. at $\rho=0$ the choice of measure does not matter. The NN top row is the noisy one: every measure compresses the ranking ($x_{10}$ only 7.5-8.3, $x_6$ at 2.6-4.3), and the five measures disagree within $x_1$-$x_5$ by up to about 1.5 ranks. This is learner variability at $N=200$, not extrapolation (there is no correlation to extrapolate across).
- *Bottom row.* For the linear model the alternatives push $x_1,x_2$ (about 2.5) below $x_7$ (coefficient 0.5), and the freed rank positions move $x_7$, $x_8$ up to 4 and 5 (instead of 2 and 3). For RF the pair falls to about 3.5: below $x_8$ (about 5) and $x_3$-$x_5$ (about 7), but still **above** $x_7$, which stays at rank 2. PaP and OOB do the reverse, and RF-OOB even drops $x_{10}$ to about 9.1 and $x_9$ to 7.0 because $x_1,x_2$ occupy the top two slots.
- The text's claim that the four alternatives "all agree (to within Monte Carlo variability)" is visible in the RF and linear panels (spread ≤0.25 rank). In the NN bottom panel the spread is larger: $\mathrm{VI}^D$ ranks $x_1$ at about 4.8 while $\mathrm{VI}^C$ gives about 3.4, and $\mathrm{VI}^{CL}$ ranks $x_8$ at about 5.8 vs about 4.8 for $\mathrm{VI}^{\pi L}$.
- Caption fidelity: the caption reads "Gaussian copular" (typo for copula) and says "10 simulated data sets of size 200", a smaller design than the 50 replicates of size 2,000 behind Fig. 1.

This shows the compensation effect. Under the alternatives, the correlated pair drops **below** the independent equal-coefficient features (ranks ~2.5-3.5), for the linear model as well. The linear-model panel shows clearly that PaP (black) and the alternatives (cyan) answer **different questions** even when no extrapolation occurs. Theorem 1 vs Theorem 3.

### Theorem 3: linear-model expectations and the compensation effect

> [!theorem] Theorem 3: Alternative importances for least-squares linear models (§5, p. 13)
> Let $f(x)=\hat\beta_0+\sum_{j=1}^p\hat\beta_jx_j$ be fit by least squares, with **linear dependence** between features, $E(x_{ij}\mid x_{-j})=\gamma_{0j}+x_{i,-j}\gamma_j$. Let $\delta_{ij}=x_{ij}-\hat\gamma_0-x_{-j}\gamma_j$ be the least-squares residuals from predicting $x_{ij}$. Then
> $$
> 2\,\mathrm{VI}^D_j=E_\pi\mathrm{VI}^{\pi L}_j=E_{x^{c,j}_{ij}}\mathrm{VI}^{CL}_j=2\beta_j^2\sum_{i=1}^N\delta_{ij}^2+o(1),
> $$
> $$
> E_{x^{c,j}_{ij}}\mathrm{VI}^C_j=2\beta_j^2\sum_{i=1}^N\mathrm{var}(x_{ij}\mid x_{-j}).
> $$
> The $o(1)$ comes from estimating coefficients with a random covariate matrix after permuting a feature. Normalized by $N$ it is $o(1/N)$ and generally small. (Equation transcribed as printed. The proof shows $E_\pi f^{\pi,j}=f^{-j}+o_p(1/N)$, which suggests $\mathrm{VI}^{\pi L}$ and $\mathrm{VI}^D$ should have the same order. Treat the exact constants with care.)
^thm-3

> [!warning] Notation problems in the printed statement of Theorem 3 (p. 13, checked against the rendered PDF)
> 1. **Mixed hats in $\delta_{ij}$.** The source prints $\delta_{ij}=x_{ij}-\hat\gamma_0-\boldsymbol x_{-j}\boldsymbol\gamma_j$. The intercept carries a hat but no $j$ subscript, while the slope carries a $j$ subscript but no hat, and $\boldsymbol x_{-j}$ has lost its row index $i$. Since $\delta_{ij}$ is described as "the least-squares residuals to predict $x_{ij}$", the consistent reading is $\delta_{ij}=x_{ij}-\hat\gamma_{0j}-\boldsymbol x_{i,-j}\hat{\boldsymbol\gamma}_j$: the **sample** residuals from regressing column $j$ on the other columns. The unhatted $\gamma_{0j},\boldsymbol\gamma_j$ in the hypothesis $E(x_{ij}\mid\boldsymbol x_{-j})=\gamma_{0j}+\boldsymbol x_{i,-j}\boldsymbol\gamma_j$ are the population coefficients.
> 2. **$\beta_j^2$ vs $\hat\beta_j^2$.** Both displayed results are printed with $2\beta_j^2$ (no hat), but the theorem is about the fitted model $f(x)=\hat\beta_0+\sum_j\hat\beta_jx_j$. The Appendix A proof (p. 21) makes the same slip: it writes $X\hat\beta=X^{-j}(\hat\beta^{-j}+\hat\gamma^j\hat\beta_j)+\beta_j\delta_j$, where the left side forces the coefficient on $\delta_j$ to be $\hat\beta_j$. The result is therefore a statement about the **estimated** coefficient: $2\mathrm{VI}^D_j\approx2\hat\beta_j^2\sum_i\delta_{ij}^2$, the same as in Theorem 1, which is stated with $\hat\beta_j$. Replacing $\hat\beta_j$ with the true $\beta_j$ only holds up to estimation error.
> 3. **Constant on $\mathrm{VI}^D$.** Separately (the caveat above), the proof gives $\mathrm{VI}^D_j=\hat\beta_j^2\sum_i\delta_{ij}^2$, so $2\mathrm{VI}^D_j=2\hat\beta_j^2\sum_i\delta_{ij}^2$ is consistent. But $E_\pi f^{\pi,j}=f^{-j}+o_p(1/N)$ would make $E_\pi\mathrm{VI}^{\pi L}_j$ equal to $\mathrm{VI}^D_j$, not twice it. The factor of 2 on the relearn measures is not derived in the appendix.
>
> The equations above are transcribed exactly as printed. These are our readings of the notation, not corrections published by the authors.
^warn-thm-3-notation

> [!theorem] Proof sketch (Appendix A, pp. 21-22)
> - Regressing on $XA$ for invertible $A$ is the same as regressing on $X$. Include an intercept column in $X$.
> - Write $X\hat\beta=X^{-j}(\hat\beta^{-j}+\hat\gamma^j\hat\beta_j)+\beta_j\delta_j$. Both the residuals $e=y-X\hat\beta$ and $\delta_j$ are orthogonal to $X^{-j}$. Hence
>   $$
>   f^{-j}(x)=x(X^{-jT}X^{-j})^{-1}X^{-jT}\big(X^{-j}(\hat\beta^{-j}+\hat\gamma^j\hat\beta_j)+\beta_j\delta_j+e\big)=x_{-j}(\hat\beta^{-j}+\hat\gamma^j\hat\beta_j).
>   $$
>   This is the omitted-variable formula: the dropped coefficient loads onto correlated features through $\hat\gamma^j$.
> - $\mathrm{VI}^D_j=\sum_i(x_i(\hat\beta-\hat\beta^{-j}))^2+2(y_i-x_i\hat\beta)x_i(\hat\beta-\hat\beta^{-j})$. The cross term vanishes, and substitution gives the residual sum of squares $\hat\beta_j^2\sum_i\delta_{ij}^2$.
> - $\mathrm{VI}^{\pi L}$: centre the $x_{ij}$. Then $E_\pi\sum_ix^{\pi,j}_{ij}y_i=E_\pi\sum_ix^{\pi,j}_{ij}x_{ik}=0$, so $E_\pi f^{\pi,j}(x)=f^{-j}(x)+o_p(1/N)$, and the $\mathrm{VI}^D$ result carries over.
> - $\mathrm{VI}^{CL}$: same calculation after subtracting $\gamma_{0j}+x_{i,-j}\gamma_j$ from $x^{c,j}_{ij}$.
> - $\mathrm{VI}^C$: as in Theorem 1, using $E(x_{ij}-x^{c,j}_{ij})^2=2\,\mathrm{var}(x_{ij}\mid x_{-j})$.
^proof-thm-3

> [!definition] Definition: Compensation effect (§5, p. 13)
> All four alternatives reduce the importance of correlated features **relative to their coefficients**, because only the part of $x_j$ not linearly predictable from $x_{-j}$ ($\delta_j$, or $\mathrm{var}(x_j\mid x_{-j})$) counts. Theorem 3 suggests correcting for this by dividing by the appropriate residual quantity, if one wants a coefficient-like ranking. That correction is exact only for linear models.
^def-compensation

**Joint importance** (p. 13). The most reliable diagnostic the authors know for correlated groups is to **remove or permute pairs jointly and refit**. Extending Theorem 1 gives a joint importance of
$$
\sum_{i=1}^N\big(\beta_1(x_{i1}-\bar x_1)+\beta_1(x_{i2}-\bar x_2)\big)^2
$$
(printed with $\beta_1$ twice; the second is presumably $\beta_2$). This cannot be recovered from any of the univariate measures in the paper.

### Local explanations are not a global substitute (p. 13)

- **Saliency** (Simonyan et al. 2013): derivatives with respect to $x$.
- **LIME** (Ribeiro et al. 2016): a kernel-localized LASSO approximation.
- **Local Shapley values** (Lundberg & Lee 2017).

These query $f$ **near** observed $x$, so they should not suffer from extrapolation, but Slack et al. (2020) show SHAP and LIME can be fooled by altering $f$ off the data distribution. They also do not give the **global** picture that permutation methods aim for. Example: if $f$ is a **threshold** whose transition lies away from all observed points, saliency is low everywhere even though predictions span a large range.

## Examples

> [!example] Example: two collinear channels in a linear MMM-style regression
> Suppose sales $=\beta_{TV}\,TV+\beta_{S}\,Search+\dots$ and search spend is 90% predictable from TV spend ($R^2=0.9$). By Theorem 1, PaP importance of TV is $2\hat\beta_{TV}^2\sum(TV_i-\overline{TV})^2$ and ignores the overlap. By Theorem 3, LOCO, relearn and conditional importances scale with $\sum\delta_i^2\approx0.1\sum(TV_i-\overline{TV})^2$, so TV's importance drops about tenfold. Neither number is "wrong": PaP answers "what if TV moved alone?", while the alternatives answer "what does TV add beyond search?". To credit the pair, drop or permute **both together** and refit.
^ex-collinear-channels

## Connections

- Dropping a correlated regressor shifts its effect onto the others: [[Omitted Variables Bias]].
- LOCO's origin in distribution-free predictive inference: [[Conformal Prediction - Overview]], [[Conformal Inference for Counterfactuals and ITEs]].
- Refit-based importance needs held-out or cross-fitted evaluation to avoid optimism: [[Cross-Fitting and Sample Splitting]], [[Cross Validation Checking]].
- Conditional sampling within tree partitions: [[Strobl et al 2008 - Conditional Variable Importance - Overview]]. Conditional model class reliance: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- Observational (conditional) vs interventional (marginal) feature relevance: [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- Comparing importance between groups of correlated features in an MMM: [[MMM Model Selection and Application]].

## See Also
- [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] — when relearning alone fails
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
- [[Conditional Permutation Importance (Strobl 2008 Algorithm)]] — Strobl's tree-grid conditional permutation is one of the conditional alternatives
