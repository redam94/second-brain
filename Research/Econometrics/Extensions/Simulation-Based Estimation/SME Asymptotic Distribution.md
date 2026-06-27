---
title: "SME Asymptotic Distribution"
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§5 Asymptotic Normality, pp. 943-946"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[SME Consistency]]"
  - "[[Simulated Moments Estimator Definition]]"
used_by:
  - "[[SME Extensions and Applications]]"
aliases:
  - SME asymptotic normality
  - SME covariance matrix
  - simulation noise variance inflation
---

# SME Asymptotic Distribution

> [!summary]
> The limiting distribution of the [[Simulated Moments Estimator Definition|SME]]. With $T/\mathcal{T}(T)\to\tau$, **Theorem 4** gives $\sqrt{T}\,G_T(\beta_0) \Rightarrow N[0, \Sigma_0(1+\tau)]$ — the moment gap is asymptotically normal with covariance inflated by the factor $(1+\tau)$ from independent simulation noise. **Corollary 3.1** then gives $\sqrt{T}(b_T-\beta_0) \Rightarrow N[0, \Lambda]$ with $\Lambda = (1+\tau)(D_0'\Sigma_0^{-1}D_0)^{-1}$. As the simulation size grows relative to the data ($\tau\to0$), the simulation penalty vanishes and the SME attains the efficiency of the analytic-moment GMM estimator $[D_0'\Sigma_0^{-1}D_0]^{-1}$ — so simulation can be "almost free."

## Overview

Under the unit-circle conditions of [[SME Consistency]], the stationary ergodic process $\{Y_t^{\infty\beta}\}$ replaces the nonstationary simulated $\{Y_t^\beta\}$, and asymptotic normality follows from suitably modified Hansen (1982) arguments via an intermediate-value (delta-method) expansion of $G_T$ around $\beta_0$. The headline is that simulation costs only a $(1+\tau)$ variance inflation, controllable by simulating a long series.

## Main Content

> [!definition] Assumptions 6–7 (D&S §5)
> - **Assumption 6:** (i) $\beta_0$ and $\{b_T\}$ are interior to $\Theta$; (ii) $f_t^\beta$ is continuously differentiable in $\beta$ for all $t$, $\omega$ by $\omega$; (iii) the **Jacobian** $D_0 = \mathbb{E}[\partial f_\infty^{\beta_0}/\partial\beta]$ exists, is finite, and has **full rank** (the identification/rank condition).
> - **Assumption 7:** the family $\{D_\beta f_t^\beta\}$ is Lipschitz, uniformly in probability; $\mathbb{E}(\lvert D_\beta f_\infty^\beta\rvert)<\infty$ for all $\beta$; and $\beta\mapsto \mathbb{E}(D_\beta f_\infty^\beta)$ is continuous. (Here $D_\beta f_t^\beta = (d/d\beta)f(Z_t^\beta,\beta)$ is the total derivative.)
> ^def-assumptions-6-7

