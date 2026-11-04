---
title: "Vine Copula Estimation and Model Selection"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Sources.md]]"
source_location: "Aas et al. (2009), Sec. 4; Brechmann & Schepsmeier (2013), Secs. 3–4; Czado & Nagler (2022)"
date_ingested: 2026-11-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Copula Architecture Comparison]]"
  - "[[Factor Copula Application - S&P 100 and Systemic Risk]]"
aliases:
  - vine copula estimation
  - sequential ML vine
  - Dissmann algorithm
  - vine model selection
  - CDVine estimation
---

# Vine Copula Estimation and Model Selection

> [!summary]
> Vine copula estimation proceeds in up to three stages: (1) **pair-copula family selection** at each edge using AIC/BIC or the Vuong test; (2) **sequential ML estimation**, fitting tree by tree with h-function transformations; and (3) optional **joint ML refinement** of all parameters simultaneously. For general R-vines, **structure selection** (which tree topology to use) is the hardest step, solved approximately by the **Dißmann algorithm** that greedily selects edges to maximise pairwise Kendall's $\tau$. Software: `VineCopula` / `rvinecopulib` (R), `pyvinecopulib` (Python).

## Overview

Unlike the factor copula — where all pairwise dependence is an identical marginal of a latent common factor — the vine copula must simultaneously select: (a) the vine *structure* (which $d(d-1)/2$ pairs appear, in which trees), (b) the bivariate copula *family* for each edge (Gaussian, Clayton, Gumbel, Frank, Joe, $t$, and rotations), and (c) the *parameters* of each selected family. The joint space is astronomically large for $d > 5$; tractable algorithms exploit the vine's tree structure.

The **semiparametric** approach treats marginals non-parametrically (empirical CDFs) and estimates only copula parameters — the same two-stage strategy used for factor copulas in [[SMM Estimation of Factor Copulas]].

## Main Content

> [!definition] Semiparametric pseudo-observations
> Let $\{(x_{1t},\ldots,x_{dt})\}_{t=1}^T$ be the data. Form pseudo-uniform observations via the scaled empirical CDF:
> $$\hat{u}_{kt} = \frac{\text{rank}(x_{kt})}{T+1}, \quad k=1,\ldots,d,\; t=1,\ldots,T$$
> These $\hat{u}_{kt}$ replace $F_k(x_{kt})$ in the vine likelihood. Using empirical rather than parametric marginals makes the estimator semiparametric and more robust to marginal misspecification.
^def-pseudo-obs

> [!theorem] Sequential ML estimation (Aas et al. 2009)
> **Algorithm:**
>
> 1. **Tree 1:** For each edge $(j,k) \in \mathcal{E}(1)$:
>    - Select bivariate copula family $C_{jk}$ via AIC/BIC or Vuong test.
>    - Estimate $\hat\theta_{jk}$ by maximising $\sum_t \log c_{jk}(\hat u_{jt}, \hat u_{kt};\theta)$.
>    - Compute h-function pseudo-observations: $\hat{v}_{j|k,t} = h(\hat u_{jt}|\hat u_{kt};\hat\theta_{jk})$ and $\hat{v}_{k|j,t} = h(\hat u_{kt}|\hat u_{jt};\hat\theta_{jk})$ for use in tree 2.
>
> 2. **Tree $\ell$ (for $\ell = 2,\ldots,d-1$):** For each edge $(a,b|\mathbf{v}) \in \mathcal{E}(\ell)$:
>    - Retrieve the h-function outputs from tree $\ell-1$: $\hat v_{a|\mathbf{v},t}$ and $\hat v_{b|\mathbf{v},t}$.
>    - Select family and estimate $\hat\theta_{ab|\mathbf{v}}$ by maximising $\sum_t \log c_{ab|\mathbf{v}}(\hat v_{a|\mathbf{v},t}, \hat v_{b|\mathbf{v},t};\theta)$.
>    - Compute h-function outputs for use in tree $\ell+1$.
>
> **Properties:** The sequential estimator is consistent and asymptotically normal under regularity conditions (Aas et al. 2009). It is *not* as efficient as joint MLE because earlier-tree errors propagate. For $d(d-1)/2 = 45$ edges (d=10), it reduces a 45-dimensional optimization to 45 two-dimensional ones.
^thm-sequential-mle

> [!theorem] Joint MLE
> Maximise the full vine log-likelihood simultaneously over all parameters:
> $$\hat{\boldsymbol{\theta}}_{\text{JMLE}} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \sum_{\ell=1}^{d-1} \sum_{e\in\mathcal{E}(\ell)} \log c_{a(e),b(e)|\mathbf{v}(e)}\bigl(\hat v_{a(e)|\mathbf{v}(e),t}(\boldsymbol{\theta}),\, \hat v_{b(e)|\mathbf{v}(e),t}(\boldsymbol{\theta});\theta_e\bigr)$$
> Note: the h-function arguments depend on parameters from earlier trees, so the gradient requires back-propagation through the vine structure. **Computational cost:** $O(d^2)$ parameters; feasible for $d \lesssim 20$. Standard errors from the inverse Hessian. Using the sequential estimates as starting values accelerates convergence.
>
> **Efficiency gain over sequential:** Moderate in practice; the two estimators are often close because misspecification in lower trees degrades both.
^thm-jmle

