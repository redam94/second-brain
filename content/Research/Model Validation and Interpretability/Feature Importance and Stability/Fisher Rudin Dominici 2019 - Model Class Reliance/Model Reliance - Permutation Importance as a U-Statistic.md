---
title: Model Reliance - Permutation Importance as a U-Statistic
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/variable-importance
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§3 pp. 7-8 (Eq 3.1); §3.1 pp. 8-9 (Eqs 3.2-3.6); §3.2 p. 10; App A.2 pp. 43-44; App A.3 pp. 44-45; App A.5 pp. 45-46 (Eq A.4)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Permutation Tests and Exact Inference]]"
used_by:
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
  - "[[Model Class Reliance for Linear and RKHS Model Classes]]"
  - "[[Model Reliance, Causal Effects and Conditional Model Reliance]]"
aliases:
  - Model Reliance
  - MR (Model Reliance)
  - Empirical Model Reliance
  - e_switch
  - Algorithm Reliance
  - Model Reliance Difference
---

# Model Reliance - Permutation Importance as a U-Statistic

> [!summary]
> **Model reliance** $MR(f)=e_{\text{switch}}(f)/e_{\text{orig}}(f)$ is the factor by which a *fixed* model's expected loss grows when $X_1$ is replaced by an independent draw. This breaks its link to $(Y,X_2)$ but keeps its marginal distribution. Averaging the loss over all $n(n-1)$ off-diagonal row pairings gives $\hat e_{\text{switch}}$, an **unbiased U-statistic**, proportional to the average over all $n!$ permutations with fixed points removed. MR differs from **algorithm reliance** (refit without $X_1$), which compares two different models rather than describing one.
^summary

## Overview

MR is the single-model building block of MCR. It follows Breiman's (2001) random-forest permutation importance with two changes. It permutes inputs to the *whole* model, not to each tree on out-of-bag data, so it applies to any model class. It averages over all pairings instead of one random permutation, which makes it a U-statistic with known theory. The link "between permutation-based importance and U-statistics" had, to the authors' knowledge, "not been previously established" (§3.1, p. 9).

## Main Content

### Population definition

> [!definition] Definition: Switched loss, original loss, model reliance (§3, pp. 7-8, Eq 3.1)
> Let $Z^{(a)}=(Y^{(a)},X_1^{(a)},X_2^{(a)})$ and $Z^{(b)}=(Y^{(b)},X_1^{(b)},X_2^{(b)})$ be independent copies of $Z$. For a fixed, prespecified model $f$ (as in Hooker 2007):
> $$
> e_{\text{switch}}(f):=\mathbb E\,L\{f,(Y^{(b)},X_1^{(a)},X_2^{(b)})\},\qquad e_{\text{orig}}(f):=\mathbb E\,L\{f,(Y,X_1,X_2)\},
> $$
> $$
> MR(f):=\frac{e_{\text{switch}}(f)}{e_{\text{orig}}(f)}.\qquad(3.1)
> $$
> $e_{\text{switch}}$ is the expected loss when $X_1$ is "switched" in from an independent observation. Equivalently, it is the loss when noise renders $X_1$ uninformative of $Y$ while preserving its marginal distribution.
^def-mr

**Scale.** $MR=2$ means the loss doubles when $X_1$ is scrambled (heavy reliance). $MR=1$ means no reliance. $MR<1$ is possible but pathological, e.g. a model that treats $X_1$ and $Y$ as positively correlated when they are negatively correlated (§3, p. 8).

> [!theorem] Claim: Models with MR below 1 are typically dominated (§3 p. 8; App A.2 pp. 43-44)
> Let $\mathcal F=\{f_\theta:\theta\in\mathbb R^d\}$, with $f_{\theta_{\text{silly}}}$ a model satisfying $MR<1$ and $f_{\theta^\star}$ best-in-class with $MR(f_{\theta^\star})>1$. If $MR(f_\theta)$ is **continuous in $\theta$**, there is a $\theta_1$ between $\theta_{\text{silly}}$ and $\theta^\star$ with $MR(f_{\theta_1})=1$. If in addition $L$ is **convex in $\theta$**, then $e_{\text{orig}}(f_{\theta^\star})\le e_{\text{orig}}(f_{\theta_1})\le e_{\text{orig}}(f_{\text{silly}})$. So any population $\epsilon$-Rashomon set containing $f_{\text{silly}}$ also contains a model with *zero* reliance and no worse loss.
>
> **Consequence:** it is usually precise enough to left-truncate MCR at 1, since "it is often sufficiently precise to conclude that there exists a well-performing model with no reliance on the variables of interest" (§10.1, p. 40). The COMPAS analysis does this ([[Model Class Reliance - Recidivism Case Study]]).
^thm-mr-below-one

### Estimators (§3.1)

