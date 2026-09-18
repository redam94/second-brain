---
title: R-Learner and Orthogonal CATE Estimation
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
  - type/method
  - doc/paper
source: "[[raw/Nie Wager 2021 - Quasi-Oracle Estimation of Heterogeneous Treatment Effects.pdf]]"
source_location: "§1-2 (pp. 1-4), eqs. 1-4; §3 (pp. 4-6), eqs. 5-7; §4 (pp. 7-10), eq. 8; §5 (pp. 10-15), Assumptions 2-3, Lemma 2, Theorem 3; §6 (pp. 15-17)"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Regularization Bias and the Partially Linear Model]]"
  - "[[Neyman Orthogonality]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[Metalearners for CATE]]"
used_by:
  - "[[Causal Machine Learning - Overview]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - R-Learner
  - R-learner
  - R-loss
  - Robinson Transformation
  - Quasi-Oracle Estimation
  - U-Learner
  - Residual-on-Residual CATE
---

# R-Learner and Orthogonal CATE Estimation

> [!summary]
> The **R-learner** (Nie & Wager 2021, *Biometrika*) estimates the CATE function $\tau^*(x)=\mathbb E[Y(1)-Y(0)\mid X=x]$ by minimizing a loss built from **Robinson's (1988) transformation** $Y_i-m^*(X_i)=\{W_i-e^*(X_i)\}\tau^*(X_i)+\varepsilon_i$. Step 1: cross-fit the conditional mean outcome $\hat m$ and propensity $\hat e$ with any predictive learner. Step 2: minimize the **R-loss** $\frac1n\sum_i[\{Y_i-\hat m^{(-q(i))}(X_i)\}-\{W_i-\hat e^{(-q(i))}(X_i)\}\tau(X_i)]^2+\Lambda_n\{\tau\}$ over $\tau(\cdot)$ with any loss-minimizing learner (lasso, boosting, kernel ridge, neural nets). Because the R-loss is [[Neyman Orthogonality|Neyman orthogonal]] in $(m,e)$, the method is **quasi-oracle**: if the nuisances are estimated at $o(n^{-1/4})$ rates, $\hat\tau$ attains the same regret bound as an oracle who knows $m^*$ and $e^*$ — the rate depends only on the complexity of $\tau^*$, not of the nuisances. It is DML's partially linear score turned into an objective for a *function*.

## Overview

"Any good heterogeneous treatment effect estimator needs to achieve two goals: First, it needs to eliminate spurious effects by controlling for correlations between $e^*(X)$ and $m^*(X)$, and then it needs to accurately express $\tau^*(\cdot)$." Most ML approaches ([[Honest Trees and Causal Forests|causal forests]], causal boosting, TARNet-style networks) modify an *algorithm* to do both at once. The R-learner modifies the **loss function** instead and "cleanly separates these two tasks": confounding is removed by the structure of the loss; the representation of $\tau$ is whatever the step-2 optimizer provides. Consequently black-box learners can be used "without auditing their internal state to check that they properly control for confounding," and $\tau$-models can be tuned and compared by **cross-validating on the R-loss** — solving the otherwise awkward problem that CATE has no observable ground truth.

The note also explains a limitation of the vault's existing [[Metalearners for CATE]] cluster: the T-learner difference $\hat\mu_{(1)}-\hat\mu_{(0)}$ suffers [[Regularization Bias and the Partially Linear Model|regularization bias]] ("the fact that both $\hat\beta_{(0)}$ and $\hat\beta_{(1)}$ are regularized towards 0 separately may inadvertently regularize the treatment effect estimate $\hat\beta_{(1)}-\hat\beta_{(0)}$ away from 0, even when $\tau^*(x)=0$ everywhere"), and the [[X-Learner]] is not robust to $o(n^{-1/4})$ nuisance perturbations.

## Main Content

