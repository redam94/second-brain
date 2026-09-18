---
title: Conformal Inference for Counterfactuals and ITEs
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/causal-inference
  - topic/uncertainty-quantification
  - type/application
  - doc/paper
source: "[[raw/Lei Candes 2020 - Conformal Inference of Counterfactuals and ITEs.pdf]]"
source_location: "Sec. 1-2 (pp. 1-5), Sec. 3.1-3.6 (pp. 5-13), Sec. 4.1-4.5 (pp. 14-18), Sec. 5 (p. 19), App. A-B"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Conformalized Quantile Regression]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Propensity Score and the Balancing Property]]"
used_by:
  - "[[Conformal Prediction - Overview]]"
aliases:
  - Conformal Counterfactual Inference
  - Conformal ITE Intervals
  - Weighted Split-CQR
  - Lei and Candès 2020
---

# Conformal Inference for Counterfactuals and ITEs

> [!summary]
> Lei & Candès (JRSS-B 2021; arXiv 2006.06138) observe that, under SUTVA and strong ignorability, predicting a missing potential outcome is a **covariate-shift** problem: treated units are drawn from $P_{X\mid T=1}\times P_{Y(1)\mid X}$ while the target is $P_X\times P_{Y(1)\mid X}$. Running **weighted split-CQR** with propensity-score weights ($w_1\propto1/e(x)$ for the ATE-type target) yields prediction intervals for $Y(1)$, $Y(0)$ and the **individual treatment effect** $\tau_i=Y_i(1)-Y_i(0)$. Coverage is *exact in finite samples* for randomized experiments with known $e(x)$, and **doubly robust** in observational studies: asymptotically valid if *either* the propensity score *or* the conditional quantiles are estimated consistently. In simulations Causal Forest and X-learner confidence intervals under-cover even the CATE they target, and BART under-covers with heteroscedastic, correlated covariates; the conformal intervals attain near-exact ITE coverage in every scenario.

## Overview

Most heterogeneous-effect methodology targets the **CATE** $\tau(x)=\mathbb E[Y(1)-Y(0)\mid X=x]$ — see [[Metalearners for CATE]] and the [[X-Learner]]. Lei & Candès argue the CATE is still an average: a drug that cures 70% of patients and harms 30% can have a positive CATE in every stratum. For individual decisions the relevant object is the **ITE**, a *random variable* even given $x$, and the appropriate uncertainty statement is a **prediction interval**, not a confidence interval.

Targets (Sec. 2.3–2.4), for $t\in\{0,1\}$:

$$
\mathbb P\big(Y(t)\in\hat C_t(X)\big)\ge1-\alpha,\qquad \mathbb P\big(Y(1)-Y(0)\in\hat C_{\mathrm{ITE}}(X)\big)\ge1-\alpha,
$$

with the covariate law optionally replaced by a target $Q_X$: $P_{X\mid T=1}$ (ATT-type), $P_{X\mid T=0}$ (ATC-type) or an external population (transportability). These are marginal guarantees in the sense of [[Marginal vs Conditional Coverage]]; conditional coverage is pursued empirically and asymptotically.

Assumptions: i.i.d. $(Y_i(1),Y_i(0),T_i,X_i)$; SUTVA so $Y_i^{\text{obs}}=Y_i(T_i)$; **strong ignorability** $(Y(1),Y(0))\perp\!\!\!\perp T\mid X$ — the setup of the [[Potential Outcomes Framework]].

## Main Content

### Counterfactuals as covariate shift

Under ignorability the observed treated sample follows $P_{X\mid T=1}\times P_{Y(1)\mid X}$. The conditional law $P_{Y(1)\mid X}$ is shared with the target $Q_X\times P_{Y(1)\mid X}$; only the covariate distribution differs. This is exactly the model of [[Conformal Prediction Under Covariate Shift]], with likelihood ratio given by Bayes' rule:

$$
w_1(x)=\frac{dP_X(x)}{dP_{X\mid T=1}(x)}=\frac{\mathbb P(T=1)}{e(x)}\;\propto\;\frac1{e(x)},\qquad e(x)=\mathbb P(T=1\mid X=x).
$$

> [!definition] Weight functions by inferential target (Lei & Candès, Table 1) ^def-weights-table
> | Target | ATE-type | ATT-type | ATC-type | General $Q_X$ |
> |---|---|---|---|---|
> | $w_1(x)$ for $Y(1)$ | $1/e(x)$ | $1$ | $(1-e(x))/e(x)$ | $(dQ_X/dP_X)(x)/e(x)$ |
> | $w_0(x)$ for $Y(0)$ | $1/(1-e(x))$ | $e(x)/(1-e(x))$ | $1$ | $(dQ_X/dP_X)(x)/(1-e(x))$ |
>
> "Weighted conformal inference depends on propensity scores in the same way IPW estimation of average causal effects depends on these same scores." Rescaling $w$ by a constant leaves the interval unchanged.

