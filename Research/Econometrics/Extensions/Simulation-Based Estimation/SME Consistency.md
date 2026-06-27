---
title: "SME Consistency"
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§4.3 Weak Consistency, §4.4 Strong Consistency, §4.5, pp. 939-943"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Geometric Ergodicity and Uniform LLN]]"
  - "[[Simulated Moments Estimator Definition]]"
used_by:
  - "[[SME Asymptotic Distribution]]"
aliases:
  - SME weak consistency
  - SME strong consistency
  - Asymptotic Unit-Circle condition
  - AUC condition
  - L2 unit-circle condition
---

# SME Consistency

> [!summary]
> Establishes that the [[Simulated Moments Estimator Definition|SME]] $b_T$ converges to the true $\beta_0$. **Weak consistency (Theorem 1)** follows from geometric ergodicity + a uniform weak LLN + a convergent distance-matrix assumption + identification. **Strong consistency (Theorems 2–3)** instead leans on the **Asymptotic Unit-Circle (AUC) condition** — a damping/contraction condition on the transition function $H$ guaranteeing that past shocks decay geometrically, so the simulated path's nonstationarity is asymptotically irrelevant. The two routes encompass different (overlapping, neither nesting the other) model classes; §4.5's heteroskedastic example shows a geometrically-ergodic process that fails AUC.

## Overview

Consistency for a *simulated* moments estimator is harder than for ordinary GMM because (a) the simulated series starts off its ergodic distribution and (b) parameter changes feed back through the whole simulated path. Section 4.3 handles this via ergodicity (weak consistency); Section 4.4 via a damping condition (strong consistency). This note collects the assumptions and the three consistency theorems; the asymptotics build on it in [[SME Asymptotic Distribution]].

## Main Content

### Weak consistency

