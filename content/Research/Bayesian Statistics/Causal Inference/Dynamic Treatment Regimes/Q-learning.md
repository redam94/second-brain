---
title: "Q-learning"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - type/concept
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§5.1 Q-Learning, pp. 650-652"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: paper
depends_on:
  - "[[Optimal Regime via Dynamic Programming]]"
used_by:
  - "[[A-learning and Robustness]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Q-learning
  - backward regression treatment regimes
---

# Q-learning

> [!summary]
> Q-learning ("Q" for quality; Watkins 1989) estimates the optimal dynamic treatment regime by **directly modeling the Q-functions** and fitting them by backward-recursive regression. At each decision $k$ (from $K$ down to $1$) one posits a parametric model $Q_k(\bar s_k, \bar a_k; \xi_k)$, regresses the current "value-to-go" response on it by OLS/WLS, and reads off the optimal rule $\hat d_k^{\text{opt}} = \arg\max_{a_k} Q_k(\cdot; \hat\xi_k)$. Simple and using familiar regression machinery, but **consistent only if every Q-function is correctly specified** — and for $k < K$ the response is an estimated, typically highly nonlinear value function, so linear working models are easily misspecified and errors propagate backward.

## Overview

Q-learning is the more transparent of the two methods in [[Q- and A-learning - Overview]]: it turns the [[Optimal Regime via Dynamic Programming|dynamic-programming recursion]] into a sequence of regressions. This note gives the backward-fitting algorithm, the linear-model illustration, and the misspecification concern that motivates [[A-learning and Robustness]].

## Main Content

### Backward-recursive fitting

> [!definition] Q-learning estimating equations (§5.1, Eqs. 26-27)
> Posit models $Q_k(\bar s_k, \bar a_k; \xi_k)$ for $k = K, \dots, 1$. Fit backward:
> - **Decision $K$** (response $\bar V_{(K+1)i} = Y_i$): solve for $\hat\xi_K$
> $$
> \sum_{i=1}^{n} \frac{\partial Q_K(\bar S_{Ki}, \bar A_{Ki}; \xi_K)}{\partial \xi_K}\,\Sigma_K^{-1}(\bar S_{Ki}, \bar A_{Ki})\,\bigl\{ \bar V_{(K+1)i} - Q_K(\bar S_{Ki}, \bar A_{Ki}; \xi_K) \bigr\} = 0,
> $$
> where $\Sigma_K$ is a working variance model (constant $\Sigma_K \Rightarrow$ OLS).
> - Form the fitted value-to-go for the previous stage: $\bar V_{Ki} = \max_{a_K \in \Psi_K} Q_K(\bar S_{Ki}, \bar A_{(K-1)i}, a_K; \hat\xi_K)$.
> - **Decision $k$** ($k = K-1, \dots, 1$, response $\bar V_{(k+1)i}$): solve the analogous equation for $\hat\xi_k$, then form $\bar V_{ki} = \max_{a_k} Q_k(\bar S_{ki}, \bar A_{(k-1)i}, a_k; \hat\xi_k)$.
>
> The estimated optimal regime is
> $$
> \hat d_{Q,1}^{\text{opt}}(s_1) = d_1^{\text{opt}}(s_1; \hat\xi_1),
> \qquad
> \hat d_{Q,k}^{\text{opt}}(\bar s_k, \bar a_{k-1}) = d_k^{\text{opt}}(\bar s_k, \bar a_{k-1}; \hat\xi_k),\ k = 2, \dots, K. \tag{28}
> $$
> ^def-q-estimating-equations

> [!example] Linear two-decision illustration ($K=2$, binary treatment) (§5.1, Eq. 29)
> With $\Psi_k = \{0, 1\}$ and history vectors $\mathcal{H}_1 = (1, s_1^\top)^\top$, $\mathcal{H}_2 = (1, s_1^\top, a_1, s_2^\top)^\top$, posit linear models
> $$
> Q_1(s_1, a_1; \xi_1) = \mathcal{H}_1^\top \beta_1 + a_1(\mathcal{H}_1^\top \psi_1),
> \qquad
> Q_2(\bar s_2, \bar a_2; \xi_2) = \mathcal{H}_2^\top \beta_2 + a_2(\mathcal{H}_2^\top \psi_2),
> $$
> with $\xi_k = (\beta_k^\top, \psi_k^\top)^\top$. Then the optimal rules are threshold rules on the **treatment-interaction** term:
> $$
> d_2^{\text{opt}}(\bar s_2, a_1; \xi_2) = I(\mathcal{H}_2^\top \psi_2 > 0),
> \qquad
> d_1^{\text{opt}}(s_1; \xi_1) = I(\mathcal{H}_1^\top \psi_1 > 0).
> $$
> **The catch:** $Q_2$ is a standard regression of $Y$ on observed data, but $Q_1$ models $\mathbb{E}\{V_2(\bar s_2, a_1) \mid S_1 = s_1, A_1 = a_1\}$ where $V_2 = \max_{a_2} Q_2$ — a **max of a regression**, generally highly nonlinear, only *approximated* by the linear $Q_1$.
> ^ex-linear-two-decision
>
> Explicitly, if $S_2 \mid S_1, A_1$ is normal, the true $Q_1(s_1, a_1)$ involves the normal cdf $\Phi$ and is clearly nonlinear (§5.3, Eq. 33) — so the posited linear $Q_1$ is misspecified, and for larger $K$ this incompatibility propagates from $K$ down to $1$.

### Efficiency, robustness, and remedies

- **Efficiency.** At decision $K$ (response $Y$), taking $\Sigma_K = \operatorname{var}(Y \mid \cdot)$ gives the asymptotically efficient estimator; in practice OLS/WLS is standard. Some authors *define* Q-learning as OLS fitting (Chakraborty, Murphy & Strecher 2010).
- **Consistency requires all models correct.** Even under sequential randomization, $\hat d_Q^{\text{opt}}$ is generally **inconsistent for the true optimal regime if any $Q_k$ is misspecified**.
- **Flexible models.** Misspecification risk can be reduced with flexible/ML regressions (e.g. SVR; Zhao, Kosorok & Zeng 2009) tuned by cross-validated MSE — at the cost of interpretability ("black box" rules). A compromise is to fit a simple, interpretable model (e.g. a decision tree) to the complex model's fitted values.

## Connections

- Implements the [[Optimal Regime via Dynamic Programming|backward-induction recursion]] by stagewise regression; the dynamic-programming analog in reinforcement learning is also called Q-learning (Watkins & Dayan 1992).
- Contrast with [[A-learning and Robustness]], which models only the treatment **contrast** $C_k = Q_k(\cdot,1) - Q_k(\cdot,0)$ and the propensity, gaining double robustness.
- The stagewise-regression idea generalizes single-stage outcome modeling such as the [[Metalearners for CATE|S-/T-learner]].

## See Also

- [[A-learning and Robustness]] — the contrast-based, doubly-robust alternative
- [[Optimal Regime via Dynamic Programming]] — the Q-functions being modeled
- [[Q- and A-learning - Overview]] — comparison and findings
