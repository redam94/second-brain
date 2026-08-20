---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-Frigessi-Bakken-2009-Vine-Copulas.md]]"
source_location: "Secs. 2–3, pp. 183–188"
date_ingested: 2026-08-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC factorisation
  - h-function
  - vine density decomposition
  - pair copula factorisation theorem
---

# Pair-Copula Construction

> [!summary]
> The pair-copula construction (PCC) expresses any $n$-dimensional density as a product of $n$ marginal densities and $\binom{n}{2}$ bivariate copula densities (pair copulas), each evaluated at appropriate conditional CDFs. The **h-function** — the partial derivative of a bivariate copula with respect to one margin — is the key computational primitive: it maps the conditional CDF recursion through the vine trees. Under the **simplifying assumption** (conditional copulas do not depend on conditioning values), estimation reduces to $\binom{n}{2}$ sequential bivariate MLE problems.

## Overview

Sklar's theorem says a bivariate joint distribution $F_{XY}$ factors into marginals and a copula $C$:
$$F_{XY}(x,y) = C(F_X(x), F_Y(y))$$

The pair-copula construction generalises this to $n$ dimensions by applying Sklar
repeatedly, conditioning on progressively more variables. The factorisation is not unique;
the **vine structure** — a nested sequence of trees — encodes the chosen conditioning order.
Regardless of which vine structure is used, the result is always a valid density: the
$\binom{n}{2}$ pair copulas can be chosen independently from any bivariate copula family.

## Main Content

### The factorisation identity (Joe 1996; Aas et al. 2009)

> [!theorem] Vine density factorisation
> Let $\mathbf{X} = (X_1, \dots, X_n)$ with joint density $f$ and marginals $f_1, \dots, f_n$.
> For any regular vine $\mathcal{V}$ on $n$ nodes with trees $T_1, \dots, T_{n-1}$, edges
> $E_j$ in tree $T_j$, and conditioned/conditioning sets $(a(e), b(e), D(e))$ for each edge $e$:
>
> $$f(x_1, \dots, x_n) = \prod_{k=1}^{n} f_k(x_k) \times \prod_{j=1}^{n-1} \prod_{e \in E_j} c_{a(e),b(e)|D(e)}\!\bigl(F(x_{a(e)} \mid \mathbf{x}_{D(e)}),\; F(x_{b(e)} \mid \mathbf{x}_{D(e)})\bigr)$$
>
> where each pair copula density $c_{a(e),b(e)|D(e)}$ is evaluated at the conditional CDFs
> of $X_{a(e)}$ and $X_{b(e)}$ given the conditioning set $D(e)$.
^thm-vine-density

The conditional CDFs $F(x_{a(e)} \mid \mathbf{x}_{D(e)})$ are themselves outputs of earlier
pair copulas in the vine, computed via the h-function recursion below.

### $n = 3$ case in full detail (D-vine)

Choosing the D-vine ordering $1 \to 2 \to 3$:

**Tree $T_1$:** Two unconditional pair copulas: $c_{12}$ and $c_{23}$.

$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3)$$
$$\times c_{12}(F_1(x_1), F_2(x_2))$$
$$\times c_{23}(F_2(x_2), F_3(x_3))$$
$$\times c_{13|2}(F_{1|2}(x_1 \mid x_2),\; F_{3|2}(x_3 \mid x_2))$$

The conditional CDFs $F_{1|2}$ and $F_{3|2}$ are computed from the $T_1$ copulas via the h-function.

### $n = 4$ D-vine factorisation

Ordering $1 \to 2 \to 3 \to 4$:

**Tree $T_1$:** $c_{12}$, $c_{23}$, $c_{34}$

**Tree $T_2$:** $c_{13|2}$, $c_{24|3}$, using:
$$F_{1|2} = h(F_1 \mid F_2; \theta_{12}), \quad F_{3|2} = h(F_3 \mid F_2; \theta_{23})$$
$$F_{2|3} = h(F_2 \mid F_3; \theta_{23}), \quad F_{4|3} = h(F_4 \mid F_3; \theta_{34})$$

**Tree $T_3$:** $c_{14|23}$, using:
$$F_{1|23} = h(F_{1|2} \mid F_{3|2}; \theta_{13|2}), \quad F_{4|23} = h(F_{4|3} \mid F_{2|3}; \theta_{24|3})$$

Full density:
$$f(x_1, x_2, x_3, x_4) = \prod_{k=1}^{4} f_k(x_k) \cdot c_{12} \cdot c_{23} \cdot c_{34} \cdot c_{13|2} \cdot c_{24|3} \cdot c_{14|23}$$

where each pair copula density is evaluated at the appropriate conditional uniform scores.

### The h-function

