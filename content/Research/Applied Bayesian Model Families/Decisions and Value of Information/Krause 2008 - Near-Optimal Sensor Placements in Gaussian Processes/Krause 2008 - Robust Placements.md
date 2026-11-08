---
title: "Krause 2008 - Robust Placements"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 6, pp. 253-255"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
used_by:
  - "[[Krause 2008 - Experiments and Empirical Findings]]"
aliases:
  - Robust mutual information
  - Sensor failure robustness
---

# Krause 2008 - Robust Placements

> [!summary]
> Expected mutual information over node failures ($MI_R$) and over a prior on kernel parameters ($MI_M$) are still submodular because submodular functions are closed under expectation. Proposition 11 shows the plain MI placement is already robust: if each node survives with probability at least $\rho$, expected MI is at least $\rho\,MI(B)$.

## Overview

Sensors fail (battery, lost messages) and the GP hyperparameters are unknown. Both can be folded into the objective without losing the greedy guarantee.

## Main Content

> [!definition] Robust mutual information (Sec. 6.1)
> Attach $Z_i\in\{0,1\}$ to each site ($Z_i=0$ means failed). For placement $A$ let $A_z=\{y_i\in A:z_i=1\}$. Then $MI_R(A)=\mathbb{E}_Z[MI(A_Z)]=\sum_zP(z)\,MI(A_z)$.
^def-mi-robust

> [!theorem] Proposition 10
> $MI_R$ is submodular and, under Lemma 5's assumptions, approximately monotone.
^thm-mi-robust

*Proof.* The class of submodular functions is closed under expectations; approximate monotonicity follows termwise.

Scenarios grow exponentially; if the $Z_i$ are i.i.d. with failure probability $\theta$ small, considering none or at most one failure ($|S|+1$ scenarios) works well in practice (Lerner and Parr 2001); otherwise sample.

> [!theorem] Proposition 11 (Krause et al., 2006)
> Let $F$ be submodular on ground set $S$, $B\subseteq S$, and a distribution over subsets $A\subseteq B$ with $\Pr[v\in A]\ge\rho$ for all $v\in B$. Then $\mathbb{E}[F(A)]\ge\rho F(B)$. Applied with $B$ the selected placement and $A$ the working nodes: $\mathbb{E}[MI(A)]\ge\rho\,MI(B)$, even for spatially correlated failures.
^thm-robust-prop

> [!definition] Model-uncertainty objective (Sec. 6.2)
> With a prior $p(\theta)$ on GP parameters, $MI_M(A)=\mathbb{E}_\theta[I(A;V\setminus A\mid\theta)]=\int p(\theta)\,I(A;V\setminus A\mid\theta)\,d\theta$. It is submodular; approximate monotonicity holds if the mesh guarantees $\varepsilon$-monotonicity for every $\theta$ with $p(\theta)>0$, or more weakly if there is $\eta(\theta)\ge0$ with $\int p(\theta)[-\eta(\theta)]d\theta\ge-\varepsilon$. Predictive distributions are no longer closed form, so approximate inference is required, but the offline and online bounds still apply.
^def-mi-model

## Examples

Failure probability $1-\rho=0.2$: Proposition 11 guarantees a plain greedy placement keeps at least 80% of its failure-free MI in expectation, with no re-optimisation.

## Connections
- Marketing: if some geos' data may be unusable (measurement dropout, tracking loss), the same argument suggests that diversified, greedy-selected measurement sets lose at most a $(1-\rho)$ fraction of information in expectation.
- Hyperparameter uncertainty is the Bayesian-optimisation theme: [[Bayesian Optimisation]].

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
