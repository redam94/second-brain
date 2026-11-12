---
title: "Pair-Copula Decomposition Theorem"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Sources.md]]"
source_location: "Bedford & Cooke (2002), Thm. 4.2; Aas et al. (2009), Secs. 2.1–2.3"
date_ingested: 2026-11-12
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - pair-copula density decomposition
  - PCC density factorisation
  - Bedford Cooke decomposition theorem
  - simplifying assumption vine
---

# Pair-Copula Decomposition Theorem

> [!summary]
> Any $n$-variate density factors into $n$ **univariate marginal densities** and $n(n-1)/2$ **bivariate pair-copula densities**, each conditioning on a subset $\mathbf{D}$ of the remaining variables. The factorisation is not unique: the vine structure determines which pairs appear in which tree and with which conditioning set. The **simplifying assumption** — that conditional pair copulas do not depend on the values of the conditioning variables, only on the conditional probability integral transforms — makes the model tractable and is used in almost all applied work (Aas et al. 2009; Bedford & Cooke 2002).

## Overview

Sklar's theorem factors a joint CDF into marginals and a copula, but constructing a tractable multivariate copula remains difficult. The **pair-copula construction** (Bedford & Cooke 2001, 2002; Joe 1996) recursively factors the joint density: a $k$-variate conditional density factors into the product of a bivariate copula density and $(k-1)$-variate conditional densities. Applying this recursion $n-1$ times yields the full $n$-variate density as a product of $n(n-1)/2$ bivariate copula densities.

The factorisation is best seen by working through small cases before stating the general result.

## Main Content

### Three-variable example

For $(X_1, X_2, X_3)$ with marginals $F_1, F_2, F_3$, one valid factorisation (a D-vine on the ordering 1-2-3) is:

$$
f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3)
\cdot c_{12}\!\left(F_1(x_1), F_2(x_2)\right) \cdot c_{23}\!\left(F_2(x_2), F_3(x_3)\right)
\cdot c_{13|2}\!\left(F_{1|2}(x_1|x_2),\; F_{3|2}(x_3|x_2)\right)
$$

where $c_{ij}$ is the bivariate copula density for the $(i,j)$ pair, and $c_{13|2}$ is the **conditional copula density** for $(X_1, X_3)$ given $X_2 = x_2$. The conditional CDFs $F_{1|2}(x_1|x_2)$ and $F_{3|2}(x_3|x_2)$ are computed from the bivariate copulas already specified in tree $T_1$:

$$
F_{i|j}(x_i|x_j) = \frac{\partial C_{ij}(F_i(x_i), F_j(x_j))}{\partial F_j(x_j)}
$$

This quantity — the partial derivative of a bivariate copula CDF with respect to one argument — is called the **h-function** and is denoted $h(u|v; \boldsymbol{\theta})$.

> [!definition] The h-function (Aas et al. 2009)
> For bivariate copula $C(u, v; \boldsymbol{\theta})$, the **h-function** is:
> $$ h(u|v; \boldsymbol{\theta}) \equiv \frac{\partial C(u, v; \boldsymbol{\theta})}{\partial v} $$
> This is the conditional CDF of one uniform margin given the other: if $(U,V) \sim C$, then $h(u|v;\boldsymbol{\theta}) = \Pr[U \le u \mid V = v]$. It arises in the sequential computation of pseudo-observations for higher trees. For standard bivariate copulas, $h$ has closed forms: for the Gaussian copula $C_\rho$, $h(u|v;\rho) = \Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$.
^def-hfunction

### Four-variable D-vine factorisation

For $n=4$ ordered as 1-2-3-4, the D-vine factorisation gives:

$$
f(x_1,x_2,x_3,x_4) = \prod_{i=1}^4 f_i(x_i) \cdot
\underbrace{c_{12} c_{23} c_{34}}_{\text{tree } T_1} \cdot
\underbrace{c_{13|2} c_{24|3}}_{\text{tree } T_2} \cdot
\underbrace{c_{14|23}}_{\text{tree } T_3}
$$

Each copula is evaluated at the appropriate h-function-transformed arguments. For example, $c_{13|2}$ is evaluated at $\bigl(h(F_1(x_1)|F_2(x_2);\theta_{12}),\; h(F_3(x_3)|F_2(x_2);\theta_{23})\bigr)$.

### General n-variable factorisation

