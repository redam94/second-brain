---
title: "Pair Copula Constructions - PCC"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-Frigessi-Bakken-2009-Pair-Copula.txt]]"
source_location: "Secs. 2–3, pp. 183–190"
date_ingested: 2026-10-01
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Vine vs Factor Copula Architectures]]"
aliases:
  - pair copula construction
  - PCC density formula
  - conditional pair copula
  - simplifying assumption vine copula
---

# Pair Copula Constructions - PCC

> [!summary]
> The **pair copula construction (PCC)** formalises how a $d$-dimensional density decomposes into a product of univariate marginals and $d(d-1)/2$ bivariate (conditional) copula densities. Aas et al. (2009) provide the complete density product formulas for C-vine and D-vine, the **h-function recursion** for evaluating conditional CDFs, and a **sequential maximum likelihood estimator** that fits one tree at a time. Under the **simplifying assumption** (conditional copulas independent of conditioning value), estimation reduces to a sequence of $d-1$ bivariate copula fits.

## Overview

After Bedford & Cooke (2002) introduced the vine as a graphical model for PCCs, the practical challenge was: how does one actually *write down* the density and *estimate* the parameters? Aas et al. (2009) solve both problems. The density formula for a $d$-variable vine makes each pair copula density $c_{a,b|D}$ depend only on the conditional marginals $F_{a|D}$ and $F_{b|D}$ — quantities computed by a recursive **h-function**. Sequential ML exploits the tree-by-tree factorisation to reduce the joint optimisation to $d-1$ bivariate optimisations.

## Main Content

