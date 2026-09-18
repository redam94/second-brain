---
title: Conformal Prediction Under Covariate Shift
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - topic/distribution-shift
  - type/method
  - doc/paper
source: "[[raw/Tibshirani et al 2019 - Conformal Prediction Under Covariate Shift.pdf]]"
source_location: "Sec. 1.1-1.2 (pp. 1-3), Sec. 2.1-2.3 (pp. 3-10), Sec. 3.1-3.5 (pp. 10-14), Sec. 4 (pp. 14-16); Angelopoulos & Bates 2021 Sec. 4.5 (pp. 20-21)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Marginal vs Conditional Coverage]]"
used_by:
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Conformal Prediction - Overview]]"
aliases:
  - Weighted Conformal Prediction
  - Weighted Exchangeability
  - Covariate Shift Conformal
  - Weighted Split Conformal
---

# Conformal Prediction Under Covariate Shift

> [!summary]
> Tibshirani, Barber, Candès & Ramdas (NeurIPS 2019) extend conformal prediction beyond exchangeability. Under **covariate shift** — training $(X_i,Y_i)\sim P_X\times P_{Y\mid X}$, test $(X_{n+1},Y_{n+1})\sim\tilde P_X\times P_{Y\mid X}$ with the *same* conditional law — replacing the empirical distribution of calibration scores by a **likelihood-ratio-weighted** one, with weights $w(x)=d\tilde P_X(x)/dP_X(x)$, restores $\mathbb P\{Y_{n+1}\in\hat C_n(X_{n+1})\}\ge1-\alpha$ exactly. The general principle is **weighted exchangeability**. When $w$ is unknown it can be estimated as the odds of a train-vs-test classifier. On the airfoil data, unweighted split conformal drops to 82.2% coverage under an exponential tilt; oracle weights restore 90.8%, and logistic-regression or random-forest estimated weights give 91.0%.

## Overview

The marginal guarantee in [[Split Conformal Prediction and the Coverage Guarantee]] averages over $X\sim P_X$. If deployment covariates follow $\tilde P_X\ne P_X$, that average is over the wrong population. Because conformal sets generally lack [[Marginal vs Conditional Coverage|conditional coverage]], heteroscedastic regions that are up-weighted under $\tilde P_X$ can drag coverage far below nominal. A&B's examples (Sec. 4.5): calibrating a diagnostic on 50% infants / 50% adults but deploying on 5% / 95%; calibrating a vision system in the morning and deploying in the afternoon.

The remedy parallels importance weighting and inverse-propensity weighting elsewhere in statistics: up-weight calibration points that look like the test population. The likelihood ratio $d\tilde P_X/dP_X$ "also plays a critical role in much of the literature on covariate shift" (Remark 4); the paper's novelty is correcting *distribution-free prediction intervals* rather than estimators or model selection.

## Main Content

> [!definition] Covariate shift model (Tibshirani et al. Eq. 6) ^def-covariate-shift
> $$
> (X_i,Y_i)\overset{\text{i.i.d.}}{\sim}P=P_X\times P_{Y\mid X},\quad i=1,\dots,n;\qquad (X_{n+1},Y_{n+1})\sim\tilde P=\tilde P_X\times P_{Y\mid X}\ \text{independently.}
> $$
>
> The conditional distribution of $Y\mid X$ is identical in training and test; only the covariate marginal moves. $\tilde P_X$ must be absolutely continuous with respect to $P_X$ (overlap).

> [!definition] Weighted conformal probabilities (Eq. 7) ^def-weights
> With $w=d\tilde P_X/dP_X$,
>
> $$
> p_i^w(x)=\frac{w(X_i)}{\sum_{j=1}^n w(X_j)+w(x)},\quad i=1,\dots,n,\qquad p_{n+1}^w(x)=\frac{w(x)}{\sum_{j=1}^n w(X_j)+w(x)} .
> $$
>
> The ordinary case $w\equiv1$ gives $p_i=1/(n+1)$. Only ratios matter, so $w$ need be known only **up to a normalising constant** (Remark 3).

