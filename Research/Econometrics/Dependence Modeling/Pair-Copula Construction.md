---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Dissmann-Czado-Synthesis.md]]"
source_location: "Aas et al. (2009) §2-3; Bedford & Cooke (2002)"
date_ingested: 2026-07-06
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[R-Vine Structure Selection]]"
aliases:
  - pair copula
  - h-function
  - vine density factorization
  - Bedford Cooke vine
---

# Pair-Copula Construction

> [!summary]
> A pair-copula construction (PCC) decomposes the $d$-dimensional joint density into $d$ marginal densities and $d(d-1)/2$ **bivariate copula densities**, organized by a vine tree sequence. The key computational primitive is the **h-function** — the conditional CDF $F(x_i | x_j)$ as derived from a bivariate copula — which maps pseudo-observations from one vine tree to the next, enabling **sequential tree-by-tree MLE**. Under the simplifying assumption (pair copulas do not depend on the conditioning values), the full likelihood factorises completely and is tractable.

## Overview

The pair-copula decomposition is the formal mechanism underlying all vine copulas. It arises from applying Sklar's theorem iteratively: each conditional bivariate density $f(x_i, x_j | \mathbf{x}_\mathbf{D})$ can be written as the product of a pair copula density and two conditional marginal densities. By choosing a vine graph $\mathcal{V}$, the researcher specifies *which* conditionals to model at each step. The vine graph organizes the $d(d-1)/2$ pair copulas into $d-1$ trees, with tree $T_j$ capturing dependences at conditioning level $j-1$.

## Main Content

### The Core Factorisation Theorem

> [!theorem] Pair-copula density factorisation (Bedford & Cooke 2002, Aas et al. 2009)
> Let $\mathcal{V} = (T_1, \ldots, T_{d-1})$ be a regular vine on $\{1, \ldots, d\}$. Each edge $e = (a(e), b(e); \mathbf{D}_e)$ in tree $T_j$ specifies a pair copula for $X_{a(e)}$ and $X_{b(e)}$ conditioned on $\mathbf{X}_{\mathbf{D}_e}$ (the *conditioning set* of $e$, with $|\mathbf{D}_e| = j-1$). The joint density factors as:
>
> $$\boxed{f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \;\cdot\; \prod_{j=1}^{d-1} \prod_{e \in T_j} c_{a(e),b(e)|\mathbf{D}_e}\!\left(F(x_{a(e)}|\mathbf{x}_{\mathbf{D}_e}),\, F(x_{b(e)}|\mathbf{x}_{\mathbf{D}_e})\right)}$$
>
> **Conditions:** Under the simplifying assumption (pair copulas are functions of conditional CDFs only, not of conditioning values $\mathbf{x}_\mathbf{D}$), this factorisation is tractable.
>
> **Significance:** The formula shows the joint density is completely determined by $d$ univariate marginals and $d(d-1)/2$ bivariate copula densities — all freely and independently specified.
^thm-factorisation

### The h-Function

> [!definition] h-Function (conditional CDF from a bivariate copula)
> For a bivariate copula $C(u_1, u_2; \boldsymbol{\theta})$, the **h-function** is the conditional CDF of $U_1$ given $U_2 = u_2$:
>
> $$h(u_1 \mid u_2;\, \boldsymbol{\theta}) \;=\; F(U_1 \leq u_1 \mid U_2 = u_2) \;=\; \frac{\partial\, C(u_1, u_2;\, \boldsymbol{\theta})}{\partial\, u_2}$$
>
> The **inverse h-function** $h^{-1}(p \mid u_2;\, \boldsymbol{\theta})$ solves $h(u_1 \mid u_2) = p$ for $u_1$; it is needed for **simulation** via the Rosenblatt transform.
>
> The h-function maps **pair $(u_1, u_2)$** to the pseudo-observation $F(x_1 \mid x_2)$ needed at the next vine tree level. It is the key computational primitive of sequential estimation.
^def-hfunction