> [!definition] The general PCC density
> Let $\mathbf{x} = (x_1, \dots, x_d)$. For a regular vine $V$ on $d$ variables with pair copulas $\{c_{a,b|D}\}_{(a,b|D) \in E(V)}$, the joint density is:
> $$f(x_1, \dots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{e = (a,b|D) \in T_j} c_{a,b|D}\!\bigl(F_{a|D}(x_a \mid \mathbf{x}_D),\; F_{b|D}(x_b \mid \mathbf{x}_D);\; \boldsymbol{\theta}_{a,b|D}\bigr)$$
> where $T_j$ is the $j$-th tree of the vine, edge $e = (a,b|D)$ connects variables $a$ and $b$ with conditioning set $D$, and $\mathbf{x}_D = (x_k : k \in D)$. The pair copula densities $c_{a,b|D}$ can each be from **any bivariate copula family** (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, …) with their own parameters $\boldsymbol{\theta}_{a,b|D}$.
^def-pcc-density

> [!definition] C-vine density (Canonical vine)
> For a **C-vine** with root nodes $(1, 2, \dots, d-1)$ (variable $j$ is the root of tree $j$), the density factorises as:
> $$f(x_1, \dots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|1,\dots,j-1}\!\bigl(F_{j|1,\dots,j-1}(x_j \mid x_1, \dots, x_{j-1}),\; F_{i|1,\dots,j-1}(x_i \mid x_1, \dots, x_{j-1});\; \boldsymbol{\theta}_{j,i|1,\dots,j-1}\bigr)$$
> **Interpretation:** In tree $T_1$, variable 1 couples directly with all others: $(1,2), (1,3), \dots, (1,d)$. In tree $T_2$, variable 2 (given 1) couples with all remaining: $(2,3|1), (2,4|1), \dots, (2,d|1)$. The root variable at each level is the "hub" — placing the most important variable as root 1 captures most dependence in the first tree.
^def-cvine-density

> [!definition] D-vine density (Drawable vine)
> For a **D-vine** with variables ordered $(1, 2, \dots, d)$ in a path, the density is:
> $$f(x_1, \dots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|\{i+1,\dots,i+j-1\}}\!\bigl(F_{i|\{i+1,\dots,i+j-1\}}(\cdot),\; F_{i+j|\{i+1,\dots,i+j-1\}}(\cdot);\; \boldsymbol{\theta}\bigr)$$
> **Interpretation:** In tree $T_1$, adjacent variables couple: $(1,2), (2,3), \dots, (d-1,d)$. In tree $T_2$, "skip-one" pairs (given their common neighbour): $(1,3|2), (2,4|3), \dots$. The D-vine has a natural **sequential** character: it is the default choice when variables have a meaningful ordering (e.g. time, spatial distance, factor loadings).
^def-dvine-density

> [!definition] The h-function (conditional CDF recursion)
> To evaluate the conditional CDFs $F_{a|D}$ appearing in the density, Aas et al. define the **h-function** of a bivariate copula $C(u,v;\theta)$:
> $$h(u \mid v;\, \theta) \equiv \frac{\partial C(u, v;\, \theta)}{\partial v} = F_{U|V=v}(u)$$
> This is the conditional CDF of $U$ given $V = v$ implied by the copula $C$. The recursion:
> $$F_{x_j | x_D}(x_j \mid \mathbf{x}_D) = h\!\left(F_{x_j | x_{D \setminus d^*}}(x_j \mid \mathbf{x}_{D \setminus d^*}),\; F_{x_{d^*} | x_{D \setminus d^*}}(x_{d^*} \mid \mathbf{x}_{D \setminus d^*});\; \theta_{j,d^*|D \setminus d^*}\right)$$
> where $d^*$ is the element added to the conditioning set at the previous step. Starting from $F_{x_k}(x_k)$ (marginal CDF), one recursively applies h-functions up the vine trees to obtain any $F_{a|D}(x_a \mid \mathbf{x}_D)$.
>
> **Practical note:** For commonly-used copula families, $h$ has a closed form:
>
> | Copula | $h(u \mid v;\, \theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student $t(\nu, \rho)$ | $t_{\nu+1}\!\left(\sqrt{\dfrac{\nu+1}{\nu + [\Phi^{-1}_\nu(v)]^2}}\cdot\dfrac{\Phi^{-1}_\nu(u) - \rho\,\Phi^{-1}_\nu(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton($\theta$) | $(1 + \theta)\, u^{-\theta-1}\, C(u,v;\theta)^{1+1/\theta}\, v^{-\theta-1}$ — simplified form via differentiation of $C_{Cl}$ |
> | Gumbel($\theta$) | $\dfrac{C(u,v;\theta)}{v}\cdot \dfrac{(-\log v)^{\theta-1}}{(-\log C(u,v;\theta))^{1-1/\theta}}$ |
^def-h-function

> [!definition] The simplifying assumption
> A vine copula is **simplified** if each pair copula $C_{a,b|D}$ does not depend on the conditioning values $\mathbf{x}_D$ — only on the uniform marginals $F_{a|D}$ and $F_{b|D}$. Under this assumption, $\boldsymbol{\theta}_{a,b|D}$ is a fixed parameter rather than a function of $\mathbf{x}_D$.
>
> **Justification (Haff et al. 2010):** The simplifying assumption is an approximation; the true conditional copula can depend on the conditioning value. However, simulation studies show that parameter estimates are approximately unbiased and inference is valid under mild violations. The approximation is widely adopted because (i) the resulting model is identifiable, (ii) closed-form h-functions exist for standard bivariate families, and (iii) the estimation complexity is manageable.
>
> **Violation:** When the simplifying assumption fails severely (e.g., strong nonlinear interactions), one approach is to use **non-simplified vines** where $\boldsymbol{\theta}_{a,b|D}$ is modelled as a function of $\mathbf{x}_D$ via a penalised spline or kernel estimator — at significantly higher computational cost.
^def-simplifying

> [!theorem] Sequential maximum likelihood estimation (Aas et al. 2009, Sec. 3)
> Under the simplifying assumption, the PCC likelihood factorises tree by tree. Define $\boldsymbol{\theta}^{(j)}$ as the parameters in tree $T_j$. The **sequential ML estimator** proceeds as:
>
> **Step 1:** Compute pseudo-observations $\hat{u}_i = \hat{F}_i(x_i)$ from the (parametric or empirical) marginal CDFs.
>
> **Step 2:** For tree $T_1$ (unconditional pairs): maximise the bivariate log-likelihood over each edge $(a,b)$ separately:
> $$\hat{\boldsymbol{\theta}}_{a,b} = \arg\max_{\theta} \sum_{t=1}^T \log c_{a,b}\!\bigl(\hat{u}_{a,t},\, \hat{u}_{b,t};\, \theta\bigr)$$
>
> **Step 3:** Compute the h-function outputs for all tree-1 edges:
> $$\hat{v}_{a|b,t} = h(\hat{u}_{a,t} \mid \hat{u}_{b,t};\, \hat{\boldsymbol{\theta}}_{a,b}), \qquad \hat{v}_{b|a,t} = h(\hat{u}_{b,t} \mid \hat{u}_{a,t};\, \hat{\boldsymbol{\theta}}_{a,b})$$
>
> **Step $j$ ($j \ge 2$):** Use the h-function outputs from step $j-1$ as the inputs for tree $T_j$; maximise each edge's log-likelihood, then compute new h-function outputs for tree $T_{j+1}$.
>
> **Properties:** The sequential estimator is **consistent** but not fully efficient (it does not use the cross-tree parameter dependencies in the score). **Full MLE** optimises the joint log-likelihood over all trees simultaneously — consistent and efficient, but $O(d^2)$ parameters make this expensive for large $d$.
^thm-sequential-mle

## Examples

> [!example] Sequential ML for a bivariate Gaussian pair copula
> **Setup:** Tree $T_1$ edge $(1,2)$ with Gaussian copula $C(u_1, u_2; \rho)$.
>
> **Pseudo-observations:** $\hat{u}_{1,t} = \hat{F}_1(x_{1,t})$, $\hat{u}_{2,t} = \hat{F}_2(x_{2,t})$ (either nonparametric ranks or parametric CDF).
>
> **Step 2:** $\hat{\rho}_{12} = \arg\max_\rho \sum_t \log \phi_\rho(\Phi^{-1}(\hat{u}_{1,t}), \Phi^{-1}(\hat{u}_{2,t}))$, where $\phi_\rho$ is the bivariate standard normal with correlation $\rho$. This is just maximum likelihood for a bivariate normal.
>
> **h-function output:** $\hat{v}_{1|2,t} = \Phi\!\left(\frac{\Phi^{-1}(\hat{u}_{1,t}) - \hat\rho\,\Phi^{-1}(\hat{u}_{2,t})}{\sqrt{1-\hat\rho^2}}\right)$ — used as input $u_{1\cdot}$ for any tree $T_2$ edge involving variable 1 conditioned on 2.

## Connections

- [[Vine Copulas - Overview]] — motivation and the vine graphical structure that organises pair copulas into trees.
- [[C-vine and D-vine Structures]] — specifies exactly which pairs appear in which trees for each vine type, and how to select an appropriate vine structure.
- [[Vine vs Factor Copula Architectures]] — the sequential ML approach here contrasts with the SMM approach for factor copulas (no closed-form density).
- [[Factor Copula Construction]] — the competing high-dimensional construction; factor copulas have no h-function recursion but require only a handful of distribution parameters.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$, computed from the estimated $\rho$ or $\theta$, used to initialize pair-copula parameter estimation.
- [[SMM Estimation of Factor Copulas]] — factor copula estimation via simulated method of moments (rank-based moments); contrast with sequential ML here.
- [[Econometrics/_Index|Econometrics]]