> [!definition] Bivariate copula family selection at each edge
> For each pair, select the bivariate family via:
> - **AIC/BIC:** Fit all candidate families (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, and 90°/180°/270° rotations for upper/lower/survival-reflected versions); select the family with the lowest AIC (penalised by number of parameters).
> - **Vuong test:** Test between non-nested families using their log-likelihood ratio; yields a formal test for superiority of one family over another.
> - **Kendall's $\tau$-based starting values:** Invert the formula $\tau = g(\theta)$ for each parametric family (e.g., $\tau = \theta/(\theta+2)$ for Clayton) to get a closed-form starting value from the empirical Kendall's $\tau$ of the transformed pseudo-observations.
>
> **Rotation conventions:** To capture negative or asymmetric dependence:
> - 90° rotation of Clayton: upper-tail dependence, negative association.
> - 270° rotation of Gumbel: lower-tail dependence, negative association.
> - 180° rotation (survival copula): reverses upper/lower tail dependence.
> `rvinecopulib` automatically considers all rotations.
^def-family-selection

> [!definition] Dißmann algorithm for R-vine structure selection
> Finding the optimal R-vine structure is NP-hard (superexponential number of vine trees for $d > 4$). The **Dißmann et al. (2013) algorithm** greedily builds trees to maximise absolute Kendall's $\tau$:
>
> 1. **Tree 1:** Solve a maximum spanning tree (MST) problem on the complete graph with node set $\{1,\ldots,d\}$ and edge weights $|\hat\tau_{jk}|$. Use Prim's or Kruskal's algorithm — $O(d^2\log d)$.
> 2. **Tree $\ell$ (for $\ell = 2,\ldots,d-1$):** Build the new node set from the edges of tree $\ell-1$; set edge weights to $|\hat\tau_{ab|\mathbf{v}}|$ of the h-function-transformed pseudo-observations; solve MST subject to the proximity condition.
>
> **Result:** A valid R-vine that prioritises the strongest pairwise dependence in the first trees, leaving near-independence copulas in higher trees (candidates for **truncation**).
>
> **Truncated vines:** Set all pair copulas in trees $\ell > m$ to independence (parameter = 0). A truncated vine at level $m$ uses only $m(d - 1 - (m-1)/2)$ copulas. Justified when higher trees contain negligible dependence — equivalent to assuming conditional independence given a sufficient conditioning set.
^def-dissmann

## Examples

> [!example] CDVine / VineCopula / rvinecopulib workflow (R)
> ```r
> library(rvinecopulib)
>
> # Data: (T × d) matrix of pseudo-observations
> u <- pseudo_obs(data)  # scale to (0,1) via empirical CDF
>
> # Fit a vine copula (R-vine with Dißmann structure selection, AIC family selection)
> fit <- vinecop(u, family_set = "parametric", tree_criterion = "tau")
>
> # Inspect structure
> plot(fit)            # graphical vine tree diagram
> summary(fit)         # pair copula families, parameters, AIC per edge
>
> # Simulate
> sim <- rvinecop(1000, fit)
>
> # Evaluate density
> loglik <- logLik(fit)
> ```

> [!example] Comparison of AIC for a 5-variable dataset
> Suppose $d=5$ (10 bivariate copulas). Sequential ML selects families:
>
> | Edge | Family selected | Kendall $\tau$ | AIC improvement over Gaussian |
> |------|----------------|----------------|-------------------------------|
> | (1,2) | $t(\rho, \nu)$ | 0.45 | 12.3 |
> | (2,3) | Gumbel (rot 180°) | -0.30 | 8.1 |
> | (3,4|1,2) | Clayton | 0.18 | 3.2 |
> | (4,5|2,3) | Independence | 0.03 | 0.0 |
>
> The last edge's family is set to independence — this is the vine's truncation decision in tree 2 for this pair. The final vine uses 9 non-trivial copulas and 1 independence copula.

## Connections

Sequential ML in vine copulas is analogous to but distinct from SMM for factor copulas ([[SMM Estimation of Factor Copulas]]). Both are simulation-based at heart: vine copulas need h-function transformations to form pseudo-observations for higher trees (a kind of sequential simulation); factor copulas need explicit simulation of the latent factor to compute moment conditions. The vine approach is likelihood-based (exploiting the explicit density); the factor approach is moment-based (no density exists in closed form).

The **truncated vine** idea connects to sparsity in high-dimensional modelling: upper trees capture weak residual dependence, so ignoring them is similar to regularisation. The analogy with regularised horseshoe priors in Bayesian regression ([[Bayesian Linear Regression]]) is conceptual — both impose near-sparsity on small signals.

## See Also
- [[Pair-Copula Construction]] — the h-function recursion used in sequential estimation
- [[C-Vine and D-Vine Structures]] — specific structures this algorithm operates on
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and tail dependence used as model diagnostics
- [[SMM Estimation of Factor Copulas]] — competing estimation approach for factor copulas
- [[Copula Architecture Comparison]] — estimation complexity compared across copula classes