> [!definition] Robinson's transformation (eq. 1) ^def-robinson
> Under unconfoundedness $\{Y_i(0),Y_i(1)\}\perp W_i\mid X_i$, write $e^*(x)=\mathbb P(W=1\mid X=x)$, $\mu^*_{(w)}(x)=\mathbb E[Y(w)\mid X=x]$ and the **conditional mean outcome** $m^*(x)=\mathbb E[Y\mid X=x]=\mu^*_{(0)}(x)+e^*(x)\tau^*(x)$. Then with $\mathbb E[\varepsilon_i\mid X_i,W_i]=0$,
> $$
> Y_i-m^*(X_i)=\{W_i-e^*(X_i)\}\,\tau^*(X_i)+\varepsilon_i .
> $$
> Equivalently (Robins 2004),
> $$
> \tau^*(\cdot)=\arg\min_\tau\ \mathbb E\Big[\big(\{Y_i-m^*(X_i)\}-\{W_i-e^*(X_i)\}\tau(X_i)\big)^2\Big].
> $$

This is the PLR model of [[Regularization Bias and the Partially Linear Model]] with the scalar $\theta_0$ promoted to a function of $X$; note that $m^*$ here is Chernozhukov et al.'s $\ell_0(X)=\mathbb E[Y\mid X]$, and $e^*$ is their $m_0$.

> [!algorithm] The R-learner (eqs. 3–4) ^alg-r-learner
> **Step 1.** Split the data into $Q$ folds (typically 5 or 10); let $q(i)$ be the fold of observation $i$. Fit $\hat m$ and $\hat e$ by cross-fitting, "via methods tuned for optimal predictive accuracy."
> **Step 2.** With $\hat m^{(-q(i))}(X_i)$, $\hat e^{(-q(i))}(X_i)$ the predictions made without fold $q(i)$, solve
> $$
> \hat\tau(\cdot)=\arg\min_\tau\Big\{\hat L_n\{\tau(\cdot)\}+\Lambda_n\{\tau(\cdot)\}\Big\},\qquad
> \hat L_n\{\tau(\cdot)\}=\frac1n\sum_{i=1}^n\Big[\{Y_i-\hat m^{(-q(i))}(X_i)\}-\{W_i-\hat e^{(-q(i))}(X_i)\}\tau(X_i)\Big]^2,
> $$
> where $\Lambda_n$ is an explicit or implicit regularizer. $\hat L_n$ is the **R-loss**.

**Implementation trick.** The R-loss is a weighted least-squares problem: with residuals $\tilde Y_i=Y_i-\hat m^{(-q(i))}(X_i)$ and $\tilde W_i=W_i-\hat e^{(-q(i))}(X_i)$,
$$
\big(\tilde Y_i-\tilde W_i\tau(X_i)\big)^2=\tilde W_i^2\Big(\frac{\tilde Y_i}{\tilde W_i}-\tau(X_i)\Big)^2,
$$
so any regressor accepting sample weights can fit $\tau$ by regressing the pseudo-outcome $\tilde Y_i/\tilde W_i$ on $X_i$ with weights $\tilde W_i^2$. The **U-learner** regresses the same pseudo-outcome $U_i=(Y_i-m^*(X_i))/(W_i-e^*(X_i))$ *without* weights and "suffers from high variance and instability due to dividing by the propensity estimates"; the $\tilde W_i^2$ weights are precisely what down-weight observations with $\hat e(X_i)\approx W_i$.