> [!definition] Definition: U-statistic estimators of MR (Eqs 3.2-3.6, pp. 8-9)
> $$
> \hat e_{\text{orig}}(f):=\frac1n\sum_{i=1}^nL\{f,(\mathbf y_{[i]},\mathbf X_{1[i,\cdot]},\mathbf X_{2[i,\cdot]})\}\qquad(3.2)
> $$
> $$
> \hat e_{\text{switch}}(f):=\frac1{n(n-1)}\sum_{i=1}^n\sum_{j\ne i}L\{f,(\mathbf y_{[j]},\mathbf X_{1[i,\cdot]},\mathbf X_{2[j,\cdot]})\}\qquad(3.3)
> $$
> When $n^2$ pairs are too many, use the **divide** estimator, which swaps halves:
> $$
> \hat e_{\text{divide}}(f):=\frac1{2\lfloor n/2\rfloor}\sum_{i=1}^{\lfloor n/2\rfloor}\Big[L\{f,(\mathbf y_{[i]},\mathbf X_{1[i+\lfloor n/2\rfloor,\cdot]},\mathbf X_{2[i,\cdot]})\}+L\{f,(\mathbf y_{[i+\lfloor n/2\rfloor]},\mathbf X_{1[i,\cdot]},\mathbf X_{2[i+\lfloor n/2\rfloor,\cdot]})\}\Big]\qquad(3.4\text{-}3.5)
> $$
> **Empirical model reliance** is the plug-in ratio
> $$
> \widehat{MR}(f):=\frac{\hat e_{\text{switch}}(f)}{\hat e_{\text{orig}}(f)}.\qquad(3.6)
> $$
> Each of (3.2), (3.3) and (3.5) is unbiased for its estimand. The ratio (3.6) is not exactly unbiased; see the difference version below.
^def-mr-hat

> [!theorem] Proposition (stated in text): permutation importance as U-statistic (§3.1 p. 9; App A.3 pp. 44-45)
> Let $\{\pi_1,\dots,\pi_{n!}\}$ be all permutations of $\{1,\dots,n\}$. Breiman's (2001) approach computes $\sum_iL\{f,(\mathbf y_{[i]},\mathbf X_{1[\pi_l[i],\cdot]},\mathbf X_{2[i,\cdot]})\}$ for one random $\pi_l$. Then
> $$
> \sum_{l=1}^{n!}\sum_{i=1}^nL\{f,(\mathbf y_{[i]},\mathbf X_{1[\pi_{l[i]},\cdot]},\mathbf X_{2[i,\cdot]})\}\,\mathbb 1(\pi_{l[i]}\ne i)=(n-1)!\sum_{i=1}^n\sum_{j\ne i}L\{f,(\mathbf y_{[i]},\mathbf X_{1[j,\cdot]},\mathbf X_{2[i,\cdot]})\},
> $$
> which is proportional to $\hat e_{\text{switch}}(f)$, with a constant that depends only on $n$. Excluding the $n$ observed (fixed-point) pairings is necessary for finite-sample unbiasedness.
>
> **Proof (App A.3).** The double sum over all $n!$ permutations has $n\cdot n!$ terms, each of the form $L\{f,(y_i,X_{1j},X_{2i})\}$, and there are only $n^2$ distinct $(i,j)$ combinations. Exactly $(n-1)!$ permutations put $j$ in position $i$, so each combination appears at least $(n-1)!$ times. Since $n^2(n-1)!=n\cdot n!$ uses up every term, each appears *exactly* $(n-1)!$ times. Multiplying by $\mathbb 1(\pi_{l[i]}\ne i)$ removes the diagonal $j=i$.
^thm-permutation-ustat

**Consequences of the U-statistic form (§3.1, p. 9).** Under minor conditions, $\hat e_{\text{orig}}$, $\hat e_{\text{switch}}$ and $\hat e_{\text{divide}}$ are unbiased and asymptotically normal, with finite-sample probabilistic bounds (Hoeffding 1948, 1963; Serfling 1980; DeLong et al. 1988 for an early ML use, with caveats in Demler et al. 2012). These results hold for $f$ fixed a priori. Theorem 5 extends them to a bound that is *uniform* over a sufficiently regularized $\mathcal F$ ([[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^thm-5]]). That implies a model can be trained and its importance evaluated on the same data. This contrasts with RF out-of-bag VI, where each tree's VI is computed on held-out data and then aggregated. Sample splitting is "not strictly necessary, depending on the sample size and the complexity of $\mathcal F$."