> [!algorithm] Weighted split-CQR (Lei & Candès, Algorithm 1) ^alg-weighted-cqr
> **Input:** level $\alpha$; data $(X_i,Y_i)_{i\in\mathcal I}$ from one arm; test point $x$; quantile learner $\hat q_\beta(\cdot;\mathcal D)$; weight learner $\hat w(\cdot;\mathcal D)$.
> 1. Split into training fold $\mathcal Z_{\text{tr}}$ and calibration fold $\mathcal Z_{\text{ca}}$ (the paper uses 75% for training).
> 2. For $i\in\mathcal I_{\text{ca}}$: $V_i=\max\{\hat q_{\alpha_{lo}}(X_i;\mathcal Z_{\text{tr}})-Y_i,\;Y_i-\hat q_{\alpha_{hi}}(X_i;\mathcal Z_{\text{tr}})\}$.
> 3. For $i\in\mathcal I_{\text{ca}}$: $W_i=\hat w(X_i;\mathcal Z_{\text{tr}})\in[0,\infty)$.
> 4. Normalise: $\hat p_i(x)=W_i/\big(\sum_{j\in\mathcal I_{\text{ca}}}W_j+\hat w(x)\big)$ and $\hat p_\infty(x)=\hat w(x)/\big(\sum_{j}W_j+\hat w(x)\big)$.
> 5. $\eta(x)=$ the $(1-\alpha)$ quantile of $\sum_{i}\hat p_i(x)\delta_{V_i}+\hat p_\infty(x)\delta_\infty$.
>
> **Output:** $\hat C(x)=[\hat q_{\alpha_{lo}}(x)-\eta(x),\;\hat q_{\alpha_{hi}}(x)+\eta(x)]$. If $\hat w(x)=\infty$ (e.g. $e(x)=0$) the output is $(-\infty,\infty)$.

> [!theorem] Finite-sample coverage and robustness to weight error (Proposition 1) ^thm-lc-prop1
> Let $(X_i,Y_i)\overset{\text{i.i.d.}}{\sim}P_X\times P_{Y\mid X}$ and let the target be $Q_X\times P_{Y\mid X}$.
> 1. If $\hat w=w=dQ_X/dP_X$, then $\mathbb P(Y\in\hat C(X))\ge1-\alpha$ with no further assumption.
> 2. If additionally the scores have no ties, $Q_X\ll P_X$ and $(\mathbb E[\hat w(X)^r])^{1/r}\le M_r<\infty$, then coverage is at most $1-\alpha+c\,n^{1/r-1}$ with $c$ depending only on $M_r,r$.
> 3. If $\hat w\ne w$, set $\Delta_w=\tfrac12\mathbb E_{X\sim P_X}\lvert\hat w(X)-w(X)\rvert$. Coverage is always at least $1-\alpha-\Delta_w$ (and at most $1-\alpha+\Delta_w+c\,n^{1/r-1}$ under the conditions of 2).
>
> The result is uniform over all $P_{Y\mid X}$ and all quantile learners.

**Randomized experiments are exact (Sec. 3.4).** With perfect compliance $e(\cdot)$ is known by design. In a completely randomized experiment $e$ is constant and no weighting is needed; in stratified/blocked designs use Table 1 with the design's $e(x)$. Coverage holds in finite samples "even if our conditional quantile estimates are completely off". Since $\chi_r(Q_X\Vert P_X)\le\mathbb E[1/e(X)^r]$, coverage is nearly exact when $\mathbb E[1/e(X)^2]<\infty$; and the lower bound holds *regardless of overlap*, because the interval becomes $(-\infty,\infty)$ wherever $e(x)=0$.

