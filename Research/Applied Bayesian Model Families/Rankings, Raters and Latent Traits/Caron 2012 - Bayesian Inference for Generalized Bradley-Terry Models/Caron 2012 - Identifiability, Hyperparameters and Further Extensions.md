---
title: "Caron 2012 - Identifiability, Hyperparameters and Further Extensions"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Sec. 5, pp. 11-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Caron 2012 - Plackett-Luce Model for Full Rankings]]"
used_by:
  - "[[Caron 2012 - Experiments NASCAR and Chess]]"
aliases:
  - Bradley-Terry identifiability scale
  - Bradley-Terry random graph and Tversky choice extensions
---

# Caron 2012 - Identifiability, Hyperparameters and Further Extensions

> [!summary]
> BT/PL likelihoods are invariant to rescaling $\lambda$, so only $\pi_i=\lambda_i/\sum_k\lambda_k$ is identified; with a $\mathcal G(a,b)$ prior $\pi\sim\text{Dirichlet}(a,\dots,a)$. The paper adds a rescaling step to improve Gibbs mixing, shows how to learn $a$, and sketches EM/Gibbs for degree-sequence graphs, feature (Tversky/Restle) choice and a positive-weight classifier.

## Overview

This is the "plumbing" section: what is identified, how the prior scale interacts with the sampler, and which other models share the exponential-race trick.

## Main Content

### 5.1 Identifiability

> [!theorem] Dirichlet-Gamma decomposition
> Let $\Lambda=\sum_i\lambda_i$ and $\pi_i=\lambda_i/\Lambda$. The likelihood depends only on $\pi$, so $p(\pi,\Lambda\mid D)=p(\pi\mid D)\,p(\Lambda)$. Under $\lambda_i\overset{iid}\sim\mathcal G(a,b)$: $\pi\sim\text{Dir}(a,\dots,a)$, $\Lambda\sim\mathcal G(Ka,b)$ independently, and the MAP of $\Lambda$ is $(aK-1)/b$.
> ^thm-dirichlet-gamma

*Practical consequences.*
1. **Rescaling step.** After each Gibbs sweep, normalise $\lambda^{(t)}$ and rescale by a fresh draw $\Lambda^{(t)}\sim\mathcal G(Ka,b)$: $\lambda_i^{*(t)}=\lambda_i^{(t)}\Lambda^{(t)}/\sum_j\lambda_j^{(t)}$. This removes a slowly mixing random-walk along the non-identified scale direction. It is useless if only $\pi$ is reported.
2. **Fixing the scale.** Setting $b=Ka-1$ makes the MAP satisfy $\sum_k\lambda_k=1$ (used in all experiments). The inverse-scale $b$ is not likelihood-identified so no prior is placed on it.
3. **Alternative EM on $\pi$.** With $\pi\sim\text{Dir}(a,\dots,a)$ add latent negative-binomial counts $M_{ij}\sim\text{NB}(n_{ij},\pi_i+\pi_j)$ and category labels $C_{ijk}$ with $P(C_{ijk}=l)\propto\pi_l$ for $l\ne i,j$, giving $\pi_k^{(t)}\propto a-1+w_k+\pi_k^{(t-1)}\sum_{i\ne k}\sum_{j\ne i,k}n_{ij}/(\pi_i^{(t-1)}+\pi_j^{(t-1)})$, renormalised to sum 1. It is identified but converges slowly when some $\pi_k$ are tiny (the sum becomes large) and the matching Gibbs sampler mixes slowly too.

The vault-wide analogue in log-skill (logit) parameterisations: use sum-to-zero or an anchor element; see E67's "sum-to-zero vs anchoring identification".

### 5.2 Hyperparameter estimation

> [!definition] Posterior of the shape $a$
> Given $\lambda$: $p(a\mid\lambda)\propto p(a)\,\underbrace{\bigl(b^K\prod_i\lambda_i\bigr)^a}_{l_1(a)}\,\underbrace{\Gamma(a)^{-K}}_{l_2(a)}$.
> ^def-shape-posterior

Sample with the slice-type auxiliary variable scheme of Damien et al. (1999): $U_1\sim\mathcal U(0,l_1(a))$, $U_2\sim\mathcal U(0,l_2(a))$, then $a\mid u\propto p(a)\mathbf 1\{l_1(a)>u_1,l_2(a)>u_2\}$; or a random-walk Metropolis step on $\log a$: propose $a^\star=e^{\sigma z}a$, accept with probability $\min\bigl\{1,\tfrac{p(a^\star)}{p(a)}\bigl(\tfrac{\Gamma(a)}{\Gamma(a^\star)}\bigr)^K(b^K\prod\lambda_i)^{a^\star-a}\bigr\}$. Large $a$ pulls all skills together (strong shrinkage); small $a$ lets skills spread.

### 5.3 Further extensions

> [!definition] Degree-sequence random graph
> Edge $(i,j)$ present with probability $\lambda_i\lambda_j/(1+\lambda_i\lambda_j)$ (Holland-Leinhardt; Chatterjee et al.). Latent $Z_{ij}\sim\text{Exp}(\lambda_i+1/\lambda_j)$; the $\lambda_i$ conditional is a **generalized inverse Gaussian**, and the EM step solves a quadratic.
> ^def-degree-graph

> [!definition] Feature-based choice (Restle 1961; Tversky 1972)
> Items carry binary features $f_i\in\{0,1\}^K$; $\pi_{ij}=\dfrac{\sum_k\lambda_kf_{ik}(1-f_{jk})}{\sum_k\lambda_kf_{ik}(1-f_{jk})+\sum_k\lambda_kf_{jk}(1-f_{ik})}$, i.e. only features *not shared* matter. EM/Gibbs follow the group-comparison construction.
> ^def-tversky-choice

> [!definition] Positive-weight classifier
> $P(Y_i=k)=\dfrac{\exp(X_i)^\top\lambda_k}{\sum_l\exp(X_i)^\top\lambda_l}$ with $X_i\in\mathbb R^p$ and $\lambda_k\in\mathbb R_+^p$, an alternative to multinomial logit; latent $Z_i\sim\text{Exp}(\sum_l\exp(X_i)^\top\lambda_l)$ gives EM and Gibbs.
> ^def-positive-classifier

## Examples

> [!example] Why the rescaling step matters
> With a Gamma prior, one Gibbs sweep multiplies every $\lambda_i$ by a similar factor driven by $Z$; across sweeps the overall scale $\Lambda$ random-walks. Resampling $\Lambda\sim\mathcal G(Ka,b)$ after normalising makes successive $\pi$ draws less correlated. If you only store $\pi$ you can skip it.
> ^ex-rescale

## Connections

- Dirichlet shrinkage on $\pi$ is the analogue of a hierarchical normal prior on log-skills ([[Hierarchical Models]]).
- Tversky choice with features is a pairwise analogue of attribute-based demand in [[Discrete Choice Models]].

## See Also

[[Caron 2012 - Experiments NASCAR and Chess]] · [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]
