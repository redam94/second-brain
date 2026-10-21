---
title: Pair Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Aas-et-al-2009-Pair-Copula-Constructions]]"
source_location: "Secs. 2–3, pp. 184–192"
date_ingested: 2026-10-21
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[R-vine Structures and Model Selection]]"
aliases:
  - PCC density
  - h-function vine
  - Joe-Bedford-Cooke construction
  - pair-copula construction
---

# Pair Copula Construction

> [!summary]
> The pair-copula construction (PCC) expresses any $d$-dimensional joint density as a product of $d$ marginals and $d(d-1)/2$ **pair copula** densities, each evaluated at the **conditional CDFs** of its two arguments given the conditioning set. The critical computational device is the **h-function**: the partial derivative of a bivariate copula w.r.t. one argument, which computes the conditional CDF needed at the next level of the vine. This note covers the general PCC density formula, h-function recursion, and estimation via sequential maximum likelihood.

## Overview

A vine copula factorises the joint density via repeated application of the identity
$$f(x_j, x_k | \mathbf{x}_\mathbf{D}) = c_{jk|\mathbf{D}}\!\left(F_{j|\mathbf{D}}(x_j|\mathbf{x}_\mathbf{D}),\, F_{k|\mathbf{D}}(x_k|\mathbf{x}_\mathbf{D})\right) \cdot f_{j|\mathbf{D}}(x_j|\mathbf{x}_\mathbf{D}) \cdot f_{k|\mathbf{D}}(x_k|\mathbf{x}_\mathbf{D})$$

At each level of the vine, the required conditional CDFs $F_{j|\mathbf{D}}$ are computed from the pair copulas already specified at lower levels, using the h-function recursion. The structure of which pairs appear unconditionally vs. conditionally is governed by the vine (see [[C-vine and D-vine Structures]] and [[R-vine Structures and Model Selection]]).

## Main Content

> [!definition] H-function (Aas et al. 2009, Sec. 2)
> For any bivariate copula $C(u_1, u_2;\boldsymbol{\theta})$, the **h-function** is:
> $$h(u_1|u_2;\boldsymbol{\theta}) \;:=\; F_{1|2}(u_1|u_2) \;=\; \frac{\partial C(u_1, u_2;\boldsymbol{\theta})}{\partial u_2}$$
> This is the conditional CDF of $U_1$ given $U_2 = u_2$, computed from the copula.
>
> **Inverse h-function** $h^{-1}(u_1|u_2;\boldsymbol{\theta})$: the quantile function of $U_1|U_2 = u_2$, used in simulation.
>
> **Examples:**
> - Gaussian copula $C_\rho$: $h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
> - Clayton copula $C_\delta$: $h(u|v;\delta) = v^{-\delta-1}\!\left(u^{-\delta}+v^{-\delta}-1\right)^{-1-1/\delta}$
> - Gumbel copula: h-function involves the log-derivative of the generator; see Joe (1997).
>
> The h-function transforms uniform marginals through the copula, producing the conditional CDF needed for the next vine tree level.
> ^h-function-def

> [!theorem] General vine density formula (Bedford & Cooke 2002; Aas et al. 2009)
> Let $\mathcal{V}$ be a regular vine on $d$ variables $X_1, \ldots, X_d$. For each edge $e = (a(e), b(e)|D(e))$ in tree $T_k$ (where $a(e)$ and $b(e)$ are the conditioned variables and $D(e)$ is the conditioning set), let $c_{a(e),b(e)|D(e)}$ be the associated pair copula with parameter $\boldsymbol{\theta}_e$.
>
> The joint density is:
> $$f(x_1, \ldots, x_d) = \left[\prod_{i=1}^{d} f_i(x_i)\right] \times \prod_{k=1}^{d-1} \prod_{e \in E_k} c_{a(e),b(e)|D(e)}\!\left(F_{a(e)|D(e)}(x_{a(e)}|\mathbf{x}_{D(e)}),\; F_{b(e)|D(e)}(x_{b(e)}|\mathbf{x}_{D(e)});\; \boldsymbol{\theta}_e\right)$$
>
> where $E_k$ is the edge set of tree $T_k$.
>
> **Note:** The conditional CDFs $F_{a(e)|D(e)}$ are computed recursively via h-functions from pair copulas in lower trees (trees $T_1, \ldots, T_{k-1}$). The formula requires no closed form for the multivariate copula — only bivariate copulas and their h-functions.
> ^vine-density