**Expansion.** Expanding $G_T(b_T)$ about $\beta_0$ (Eq. 5.1) and applying the first-order conditions $[\partial G_T(b_T)/\partial\beta]'W_T G_T(b_T)=0$ yields (Eq. 5.2) a solvable system once $J_T = [\partial G_T(b_T)/\partial\beta]'W_T\,\partial G^*(T)$ is invertible for large $T$; under Assumptions 5–7, $\operatorname{plim}_T \partial G_T(b_T)/\partial\beta = D_0$. Hence the asymptotic distribution of $\sqrt{T}(b_T-\beta_0)$ equals that of $(D_0'\Sigma_0^{-1}D_0)^{-1}\sqrt{T}\,G_T(\beta_0)$.

> [!theorem] Theorem 4 (Asymptotic normality of the moment gap) (D&S §5, Eq. 5.3)
> Suppose $T/\mathcal{T}(T)\to\tau$ as $T\to\infty$. Under Assumptions 1–4 and 6–7,
> $$
> \sqrt{T}\,G_T(\beta_0) \;\Rightarrow\; N\!\left[0,\ \Sigma_0(1+\tau)\right].
> $$
> **Mechanism (Eq. 5.4):** $\sqrt{T}\,G_T(\beta_0)$ splits into a data term $\frac{1}{\sqrt T}\sum_t[f_t^*-\mathbb{E}(f_\infty^*)]$ and a simulation term scaled by $\sqrt{T/\mathcal{T}(T)}\to\sqrt\tau$. Each is asymptotically normal by Doob's (1953) CLT for geometrically ergodic processes (using the $\lVert f_t^\beta\rVert_{2+\delta}$ bounds), and the two are **independent** because the simulation shocks $\{\hat\varepsilon\}$ are independent of the data shocks $\{\varepsilon\}$ — giving the variance $\Sigma_0 + \tau\Sigma_0 = \Sigma_0(1+\tau)$.
> ^thm-theorem4

> [!theorem] Corollary 3.1 (Asymptotic distribution of the SME) (D&S §5, Eq. 5.5)
> Under the assumptions of Theorem 4, with optimal weighting $W_0=\Sigma_0^{-1}$,
> $$
> \sqrt{T}(b_T - \beta_0) \;\Rightarrow\; N[0,\ \Lambda],
> \qquad
> \Lambda = (1+\tau)\left(D_0'\Sigma_0^{-1}D_0\right)^{-1}.
> $$
> ^thm-corollary

### Interpretation: simulation is (almost) free

- The factor $(1+\tau)$ is the **price of simulation**. As $\tau\to0$ (simulated sample size $\mathcal{T}(T)$ large relative to data size $T$), $\Lambda \to (D_0'\Sigma_0^{-1}D_0)^{-1}$ — exactly the covariance of the **analytic-moment GMM** estimator that would require knowing $\mathbb{E}(f_\infty^\beta)$ in closed form (cf. McFadden 1989; Pakes & Pollard 1989; Lee & Ingram 1991).
- Thus the SME extends the class of Markov models estimable by method-of-moments **with potentially negligible loss of efficiency** — one simply simulates a long series.
- $\Sigma_0$ depends only on the data moments $\{f_t^*\}$, so it is estimated by [[Standard Errors and Clustering|Newey–West / HAC]] without simulation; alternatively it can be estimated from simulated data, advantageous since $\mathcal{T}(T)$ is controllable.

### Checking the rank/identification condition

Assumption 6(iii) (full-rank $D_0$) is the identification condition. When the model is solved numerically it can be hard to tell whether moment choices identify the parameters. Duffie & Singleton recommend examining sensitivity to moment choice, and note the partial-derivative matrix can be computed numerically from the simulated state:
$$
D(\beta) = \frac{\partial\left[\frac{1}{\mathcal{T}}\sum_{t=1}^{\mathcal{T}} f_t^\beta\right]}{\partial\beta} \tag{5.6}
$$
For large $\mathcal{T}$, $D(\beta)\approx \partial\mathbb{E}(f_\infty^\beta)/\partial\beta$; an orthogonalization of $D(\beta)$ reveals whether the first-order conditions form an **ill-conditioned** (near-underidentified) system at points in $\Theta$, including at the SME.

## Connections

- Completes the [[SME Consistency|consistency]] story with the limiting distribution; the optimal weight $W_0=\Sigma_0^{-1}$ matches the efficient-GMM weighting in [[SMM Weighting Matrix and Inference]] and [[Method of Simulated Moments]].
- The $(1+\tau)$ / $(1+1/R)$ variance-inflation theme recurs throughout simulation estimation — see [[Method of Simulated Moments]] and [[Simulation-Based Estimation - Overview]].
- The covariance $\Lambda$ generalizes in [[SME Extensions and Applications]] to $\Lambda_{f,g,\tau}=(D_0'\Sigma_{f,g,\tau}^{-1}D_0)^{-1}$ when observation functions depend on $\beta$.

## See Also

- [[SME Consistency]] — assumptions and the consistency theorems this extends
- [[SME Extensions and Applications]] — efficiency gains from mixing calculated and simulated moments
- [[Simulated Moments Estimator Definition]] — definitions of $G_T$, $\Sigma_0$, $D_0$