> [!theorem] Weighted conformal coverage under covariate shift (Corollary 1) ^thm-weighted-conformal
> Under the model above, for any score function $S$ and any $\alpha\in(0,1)$ define
>
> $$
> \hat C_n(x)=\Big\{y\in\mathbb R:\;V_{n+1}^{(x,y)}\le\mathrm{Quantile}\Big(1-\alpha;\;\sum_{i=1}^n p_i^w(x)\,\delta_{V_i^{(x,y)}}+p_{n+1}^w(x)\,\delta_\infty\Big)\Big\}.
> $$
>
> Then $\mathbb P\{Y_{n+1}\in\hat C_n(X_{n+1})\}\ge1-\alpha$.

> [!algorithm] Weighted split conformal (Eq. 10) ^alg-weighted-split
> 1. Fit $\mu_0$ on a preliminary fold; compute calibration scores $V_i=\lvert Y_i-\mu_0(X_i)\rvert$.
> 2. Obtain $w$ (known design, or estimated — below) and evaluate $w(X_i)$ and $w(x)$.
> 3. Form $p_i^w(x)$ and $p^w_{n+1}(x)$; compute $\hat q(x)=\mathrm{Quantile}\big(1-\alpha;\sum_i p_i^w(x)\delta_{V_i}+p_{n+1}^w(x)\delta_\infty\big)$.
> 4. Output $\hat C_n(x)=\mu_0(x)\pm\hat q(x)$.
>
> Differences from the unweighted case: the threshold $\hat q(x)$ now **depends on the test point** through $w(x)$, and a test point with very large $w(x)$ can push the $(1-\alpha)$ quantile onto the atom at $\infty$, yielding an infinite (honest) interval. Any score works — e.g. the CQR score, as in [[Conformal Inference for Counterfactuals and ITEs]].

### Why it works: weighted exchangeability (Sec. 3)