> [!theorem] H-function recursion for conditional CDFs (Aas et al. 2009, Eq. 12)
> Let $D = D(e) = \{d_1, \ldots, d_m\}$ be a conditioning set and $a$ a conditioned variable. Then:
> $$F_{a|D}(x_a|\mathbf{x}_D) = h\!\left(F_{a|D\setminus\{d_m\}}(x_a|\mathbf{x}_{D\setminus\{d_m\}})\;\Big|\; F_{d_m|D\setminus\{d_m\}}(x_{d_m}|\mathbf{x}_{D\setminus\{d_m\}});\; \boldsymbol{\theta}_{a,d_m|D\setminus\{d_m\}}\right)$$
>
> That is: peel off one element $d_m$ from the conditioning set, apply the h-function of the pair copula $c_{a,d_m|D\setminus\{d_m\}}$, where both arguments are themselves conditional CDFs (computed recursively).
>
> **Base case:** $F_{a|\emptyset}(x_a) = F_a(x_a)$ (the marginal CDF).
>
> **Implication:** The entire vine density can be evaluated using only bivariate copula CDFs and their partial derivatives, in a specific order determined by the vine structure.
> ^h-recursion

> [!definition] Simplified vine copula
> A vine copula is **simplified** if every pair copula $c_{jk|D}$ depends on $\mathbf{x}_D$ only through the conditional CDFs $F_{j|D}(x_j|\mathbf{x}_D)$ and $F_{k|D}(x_k|\mathbf{x}_D)$ — not on $\mathbf{x}_D$ directly. This is the standard assumption and dramatically reduces computational burden.
>
> Without simplification, pair copulas are conditional copulas that depend on the realised conditioning values, making the model intractable. The simplified assumption is generally justified for moderate dependencies but may be violated in highly non-linear settings.
> ^simplified-vine

## Examples

> [!example] H-function computation: Gaussian pair copula
> **Setup:** Variables $X_1, X_2, X_3$; D-vine with edges $1$–$2$, $2$–$3$, $1$–$3|2$. Gaussian pair copulas $c_{12}(\rho_{12})$, $c_{23}(\rho_{23})$, $c_{13|2}(\rho_{13|2})$.
>
> **Tree $T_1$ evaluation:**
> - $u_1 = F_1(x_1)$, $u_2 = F_2(x_2)$, $u_3 = F_3(x_3)$
> - Pair copula densities: $c_{12}(u_1, u_2)$ and $c_{23}(u_2, u_3)$
>
> **Conditional CDFs needed for $T_2$:**
> $$v_{1|2} = h(u_1|u_2;\rho_{12}) = \Phi\!\left(\frac{\Phi^{-1}(u_1) - \rho_{12}\,\Phi^{-1}(u_2)}{\sqrt{1-\rho_{12}^2}}\right)$$
> $$v_{3|2} = h(u_3|u_2;\rho_{23}) = \Phi\!\left(\frac{\Phi^{-1}(u_3) - \rho_{23}\,\Phi^{-1}(u_2)}{\sqrt{1-\rho_{23}^2}}\right)$$
>
> **Tree $T_2$ evaluation:**
> - Pair copula density: $c_{13|2}(v_{1|2},\, v_{3|2};\rho_{13|2})$
>
> **Log-likelihood contribution for one observation:**
> $$\log c_{12}(u_1,u_2) + \log c_{23}(u_2,u_3) + \log c_{13|2}(v_{1|2},v_{3|2})$$

> [!example] Sequential ML estimation
> **Idea:** Estimate the vine level by level (Aas et al. 2009, Sec. 3).
>
> **Step 1:** Estimate pair copulas in $T_1$ (the unconditional pairs). For each edge $jk \in T_1$:
> $$\hat{\boldsymbol{\theta}}_{jk} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log c_{jk}(u_{jt}, u_{kt};\boldsymbol{\theta})$$
>
> **Step 2:** Compute pseudo-observations for $T_2$: $v_{j|k,t} = h(u_{jt}|u_{kt};\hat{\boldsymbol{\theta}}_{jk})$.
>
> **Step 3:** Estimate pair copulas in $T_2$ using the pseudo-observations $\{v_{j|k,t}\}$ from Step 2.
>
> **Repeat** through all $d-1$ trees.
>
> **Properties:** Sequential estimation is consistent and asymptotically normal (with a sandwich correction for plug-in $u_{jt}$). It is computationally cheap relative to joint ML. Joint ML re-estimates all parameters simultaneously after the sequential pass as an optional final step.

## Connections

- [[Vine Copulas - Overview]] — the big picture of the vine construction and motivation.
- [[C-vine and D-vine Structures]] — the specific density formulas for the two canonical vine structures, and their interpretations.
- [[R-vine Structures and Model Selection]] — how to select the vine structure from data using maximum spanning trees.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence, and rank correlations used in pair-copula model selection and as targets for vine structure selection.
- [[Copula Estimation]] — bivariate copula estimation (the building block of each pair copula step).

## See Also

- [[Factor Copula Construction]] — the competing factorisation: latent variable rather than pair-copula conditioning.
- [[../_Index|Dependence Modeling]]