> [!definition] h-function (conditional distribution function)
> For a bivariate copula $C_{uv}(u, v; \boldsymbol{\theta})$ with copula density $c_{uv}$, the **h-function** is:
>
> $$h(u \mid v; \boldsymbol{\theta}) = \frac{\partial C_{uv}(u, v; \boldsymbol{\theta})}{\partial v} = \int_0^u c_{uv}(s, v; \boldsymbol{\theta})\, ds$$
>
> This equals $F(X_i = F_i^{-1}(u) \mid X_j = F_j^{-1}(v))$: the conditional CDF of $X_i$
> given $X_j$, expressed in the uniform copula scale.
^def-h-function

**Closed-form h-functions for common families:**

| Copula | $h(u \mid v; \boldsymbol{\theta})$ |
|--------|-----------------------------------|
| Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Student-$t$($\rho, \nu$) | $t_{\nu+1}\!\left(\sqrt{\dfrac{\nu+1}{1-\rho^2}} \cdot \dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{\nu + (t_\nu^{-1}(v))^2}}\right)$ |
| Clayton($\delta$) | $u^{-\delta-1}(u^{-\delta} + v^{-\delta} - 1)^{-1-1/\delta}$ |
| Gumbel($\delta$) | $\exp\!\bigl(-[(-\ln u)^\delta + (-\ln v)^\delta]^{1/\delta}\bigr) \cdot \dfrac{(-\ln v)^{\delta-1}}{v[(-\ln u)^\delta + (-\ln v)^\delta]^{1-1/\delta}}$ |

The inverse h-function $h^{-1}(p \mid v; \boldsymbol{\theta})$ inverts $u \mapsto h(u|v)$ for fixed $v$ and $p$; it is needed for simulation from vine copula models.

### The simplifying assumption

> [!definition] Simplifying assumption
> The **simplifying assumption** states that each conditional pair copula $c_{a,b|D}(u, v; \boldsymbol{\theta}_{a,b|D})$ does not depend on the values $\mathbf{d} \in D$: $\boldsymbol{\theta}_{a,b|D}(\mathbf{d}) \equiv \boldsymbol{\theta}_{a,b|D}$ (constant).
>
> Without this assumption, the $j$-th-tree pair copula would need to be refitted at every conditioning value $\mathbf{d}$, making the model intractable. Under the simplifying assumption, the h-function outputs from tree $T_{j-1}$ can be treated as pseudo-observations for the bivariate MLE at tree $T_j$.
>
> **When it holds exactly:** Multivariate Gaussian or $t$ joint distributions (all conditional copulas are also Gaussian or $t$). **When it is approximate:** Most other distributions — in practice, the quality of the approximation depends on whether higher-order conditional dependence is substantial. Hobæk Haff et al. (2010) show the assumption is reasonable in many financial applications.
^def-simplifying

## Examples

> [!example] h-function recursion for $n = 3$ D-vine
>
> **Given:** Daily returns on three ETFs. Fitted copulas: $C_{12}$ = Gaussian($\rho_{12}=0.68$), $C_{23}$ = Student-$t$($\rho_{23}=0.55$, $\nu_{23}=7$).
>
> **Target:** Conditional CDF inputs for the $T_2$ pair copula $c_{13|2}$.
>
> **Step 1:** Compute uniform scores: $u_1 = \hat{F}_1(x_1)$, $u_2 = \hat{F}_2(x_2)$, $u_3 = \hat{F}_3(x_3)$.
>
> **Step 2:** Apply h-functions from $T_1$:
> $$v_{1|2} = h_\text{Gaussian}(u_1 \mid u_2;\, \rho_{12}=0.68) = \Phi\!\left(\frac{\Phi^{-1}(u_1) - 0.68\,\Phi^{-1}(u_2)}{\sqrt{1-0.68^2}}\right)$$
> $$v_{3|2} = h_\text{Student-t}(u_3 \mid u_2;\, \rho_{23}=0.55,\, \nu_{23}=7)$$
>
> **Step 3:** Fit pair copula at $T_2$: maximise $\ell(\theta_{13|2}) = \sum_t \log c_{13|2}(v_{1|2,t},\, v_{3|2,t};\, \theta_{13|2})$ over the $T$ pseudo-observation pairs.

## Connections

- [[C-vine and D-vine Structures]] — the graphical vine structure that determines which pairs appear at each tree.
- [[Vine Copula Estimation and Model Selection]] — the full sequential MLE algorithm, family selection, and software.
- [[Vine Copulas - Overview]] — motivation and position in the copula landscape.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, and quantile dependence; used in vine structure selection and as estimation targets.
- [[Copula Estimation]] — Bayesian Gaussian copula estimation; contrast with vine's frequentist sequential MLE.

## See Also

- [[Tail Dependence in Factor Copulas]] — EVT-derived tail dependence; vine copulas can match any pairwise tail dependence coefficient via Clayton/Gumbel/BB1 pair copulas.
- [[Factor Copula Construction]] — the latent factor construction; compare with vine's pair-copula factorisation.
- [[../_Index|Dependence Modeling]]
