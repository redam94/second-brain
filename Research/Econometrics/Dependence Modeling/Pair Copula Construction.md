---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009)"
source_location: "§2-3, pp. 182-190"
date_ingested: 2026-09-26
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Regular Vines and the R-Vine Matrix]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC
  - pair copula construction
  - h-function vine copula
  - conditional copula construction
---

# Pair Copula Construction

> [!summary]
> A **pair-copula construction (PCC)** decomposes the $d$-dimensional joint density into $d$ marginal densities and $d(d-1)/2$ bivariate copula densities using iterated applications of Sklar's theorem on conditional distributions. The key computational tool is the **h-function** — the partial derivative of a bivariate copula with respect to one argument — which provides the conditional CDFs required to evaluate copulas at higher tree levels. Under the standard **simplifying assumption**, the conditioning copulas do not depend on the value of the conditioning variables, making the construction fully tractable.

## Overview

The core idea: any joint density can be written as a product of *conditional* densities. Each conditional density factors (by Sklar's theorem) into a bivariate copula density times a lower-dimensional conditional density. Applying this recursively yields a fully bivariate decomposition with no $d$-dimensional piece. The decomposition is not unique — different orderings of variables or different conditioning structures lead to different but equally valid representations. The vine structure (see [[C-Vine and D-Vine Structures]]) specifies which decomposition is used.

## Main Content

> [!definition] Bivariate building block
> Let $(X_1, X_2)$ have joint density $f_{12}$ and marginals $f_1, f_2$. By Sklar's theorem:
> $$f_{12}(x_1,x_2) = c_{12}(F_1(x_1), F_2(x_2);\boldsymbol{\theta}_{12})\cdot f_1(x_1)\cdot f_2(x_2)$$
> where $c_{12}$ is the bivariate copula density and $F_1, F_2$ are the marginal CDFs. Now extend to conditioning: for any random variable $V=v$:
> $$f(x_1|x_2) = c_{12}(F_1(x_1), F_2(x_2);\boldsymbol{\theta}_{12})\cdot f_1(x_1)$$
> These bivariate building blocks are the **pair copulas** of the construction.
> ^def-bivariate-block

> [!definition] h-function (conditional CDF from bivariate copula)
> For a bivariate copula $C(u_1, u_2;\boldsymbol{\theta})$ the **h-function** is defined as:
> $$h(u_1|u_2;\boldsymbol{\theta}) \equiv \frac{\partial C(u_1, u_2;\boldsymbol{\theta})}{\partial u_2}$$
> This gives the **conditional CDF** of $U_1$ given $U_2=u_2$: $h(u_1|u_2;\boldsymbol{\theta}) = \Pr[U_1 \le u_1 \mid U_2=u_2]$. The function $h$ is used to compute the **transformed arguments** required at higher tree levels:
> $$F(x_i|\mathbf{x}_{\mathcal{D}(e)}) = h(\ldots)$$
> applied iteratively through the tree sequence. Each bivariate copula family has its own h-function.
>
> | Copula family | $h(u|v;\boldsymbol{\theta})$ |
> |---|---|
> | Gaussian $(\rho)$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t(\rho,\nu)$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{\frac{(\nu + (t_\nu^{-1}(v))^2)(1-\rho^2)}{\nu+1}}}\right)$ |
> | Clayton $(\theta)$ | $u^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1-1/\theta}$ |
> | Gumbel $(\theta)$ | $C(u,v;\theta)\cdot\frac{(-\log v)^{\theta-1}}{v(-\log u)^{\theta} + (-\log v)^\theta)^{1-1/\theta}(-\log u)^\theta}$ |
>
> The inverse $h^{-1}(u|v;\boldsymbol{\theta})$ is used for simulation (drawing from the vine).
> ^def-h-function

> [!definition] Trivariate PCC — explicit construction
> For $(X_1, X_2, X_3)$ with marginals $f_1, f_2, f_3$, starting from the factorization:
> $$f(x_1,x_2,x_3) = f_1(x_1) \cdot f(x_2|x_1) \cdot f(x_3|x_1,x_2)$$
>
> **Step 1.** Apply Sklar to $f(x_2|x_1)$:
> $$f(x_2|x_1) = c_{12}(F_1(x_1), F_2(x_2))\cdot f_2(x_2)$$
>
> **Step 2.** Apply Sklar to $f(x_3|x_2,x_1)$:
> $$f(x_3|x_1,x_2) = c_{13|2}(F(x_1|x_2), F(x_3|x_2))\cdot f(x_3|x_2)$$
> where under the **simplifying assumption** $c_{13|2}$ does not depend on the value $x_2$, and where $F(x_i|x_2) = h(F_i(x_i)|F_2(x_2);\boldsymbol{\theta}_{i2})$.
>
> **Result:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\cdot f_2(x_2)\cdot f_3(x_3)\cdot c_{12}(F_1(x_1),F_2(x_2))\cdot c_{23}(F_2(x_2),F_3(x_3))\cdot c_{13|2}(h(F_1(x_1)|F_2(x_2)),\,h(F_3(x_3)|F_2(x_2)))$$
>
> This is the **D-vine** with ordering $1-2-3$. The C-vine (root at 2) uses a different conditioning order and gives the same family of possible decompositions.
> ^def-trivariate