The authors re-prove the [[Split Conformal Prediction and the Coverage Guarantee#^thm-quantile-lemma|quantile lemma]] by conditioning on the unordered set of scores $E_v=\{\{V_1,\dots,V_{n+1}\}=\{v_1,\dots,v_{n+1}\}\}$ and asking which value $V_{n+1}$ took. Exchangeability gives $\mathbb P\{V_{n+1}=v_i\mid E_v\}=n!/(n+1)!=1/(n+1)$: uniform. This "isolates the role of exchangeability" and shows what must change otherwise.

> [!definition] Weighted exchangeability (Definition 1) ^def-weighted-exch
> $V_1,\dots,V_n$ are weighted exchangeable with weight functions $w_1,\dots,w_n$ if their joint density factorises as
>
> $$
> f(v_1,\dots,v_n)=\prod_{i=1}^n w_i(v_i)\cdot g(v_1,\dots,v_n),
> $$
>
> with $g$ invariant to permutations of its arguments. **Lemma 2:** independent draws $Z_i\sim P_i$ with $P_i\ll P_1$ are weighted exchangeable with $w_1\equiv1$, $w_i=dP_i/dP_1$.

> [!theorem] Weighted quantile lemma and general theorem (Lemma 3, Theorem 2) ^thm-weighted-quantile
> For weighted exchangeable $Z_1,\dots,Z_{n+1}$ and $V_i=S(Z_i,Z_{-i})$, define
>
> $$
> p_i^w(z_1,\dots,z_{n+1})=\frac{\sum_{\sigma:\sigma(n+1)=i}\prod_{j=1}^{n+1}w_j(z_{\sigma(j)})}{\sum_{\sigma}\prod_{j=1}^{n+1}w_j(z_{\sigma(j)})} .
> $$
>
> Then $\mathbb P\big\{V_{n+1}\le\mathrm{Quantile}\big(\beta;\sum_{i=1}^n p_i^w\delta_{V_i}+p_{n+1}^w\delta_\infty\big)\big\}\ge\beta$, because $V_{n+1}\mid E_z\sim\sum_i p_i^w\delta_{v_i}$. The general weights are "combinatorially hard", but under covariate shift ($w_i\equiv1$ for $i\le n$, $w_{n+1}=w$) the sums over permutations collapse to $p_i^w=w(x_i)/\sum_{j=1}^{n+1}w(x_j)$.

No matching **upper** bound is available without conditions on the weights (Remark 5): the largest jump of the conditional CDF is $\max_i p_i^w$, which can be large, whereas it is always $1/(n+1)$ unweighted. Lei & Candès later supply one: with $(\mathbb E[w(X)^r])^{1/r}\le M_r$ coverage is at most $1-\alpha+c\,n^{1/r-1}$, and with *estimated* weights coverage is at least $1-\alpha-\Delta_w$ where $\Delta_w=\tfrac12\mathbb E_{X\sim P_X}\lvert\hat w(X)-w(X)\rvert$.

### Estimating the weights (Sec. 2.3)

Given unlabeled test covariates $X_{n+1},\dots,X_{n+m}$, label training points $C=0$ and test points $C=1$ and fit any probabilistic classifier $\hat p(x)\approx\mathbb P(C=1\mid X=x)$. Since

$$
\frac{\mathbb P(C=1\mid X=x)}{\mathbb P(C=0\mid X=x)}=\frac{\mathbb P(C=1)}{\mathbb P(C=0)}\cdot\frac{d\tilde P_X}{dP_X}(x),
$$

the odds $\hat w(x)=\hat p(x)/(1-\hat p(x))$ estimate $w$ up to the irrelevant constant (Eq. 12). This "probabilistic classification" approach is one family of density-ratio estimators (others: moment matching, $\phi$-divergence minimisation; Sugiyama et al. 2012). It is exactly a **propensity-score odds**, with "membership in the test sample" as the treatment — the bridge to [[Propensity Score and the Balancing Property]] and [[Bayesian Inverse Probability Weighting]].

### Effective sample size

Weighted quantiles use fewer effective points. The heuristic from the covariate-shift literature:

$$
\hat n=\frac{\big[\sum_{i=1}^n\lvert w(X_i)\rvert\big]^2}{\sum_{i=1}^n\lvert w(X_i)\rvert^2}=\frac{\lVert w(X_{1:n})\rVert_1^2}{\lVert w(X_{1:n})\rVert_2^2}.
$$

In the airfoil experiment, running *unweighted* conformal with only $\hat n$ subsampled calibration points reproduces the dispersion of the oracle-weighted coverage histogram, so the extra variability "is fully explained by the reduced effective sample size".

### Airfoil experiment ($N=1503$, $d=5$, 5000 random splits, $\alpha=0.1$)

Data split 25% pre-fit (linear $\mu_0$) / 25% calibration / 50% test; shifted test set drawn from the test set with probabilities $\propto w(x)=\exp(x^\top\beta)$, $\beta=(-1,0,0,0,1)$ (an exponential tilt).

| Procedure | Test population | Avg. coverage |
|---|---|---|
| Unweighted split conformal | no shift | 90.2% |
| Unweighted split conformal | shifted | **82.2%** |
| Weighted, oracle $w$ | shifted | 90.8% |
| Weighted, logistic-regression $\hat w$ | shifted | 91.0% |
| Weighted, random-forest $\hat w$ | shifted | 91.0% |

Random-forest probabilities were clipped to $[0.01,0.99]$ because about 2% of cases otherwise produced $\hat p=1$ and infinite weights; RF weights gave more variable and sometimes much longer intervals. With *no* actual shift, estimated-weight conformal behaves nearly identically to unweighted. Oracle-weighted intervals are longer than the equal-$\hat n$ unweighted ones because $\mu_0$ itself was not adapted to the shift.

### Other uses noted in the Discussion (Sec. 4)

- **Graphical structure $Z\to X\to Y$** with shift only in low-dimensional $Z$: $\tilde P_{Z,X}/P_{Z,X}=\tilde P_Z/P_Z$, so only a low-dimensional ratio is needed.
- **Missing covariates with known summaries**: a second site shares only the marginal of a sensitive $Z$.
- **Approximate local conditional coverage** with kernel weights $K((X_i-x_0)/h)$ → [[Marginal vs Conditional Coverage]].
- Latent-variable and missing-data problems, later realised for counterfactuals in [[Conformal Inference for Counterfactuals and ITEs]].

## Examples

**By hand.** Calibration scores $1,2,3,4$; likelihood-ratio weights $3,3,1,1$ (the test population favours easy, low-score regions); test point $w(x)=2$. Total weight $10$, so $p^w=(0.3,0.3,0.1,0.1)$ and $p^w_{n+1}=0.2$ on $\infty$. Cumulative mass: $0.3,0.6,0.7,0.8,1.0$. At $\alpha=0.3$ the weighted $0.7$-quantile is $\hat q(x)=3$; the unweighted rule takes the $\lceil5\times0.7\rceil=4$th score, $\hat q=4$. Reverse the weights to $1,1,3,3$ and the cumulative mass is $0.1,0.2,0.5,0.8,1.0$, so $\hat q(x)=4$ at $\alpha=0.3$ and $\hat q(x)=\infty$ for any $\alpha<0.2$ — the atom at infinity alone carries 20% of the mass. Effective sample size: $\hat n=8^2/20=3.2$ of 4.

```python
import numpy as np

def weighted_conformal_qhat(scores, w_cal, w_test, alpha=0.1):
    order = np.argsort(scores)
    s, w = scores[order], w_cal[order]
    cum = np.cumsum(w) / (w.sum() + w_test)          # mass w_test/(sum+w_test) sits at +inf
    idx = np.searchsorted(cum, 1 - alpha, side="left")
    return s[idx] if idx < len(s) else np.inf

# w from a domain classifier: p = clf.predict_proba(X)[:, 1]; w = p / (1 - p)  (clip p!)
```

**Applied sketch.** A conversion-propensity model calibrated on last quarter's traffic mix (60% paid social) is deployed after a budget reallocation (30% paid social). If $P(\text{convert}\mid\text{features})$ is stable, fit a classifier distinguishing old from new sessions, convert to odds, and use weighted conformal sets. If the *conditional* also moved (creative refresh, pricing), the covariate-shift assumption fails and only the drift bound in [[Conformal Prediction - Overview#^thm-drift|the overview]] applies.

## Connections

- [[Split Conformal Prediction and the Coverage Guarantee]] — the unweighted special case $w\equiv1$; same $\delta_\infty$ construction.
- [[Marginal vs Conditional Coverage]] — covariate shift bites precisely because coverage is only marginal; kernel weights give a localised guarantee.
- [[Conformal Inference for Counterfactuals and ITEs]] — treatment selection *is* covariate shift: $P_{X\mid T=1}$ versus $P_X$, with $w\propto1/e(x)$.
- [[Propensity Score and the Balancing Property]], [[Bayesian Inverse Probability Weighting]], [[Bayesian Inverse Probability Weighting]] — the same density-ratio/odds weights, used there to reweight *estimators*, here to reweight *calibration scores*.
- [[Common Support and Overlap]] — absolute continuity $\tilde P_X\ll P_X$ is the overlap condition; weak overlap shows up as small $\hat n$ and infinite intervals rather than as silent bias.
- [[Permutation Tests and Exact Inference]] — weighted exchangeability generalises the uniform permutation distribution to a non-uniform one over orderings.

## See Also

- [[Covariate Balance Diagnostics]] — checking that estimated weights actually balance calibration and test covariates.
- [[Conformalized Quantile Regression]] — a better score to plug into the weighted quantile.
- [[Cross Validation Checking]] — importance-weighted predictive evaluation (PSIS-LOO) faces the same heavy-tailed-weights problem that clipping addresses here.
