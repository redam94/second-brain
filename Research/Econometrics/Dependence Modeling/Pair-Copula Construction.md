---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Czado-2019-Vine-Copulas-Survey.md]]"
source_location: "Aas et al. (2009) Secs. 2-3, pp. 3-8; Czado (2019) Chs. 3-4"
date_ingested: 2026-08-05
date_updated: 2026-08-05
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Structure Selection and Sequential MLE]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - PCC density factorization
  - h-function vine
  - vine density
  - pair copula density
  - conditional copula factorization
---

# Pair-Copula Construction

> [!summary]
> A pair-copula construction (PCC) expresses the full joint density as a product of $d$ marginals and $d(d-1)/2$ bivariate conditional copula densities. Each conditional copula is evaluated at two conditional CDFs computed by a recursive **h-function** formula. Under the **simplifying assumption**, these evaluations are tractable and the vine likelihood becomes a closed-form product. This note gives the explicit density formulas for C-vine and D-vine architectures and the h-function recursion.

## Overview

By Sklar's theorem, any joint distribution with continuous marginals can be written as:
$$F(x_1, \ldots, x_d) = C(F_1(x_1), \ldots, F_d(x_d))$$
Differentiating, the joint density is $f = c(F_1,\ldots,F_d) \cdot \prod_k f_k$. For $d > 3$, there is no canonical parametric form for $c$. The **PCC idea** is to factorize the joint density using the chain rule and Sklar's theorem applied to each conditional:
$$f(x_1|\mathbf{x}_{-1}) = c_{1,2|\mathbf{x}_{-\{1,2\}}}(F(x_1|\mathbf{x}_{-\{1,2\}}),\, F(x_2|\mathbf{x}_{-\{1,2\}})) \cdot f(x_1|\mathbf{x}_{-\{1,2\}})$$
Applying this recursively down to univariate marginals yields a product of bivariate copula densities — one per pair.

## Main Content

> [!theorem] General PCC Density (R-vine)
> Let $V = (T_1, \ldots, T_{d-1})$ be a regular vine on $d$ variables. Associate a bivariate copula family $C_{j(e),k(e);D(e)}$ with parameters $\theta_{j(e),k(e);D(e)}$ to each edge $e$ in each tree. Under the **simplifying assumption** (conditional copulas do not depend on values of conditioning variables), the joint density is:
> $$f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{t=1}^{d-1} \prod_{e \in E_t} c_{j(e),k(e);D(e)}\!\bigl(F(x_{j(e)}|\mathbf{x}_{D(e)}),\; F(x_{k(e)}|\mathbf{x}_{D(e)});\; \theta_e\bigr)$$
> where $j(e),k(e)$ are the two "conditioned" variables and $D(e)$ is the conditioning set of edge $e$. The conditional CDFs $F(x_i|\mathbf{x}_D)$ are computed recursively using h-functions (see below).
>
> **Total parameters:** one bivariate copula (family + parameters) per pair, so $d(d-1)/2$ bivariate specifications in total.
^thm-rvine-density

> [!definition] C-Vine Density (Explicit Formula)
> For a C-vine with root ordering $1 \succ 2 \succ \cdots \succ d-1$ (variable $j$ is the root of tree $T_j$):
> $$f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^d c_{j,i|\{1,\ldots,j-1\}}\!\bigl(F(x_j|\mathbf{x}_{1:j-1}),\; F(x_i|\mathbf{x}_{1:j-1});\; \theta_{j,i|1:j-1}\bigr)$$
> **Tree $T_1$:** pair copulas $c_{1,i}(F_1(x_1), F_i(x_i))$ for $i = 2, \ldots, d$ — all involve the root (variable 1) unconditionally.
> **Tree $T_j$:** pair copulas $c_{j,i|\{1,\ldots,j-1\}}$ for $i = j+1, \ldots, d$ — all condition on the first $j-1$ root variables.
>
> **4-variable C-vine (roots 1, 2, 3):**
> $$f_1 f_2 f_3 f_4 \cdot c_{12} c_{13} c_{14} \cdot c_{23|1} c_{24|1} \cdot c_{34|12}$$
^def-cvine-density

> [!definition] D-Vine Density (Explicit Formula)
> For a D-vine with path ordering $1–2–\cdots–d$:
> $$f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|\{i+1,\ldots,i+j-1\}}\!\bigl(F(x_i|\mathbf{x}_{i+1:i+j-1}),\; F(x_{i+j}|\mathbf{x}_{i+1:i+j-1});\; \theta_{i,i+j|\cdot}\bigr)$$
> **Tree $T_1$:** adjacent pairs — $c_{12}, c_{23}, \ldots, c_{d-1,d}$ — unconditional.
> **Tree $T_j$:** skip-$j$ pairs — $c_{i,i+j|\{i+1,\ldots,i+j-1\}}$ — conditional on the $j-1$ "middle" variables in the path.
>
> **4-variable D-vine (path 1–2–3–4):**
> $$f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{13|2} c_{24|3} \cdot c_{14|23}$$
^def-dvine-density

