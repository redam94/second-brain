---
title: High-Dimensional Design Applications
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/example
  - doc/paper
source: "[[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]]"
source_location: "Foster 2020 §4 (Figs. 1–5, Tables 1–2), Appendix B"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Gradient-Based Unified BOED"
doc_type: paper
depends_on:
  - "[[Unified SGD BOED - Overview]]"
  - "[[Adaptive Contrastive Estimation (ACE)]]"
  - "[[Prior Contrastive Estimation (PCE)]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Modern Bayesian Experimental Design - Overview]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - BOED experiments
  - Death process experiment
  - Biomolecular docking design
  - CES iterated design
---

# High-Dimensional Design Applications

> [!summary]
> The five experiments of Foster 2020 demonstrate that one-stage gradient BOED scales where two-stage methods fail. **Death process** (2-D): gradient methods beat Bayesian optimization even in low dimension. **Regression** (400-D): ~2× the EIG of BO/random-search baselines. **Advertising** (ablation over dimension): gap grows with $D$. **Biomolecular docking** (100-D, real pharmacology): ACE designs **beat human experts**. **CES** (6-D iterated): ACE/PCE reduce posterior entropy faster than the Foster 2019 marginal+BO baseline.

## Overview

Designs are judged primarily by their **EIG** (computed analytically or by a large NMC estimator when possible). Where the EIG is intractable, the **ACE lower bound** and **VNMC upper bound** are paired to *trap* the true EIG: if design $A$'s lower bound exceeds design $B$'s upper bound, $A$ is provably superior. When the optimal design $\xi^\*$ is known, designs are also scored by **design error** $\|\xi^\*-\xi\|$.

## Main Content

> [!example] Death process — gradients beat BO in low dimension (§4.2, Figs. 1–2)
> Epidemiology model: a population of $N=10$ transitions healthy→infected at unknown rate $\theta$; measure infected counts at two times $\xi_1$ and $\xi_1+\xi_2$ ($\xi_1,\xi_2\ge 0$). Aim: infer $\theta$. With 66 discrete outcomes, use **Rao–Blackwellized** gradients. Final EIG: **ACE 0.9830 ± 0.0001**, PCE 0.9822, BA 0.9822, BO+NMC 0.9732. All gradient methods beat BO in both quality and wall-clock — even on a 2-D problem.

> [!example] Regression — 400-dimensional design (§4.3, Table 1)
> Bayesian linear regression, $n=p=20$, design $\xi$ is the $n\times p$ matrix (**400 dimensions**), latents $\theta=(\mathbf{w},\sigma)$ with Normal likelihood, priors $w_j\sim\text{Laplace}(1)$, $\sigma\sim\text{Exp}(1)$, constraint $\|\xi_i\|_1=1$. Gradient methods strongly outperform gradient-free baselines — **roughly double the final EIG**:
> | Method | EIG l.b. | EIG u.b. |
> |--------|----------|----------|
> | **ACE** | 16.1 | 20.7 |
> | PCE | 16.6 | 21.5 |
> | BA | 16.4 | 21.1 |
> | BO + VNMC | 7.3 | 9.6 |
> | Random search + VNMC | 7.1 | 9.4 |

> [!example] Advertising — ablation over dimension (§4.4, Fig. 3)
> Allocate budget $B$ across $D$ regions, $\xi\ge 0$ with $\sum_i\xi_i=B$; observe sales $\mathbf{y}$; infer market opportunities $\theta$ per region, with neighbouring regions correlated (information pools across regions). The EIG is **analytic**, and BO is *given an EIG oracle* (point evaluations of $I(\xi)$) to isolate the value of gradient optimization. Gradient methods (ACE/PCE/BA) still win, and BO degrades for $D\ge 6$; PCE is strong at low $D$ but degrades as $D$ grows (the prior becomes an inefficient contrastive proposal), while ACE/BA learn adaptive proposals.

> [!example] Biomolecular docking — beating experts (§4.5, Table 2)
> Pharmacology hit-rate model (Lyu et al. 2019, *Nature*): probability that compound $i$ with docking score $\xi_i\in[-75,0]$ is a "hit" follows a sigmoid $p(y_i=1\mid\theta,\xi)=\text{bottom}+\frac{\text{top}-\text{bottom}}{1+e^{-(\xi_i-\text{ee50})\times\text{slope}}}$, $\theta=(\text{top},\text{bottom},\text{ee50},\text{slope})$. Design = 100 docking scores at which to test compounds (**100-D**). Result: all gradient methods beat the expert design of Lyu et al.; **ACE best** (EIG ∈ [1.0835, 1.0852] vs expert [1.0191, 1.0227]). Designs are *qualitatively different* from expert choices (Fig. 5).

> [!example] CES — iterated behavioural-economics design (§4.6, Fig. 4)
> Constant-elasticity-of-substitution model (Arrow et al. 1961): a participant compares baskets $\mathbf{x},\mathbf{x}'$, responding on a slider based on utility difference governed by latents $(\rho,\boldsymbol{\alpha},u)$; 6-D designs over **20 sequential steps** with the same participant. Replaces $p(\theta)$ with the running posterior ([[Sequential and Adaptive BED]]). ACE and PCE decrease posterior entropy and parameter RMSEs faster and further than the Foster 2019 marginal+BO baseline; **BA does poorly** here. ACE/PCE perform similarly because, after enough data, the posterior changes little step-to-step so $p(\theta\mid h_{t-1})$ becomes an effective proposal for $p(y_t\mid\xi_t)$.

## Connections

- **Demonstrates** the bound-trapping use of [[Adaptive Contrastive Estimation (ACE)|ACE]] (lower) + [[Variational NMC Estimator|VNMC]] (upper).
- **Validates** the [[Unified SGD BOED - Overview|unified gradient]] thesis: the advantage over two-stage BO grows with design dimension.
- **Cited by** [[Modern Bayesian Experimental Design - Overview|Rainforth 2023]] as evidence that gradient-based design scales to real high-dimensional problems.
- The CES experiment is the shared sequential benchmark with [[Variational Marginal Estimator|Foster 2019's marginal estimator]].

## See Also
- [[Adaptive Contrastive Estimation (ACE)]] / [[Prior Contrastive Estimation (PCE)]] — the bounds optimized
- [[Likelihood-Free ACE and Gradient Estimation]] — the gradient machinery (RB, reparam) used here
- [[Sequential and Adaptive BED]] — the iterated-design setting of the CES experiment
