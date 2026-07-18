---
title: Pair Copula Selection and Estimation
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Aas2009-Bedford2002-Czado2019-Synthesis.md]]"
source_location: "Aas et al. (2009), Secs. 3–4; Czado (2019), Chs. 5–7"
date_ingested: 2026-07-18
date_updated: 2026-07-18
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - sequential vine estimation
  - vine model selection
  - h-function algorithm
  - simplifying assumption vine
  - VineCopula R package
---

# Pair Copula Selection and Estimation

> [!summary]
> Vine copula estimation proceeds tree by tree: fit bivariate copulas for $T_1$ by MLE, then compute conditional distributions via the **h-function**, and use those as inputs to $T_2$, and so on. Each bivariate "slot" selects its own copula family (Gaussian, $t$, Clayton, Gumbel, Frank, …) by AIC or BIC. The procedure is valid under the **simplifying assumption** — conditional copulas do not depend on the conditioning values — which is empirically well-supported at typical sample sizes.

## Overview

Once a vine structure is chosen (see [[C-Vine and D-Vine Structures]]), there are two remaining decisions per edge:
1. Which **bivariate copula family** captures the dependence for this pair?
2. What are the **parameter values** for that family?

Aas et al. (2009) show that these decisions can be made **sequentially, tree by tree**, by maximum likelihood estimation. The total number of parameters is the sum of parameters across all pair copulas — typically 1–2 per edge (with the $t$ copula having 2: correlation and degrees of freedom).

## Main Content

> [!definition] Sequential MLE Algorithm (Aas et al. 2009, Sec. 3)
> **Input:** Data $(x_1,\ldots,x_n)$, fitted marginals $\hat F_1,\ldots,\hat F_n$, vine structure.
>
> **Step 1 — Pseudo-observations:** Compute $u_{t,k} = \hat F_k(x_{t,k})$ for $t=1,\ldots,T$ and $k=1,\ldots,n$.
>
> **Step 2 — Tree $T_1$ estimation:** For each edge $(i,j) \in E_1$:
> $$\hat\theta_{ij} = \arg\max_\theta \sum_{t=1}^T \log c_{ij}(u_{t,i},\, u_{t,j};\, \theta)$$
>
> **Step 3 — h-function transform:** For each edge $(i,j) \in E_1$, compute conditional CDFs:
> $$v_{t,j|i} = h(u_{t,j} | u_{t,i};\, \hat\theta_{ij}), \qquad v_{t,i|j} = h(u_{t,i} | u_{t,j};\, \hat\theta_{ij})$$
>
> **Step 4 — Tree $T_2$ estimation:** Use the $v$-values from Step 3 as pseudo-observations, repeat Step 2 for edges in $E_2$.
>
> **Step 5:** Repeat Steps 3–4 for trees $T_3,\ldots,T_{n-1}$.
>
> Sequential MLE is consistent but not fully efficient (ignores uncertainty from earlier stages). Starting from sequential estimates, full joint MLE can be run to optimality.
> ^def-seq-mle

> [!definition] The Simplifying Assumption
> In principle, the conditional copula $C_{ij|D}(F(x_i|\mathbf{x}_D),\,F(x_j|\mathbf{x}_D);\,\mathbf{x}_D)$ depends on the realisation $\mathbf{x}_D$ of the conditioning variables. The **simplifying assumption** states:
> $$C_{ij|D}(\cdot;\,\mathbf{x}_D) = C_{ij|D}(\cdot) \qquad \text{(independent of the value of } \mathbf{x}_D\text{)}$$
> Under this assumption, the pair-copula density $c_{ij|D}$ does not depend on $\mathbf{x}_D$, only on the rank-transformed arguments $F(x_i|\mathbf{x}_D)$ and $F(x_j|\mathbf{x}_D)$. This enables the closed-form PCC density and sequential estimation. Formal tests (Stöber, Joe & Czado 2013; Spanhel & Kurz 2019) typically fail to reject the simplifying assumption at the sample sizes common in financial data ($T \leq 1000$).
> ^def-simplifying