> [!definition] H-Function (Conditional CDF on the Copula Scale)
> For a bivariate copula $C(u, v; \theta)$ with density $c(u, v; \theta) = \partial^2 C / \partial u \partial v$, the **h-function** is:
> $$h(u \mid v; \theta) \equiv F_{U|V}(u \mid v) = \frac{\partial\, C(u, v;\, \theta)}{\partial v}$$
> where $u = F_U(x)$ and $v = F_V(y)$ are uniform margins. The h-function maps $(u, v) \in [0,1]^2 \to [0,1]$ and gives the conditional CDF of $U$ given $V = v$, on the copula (probability integral transform) scale.
>
> **Reciprocal:** $h^{-1}(u \mid v; \theta)$ reverses the conditioning: the conditional CDF of $V$ given $U = u$, i.e. $\partial C(u,v;\theta)/\partial u$.
>
> **Closed forms for standard families:**
>
> | Family | $h(u \mid v; \theta)$ |
> |--------|----------------------|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | $t(\rho,\nu)$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{\tfrac{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)}{\nu+1}}}\right)$ |
> | Clayton($\theta$) | $\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1/\theta - 1} v^{-\theta-1} u^{-\theta-1}$ |
> | Independence | $u$ (the CDF is separable) |
>
> Gumbel and Frank h-functions do not have elementary closed forms and are evaluated numerically.
^def-hfunction

> [!definition] Recursive Conditional CDF Evaluation
> To compute $F(x_i | \mathbf{x}_D)$ for any conditioning set $D$ in a vine, apply the h-function recursion:
>
> **D-vine recursion** (computing $F(x_1 | x_2, \ldots, x_j)$):
> $$F(x_1 | x_2) = h(F_1(x_1) \mid F_2(x_2);\, \theta_{12})$$
> $$F(x_1 | x_2, x_3) = h\bigl(F(x_1|x_2) \mid F(x_3|x_2);\, \theta_{13|2}\bigr)$$
> $$F(x_1 | x_2, \ldots, x_j) = h\bigl(F(x_1|\mathbf{x}_{2:j-1}) \mid F(x_j|\mathbf{x}_{2:j-1});\, \theta_{1,j|2:j-1}\bigr)$$
> Each level of conditioning adds one more application of an h-function. The required $F(x_j|\mathbf{x}_{2:j-1})$ is computed symmetrically from the $h^{-1}$ direction.
>
> **C-vine recursion** (computing $F(x_i | \mathbf{x}_{1:j-1})$ with root order $1 \succ 2 \succ \cdots$):
> $$F(x_i | x_1) = h(F_i(x_i) \mid F_1(x_1);\, \theta_{i,1})$$
> $$F(x_i | x_1, x_2) = h\bigl(F(x_i|x_1) \mid F(x_2|x_1);\, \theta_{i,2|1}\bigr)$$
> In the C-vine, each step adds the next root variable; the recursion is more regular than the D-vine.
^def-hrecursion

## Examples

> [!example] D-Vine Likelihood Evaluation ($d = 3$)
> **Setup:** Variables $x_1, x_2, x_3$; D-vine path $1–2–3$. Three pair copulas: $c_{12}(\theta_1)$, $c_{23}(\theta_2)$, $c_{13|2}(\theta_3)$.
>
> **Log-likelihood for one observation $(x_1, x_2, x_3)$:**
> 1. Compute $u_k = \hat{F}_k(x_k)$ using fitted marginals.
> 2. $\ell_1 = \log c_{12}(u_1, u_2;\, \theta_1)$
> 3. $\ell_2 = \log c_{23}(u_2, u_3;\, \theta_2)$
> 4. $v_1 = h(u_1 | u_2;\, \theta_1)$ and $v_2 = h(u_3 | u_2;\, \theta_2)$
> 5. $\ell_3 = \log c_{13|2}(v_1, v_2;\, \theta_3)$
> 6. $\ell = \ell_1 + \ell_2 + \ell_3$
>
> **Interpretation:** Tree 1 captures unconditional pairwise dependence. Tree 2 captures the residual dependence between $x_1$ and $x_3$ **after conditioning out** the influence of $x_2$, using the conditional uniforms $v_1 = F(x_1|x_2)$ and $v_2 = F(x_3|x_2)$.

> [!example] When Does the Simplifying Assumption Matter?
> **Setup:** Suppose the true conditional copula $c_{13|2}(u,v; x_2)$ has a correlation that increases with $x_2$ (e.g. high oil prices increase the co-movement between gas and equities). The simplifying assumption averages over all values of $x_2$ and fits a single $\theta_{13|2}$.
>
> **Consequence:** In the misspecified direction, the estimated $\theta_{13|2}$ captures the average conditional dependence. In practice (Hobæk Haff, Aas & Frigessi 2010; Stöber et al. 2013), the simplifying assumption leads to only modest bias in most applications, and formal tests rarely reject it strongly for continuous data. Violations are more problematic when the conditioning variable has a strong nonlinear effect on the pair's dependence.

## Connections

- [[Vine Copulas - Overview]] — motivation, R-vine tree structure, C-vine vs D-vine distinction.
- [[Vine Structure Selection and Sequential MLE]] — how to estimate the $\theta$ parameters and select pair-copula families.
- [[Copula Architecture Comparison]] — comparison with factor copulas, Gaussian, and Archimedean alternatives.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence: the rank statistics used as sequential vine-tree selection criteria.
- [[Factor Copula Construction]] — the competing construction; factor copulas impose a common latent factor structure rather than a product-of-pair-copulas structure.

## See Also

- [[Copula Estimation]] — Bayesian Gaussian-copula estimation; the Gaussian copula is the all-Gaussian PCC (all pair copulas bivariate Gaussian).
- [[../_Index|Econometrics]]
