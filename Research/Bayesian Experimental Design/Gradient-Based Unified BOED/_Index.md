---
title: "Index: Gradient-Based Unified BOED"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Experimental Design]]"
date_updated: 2026-06-27
concept_count: 4
---

# Gradient-Based Unified BOED

> [!abstract] Routing Summary
> **Foster et al. (2020), *A Unified Stochastic Gradient Approach to Designing Bayesian-Optimal Experiments* (AISTATS).** One SGA loop that jointly tightens a variational lower bound on the EIG and optimizes the design — no separate outer optimizer, scales to 100s of design dimensions. Contains 4 notes + overview.
> - New here / two-stage vs one-stage / which bound? → [[Unified SGD BOED - Overview]]
> - The recommended default bound, Theorem 1, InfoNCE link? → [[Adaptive Contrastive Estimation (ACE)]]
> - The no-network contrastive bound using the prior? → [[Prior Contrastive Estimation (PCE)]]
> - Implicit likelihoods (Theorem 2) + score/reparam/Rao–Blackwell gradients? → [[Likelihood-Free ACE and Gradient Estimation]]
> - The five experiments (death process, 400-D regression, docking, CES)? → [[High-Dimensional Design Applications]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Two-stage→one-stage; lower bounds; BA/ACE/PCE; recommend ACE | [[Unified SGD BOED - Overview]] | overview | [[Variational BOED - Overview]] | Joint SGA on $\mathcal{L}(\xi,\phi)\le I(\xi)$; ~2× EIG vs BO in high-D |
| ACE bound; Theorem 1; adaptive contrastive tightening | [[Adaptive Contrastive Estimation (ACE)]] | theorem | [[Variational Posterior Estimator (Barber-Agakov)]] | $I_{ACE}$ tight if $q_\phi=$ posterior **or** $L\to\infty$; monotone in $L$ |
| PCE; prior contrasts; InfoNCE; unnormalized prior | [[Prior Contrastive Estimation (PCE)]] | theorem | [[Adaptive Contrastive Estimation (ACE)]] | $I_{PCE}=$ ACE with $q_\phi=p(\theta)$; tight as $L\to\infty$; = InfoNCE |
| Theorem 2; score/reparam/RB gradients | [[Likelihood-Free ACE and Gradient Estimation]] | theorem | [[Adaptive Contrastive Estimation (ACE)]] | Unnormalized $f_\psi\ge0$ keeps a valid lower bound; reparam ≪ score variance |
| Death process; 400-D regression; docking; CES | [[High-Dimensional Design Applications]] | example | [[Unified SGD BOED - Overview]] | Gradient methods ~2× EIG vs BO; ACE beats experts (docking) |

## Notes

- [[Unified SGD BOED - Overview]] — CONTAINS: the two-stage problem; unified lower-bound idea (why lower not upper); BA/ACE/PCE table; Theorems 1–2 summary; gradient-estimator summary; two-stage-vs-one-stage headline; five-experiment summary.
- [[Adaptive Contrastive Estimation (ACE)]] — CONTAINS: $I_{ACE}$ (Eq. 11); Theorem 1 (lower bound + KL error, monotone in $L$, exact as $L\to\infty$ or perfect $q_\phi$); BA = $L{=}0$ case; InfoNCE connection; death-process result.
- [[Prior Contrastive Estimation (PCE)]] — CONTAINS: $I_{PCE}$ (Eq. 12); InfoNCE bound (Eq. 13); unnormalized-prior trick (Eq. 15) for iterated design; PCE-vs-ACE selection.
- [[Likelihood-Free ACE and Gradient Estimation]] — CONTAINS: Theorem 2 (unnormalized likelihood → valid lower bound, Eq. 14); score-function (Eqs. 16–17), reparameterization (Eq. 18), Rao–Blackwell (Eq. 19) gradients; Kleinegesse & Gutmann parallel.
- [[High-Dimensional Design Applications]] — CONTAINS: death process (Figs. 1–2), 400-D regression (Table 1), advertising ablation (Fig. 3), 100-D biomolecular docking vs experts (Table 2), CES iterated design (Fig. 4); ACE+VNMC bound-trapping; design-error metric.

## Sources
- [[../raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]] — Foster, A., Jankowiak, M., O'Meara, M., Teh, Y.W., Rainforth, T. (2020), *A Unified Stochastic Gradient Approach to Designing Bayesian-Optimal Experiments*, **AISTATS 2020**, PMLR 108. arXiv:1911.00294.

## See Also
- [[Variational EIG Estimators/_Index|Variational EIG Estimators]] — Foster 2019, the estimation predecessor
- [[Modern BED Review/_Index|Modern BED Review]] — Rainforth 2023's framing of this unified approach
- [[Optimization and Gradient Schemes for BED]] — the review's view of stochastic-gradient design
