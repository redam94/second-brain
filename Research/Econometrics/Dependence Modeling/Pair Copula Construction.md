---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/vine-copula-references.md]]"
source_location: "Aas et al. (2009) §2-3; Bedford & Cooke (2002) §3"
date_ingested: 2026-10-30
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Structures]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - pair copula construction
  - PCC density
  - h-function
  - vine density
  - conditional copula transform
---

# Pair Copula Construction

> [!summary]
> The pair copula construction (PCC) expresses the $d$-dimensional joint density as a product of marginal densities and $d(d-1)/2$ bivariate copula densities, one for each edge of the vine. The bivariate copula inputs are **conditional CDFs** computed via a recursion based on the **h-function** (the derivative of a bivariate copula with respect to one argument). This note gives the full density formula, the h-function definition and recursion, and the algorithm for sampling and evaluating a PCC.

## Overview

The key computational challenge in vine copulas is computing the **conditional CDFs** $F_{j|\mathbf{D}}(y_j | \mathbf{y}_\mathbf{D})$ that appear as inputs to the higher-tree pair copulas. These are not simple transformations of $F_j$ — they depend on the values of the conditioning variables through the copula structure. Aas et al. (2009) showed that these conditional CDFs can be computed recursively using the **h-function**, a single bivariate operation, tree-by-tree. This makes evaluation and simulation $O(d^2)$ in the number of bivariate copula operations.

## Main Content

> [!definition] The h-function (conditional CDF operator)
> For a bivariate copula $C_{uv}(u, v;\boldsymbol{\theta})$ with parameter $\boldsymbol{\theta}$, the **h-function** is:
> $$h(u \mid v;\, \boldsymbol{\theta}) = \frac{\partial C_{uv}(u, v;\boldsymbol{\theta})}{\partial v}$$
> This is the conditional CDF of $U$ given $V = v$ (in the probability-integral-transformed scale). If $(U, V) = (F_j(Y_j), F_k(Y_k))$ follow copula $C_{jk}$, then:
> $$F_{Y_j | Y_k = y_k}(y_j) = h(F_j(y_j) \mid F_k(y_k);\, \boldsymbol{\theta}_{jk})$$
>
> **H-functions for common bivariate copulas:**
> | Copula | $C(u,v;\theta)$ | $h(u|v;\theta)$ |
> |---|---|---|
> | Gaussian | $\Phi_\rho(\Phi^{-1}(u), \Phi^{-1}(v))$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student's $t_\nu$ | $t_{\nu,\rho}(t_\nu^{-1}(u), t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel | $\exp(-[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta})$ | $\frac{C(u,v)}{v}[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta-1}(-\ln v)^{\theta-1}$ |
> | Frank | $-\frac{1}{\theta}\ln\!\left(1+\frac{(e^{-\theta u}-1)(e^{-\theta v}-1)}{e^{-\theta}-1}\right)$ | $\frac{(e^{-\theta v}-1)e^{-\theta u}}{(e^{-\theta}-1)+(e^{-\theta u}-1)(e^{-\theta v}-1)}$ |
> | Independence | $uv$ | $u$ |
> ^def-hfunction

> [!theorem] PCC density formula (Aas et al. 2009 / Bedford & Cooke 2002)
> Under the **simplifying assumption** (see [[Vine Copulas - Overview]]^def-simplifying), the joint density of $(Y_1, \dots, Y_d)$ specified by a regular vine $\mathcal{V} = (T_1, \dots, T_{d-1})$ with bivariate copula $c_{j(e),k(e)|\mathbf{D}(e)}$ at each edge $e$, and marginals $f_i$, is:
> $$f(y_1, \dots, y_d) = \prod_{i=1}^{d} f_i(y_i) \cdot \prod_{\ell=1}^{d-1} \prod_{e \in E_\ell} c_{j(e),k(e)|\mathbf{D}(e)}\!\left(F_{j(e)|\mathbf{D}(e)}(y_{j(e)}|\mathbf{y}_{\mathbf{D}(e)}),\; F_{k(e)|\mathbf{D}(e)}(y_{k(e)}|\mathbf{y}_{\mathbf{D}(e)})\right)$$
>
> Each conditional CDF $F_{j|\mathbf{D}}(y_j|\mathbf{y}_\mathbf{D})$ is computed from the h-function recursion (see below). The $d(d-1)/2$ pair copula densities $c_{jk|\mathbf{D}}$ are evaluated at the conditional-probability-integral-transformed values.
>
> **Proof sketch:** By the chain rule for conditional densities:
> $$f(y_1,\dots,y_d) = f(y_1)\prod_{k=2}^{d} f(y_k|y_1,\dots,y_{k-1})$$
> Each conditional density $f(y_k|y_1,\dots,y_{k-1})$ is written via Sklar as $f_k(y_k)\cdot c_{k,\mathbf{D}_k}(F_{k|\mathbf{D}_k}, F_{\mathbf{D}_k})$ for appropriate conditioning sets $\mathbf{D}_k$. The vine structure ensures consistency: different orderings of variables give different but equally valid decompositions that all represent the same joint distribution when the simplifying assumption holds.
> ^thm-density