**Computation.** For linear models $\hat e_{\text{switch}}$ costs $O(n)$, not $O(n^2)$ ([[Model Class Reliance for Linear and RKHS Model Classes#^thm-prop15]]).

### Ratio versus difference (App A.5)

> [!definition] Definition: Difference-based model reliance (Eq A.4, p. 45)
> $$
> MR_{\text{difference}}(f):=e_{\text{switch}}(f)-e_{\text{orig}}(f),\qquad \widehat{MR}_{\text{difference}}(f):=\hat e_{\text{switch}}(f)-\hat e_{\text{orig}}(f).
> $$
> The paper uses the ratio so that MR is comparable across problems regardless of the scale of $Y$. The difference, used by Strobl et al. (2008), Datta et al. (2016) and Gregorutti et al. (2017), has computational advantages:
> - its mean, variance and asymptotic distribution follow from U-statistic theory without the delta method;
> - it is more stable when $\min_f e_{\text{orig}}(f)$ is small;
> - it can be normalized by $\mathrm{Var}(Y)$ for interpretability (as in Williamson et al. 2017);
> - the bound results then hold **without Assumption 3** ([[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^def-q-difference]]).
^def-mr-difference

### Limitations of existing VI methods; algorithm reliance (§3.2, p. 10)

- **Null-hypothesis tests** can detect a relationship but do not measure its strength.
- **Inclusion by a sparse fitter** (e.g. the lasso) does not say how much the variable is relied on.
- **Partial dependence plots** are hard to read with several variables of interest or with interactions.
- **Drop-and-refit** (Gevrey et al. 2003) runs the algorithm on all data and again without $X_1$, then compares losses. That measures the "necessity" of $X_1$. Comparing the full model with one retrained on $X_1$ alone measures "sufficiency" (Breiman et al. 2001; Breiman 2001).

> [!definition] Definition: Algorithm reliance (AR) (§3.2, p. 10; §9.1)
> **Empirical algorithm reliance** on $X_1$ compares the loss of $\mathcal A(\text{data})$ with the loss of $\mathcal A(\text{data without }X_1)$ (necessity), or with the loss of $\mathcal A(\text{data with only }X_1)$ (sufficiency). Because it is a function of *two* models, it "does not measure how much either individual model relies on $X_1$". The common element is the fitting algorithm, hence the name.
^def-ar

**Other related work (§3.2).** Empirical RF-VI studies: Archer & Kimes 2008, Calle & Urrea 2010, Wang et al. 2016. Variants: Strobl et al. 2007, 2008; Altmann et al. 2010; Hapfelmeier et al. 2014. U-statistics for subsampled ensembles: Mentch & Hooker 2016. Mean-decrease-impurity theory: Louppe et al. 2013; Kazemitabar et al. 2017. Zhu et al. (2015) and Gregorutti et al. (2015, 2017) study MR-like quantities only when $f$ is the conditional-mean function $E[Y\mid X]$; this paper allows arbitrary $f$. Datta et al. (2016) measure how much *predictions* change under permutation, regardless of the loss.

## Examples

> [!example] MR versus AR in the toy example (§9.1, Fig. 6)
> A degree-3 polynomial classifier $f_{\text{ref}}$ has $\widehat{MR}(f_{\text{ref}})=3.47$ on $X_1$. The model $\hat f_2$, refit without $X_1$, has $\widehat{MR}(\hat f_2)=1$ by construction. AR compares $f_{\text{ref}}$ with $\hat f_2$, two different models. MR describes each model separately under a changed data distribution. Details: [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]].
^ex-mr-versus-ar-in

> [!example] Computing $\hat e_{\text{switch}}$ by hand, $n=3$
> Rows $(y_i,x_{1i},x_{2i})$ for $i=1,2,3$. $\hat e_{\text{switch}}$ averages the 6 losses $L(f,(y_j,x_{1i},x_{2j}))$ for $(i,j)\in\{(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)\}$. Each row's $(y,x_2)$ is paired with the other two rows' $x_1$. One random permutation (Breiman) uses only 3 of these pairings, possibly including a fixed point.
^ex-computing-by-hand

## Connections

- **Extrapolation.** Switching $X_1$ independently of $X_2$ creates $(x_1,x_2)$ pairs that may never occur. MR evaluates $f$ off the data support, which [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] identifies as the main failure of permute-and-predict. The paper's own remedy is conditional MR ([[Model Reliance, Causal Effects and Conditional Model Reliance#^def-cmr]]).
- **Permutation inference.** A permutation *test* uses permutations to build a null distribution ([[Permutation Tests and Exact Inference]]). MR uses them to build a perturbed *loss*. Both rely on exchangeability of rows.
- **Global sensitivity analysis.** MR is close to a "total effect" sensitivity index evaluated through the loss rather than the output variance; compare [[Variance-Based Sensitivity and Sobol Indices]].
- **Bias of tree-internal importances.** [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]].

## See Also
- [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]: uniform-in-$\mathcal F$ MR error bound
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]: conditional permutation within $X_2$ strata
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
- [[Strobl 2008 - Permutation Importance Null Hypotheses]] — model reliance is the population analogue of Strobl's Eq. 1
