---
title: "Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Sec. 2.3 and 3, pp. 3-5; eq. 3; Figures 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]"
used_by:
  - "[[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]"
  - "[[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]]"
aliases:
  - "Ensemble-chain adaptation"
  - "ECA"
  - "K-fold ECA"
---

# Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism

> [!summary]
> Letting an MCMC kernel's parameters depend on the current state of the same chain is generally invalid, but letting chain $k$ use parameters computed from the *other* chains preserves the product stationary distribution. MEADS arranges states into $K=4$ folds, computes parameters from the neighbour fold and skips one fold per iteration, so most chains update in parallel while remaining exactly valid.

## Overview

If $\phi$ depends on the chain's own state, invariance of $p$ under $T(\cdot\mid\cdot;\phi)$ for fixed $\phi$ does not imply $\int p(\theta)T(\theta'\mid\theta;\phi(\theta))d\theta=p(\theta')$. Ensemble-chain adaptation (ECA; Gilks et al. 1994, "snooker" algorithm; named by Zhang and Sutton 2011) escapes this by conditioning on other chains.

## Main Content

> [!theorem] ECA invariance (eq. 3)
> Let chain $k$ have state $\theta_k$ and the others $\theta_{\setminus k}$, and target the product $p(\theta_{1:K})=\prod_kp(\theta_k)$. If each update of $\theta_k$ uses a kernel $T(\theta'_k\mid\theta_k;\phi(\theta_{\setminus k}))$ that leaves $p(\theta_k)$ invariant for every fixed $\phi$, then
> $$\int\Big(\prod_ip(\theta_i)\Big)T(\theta_k'\mid\theta_k;\phi(\theta_{\setminus k}))\,d\theta=\int p(\phi)\int p(\theta_k)T(\theta_k'\mid\theta_k;\phi)\,d\theta_kd\phi=p(\theta_k').$$
> *Proof sketch.* $\phi(\theta_{\setminus k})$ is independent of $\theta_k$ under the product measure; condition on $\phi$, apply invariance for fixed $\phi$, then integrate out $\phi$.
^thm-eca-invariance

Treating the ensemble as one meta-chain justifies updating **one state at a time** serially, but that wastes the very parallel hardware (GPU/TPU, JAX/PyTorch/TensorFlow) that makes many chains cheap.

> [!theorem] Parallelizable ECA (Sec. 3, Fig. 1)
> Conceptually update states in order $k=1,2,\dots$, each conditioned on states $\theta_{1:k-1}$ (left graphical model). Since each update only needs information from lower-index states, all $K-1$ notionally sequential updates of $\theta_{2:K}$ can be computed in parallel by discarding the $K-2$ intermediate states (right model). Then permute the states and repeat so all states are updated. Updating *all* states in parallel conditioned on one another ("hogwild", Niu et al. 2011) can give incorrect results ([[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]]).
^thm-parallel-eca

> [!definition] K-fold update structure (Fig. 2)
> Split the states into $K$ folds of $N$ states each. Compute kernel parameters from each fold and share them across all updates in the **neighbouring** fold: fold $k$ is updated with parameters computed from fold $(k+1)\bmod K$ (Algorithm 3 uses $(k-1)\bmod K$ equivalently under the index convention). **Skip one fold's update each iteration** (fold $t\bmod K$) to preserve the conditional independence structure. After $K$ iterations randomly reshuffle the states into $K$ new folds. MEADS uses $K=4$.
^def-kfold-eca

**Advantages over dense ECA.** Parameters are always computed from exactly $N$ states, which helps batching; no parameters are estimated from fewer than $N$ states (important in GHMC, where a momentum-negating rejection is worse than standing still). **Cost.** $1/K$ of states skip each iteration (at most 25% slowdown for $K=4$); larger $K$ trades utilisation against variance in the estimated parameters (explored in Appendix A, [[Hoffman 2022 - MEADS - Experiments and Ablations]]). Leimkuhler et al. (2018) update only one fold at a time conditioned on all others, which reduces parallel updates by a factor $K-1$.

> [!example] Counting active chains
> With 128 chains in $K=4$ folds of $N=32$: each iteration 3 folds (96 chains) update, 32 sit out; utilisation 75%. With $K=8$: 7 of 8 folds (112 chains) update, utilisation 87.5%, but each parameter estimate uses $N=16$ states.
^ex-active-chains

```python
# Fold bookkeeping in MEADS: which fold is skipped and which fold supplies parameters
K, T = 4, 8
for t in range(1, T+1):
    skipped = t % K
    updates = [(k, (k-1) % K) for k in range(K) if k != skipped]   # (fold updated, fold supplying stats)
    print(t, "skip", skipped, updates)
# reshuffle chain-to-fold assignment every K iterations
```

## Connections

Adaptation that never needs freezing is the key difference from [[Hoffman 2021 - ChEES Criterion and Algorithm 1]]. The heuristics that fill $\phi$ are in [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]].

## See Also
[[Hoffman 2022 - MEADS - Overview]], [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]], [[Efficient MCMC]]