> [!theorem] Quasi-oracle error bound (Lemma 2, Theorem 3) ^thm-quasi-oracle
> Study $\|\cdot\|_{\mathcal H}$-penalized kernel regression over an RKHS $\mathcal H$ with kernel eigenvalues satisfying $\sup_jj^{1/p}\sigma_j<\infty$ for some $0<p<1$, uniformly bounded eigenfunctions, bounded outcomes $|Y_i|\le M$ (Assumption 2), and $\|T_K^\alpha\{\tau^*\}\|_{\mathcal H}<\infty$ for some $0<\alpha<1/2$ (Assumption 3: $\tau^*$ need only lie in $\mathcal H$ after smoothing). Suppose overlap $\eta<e^*(x)<1-\eta$; $\hat e$ is uniformly consistent; and
> $$
> \mathbb E[\{\hat m(X)-m^*(X)\}^2],\ \mathbb E[\{\hat e(X)-e^*(X)\}^2]=O(a_n^2),\qquad a_n=O(n^{-\kappa}),\ \kappa>\tfrac14 .
> $$
> If $2\alpha<1-p$ and the penalty is chosen as in the proof, the feasible R-learner satisfies the **same regret bound as the oracle** $\tilde\tau$ that uses the true $m^*,e^*$:
> $$
> R(\hat\tau),\ R(\tilde\tau)=\tilde O_P\big(n^{-(1-2\alpha)/\{p+(1-2\alpha)\}}\big).
> $$
> As $\alpha,p\to0$ this recovers "the well-known result from the semiparametric inference literature that, in order to get $1/\sqrt n$-consistent inference for a single target parameter, we need 4-th root consistent nuisance parameter estimates."

The mechanism is the same second-order remainder as in DML: errors in $\hat m$ and $\hat e$ enter the excess R-loss only through products/squares, so an $o(n^{-1/4})$ nuisance rate contributes $o(n^{-1/2})$ — below the oracle's own error scale. The paper stresses that this "depends on a local robustness property of the R-loss function, and does not hold for general meta-learners." **Counterexample for the X-learner:** shift $\hat\mu_{(0)}\leftarrow\hat\mu_{(0)}-c/n^{0.25+\xi}$ and $\hat\mu_{(1)}\leftarrow\hat\mu_{(1)}+c/n^{0.25+\xi}$; the nuisances remain $o(n^{-1/4})$-consistent, yet the X-learner's $\hat\tau$ shifts by exactly $c/n^{0.25+\xi}$, which dominates the oracle rate. Künzel et al.'s own quasi-oracle result covers only the regime where controls vastly outnumber treated units — where $m^*\approx\mu^*_{(0)}$, $e^*\approx0$ and the two learners roughly coincide.

**Model averaging by R-stacking (eq. 8).** Given out-of-fold CATE estimates $\hat\tau_k^{(-i)}$ from $K$ methods, choose
$$
(\hat b,\hat c,\hat\alpha)=\arg\min_{b,c,\alpha\ge0}\sum_i\Big[\{Y_i-\hat m^{(-i)}(X_i)-b\}-\Big\{c+\sum_k\alpha_k\hat\tau_k^{(-i)}(X_i)\Big\}\{W_i-\hat e^{(-i)}(X_i)\}\Big]^2,\qquad\hat\tau(x)=\hat c+\sum_k\hat\alpha_k\hat\tau_k(x).
$$
In the paper's experiment ($n=10{,}000$, randomized), stacking BART and a causal forest beats either alone for a smooth $\tau^*$ and automatically matches the better base learner (the forest) for a discontinuous $\tau^*$.