> [!definition] Assumptions 1–4 (D&S §4.3)
> - **Assumption 1 (Technical Conditions):** for each $\beta$, $\{\lVert f_t^\beta\rVert_{2+\delta}\}$ is bounded for some $\delta>0$; $\{f_t^\beta\}$ is [[Geometric Ergodicity and Uniform LLN#^def-lipschitz-uniform|Lipschitz, uniformly in probability]]; and $\beta\mapsto \mathbb{E}(f_\infty^\beta)$ is continuous.
> - **Assumption 2 (Ergodicity):** for all $\beta$, $\{Y_t^\beta\}$ is geometrically ergodic. (Lemmas 1–2 give sufficient primitives for Assumptions 1–2 when Mokkadem's conditions hold for some $q>2$.)
> - **Assumption 3 (Convergence of Distance Matrices):** $\Sigma_0$ is nonsingular and $W_T \to W_0 = \Sigma_0^{-1}$ a.s., where the long-run moment covariance is
> $$
> \Sigma_0 \equiv \sum_{j=-\infty}^{\infty} \mathbb{E}\!\left(\left[f_t^* - \mathbb{E}(f_t^*)\right]\left[f_{t-j}^* - \mathbb{E}(f_t^*)\right]'\right).
> $$
> $\Sigma_0$ depends on moments of $\{f_t^*\}$ **alone** — not on $\beta$ nor on the simulated process — so it is consistently estimable by [[Standard Errors and Clustering|Newey–West]] (geometric ergodicity $\Rightarrow$ $\alpha$-mixing). The choice $W_0 = \Sigma_0^{-1}$ yields the most efficient SME among positive-definite distance matrices.
> - **Assumption 4 (Uniqueness of Minimizer / Identification):** $C(\beta_0) < C(\beta)$ for all $\beta \ne \beta_0$, where $C(\beta) = G_\infty(\beta)' W_0 G_\infty(\beta)$ is the limit criterion ($C_T \to C$ a.s. under Assumptions 1–3).
> ^def-assumptions-1-4

> [!theorem] Theorem 1 (Consistency of SME) (D&S §4.3)
> Under Assumptions 1–4, the SME $\{b_T\}$ converges to $\beta_0$ **in probability** as $T \to \infty$.
> ^thm-weak-consistency

### Strong consistency

The uniform *weak* LLN above keeps the global Lipschitz condition (Assumption 1). For *strong* consistency, Duffie & Singleton instead provide primitive conditions for a **local** modulus of continuity and a Uniform *Strong* Law of Large Numbers (USLLN):
$$
\sup_{\beta\in\Theta}\left|\frac{1}{T}\sum_{t=1}^{T} f_t^\beta - \mathbb{E}(f_\infty^\beta)\right| \xrightarrow{\text{a.s.}} 0
\quad\text{as } T \to \infty.
$$
The conditions are of three kinds: **continuity**, **growth** (bounding), and a **contraction/damping** condition on $H$ — the AUC condition.

> [!definition] Asymptotic Unit-Circle (AUC) Condition (D&S §4.4, Eq. 4.9)
> $H$ and the shock process $\varepsilon$ satisfy the **AUC condition** if, for each $\theta\in\Theta$, there is $\delta>0$ and positive random variables $\{\rho_\theta(\varepsilon_t)\}$ with
> $$
> \lim_{T\to\infty}\frac{1}{T}\sum_{t=1}^{T}\ln \rho_\theta(\varepsilon_t) = \alpha_\theta < 0 \quad \text{a.s.},
> $$
> such that whenever $\lVert \beta - \theta\rVert \le \delta$, for any $x, y$:
> $$
> \lVert H(y,\beta,\varepsilon_t) - H(x,\beta,\varepsilon_t)\rVert \le \rho_\theta(\varepsilon_t)\lVert y - x\rVert.
> $$
> I.e. $H(\cdot,\beta,\varepsilon_t)$ has a Lipschitz coefficient $\rho_\theta(\varepsilon_t)$ whose running product $\prod_{s=0}^{t}\rho_\theta(\varepsilon_s)$ declines **geometrically** toward zero — a weaker requirement than the Gallant–White (1988) unit-circle / near-epoch-dependence condition.
> ^def-auc

**Smoothness of $f$.** $f$ is **$S$-smooth** if it is $\Theta$-locally Lipschitz and, for each state $z$, $f(z,\cdot)$ has a Lipschitz constant $C_1(z)$ satisfying a growth condition. (A Lipschitz $f$ is $S$-smooth, but $S$-smoothness is weaker.)

> [!theorem] Lemmas 3–4 (replace simulated process by a stationary one) (D&S §4.4, Eqs. 4.6, 4.10)
> - **Lemma 3:** If $(H,\varepsilon)$ satisfies the AUC condition, then for each $\beta$ there exists a **stationary, ergodic** process $\{Y_t^{\infty\beta}\}$ such that $Y_t^{\infty\beta}$ is measurable w.r.t. $\{\hat\varepsilon_s : s \le 0\}$ and $Y_{t+1}^{\infty\beta} = H(Y_t^{\infty\beta}, \hat\varepsilon_{t+1}, \beta)$.
> - **Lemma 4:** If $f$ is $S$-smooth and $(H,\varepsilon)$ satisfies the AUC condition, then $\sup_{\beta\in\Theta}\lvert \frac{1}{T}\sum_t f_t^\beta - \frac{1}{T}\sum_t f_t^{\infty\beta}\rvert \xrightarrow{\text{a.s.}} 0$.
>
> Together these let the nonstationary simulated $\{Y_t^\beta\}$ be **replaced by the stationary ergodic $\{Y_t^{\infty\beta}\}$** for proving the USLLN.
> ^thm-lemmas-3-4

> [!theorem] Theorem 2 (Strong Consistency) (D&S §4.4)
> Under Assumptions 3–5, the AUC condition, and $f$ $S$-smooth, the SME $\{b_T\}$ converges to $\beta_0$ **almost surely** as $T \to \infty$. (**Assumption 5:** for each $\theta$, $\mathbb{E}[\operatorname{mod}_t(\delta,\theta)] < \infty$ for some $\delta>0$, where $\operatorname{mod}_t$ is the modulus of continuity of $\{f_t^{\infty\beta}\}$.)
> ^thm-strong-consistency-2

> [!theorem] Theorem 3 (Strong Consistency under $L^2$ UC) (D&S §4.4)
> Under Assumptions 3–4, $H$ and $f$ $S$-smooth, and the **$L^2$ Unit-Circle condition**, the SME $\{b_T\}$ is strongly consistent. The $L^2$ UC condition replaces $\ln$-summability with $\mathbb{E}[\rho_\theta(\varepsilon_t)^2] < 1$; by Jensen's inequality it **implies** the AUC condition (and makes Assumption 5 redundant).
> ^thm-strong-consistency-3

### Weak vs. strong: which class of models?

- **Weak consistency** assumes geometric ergodicity + a *uniform Lipschitz* condition on $\{f_t^\beta\}$.
- **Strong consistency** assumes the AUC (unit-circle) condition on $H$ + i.i.d. shocks; the AUC substitutes for the Lipschitz condition.
- The $L^2$ UC condition implies geometric ergodicity, but there is an important class of geometrically ergodic processes that **fail** the $L^2$ UC condition — the primary motivation for the separate weak-consistency analysis. The [[Duffie-Singleton Asset-Pricing Model#^ex-het-shock|conditionally heteroskedastic shock (Eq. 4.11)]] is geometrically ergodic yet generally violates AUC, so only weak consistency is available there (provided the uniform Lipschitz condition holds).

## Connections

- Consumes the lemmas in [[Geometric Ergodicity and Uniform LLN]] (weak route) and introduces the AUC/$L^2$-UC damping conditions (strong route).
- The optimal-weight result $W_0 = \Sigma_0^{-1}$ and the form of $\Sigma_0$ carry into [[SME Asymptotic Distribution]] (and mirror the optimal $W=\hat\Omega^{-1}$ in [[SMM Weighting Matrix and Inference]]).
- The AUC condition is a refinement of the near-epoch-dependence ideas of Gallant & White (1988).

## See Also

- [[SME Asymptotic Distribution]] — once consistent, the limiting distribution of $\sqrt{T}(b_T-\beta_0)$
- [[Geometric Ergodicity and Uniform LLN]] — the LLN inputs to Theorem 1
- [[Duffie-Singleton Asset-Pricing Model]] — examples distinguishing weak vs. strong conditions