> [!theorem] Double robustness of conformal counterfactual intervals (Theorem 1) ^thm-lc-double-robust
> Let $N=\lvert\mathcal Z_{\text{tr}}\rvert$, $n=\lvert\mathcal Z_{\text{ca}}\rvert$, with estimates $\hat q_{\beta,N}$ of the conditional quantiles of $Y(1)\mid X$ and $\hat e_N$ of $e$. Assume $\mathbb E[1/\hat e_N(X)\mid\mathcal Z_{\text{tr}}]<\infty$, $\mathbb E[1/e(X)]<\infty$, and **either**
>
> - **A1** (propensity consistent): $\lim_{N\to\infty}\mathbb E\big\lvert 1/\hat e_N(X)-1/e(X)\big\rvert=0$; **or**
> - **A2** (quantiles consistent): $\alpha_{hi}-\alpha_{lo}=1-\alpha$; the conditional density of $Y(1)$ is bounded in $[b_1,b_2]$ within distance $r$ of the two target quantiles; and for some $\delta>0$, $\limsup_N\mathbb E[1/\hat e_N(X)^{1+\delta}]<\infty$ and $\mathbb E[H_N(X)/\hat e_N(X)]\to0$, $\mathbb E[H_N(X)/e(X)]\to0$, where $H_N(x)=\max\{\lvert\hat q_{\alpha_{lo},N}(x)-q_{\alpha_{lo}}(x)\rvert,\lvert\hat q_{\alpha_{hi},N}(x)-q_{\alpha_{hi}}(x)\rvert\}$.
>
> Then under SUTVA and strong ignorability,
>
> $$
> \lim_{N,n\to\infty}\mathbb P_{(X,Y(1))\sim P_X\times P_{Y(1)\mid X}}\big(Y(1)\in\hat C_{N,n}(X)\big)\ge1-\alpha .
> $$
>
> Under A2 the intervals additionally achieve asymptotic **conditional** coverage (Eq. 3.6).

Heuristic for A2: if $\hat q_\beta\approx q_\beta$ then $\mathbb P(V_i\le0\mid X_i)\approx\alpha_{hi}-\alpha_{lo}=1-\alpha$ for every $X_i$, so $0$ is approximately the $(1-\alpha)$ quantile of *any* reweighting of the $V_i$; hence $\eta(x)\approx0$ whatever the weights. The authors note the analogy with doubly robust ATE estimation (Robins et al. 1994; Kang & Schafer 2007) but stress that "consistency of point estimates and coverage of interval estimates are different concepts".

### From counterfactuals to ITEs (Sec. 4)

- **Units in the study** (one outcome observed): for a treated unit, $\hat C_i=Y_i(1)-\hat C_0(X_i)=[Y_i(1)-\hat Y_i^R(0),\;Y_i(1)-\hat Y_i^L(0)]$ with $\hat C_0$ built using ATT-type weights $w_0=e/(1-e)$; symmetrically for controls with $w_1=(1-e)/e$. Coverage $\ge1-\alpha$ follows from $\mathbb P(\tau_i\in\hat C_i)=\mathbb P(T_i=1)\mathbb P(Y_i(0)\in\hat C_0(X_i)\mid T_i=1)+\mathbb P(T_i=0)\mathbb P(Y_i(1)\in\hat C_1(X_i)\mid T_i=0)$ — no splitting of $\alpha$.
- **New units, naive approach:** build level-$(1-\alpha/2)$ intervals for both potential outcomes and subtract, $\hat C_{\mathrm{ITE}}(x)=[\hat Y^L(1;x)-\hat Y^R(0;x),\;\hat Y^R(1;x)-\hat Y^L(0;x)]$. Valid by Bonferroni; conservative.
- **New units, nested approach** (Algorithm 3): on fold 1 fit $\hat e$ and the counterfactual intervals; on fold 2 compute the surrogate intervals $\hat C_i$; then learn a map $x\mapsto\hat C_{\mathrm{ITE}}(x)$ from $(X_i,\hat C_i)$. The **inexact** version fits e.g. the 40% quantile of left end-points and 60% quantile of right end-points (no guarantee, much shorter). The **exact** version runs a second, unweighted conformal step for interval-valued outcomes (Algorithm 2, score $V_i=\max\{\hat m^L(X_i)-C_i^L,\;C_i^R-\hat m^R(X_i)\}$, Theorem 2: $\mathbb P(C\subset\hat C(X))\ge1-\gamma$), giving total miscoverage $\le\alpha+\gamma$.

### Empirical findings

*Simulation (Sec. 3.6; variant of Wager & Athey 2018).* $n=1000$, 100 replications, $n_{\text{test}}=10{,}000$, 95% intervals; $d\in\{10,100\}$, $\rho\in\{0,0.9\}$, homoscedastic or $\sigma^2(x)=-\log x_1$; $e(x)=\tfrac14\{1+\beta_{2,4}(x_1)\}\in[0.25,0.5]$. Propensity by gradient boosting; quantiles by quantile RF, quantile boosting, or BART.

| | Causal Forest | X-learner | BART | weighted CQR |
|---|---|---|---|---|
| Theory: covers CATE / ITE | yes / no | yes / no | yes / yes | no / yes |
| Simulation: covers CATE / ITE | no / no | no / no | no / no | yes / yes |