**Relation to causal forests.** Nie & Wager note that Athey, Tibshirani & Wager (2019) "rely on [Robinson's decomposition] to grow a causal forest that is robust to confounding": a locally centered GRF solves the R-loss with *forest-kernel* localization, $\hat\tau(x)=\arg\min_\tau\sum_i\alpha_i(x)(\tilde Y_i-\tau\tilde W_i)^2$ — "local parametric modeling" — whereas the R-learner proper fits a global function class. See [[Generalized Random Forests - Local Moment Equations#^def-local-centering|local centering]].

## Examples

**Get-out-the-vote study (§4.1).** Data from Arceneaux, Gerber & Green (2006): 1,895,468 voters, 59,264 treated; analysis subsample of 148,160 (2/5 treated), split 100,000 / 25,000 / remainder into train / test / holdout; $d=11$ covariates; binary $Y$ and $W$. Randomization probabilities varied by state and competitiveness — ignoring them gives a naive 4% call effect, whereas a correct analysis bounds the effect below 1% in absolute value. Treating the true effect as zero, the authors *spike in* $\tau^*(X_i)=-\mathrm{VOTE00}_i/(2+100/\mathrm{AGE}_i)$ by flipping labels, hide the propensities, and compare learners. Nuisances: boosting won cross-validation for both $\hat e$ and $\hat m$. CATE step: the lasso attained lower cross-validated R-loss than boosting (0.1816 vs 0.1818 on training; 0.1781 vs 0.1783 on holdout) and was selected — tiny but stable differences, because irreducible outcome noise dominates the loss level and cancels in comparisons.

**Simulations (§6).** Four designs with $Y_i=b^*(X_i)+(W_i-0.5)\tau^*(X_i)+\sigma\varepsilon_i$: **A** hard nuisances / easy $\tau$; **B** randomized trial; **C** easy propensity / hard baseline / constant $\tau$; **D** unrelated arms. Across lasso, kernel-ridge and boosting implementations, the R-learner "stands out" in A and C (strong confounding, simple effect) and essentially matches the oracle; all methods do reasonably in B; the [[T-Learner and Minimax Rate|T-learner]] wins in D, where there is nothing to gain from modeling the arms jointly; the U-learner is unstable throughout.

**Code sketch.**

```python
from sklearn.model_selection import cross_val_predict
from sklearn.ensemble import GradientBoostingRegressor as GBR, GradientBoostingClassifier as GBC

m_hat = cross_val_predict(GBR(), X, Y, cv=10)                                  # E[Y|X], cross-fit
e_hat = cross_val_predict(GBC(), X, W, cv=10, method="predict_proba")[:, 1]    # P(W=1|X), cross-fit
Yt, Wt = Y - m_hat, W - e_hat
tau_model = GBR().fit(X, Yt / Wt, sample_weight=Wt ** 2)                       # minimizes the R-loss
r_loss = lambda tau: np.mean((Yt - Wt * tau) ** 2)                             # evaluate on held-out data
```

## Connections

- [[Regularization Bias and the Partially Linear Model]] — same residual-on-residual equation with constant $\theta_0$; [[Neyman Orthogonality]] — why the R-loss is insensitive to nuisance error; [[Cross-Fitting and Sample Splitting]] — Step 1.
- [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]], [[Künzel 2019 - Overview]] — the baselines; the R-learner is the orthogonal member of the metalearner family, and this note records the formal sense in which the X-learner is not quasi-oracle.
- [[Generalized Random Forests - Local Moment Equations]] and [[Honest Trees and Causal Forests]] — forest-localized R-loss; forests add pointwise CIs, which the R-learner does not provide.
- [[A-learning and Robustness]] — A-learning in dynamic treatment regimes shares the Robins (2004) g-estimation lineage: model only the treatment *contrast* and protect it with a propensity model.
- [[Nonparametric Causal Inference]] — BART as a candidate $\hat\tau_k$ in R-stacking.
- [[Common Support and Overlap]] — $\tilde W_i^2$ weights vanish where overlap fails; the bound assumes $\eta<e^*(x)<1-\eta$.

## See Also

- [[DML Estimators for ATE and the Interactive Model]] — for an *average* effect with a CI, use AIPW rather than averaging $\hat\tau$.
- [[Horseshoe and Regularized Horseshoe Priors]] — a Bayesian analogue of the RS-learner's separate penalties on main-effect and treatment-effect coefficients is to give the $\tau$-coefficients their own shrinkage prior in a residualized model.
- [[Model Selection and Overfitting]] — the R-loss supplies the missing validation criterion for CATE models.
- [[ROAS, mROAS, and Optimal Media Mix]] — targeting/budget rules built on $\hat\tau(x)$ need an unconfounded CATE estimate; R-loss on held-out data is a practical way to rank uplift models.