> [!example] h-Function for the Gaussian copula
> **Setup:** Gaussian copula with correlation $\rho$. The copula CDF is:
> $$C_\rho(u_1, u_2) = \Phi_\rho(\Phi^{-1}(u_1),\, \Phi^{-1}(u_2))$$
> where $\Phi_\rho$ is the bivariate normal CDF with correlation $\rho$.
>
> **h-function:**
> $$h(u_1 \mid u_2;\, \rho) = \Phi\!\left(\frac{\Phi^{-1}(u_1) - \rho\,\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$$
>
> **Interpretation:** Given the marginal observation $u_2$, this is the conditional probability $F(X_1 \leq \Phi^{-1}(u_1) \mid X_2 = \Phi^{-1}(u_2))$ under a bivariate normal. The formula is a standard normal CDF evaluated at a shifted/scaled argument.

> [!example] h-Function for the Student-$t$ copula
> **Setup:** Bivariate $t$ copula with correlation $\rho$ and $\nu$ degrees of freedom.
> **h-function:**
> $$h(u_1 \mid u_2;\, \rho,\nu) = t_{\nu+1}\!\!\left(\frac{t_\nu^{-1}(u_1) - \rho\,t_\nu^{-1}(u_2)}{\sqrt{\frac{(\nu + [t_\nu^{-1}(u_2)]^2)(1-\rho^2)}{\nu+1}}}\right)$$
> where $t_\nu$ is the Student-$t$ CDF with $\nu$ degrees of freedom.

### Sequential Estimation Algorithm

> [!definition] Sequential tree-by-tree MLE (Aas et al. 2009)
> **Input:** $d$-dimensional pseudo-observations $(u_{1,t}, \ldots, u_{d,t})_{t=1}^T$ (empirical rank-based CDFs $\hat{F}_k(x_k)$) and a vine structure $\mathcal{V}$ (e.g. C-vine or D-vine with chosen variable ordering).
>
> **Algorithm:**
> 1. **Tree 1:** The pseudo-observations $u_{i,t}$ are the inputs. For each edge $e = (i,j) \in T_1$, estimate the pair copula $c_{ij}(\cdot;\hat{\boldsymbol{\theta}}_{ij})$ by MLE. Compute transformed observations:
>    $$\tilde{u}_{i|j,t} \leftarrow h(u_{i,t} \mid u_{j,t};\, \hat{\boldsymbol{\theta}}_{ij})$$
> 2. **Tree 2:** Feed $\tilde{u}_{i|j,t}$ as inputs. For each edge $e = (i,j\mid k) \in T_2$, estimate $c_{ij|k}$ by MLE on $(\tilde{u}_{i|k,t},\, \tilde{u}_{j|k,t})$. Compute next-level transforms.
> 3. **Continue** through all $d-1$ trees. Each tree reduces the conditioning set by one variable.
>
> **Complexity:** $O(d^2)$ bivariate MLE problems, each on $T$ observations with $O(1)$ parameters.
>
> **Note:** This is a **sequential** (not joint) MLE — it does not maximise the full joint likelihood simultaneously. Haff et al. (2010) show it is consistent; Hobæk Haff (2013) provides conditions under which it is efficient.
^def-sequential-est

> [!definition] Pair copula family selection
> At each edge, one typically selects the copula family from a **candidate set** — e.g., $\{\text{Gaussian},\, t,\, \text{Clayton},\, \text{Gumbel},\, \text{Frank},\, \text{Joe}\}$ plus their $90°$, $180°$, $270°$ rotations (to allow lower-tail, upper-tail, and survival-copula variants). Selection is by **AIC** (or BIC for parsimony):
>
> $$\text{AIC}_e = -2\,\ell_e(\hat{\boldsymbol{\theta}}_e) + 2\,p_e$$
>
> where $\ell_e$ is the log-likelihood and $p_e$ the number of parameters ($p_e = 1$ for Gaussian/Clayton/Gumbel/Frank/Joe; $p_e = 2$ for $t$).

### The Simplifying Assumption: Formal Statement and Critique

> [!definition] Simplifying assumption (formal)
> A vine copula model is **simplified** if, for every pair copula $c_{ij|\mathbf{D}}$ at every tree level, the copula does not depend on the realised values of the conditioning set:
> $$c_{ij|\mathbf{D}}(u, v; \mathbf{x}_\mathbf{D}) = c_{ij|\mathbf{D}}(u, v) \quad \forall\, \mathbf{x}_\mathbf{D} \in \mathbb{R}^{|\mathbf{D}|}$$
>
> **When is this exact?** For a Gaussian vine (all pair copulas Gaussian), the simplifying assumption holds exactly — the partial correlations are constant. For all non-Gaussian pair copulas, it generally holds only approximately (Acar et al. 2012).
>
> **Practical implication:** The simplified vine is a **misspecified but useful** model. Empirically, the misspecification is often small, and the model provides accurate density estimates and dependence summaries. For critical applications (e.g., extreme risk aggregation), testing the simplifying assumption is advisable (Spanhel & Kurz 2019).
^def-simplifying-formal

## Connections

- [[Vine Copulas - Overview]] — motivation, vine types, and position in the literature.
- [[C-Vine and D-Vine Structures]] — specific tree structures with explicit density formulas.
- [[R-Vine Structure Selection]] — data-driven structure selection using the Dissmann et al. spanning-tree algorithm.
- [[Dependence Measures for Copulas]] — tail dependence coefficients and rank correlation used in estimation.
- [[Factor Copula Construction]] — contrasting decomposition: latent factor model vs sequential pair-copula cascade.

## See Also

- [[SMM Estimation of Factor Copulas]] — the simulation-based alternative when no closed-form likelihood exists.
- [[../_Index|Econometrics]]