For the **CATE**, Causal Forest and X-learner "have poor coverage in all scenarios", worse at $d=100$; BART credible intervals fail with correlated covariates plus heteroscedastic errors. CQR, though not designed for it, covered the CATE in all scenarios (conservatively), since prediction intervals typically contain confidence intervals for the mean. For the **ITE**, Causal Forest and X-learner are not competitors (they are not designed for it) and are shown only "to highlight the potential danger of misinterpreting the confidence intervals for CATE as ITE prediction intervals"; BART prediction intervals cover under homoscedasticity but not under heteroscedasticity; weighted split-CQR "achieves almost exact coverage regardless of the learning procedures".

*ACIC 2018 / NLSM-based synthetic data (Sec. 4.4).* $\lvert\mathcal Z_1\rvert=2079$, $\lvert\mathcal Z_2\rvert=8312$, $n=1000$ training and 5000 test units, propensities truncated to $[0.1,0.9]$, exact nested with $\alpha=\gamma=0.025$. The naive and exact-nested CQR intervals are conservative; inexact-nested CQR is close to the 95% target with length only slightly above inexact-BART and far below the naive and exact versions. BART alone fails to reach nominal coverage, "but CQR, with BART as the learner, calibrates it successfully". The authors caution that the oracle ITE interval length is not attainable, since the joint law of $(Y(1),Y(0))$ is never identified. In the real NLSM re-analysis there is "some evidence of positive ITE when $\alpha$ is above 0.25 while no evidence of any negative ITE even when $\alpha=0.5$".

## Examples

**Geo-holdout experiment.** 200 DMAs; treatment (incremental media) assigned within blocks of baseline revenue with known $e(\text{block})\in\{0.3,0.5\}$; outcome $Y=$ revenue lift index.

```python
# Interval for Y(0) of each TREATED geo  ->  ITE interval for that geo (ATT-type weights)
ctrl = df[df.T == 0]
tr, ca = split(ctrl, frac=0.75)
q_lo, q_hi = fit_quantiles(tr.X, tr.Y, 0.025, 0.975)          # any quantile learner
V = np.maximum(q_lo(ca.X) - ca.Y, ca.Y - q_hi(ca.X))          # CQR scores
w = lambda e: e / (1 - e)                                      # w0 for ATT-type target
for g in df[df.T == 1].itertuples():
    eta = weighted_conformal_qhat(V, w(ca.e), w(g.e), alpha=0.05)
    C0 = (q_lo(g.X) - eta, q_hi(g.X) + eta)
    ite_interval = (g.Y - C0[1], g.Y - C0[0])                  # exact 95% coverage: e is known
```

Here `weighted_conformal_qhat` is the routine in [[Conformal Prediction Under Covariate Shift]]. Because $e$ is set by design, the guarantee is finite-sample and needs no model for revenue. With 200 units the intervals will be wide — the honest price of an individual-level claim. Rolling up to an average effect is better served by [[Randomization Inference - Overview|randomization inference]] or a model-based estimator; the ITE intervals answer "which geos plausibly had positive lift?".

## Connections

- [[Potential Outcomes Framework]] — notation, SUTVA and ignorability; ITEs are the unit-level contrasts that framework declares fundamentally unobservable.
- [[Causal Estimands]] — ATE/ATT/ATC targets map to the columns of the weight table.
- [[Conformal Prediction Under Covariate Shift]] — the weighted-exchangeability engine.
- [[Conformalized Quantile Regression]] — the score; quantile consistency is one arm of the double robustness.
- [[Propensity Score and the Balancing Property]], [[Bayesian Inverse Probability Weighting]], [[Bayesian Inverse Probability Weighting]] — the same $1/e$, $e/(1-e)$ weights as IPW; a posterior over $e(x)$ could be propagated by drawing weights.
- [[Common Support and Overlap]] — weak overlap inflates intervals (to $\pm\infty$ at $e(x)=0$) rather than biasing them.
- [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]] — CATE point estimators; the X-learner's bootstrap CIs are one of the benchmarks that under-cover here.
- [[Doubly-Robust Estimands for ATT(g,t)]] — double robustness for point estimation in DiD, the analogue the authors contrast with.
- [[Fisher Randomization Test and the Sharp Null]] — the other finite-sample-exact tool for experiments; it tests sharp nulls about all ITEs jointly, whereas conformal intervals bound each ITE marginally.

## See Also

- [[Synthetic Control Inference and Diagnostics]] — placebo-based counterfactual inference for aggregate units.
- [[Geo-Experiment Design and Power Analysis]] — designs whose known assignment probabilities make the exact result applicable.
- [[Marginal vs Conditional Coverage]] — why a 95% ITE interval is not a 95% statement about *this* unit.
- [[Local Average Treatment Effects]] — imperfect compliance; Lei & Candès require ignorable compliance for the doubly robust result.