> [!theorem] Pair-copula decomposition (Bedford & Cooke 2002, Aas et al. 2009)
> Let $f(x_1, \ldots, x_n)$ be an $n$-variate density with marginals $f_i$ and CDFs $F_i$. For any regular vine $\mathcal{V}$ on $n$ variables — specifying trees $T_1, \ldots, T_{n-1}$ — the density factorises as:
> $$
> f(x_1, \ldots, x_n) = \prod_{i=1}^n f_i(x_i) \cdot \prod_{k=1}^{n-1}\prod_{e \in E(T_k)} c_{j_e, k_e|\mathbf{D}_e}\!\left(F(x_{j_e}|\mathbf{x}_{\mathbf{D}_e}),\; F(x_{k_e}|\mathbf{x}_{\mathbf{D}_e});\; \boldsymbol{\theta}_{j_e,k_e|\mathbf{D}_e}\right)
> $$
> where the outer product over trees $T_k$ and inner product over edges $e = (j_e, k_e; \mathbf{D}_e)$ ranges over the $n(n-1)/2$ pair copulas; $j_e, k_e$ are the **conditioned set** variables (the two endpoints of edge $e$ in tree $T_k$), and $\mathbf{D}_e$ is the **conditioning set** (the edge's constraint set, shared between the two nodes of $e$).
>
> **Total pair copulas:** exactly $n(n-1)/2$ — one for each edge of the vine.
^thm-pcc

> [!definition] Simplifying assumption (Aas et al. 2009, Czado 2010)
> The **simplifying assumption** (SA) states that conditional pair copulas $C_{j,k|\mathbf{D}}(u, v|\mathbf{x}_{\mathbf{D}})$ do not depend on the realised conditioning values $\mathbf{x}_{\mathbf{D}}$:
> $$ C_{j,k|\mathbf{D}}(u, v|\mathbf{x}_{\mathbf{D}}) = C_{j,k|\mathbf{D}}(u, v) $$
> Under SA, each pair copula has parameters $\boldsymbol{\theta}_{j,k|\mathbf{D}}$ that are **constants** (not functions of $\mathbf{x}_{\mathbf{D}}$), so the conditional copula arguments reduce to the h-function outputs:
> $$ C_{j,k|\mathbf{D}}(F(x_j|\mathbf{x}_\mathbf{D}), F(x_k|\mathbf{x}_\mathbf{D})) $$
> This makes likelihood computation tractable: each pair copula can be fitted independently given its h-function inputs. The SA is **not always valid** — Stöber & Czado (2012) show it is restrictive for elliptical distributions — but it simplifies inference enormously and is standard in applications. See [[Vine Copula Estimation]] for estimation under SA.
^def-simplifying-assumption

> [!theorem] h-function recursion for conditional CDFs
> Under the simplifying assumption, conditional CDFs needed for tree $T_{k+1}$ are computed from already-fitted pair copulas in trees $T_1, \ldots, T_k$. For edge $e=(j,k;\mathbf{D})$ in tree $T_k$, the conditional CDF of variable $j$ given $\mathbf{D} \cup \{k\}$ is:
> $$ F(x_j | \mathbf{x}_{\mathbf{D} \cup \{k\}}) = h\bigl(F(x_j|\mathbf{x}_\mathbf{D})\,\big|\, F(x_k|\mathbf{x}_\mathbf{D});\; \boldsymbol{\theta}_{j,k|\mathbf{D}}\bigr) $$
> Starting from $F(x_i|\emptyset) = F_i(x_i)$ for tree $T_1$, this recursion propagates transformed observations up the vine trees. For a D-vine with $n$ variables, computing the full log-likelihood requires $n(n-1)(n+1)/6$ h-function evaluations.
^thm-hrecursion

## Examples

> [!example] h-function for the Gaussian copula
> **Setup:** Gaussian copula $C_\rho$ with parameter $\rho \in (-1,1)$; standard normal marginals $\Phi$.
>
> **h-function:**
> $$ h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right) $$
>
> **Interpretation:** Given $V = v$, the conditional distribution of $U$ is normal with mean $\rho\,\Phi^{-1}(v)$ and variance $1-\rho^2$. The h-function maps the pair $(\Phi^{-1}(u), \Phi^{-1}(v))$ to a "partial correlation" residual.
>
> **Role in vine computation:** In a D-vine on 1-2-3, the pseudo-observation fed to $c_{13|2}$ is:
> $$ u_{1|2}(x_1, x_2) = h(F_1(x_1)|F_2(x_2);\hat{\rho}_{12}) $$
> and similarly for $u_{3|2}$. These are uniform if the Gaussian pair copula is correctly specified.

> [!example] Three-variable D-vine: computing the log-likelihood
> **Setup:** Variables $(X_1, X_2, X_3)$, D-vine structure 1-2-3. All three pair copulas are Gaussian: $c_{12}(\cdot;\rho_{12})$, $c_{23}(\cdot;\rho_{23})$, $c_{13|2}(\cdot;\rho_{13|2})$.
>
> **Step 1 (tree $T_1$):** Compute $\log c_{12}(F_1(x_1), F_2(x_2);\rho_{12})$ and $\log c_{23}(F_2(x_2), F_3(x_3);\rho_{23})$.
>
> **Step 2 (transform):** $u_{1|2} = h(F_1(x_1)|F_2(x_2);\rho_{12})$ and $u_{3|2} = h(F_3(x_3)|F_2(x_2);\rho_{23})$.
>
> **Step 3 (tree $T_2$):** Compute $\log c_{13|2}(u_{1|2}, u_{3|2};\rho_{13|2})$.
>
> **Log-likelihood contribution:**
> $$ \ell(x_1,x_2,x_3) = \sum_{i} \log f_i(x_i) + \log c_{12}(F_1(x_1),F_2(x_2)) + \log c_{23}(F_2(x_2),F_3(x_3)) + \log c_{13|2}(u_{1|2}, u_{3|2}) $$
> Sum over observations $t=1,\ldots,T$ gives the full log-likelihood.

## Connections

- [[Vine Copulas - Overview]] — the architecture context and comparison with factor copulas.
- [[C-Vine and D-Vine Structures]] — the graphical structures that specify which pairs appear in which trees.
- [[Vine Copula Estimation]] — how the sequential structure of the decomposition is exploited for estimation: tree-by-tree sequential MLE.
- [[Factor Copulas - Overview]] — the competing high-dimensional copula approach; the factor copula also lacks a closed-form density but uses SMM rather than sequential MLE.
- [[SMM Estimation of Factor Copulas]] — the SMM approach used for factor copulas; contrast with vine sequential MLE.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ guides the choice of pair-copula families.

## See Also

- [[Copula Estimation]] — Bayesian Gaussian copula (bivariate); each pair copula in a vine is a bivariate copula problem of this type.
- [[Bayesian copula estimation Describing correlated joint distributions]] — PyMC tutorial; pair copulas can similarly be estimated in a Bayesian framework.
- [[Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