> [!definition] H-function recursion for conditional CDFs
> For a D-vine on $\{1,\dots,d\}$ (Aas et al. 2009, Algorithm 1), the conditional CDFs needed for Tree $\ell$ are computed from those at Tree $\ell-1$. Suppose we want $F_{j|D_{j}}(x_j | \mathbf{x}_{D_j})$ where $\mathbf{D}_j = \{k\} \cup \mathbf{D}'$ (adding one conditioning variable $k$). Then:
> $$F_{j|\{k\}\cup\mathbf{D}'}(x_j | x_k, \mathbf{x}_{\mathbf{D}'}) = h\!\left(F_{j|\mathbf{D}'}(x_j|\mathbf{x}_{\mathbf{D}'})\;\middle|\; F_{k|\mathbf{D}'}(x_k|\mathbf{x}_{\mathbf{D}'});\; \boldsymbol{\theta}_{j,k|\mathbf{D}'}\right)$$
>
> That is: to condition on one more variable, take the h-function of the two already-conditioned transforms, using the pair copula parameters $\boldsymbol{\theta}_{j,k|\mathbf{D}'}$ for that edge. This recursion requires only bivariate operations at each step, regardless of the size of the conditioning set.
>
> **Base case:** $F_{j|\emptyset}(x_j|\emptyset) = F_j(x_j)$ — the marginal CDF.
> ^def-recursion

> [!definition] D-vine sampling algorithm (Aas et al. 2009)
> To draw $\mathbf{y} \sim f_{\mathcal{V}}$, use the inverse h-function $h^{-1}(u|v;\boldsymbol{\theta}) = F^{-1}_{U|V}(u|v)$:
> 1. Draw independent $w_1, \dots, w_d \sim \text{Uniform}(0,1)$.
> 2. Set $F_1(y_1) = w_1$.
> 3. For $i=2,\dots,d$: set $v_{i,1} = w_i$ and recursively apply the inverse h-function back through the conditioning chain to recover $F_i(y_i)$.
> 4. Apply the marginal quantile functions $y_i = F_i^{-1}(F_i(y_i))$.
>
> The algorithm is $O(d^2)$ h-function evaluations. See [[Vine Copula Estimation and Model Selection]] for estimation counterpart.
> ^def-sampling

## Examples

> [!example] Four-variable D-vine: full expansion
> **Setup:** D-vine on $(Y_1, Y_2, Y_3, Y_4)$ with ordering $1-2-3-4$.
>
> **Tree 1 (unconditional pairs):** $c_{12}(F_1, F_2)$, $c_{23}(F_2, F_3)$, $c_{34}(F_3, F_4)$
>
> **Tree 2 (once-conditioned pairs):**
> - $c_{13|2}(h(F_1|F_2;\theta_{12}),\; h(F_3|F_2;\theta_{23}))$
> - $c_{24|3}(h(F_2|F_3;\theta_{23}),\; h(F_4|F_3;\theta_{34}))$
>
> **Tree 3 (twice-conditioned pair):**
> - $c_{14|23}(h(h(F_1|F_2)|h(F_3|F_2); \theta_{13|2}),\; h(h(F_4|F_3)|h(F_2|F_3); \theta_{24|3}))$
>
> **Total:** 3+2+1 = 6 pair copulas, each potentially from a different family and with its own parameter(s).

> [!example] Choosing different pair copula families per edge
> In the S&P 100 application, Oh & Patton (2012) use a factor copula with a single asymmetric distribution. A vine copula approach could instead assign:
> - Tree 1 (strong market co-movement): Student's $t$ copulas (symmetric tail dependence)
> - Tree 1 edges for defensive pairs: Gaussian (no tail dependence)
> - Tree 2 (after conditioning on market): Frank copula (symmetric, no tail dependence)
> - Tree 3+: Independence copula (truncated vine) if conditional dependencies are negligible
>
> This per-pair flexibility is the vine's main advantage over factor copulas in moderate dimensions.

## Connections

- [[Regular Vine Structures]] — the tree structure that determines which pairs appear and their conditioning sets.
- [[Vine Copulas - Overview]] — motivation, the simplifying assumption, and comparison with factor copulas.
- [[Vine Copula Estimation and Model Selection]] — how h-functions are used in sequential MLE and how pair copula families are selected per edge.
- [[Dependence Measures for Copulas]] — tail dependence and rank correlations for the bivariate pair copulas.

## See Also

- [[SMM Estimation of Factor Copulas]] — factor copula estimation via simulated moments; contrast with vine's analytic sequential MLE.
- [[Factor Copula Construction]] — the competing latent-factor approach; compare the h-function recursion with the simulation-based approach.
- [[Econometrics/_Index|Econometrics]]