> [!definition] General d-dimensional PCC and simplifying assumption
> For a general $d$-dimensional vine $\mathcal{V}$ with tree sequence $T_1,\ldots,T_{d-1}$, the joint density factors as:
> $$f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k)\cdot \prod_{\ell=1}^{d-1}\prod_{e\in E_\ell} c_{j_e,k_e|\mathcal{D}_e}\!\left(F(x_{j_e}|\mathbf{x}_{\mathcal{D}_e}),\, F(x_{k_e}|\mathbf{x}_{\mathcal{D}_e});\boldsymbol{\theta}_e\right)$$
> where $E_\ell$ is the edge set of tree $T_\ell$, edge $e\in E_\ell$ connects variables $j_e,k_e$ given conditioning set $\mathcal{D}_e$, and the arguments $F(x_{j_e}|\mathbf{x}_{\mathcal{D}_e})$ are computed iteratively via the h-function from lower trees.
>
> The **simplifying assumption** states $c_{j,k|\mathcal{D}}(u,v;\mathbf{x}_\mathcal{D}) \approx c_{j,k|\mathcal{D}}(u,v)$ — the pair copula does not depend on the realised values $\mathbf{x}_\mathcal{D}$. Without this, each pair copula would be a function of the conditioning variables, making the model a partial copula. The simplifying assumption is empirically validated for many financial return datasets (Aas et al. 2009; Hobæk Haff et al. 2010) and is the basis of standard software implementations.
> ^def-general-pcc

> [!definition] Counting parameters
> A $d$-dimensional vine copula has exactly $d(d-1)/2$ pair copulas. Each bivariate copula family has $p$ parameters (1 for Clayton/Gumbel, 2 for Student-$t$, etc.), so the total parameter count is:
> $$\text{Number of pair-copula parameters} = \sum_{e \in \mathcal{V}} p_e$$
> For comparison: a Student-$t$ copula has $d(d-1)/2 + 1$ parameters; a vine copula has at least $d(d-1)/2$ parameters (one per edge), which coincides for single-parameter families. The flexibility comes from allowing each pair copula to be a different family, not from extra parameters.
> ^def-counting

## Examples

> [!example] Four-dimensional D-vine density
> **Setup:** Variables $(X_1, X_2, X_3, X_4)$ in a D-vine with ordering $1-2-3-4$.
>
> **Tree 1** edges $(1,2)$, $(2,3)$, $(3,4)$: 3 unconditional pair copulas.
>
> **Tree 2** edges $(1,3|2)$, $(2,4|3)$: 2 pair copulas conditioned on one variable.
> Arguments: $h_{13|2} = (h(F_1|F_2;\theta_{12}),\, h(F_3|F_2;\theta_{23}))$.
>
> **Tree 3** edge $(1,4|2,3)$: 1 pair copula conditioned on two variables.
> Arguments: $h_{14|23} = (h(\tilde{u}_{1|2}|\tilde{u}_{3|2};\theta_{13|2}),\, h(\tilde{u}_{4|3}|\tilde{u}_{2|3};\theta_{24|3}))$.
>
> **Total:** 6 bivariate copulas = $4\cdot3/2$. Each can be a different family.

> [!example] H-function for Gaussian copula
> **Setup:** Bivariate Gaussian copula $C(u_1,u_2;\rho)$ with correlation $\rho$.
>
> **h-function:**
> $$h(u_1|u_2;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u_1) - \rho\,\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$$
>
> **Interpretation:** Given the rank-transformed $u_2 = F_2(x_2)$, invert to $z_2 = \Phi^{-1}(u_2)$, partial out the linear Gaussian dependence $\rho z_2$, and normalise. The result is the conditional CDF of $U_1$ given $U_2=u_2$ under the bivariate Gaussian copula. For $|\rho|<1$ this maps $(0,1)\times(0,1) \to (0,1)$.

## Connections

- [[Vine Copulas - Overview]] — motivation and landscape overview.
- [[C-Vine and D-Vine Structures]] — specifies which pairs appear in which tree: determines $j_e, k_e, \mathcal{D}_e$.
- [[Regular Vines and the R-Vine Matrix]] — the general graphical framework; h-function evaluation traverses the vine matrix.
- [[Vine Copula Estimation and Model Selection]] — uses PCC density to form the likelihood; h-functions evaluated at each tree level.
- [[Tail Dependence in Factor Copulas]] — for factor copulas tail dependence is derived analytically; for vine copulas it is determined by the bivariate families at tree 1.

## See Also

- [[Copula Estimation]] — Bayesian estimation of a bivariate Gaussian copula; vine copulas stack such bivariate estimations.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ used as edge-weight criteria for tree selection.
- [[../_Index|Econometrics]]
