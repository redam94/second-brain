---
title: Pair Copula Construction and PCC Density
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/vine-copulas-sources.md]]"
source_location: "Aas et al. (2009), Secs. 2–4; Bedford & Cooke (2001)"
date_ingested: 2026-10-23
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Regular Vine Structures - C-vine D-vine R-vine]]"
  - "[[Vine Copula Model Selection and Estimation]]"
aliases:
  - PCC density
  - h-function vine
  - pair copula density decomposition
---

# Pair Copula Construction and PCC Density

> [!summary]
> A **pair copula construction (PCC)** decomposes an $n$-variate density into a product of univariate marginals and $\binom{n}{2}$ bivariate copula densities — the **pair copulas** — each evaluated at a pair of conditional CDFs. The **h-function** $h(x|v;\theta) = \partial C(F(x),F(v);\theta)/\partial F(v)$ enables recursive computation of all conditional CDFs needed at higher tree levels. Aas et al. (2009) operationalize this as a practical estimation algorithm; the underlying factorization is due to Joe (1996) and Bedford & Cooke (2001).

## Overview

Sklar's theorem decomposes any joint CDF $F(x_1,\ldots,x_n)$ into marginals and a copula $C$. But specifying $C$ directly in high dimensions is hard. The **pair copula construction** avoids this by writing the joint *density* as a product of bivariate copula densities applied recursively to conditional distributions. The construction proceeds tree by tree: at tree $T_1$, pair copulas link unconditional marginals; at tree $T_2$, pair copulas link pairs of variables conditionally on a third; and so on.

## Main Content

### The density factorization

Let $f(x_1,\ldots,x_n) = \prod_k f_k(x_k)$ be the density assuming independence, and let the dependence structure be encoded in pair copulas. For the simplest case of $n = 3$:

> [!definition] 3-Variable PCC Density
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)\cdot c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot c_{13|2}(F(x_1|x_2),\,F(x_3|x_2))$$
> where $c_{12}(u,v)$ and $c_{23}(u,v)$ are bivariate copula densities for unconditional pairs, and $c_{13|2}(u,v)$ is a bivariate copula density for $X_1$ and $X_3$ given $X_2$, evaluated at the conditional CDFs.
^def-3var-pcc

In general, the PCC density for $n$ variables organized as a vine with edges $E_1, \ldots, E_{n-1}$ is:

