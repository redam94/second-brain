---
title: "Heath 2015 - Net Benefit, EVPI and EVPPI Definitions"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/definition
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 1-2, pp. 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Review of Expected Value of Information Methods - Overview]]"
  - "[[Decision Analysis]]"
used_by:
  - "[[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]]"
  - "[[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]]"
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
aliases:
  - EVPPI definition
  - Known-distribution net benefit
---

# Heath 2015 - Net Benefit, EVPI and EVPPI Definitions

> [!summary]
> Defines the monetary net benefit of each decision option, the "known-distribution" net benefit $NB_t(\theta)$ that varies with the uncertain parameters, and the EVPPI as the expected gain from learning a parameter subset $\phi$ exactly (Eq. 1). EVPI is the special case $\phi=\theta$. Both are non-negative, and EVPI bounds every EVPPI.

## Overview

Health-economic models choose among $T+1$ options, $t=0$ (current standard) and $t=1,\dots,T$ (new options; in practice rarely $T>5$). Each option has an effect $e_t$ and cost $c_t$ drawn from $p(e,c\mid\theta)$, where $\theta$ indexes uncertain model parameters. The paper (Sec. 2) builds VoI from this setup. The same machinery applies to any decision where benefit and cost are commensurable, for example incremental profit from a budget move.

## Main Content

> [!definition] Monetary net benefit
> For willingness to pay $k$ per unit of effect, option $t$ has net benefit $nb_t = k\,e_t - c_t$. Under full Bayesian uncertainty the expected net benefit is $NB_t = k\,\mathbb{E}[e_t]-\mathbb{E}[c_t]$, where the expectation is over the joint $p(e,c,\theta)=p(e,c\mid\theta)\,p(\theta)$. The currently optimal option attains $NB^*=\max_t NB_t$.
^def-net-benefit

> [!definition] Known-distribution net benefit
> $NB_t(\theta)=k\,\mathbb{E}[e_t\mid\theta]-\mathbb{E}[c_t\mid\theta]$, the expectation taken over individual variability only (the term follows Baio, 2012). $NB_t$ is a number, but $NB_t(\theta)$ is a random variable because $\theta$ is uncertain, and $\mathbb{E}_\theta[NB_t(\theta)]=NB_t$.
^def-known-dist-nb

> [!definition] Parameter partition
> Write $\theta=(\phi,\psi)$: $\phi$ are the **parameters of interest** (those further research could investigate) and $\psi$ the remaining **nuisance** parameters.
^def-phi-psi

> [!definition] Expected Value of Partial Perfect Information (Eq. 1)
> $$\text{EVPPI}=\mathbb{E}_{\phi}\Big[\max_t\ \mathbb{E}_{\psi\mid\phi}\big[NB_t(\theta)\big]\Big]-\max_t\ \mathbb{E}_{\theta}\big[NB_t(\theta)\big].$$
> The first term is the value of deciding with $\phi$ known exactly (marginalising $\psi$ given $\phi$) and then averaging over what $\phi$ might turn out to be; the second is the value of deciding now.
^def-evppi

> [!definition] Expected Value of Perfect Information (EVPI)
> The case $\phi=\theta$ (no nuisance parameters): $\text{EVPI}=\mathbb{E}_\theta[\max_t NB_t(\theta)]-\max_t\mathbb{E}_\theta[NB_t(\theta)]$. The paper calls EVPI the "(overall)" quantity that is "easy to calculate numerically (but not analytically)" from PSA draws; it places an upper bound on the cost of any research that reduces uncertainty.
^def-evpi

> [!theorem] Ordering (standard result, proof sketch)
> For every partition, $0\le\text{EVPPI}(\phi)\le\text{EVPI}$. *Sketch.* Lower bound: $\mathbb{E}_\phi[\max_t g_t(\phi)]\ge\max_t\mathbb{E}_\phi[g_t(\phi)]=\max_t NB_t$ with $g_t(\phi)=\mathbb{E}_{\psi\mid\phi}[NB_t]$ (the max of expectations never exceeds the expectation of the max). Upper bound: $g_t(\phi)\le\mathbb{E}_{\psi\mid\phi}[\max_s NB_s(\theta)]$ for every $t$, hence $\mathbb{E}_\phi[\max_t g_t]\le\mathbb{E}_\theta[\max_s NB_s(\theta)]$. The paper states Eq. (1) but not this ordering explicitly.
^thm-evppi-bounds

### Why EVPPI, not the probability of cost-effectiveness

The introduction argues that the probability that an option is cost-effective "can dramatically overstate decision sensitivity": if the cost of a wrong decision is small, there is "little value in agonising about the decision, even for a low probability of cost-effectiveness". VoI weights the chance of being wrong by the *size* of the loss. Two limitations the paper names: VoI is theoretically unbounded and hard to interpret, and it can be computationally costly unless restrictive assumptions are made.

## Examples

**Two options, one uncertain gain.** Let option 0 have $NB_0=0$ and option 1 have $NB_1(\theta)\sim N(m,s^2)$ with $m=0.3$, $s^2=0.5$. Deciding now picks option 1 (value $0.3$). EVPI $=\mathbb{E}[\max(NB_1,0)]-0.3 = s\,\varphi(m/s)+m\,\Phi(m/s)-m\approx0.157$. If $NB_1=0.3+0.5\phi+0.5\psi$ with $\phi,\psi$ independent standard normal, then EVPPI for $\phi$ equals the same formula with sd $0.5$: $\approx0.084$ (see the verified code in [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]]). So learning $\phi$ alone captures about 54 percent of the total decision value.

## Connections

- Relevance to marketing measurement: replace $k\,e_t-c_t$ with incremental profit of a reallocation; $\phi$ is, for example, a channel's saturation parameter and $\psi$ the rest of the MMM. EVPPI says whether an experiment on $\phi$ could change the allocation at all.
- Related: [[Decision Analysis]], [[From Inference to Decision]], [[Expected Information Gain]].

## See Also
- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] for EVSI and EVPI as a price ceiling.
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