> [!definition] Bivariate Copula Families
> Each pair-copula slot can be any bivariate copula. Standard families:
>
> | Family | Param. | Lower tail $\lambda_L$ | Upper tail $\lambda_U$ | Notes |
> |--------|--------|----------------------|----------------------|-------|
> | Gaussian | $\rho\!\in\!(-1,1)$ | 0 | 0 | No tail dep; symmetric |
> | Student-$t$ | $\rho,\,\nu\!>\!0$ | $\lambda_L = \lambda_U > 0$ | same | Symmetric tail dep; → Gaussian as $\nu\to\infty$ |
> | Clayton | $\theta\!>\!0$ | $2^{-1/\theta}$ | 0 | Lower tail only |
> | Gumbel | $\theta\!\geq\!1$ | 0 | $2-2^{1/\theta}$ | Upper tail only |
> | Frank | $\theta\!\neq\!0$ | 0 | 0 | Symmetric; allows neg. dep. |
> | Joe | $\theta\!\geq\!1$ | 0 | $2-2^{1/\theta}$ | Strong upper tail |
> | BB1 (Clayton–Gumbel) | $\delta,\theta$ | $2^{-1/\delta}$ | $2-2^{1/\theta}$ | Both tails |
> | BB7 (Joe–Clayton) | $\theta,\delta$ | $2^{-1/\delta}$ | $2-2^{1/\theta}$ | Both tails |
> | Survival Clayton | $\theta\!>\!0$ | 0 | $2^{-1/\theta}$ | Upper tail only (90° rotation) |
> | Survival Gumbel | $\theta\!\geq\!1$ | $2-2^{1/\theta}$ | 0 | Lower tail only (270° rotation) |
> | Independence | — | 0 | 0 | $C(u,v)=uv$; used in truncated vines |
>
> **Rotations:** Any Archimedean copula can be rotated 90°, 180°, or 270° to shift its tail dependence. VineCopula codes rotations as family + 10/20/30 (e.g., Clayton = 3, Survival Clayton = 13).
> ^def-families

> [!definition] Family Selection by AIC/BIC
> For each pair-copula slot, candidate families are fitted and compared by AIC:
> $$\text{AIC} = -2\ell(\hat\theta) + 2p$$
> where $\ell$ is the log-likelihood and $p$ the number of parameters. The family with lowest AIC is selected. BIC ($2p \to p\log T$) penalises more heavily and selects sparser models. An independence test (e.g., Kendall's $\hat\tau = 0$) can first screen for near-independence pairs; if not rejected, assign the independence copula to save parameters.
>
> In VineCopula (R): `BiCopSelect(u1, u2, familyset = NA)` fits all families and returns the selected one.
> ^def-aic-selection

## Examples

> [!example] Sequential Estimation for a 3-Variable D-Vine
> **Variables:** Returns $X_1, X_2, X_3$ with vine 1–2–3.
>
> **Step 1:** Fit GARCH marginals; compute pseudo-obs $u_1,u_2,u_3$.
>
> **Step 2 — $T_1$:** Fit $c_{12}$ (Student-$t$ selected: $\hat\rho_{12}=0.65$, $\hat\nu_{12}=7$) and $c_{23}$ (Clayton: $\hat\theta_{23}=0.82$).
>
> **Step 3 — h-functions:**
> $$v_{1|2} = h(u_1\,|\,u_2;\,\hat\theta_{12}^t), \qquad v_{3|2} = h(u_3\,|\,u_2;\,\hat\theta_{23}^{\text{Clay}})$$
>
> **Step 4 — $T_2$:** Fit $c_{13|2}$ using $(v_{1|2}, v_{3|2})$ as inputs → Frank copula selected ($\hat\theta_{13|2}=1.3$, near-symmetric).
>
> **Interpretation:** After removing the common dependence on $X_2$, $X_1$ and $X_3$ have weak symmetric residual dependence — consistent with their returns being related primarily through the middle asset.

## Connections

- [[C-Vine and D-Vine Structures]] — the tree structures that determine which pair gets which copula.
- [[Vine Copulas - Overview]] — the PCC idea and h-function definition.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is used as the criterion for vine structure selection (maximum spanning tree).
- [[SMM Estimation of Factor Copulas]] — contrast: rank-statistic SMM (factor copulas) vs tree-by-tree MLE (vine copulas).
- [[Copula Architecture Comparison]] — the estimation-method comparison across architectures.

## See Also

- [[Factor Copula Application - S&P 100 and Systemic Risk]] — see the GARCH marginal filtering step; the same step precedes vine copula estimation.
- [[Tail Dependence in Factor Copulas]] — tail dependence is an *output* of EVT analysis for factor copulas; for vine copulas, it is an *input* (the researcher chooses a tail-dependent pair-copula family).
- [[../_Index|Dependence Modeling]]