> [!definition] General PCC Density (Bedford & Cooke 2001; Aas et al. 2009, Eq. 4)
> $$f(x_1,\ldots,x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{\ell=1}^{n-1}\prod_{e=(j,k|D)\in E_\ell} c_{j,k|D}\bigl(F(x_j|\mathbf{x}_D),\,F(x_k|\mathbf{x}_D)\bigr)$$
> The product runs over all $\binom{n}{2}$ edges of the vine, one per pair. Each factor is a bivariate copula density evaluated at two conditional CDFs.
^def-pcc-density

### C-vine and D-vine density formulas

**C-vine** (star structure; variable $j$ is root in tree $j$):

$$f(\mathbf{x}) = \prod_{k=1}^{p}f_k(x_k) \cdot \prod_{j=1}^{p-1}\prod_{i=j+1}^{p} c_{j,i|1,\ldots,j-1}\!\bigl(F(x_j|x_1,\ldots,x_{j-1}),\,F(x_i|x_1,\ldots,x_{j-1})\bigr)$$

**D-vine** (path structure; pair $(i, i+j)$ conditioned on $\{i+1,\ldots,i+j-1\}$):

$$f(\mathbf{x}) = \prod_{k=1}^{p}f_k(x_k) \cdot \prod_{j=1}^{p-1}\prod_{i=1}^{p-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\,F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)$$

Both formulas have $p(p-1)/2$ pair copula terms — one for each pair — but the conditioning sets differ between the two structures.

### The h-function

The key numerical challenge is evaluating $F(x_j | \mathbf{x}_D)$ at each tree level. For a bivariate copula $C_{jv}$ with density $c_{jv}$:

> [!definition] h-function (Aas et al. 2009, Eq. 11)
> $$h(x \mid v;\, \theta) = F(x \mid v) = \frac{\partial\, C_{xv}(F_x(x),\, F_v(v);\, \theta)}{\partial\, F_v(v)}$$
> This is the conditional CDF of $X$ given $V = v$, computed as a partial derivative of the bivariate copula with respect to its second argument.
^def-h-function

The h-function has a closed form for many copula families:

| Family | $h(x \mid v;\,\theta)$ |
|---|---|
| Gaussian$(\rho)$ | $\Phi\!\left(\dfrac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Student-$t(\rho,\nu)$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(x)-\rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
| Clayton$(\theta)$ | $v^{-\theta-1}\bigl(x^{-\theta}+v^{-\theta}-1\bigr)^{-1-1/\theta}$ |
| Gumbel$(\theta)$ | $\frac{C_\theta(x,v)}{v}\cdot\frac{\bigl[(-\ln x)^\theta+(-\ln v)^\theta\bigr]^{1/\theta-1}(-\ln v)^{\theta-1}}{-\ln v}$ |
| Frank$(\theta)$ | $\dfrac{e^{-\theta v}(e^{-\theta x}-1)}{(e^{-\theta}-1)+(e^{-\theta x}-1)(e^{-\theta v}-1)}$ |

The **inverse h-function** $h^{-1}(\cdot)$ is needed for simulation from a vine copula.

### Recursive computation

For a vine with trees $T_1, T_2, \ldots, T_{n-1}$, the h-function application at each tree level is:

> [!theorem] Recursive PCC Evaluation (Aas et al. 2009, Alg. 1–2)
> **Evaluation** (density computation):
> 1. At tree $T_1$: compute pair copula densities $c_{jk}(F_j(x_j), F_k(x_k))$ for all edges $(j,k) \in E_1$.
> 2. At tree $T_1$: compute conditional CDFs $h_{j|k} = h(F_j(x_j) | F_k(x_k))$ and $h_{k|j} = h(F_k(x_k) | F_j(x_j))$ for all edges.
> 3. At tree $T_\ell$ ($\ell \geq 2$): each edge $(j,k|D)$ uses conditional CDFs $u_{j|D}$ and $u_{k|D}$ already computed from $T_{\ell-1}$. Evaluate $c_{j,k|D}(u_{j|D}, u_{k|D})$ and store $h(u_{j|D} | u_{k|D})$ and $h(u_{k|D} | u_{j|D})$ for $T_{\ell+1}$.
> 4. Multiply all pair copula densities and all marginal densities for the joint log-likelihood.
>
> **Complexity:** $O\bigl(\binom{n}{2}\bigr)$ h-function evaluations per observation.
^thm-recursive-pcc

### Sequential estimation

Parameters are estimated tree-by-tree rather than jointly:

> [!theorem] Sequential (Step-by-Step) Estimator (Aas et al. 2009, Sec. 4.1)
> 1. Estimate marginal distributions $\hat{F}_k$ from univariate data (parametric or empirical CDF).
> 2. For each edge $(j,k) \in E_1$: maximize bivariate log-likelihood $\sum_t \log c_{jk}(\hat F_j(x_{jt}), \hat F_k(x_{kt}); \theta_{jk})$ to get $\hat\theta_{jk}$.
> 3. Compute pseudo-observations for $T_2$: $\hat{u}_{j|k,t} = h(\hat F_j(x_{jt}) \mid \hat F_k(x_{kt}); \hat\theta_{jk})$.
> 4. Repeat steps 2–3 for each subsequent tree, using pseudo-observations from the previous tree.
>
> This estimator is **consistent** under the simplifying assumption and serves as starting values for full ML. Full ML over all trees can be carried out with a gradient optimizer treating the h-function evaluations as differentiable operations.
^thm-sequential-est

### Non-uniqueness and the simplifying assumption

Different vine structures produce different pair copulas for the same joint distribution. The pair copulas are not marginal or conditional distributions of $(X_j, X_k)$ in general — they depend on the chosen vine structure.

> [!definition] Simplifying Assumption
> A vine copula satisfies the **simplifying assumption** if each pair copula $c_{j,k|D}(u, v; \theta_{j,k|D})$ does not depend on the conditioning values $\mathbf{x}_D$ — only on the conditional probability integral transforms $F(x_j|\mathbf{x}_D)$ and $F(x_k|\mathbf{x}_D)$.
>
> This assumption is an approximation (Haff et al. 2010; Stoeber, Joe & Czado 2013): in general, pair copulas at higher tree levels are non-constant functions of $\mathbf{x}_D$. Under the simplifying assumption, the pair copulas can be estimated independently at each tree level.
^def-simplifying-assumption

## Connections

- [[Vine Copulas - Overview]] — motivation and positioning within the broader dependence modelling toolkit.
- [[Regular Vine Structures - C-vine D-vine R-vine]] — the vine graphical structure that organises which pairs appear at each tree level.
- [[Vine Copula Model Selection and Estimation]] — how to choose the vine structure and pair copula families from data.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ are the moment statistics used as vine structure selection inputs and as SMM targets in [[SMM Estimation of Factor Copulas]].
- [[Factor Copula Construction]] — contrasting approach: latent factor model generates the copula without recursive conditioning.
- [[Copula Estimation]] — bivariate copula estimation; the pair copulas are estimated bivariate copulas.

## See Also

- [[raw/vine-copulas-sources.md]] — Aas et al. (2009), Bedford & Cooke (2001) summaries with full formal statements
