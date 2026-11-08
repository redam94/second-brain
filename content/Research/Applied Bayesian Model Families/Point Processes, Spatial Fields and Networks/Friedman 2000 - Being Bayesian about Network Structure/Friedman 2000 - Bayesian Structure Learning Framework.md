---
title: "Friedman 2000 - Bayesian Structure Learning Framework"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]"
source_location: "Sec. 1-2, pp. 201-203, eq. 1-4, Thm 2.1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Friedman 2000 - Being Bayesian about Network Structure"
doc_type: paper
depends_on:
used_by:
  - "[[Friedman 2000 - Closed Form for a Known Ordering]]"
aliases:
  - "Bayesian network structure posterior"
  - "structure modularity"
  - "parameter modularity"
---

# Friedman 2000 - Bayesian Structure Learning Framework

> [!summary]
> The posterior over structures factorises into per-family scores when the prior satisfies structure modularity, global parameter independence and parameter modularity (Theorem 2.1). The goal is the posterior probability of a *feature* such as an edge: $P(f\mid D)=\sum_GP(G\mid D)f(G)$, a super-exponential sum.

## Overview
Standard approach: model selection (one high-scoring DAG). Fine when data are plentiful (the best model can be orders of magnitude more likely than any other) but not when data are scarce relative to the model.

## Main Content

> [!definition] Feature posterior (eq. 1)
> $P(f\mid D)=\sum_GP(G\mid D)f(G)$, $f(G)=1$ if the feature (edge $X_j\to X_i$, Markov-blanket membership, directed path) holds in $G$.

^def-feature-posterior

> [!definition] Priors
> *Structure prior* $P(G)$: uniform, or the paper's choice $P(\text{Pa}(X_i)=U)\propto\binom{n-1}{|U|}^{-1}$ (uniform over parent sets of a given size; negative log is the description length of the parent set). *Structure modularity:* $P(G)=\prod_ip(X_i,\text{Pa}_G(X_i))$. *Global parameter independence:* $P(\theta_G\mid G)=\prod_iP(\theta_{X_i|\text{Pa}_G(X_i)}\mid G)$ (eq. 2). *Parameter modularity:* if $\text{Pa}_G(X_i)=\text{Pa}_{G'}(X_i)=U$ then $P(\theta_{X_i|U}\mid G)=P(\theta_{X_i|U}\mid G')$ (eq. 3). Discrete networks: Dirichlet priors; Gaussian networks: Wishart priors.

^def-modularity-assumptions

> [!theorem] Theorem 2.1 (decomposable marginal likelihood)
> If $D$ is complete and the priors satisfy parameter independence and modularity, then
> $$
> P(D\mid G)=\prod_i\text{score}(X_i,\text{Pa}_G(X_i)\mid D),\quad \text{score}(X_i,U\mid D)=\int\prod_mP(x_i[m]\mid u[m],\theta_{X_i|U})P(\theta_{X_i|U})\,d\theta_{X_i|U}.
> $$
> With structure modularity as well, $P(G\mid D)\propto\prod_ip(X_i,\text{Pa}_G(X_i))\,\text{score}(X_i,\text{Pa}_G(X_i)\mid D)$.

^thm-decomposable-score

Why averaging is hard: the number of structures is $2^{O(n^2\log n)}$; bounding in-degree by $k$ still gives at least $2^{kn\log n}$; exhaustive enumeration works for 4-5 nodes. Existing approximations: record the structures visited in search (biased and similar for greedy hill climbing), Occam's window (Madigan & Raftery), and structure-MCMC (Madigan & York), whose chain over a peaked, rugged landscape may mix slowly. Eq. 4: $P(f\mid D)\approx\sum_{G\in\mathcal G}P(G\mid D)f(G)/\sum_{G\in\mathcal G}P(G\mid D)$ for a set $\mathcal G$ of high-scoring structures.

## Examples
Marginal likelihood for linear-Gaussian local models with a conjugate prior is the BGe score (see [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]]); for discrete data it is the BDe score.

## Connections
[[Friedman 2000 - Closed Form for a Known Ordering]] exploits modularity to sum over exponentially many DAGs. Frequentist counterpart: [[GES and Score-Based Discovery]] (greedy score search).

## See Also
[[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
