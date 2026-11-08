---
title: "Krause 2008 - Lazy Evaluation and Local Kernels"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 5, pp. 250-253"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
used_by:
  - "[[Krause 2008 - Experiments and Empirical Findings]]"
aliases:
  - Lazy greedy sensor placement
  - Local kernel truncation
---

# Krause 2008 - Lazy Evaluation and Local Kernels

> [!summary]
> Plain greedy costs $O(kn^4)$. Lazy evaluation with a priority queue exploits submodularity (stale gains are upper bounds) to cut MI evaluations by about six-fold and costs nothing in quality. Truncating small covariances (local kernels) cuts complexity to roughly linear in $n$ with a quantified loss (Theorem 9).

## Overview

Each greedy step needs $H(y\mid A)$ (an $O(k^3)$ solve) and $H(y\mid\bar A)$ (an $O(n^3)$ solve) for every candidate. Sec. 5 gives two orthogonal fixes.

## Main Content

> [!definition] Lazy greedy (Algorithm 2)
> Initialise all $\delta_y=+\infty$. At each of $k$ iterations: mark all $\delta_y$ stale; repeat: take $y^*=\arg\max\delta_y$; if $\delta_{y^*}$ is current, stop; otherwise recompute $\delta_{y^*}=H(y\mid A)-H(y\mid\bar A)$, mark current, and reinsert. Select the final $y^*$. Correctness: for fixed $y$, $\delta_y$ is monotonically decreasing over the run, by submodularity, so a stale value is an upper bound. Use a priority queue (deletemax $O(\log n)$, insert $O(1)$), annotating each $\delta_y$ with the last-updated iteration instead of resetting flags.
^def-lazy-greedy

*Empirics (Sec. 9.6).* For 50 placements on the precipitation data, MI computations fell from 7125 to 1172 and time from 41.3 s to 8.7 s (Pentium M 1.7 GHz); about a six-fold reduction in evaluations.

> [!definition] Local kernels and truncation (Algorithm 3)
> Compact-support kernel (Storkey 1999): with $\Delta=\beta\|x-y\|_2$, $K(x,y)=\dfrac{(2\pi-\Delta)(1+\cos\Delta/2)+\tfrac32\sin\Delta}{3\pi}$ for $\Delta<2\pi$ and 0 otherwise; it resembles the Gaussian kernel $\exp(-\beta\|x-y\|^2/(2\pi))$ (Fig. 8). For general kernels compute $\tilde H_\varepsilon(y\mid B)$ with $\tilde B$ obtained by dropping all $x$ with $|K(x,y)|\le\varepsilon$. Each dropped $x$ changes variance by at most $K(y,x)^2/\sigma_x^2\le\varepsilon^2/\sigma_x^2$, so the entropy change is at most $\varepsilon^2/(\sigma^2\sigma_x^2)$ and in total at most $n\varepsilon^2/\sigma^4$. Algorithm 3 keeps scores $\delta_y=\tilde H_\varepsilon(y\mid A)-\tilde H_\varepsilon(y\mid\bar A)$ and, after selecting $y^*$, updates only its $\varepsilon$-neighbourhood $N(y^*;\varepsilon)$ of size at most $d$.
^def-local-kernel

> [!theorem] Theorem 9
> With $\varepsilon_1$-approximate monotonicity and truncation parameter $\varepsilon_2$, Algorithm 3 returns $A\subseteq S$ with
> $$MI(A)\ge(1-1/e)\big(\text{OPT}-k\varepsilon_1-2kn\varepsilon_2/\sigma^4\big)$$
> in time $O(nd^3+nk+kd^4)$; with Relaxed Heaps $O(nd^3+kd\log n+kd^4)$, better when $d\log n\ll n$. Lazy evaluation can be combined.
^thm-local-kernel

*Empirics (Sec. 9.7).* On the temperature data the covariance entries had quartiles 0.122, 0.263, 0.442 (max 3.51, min 8.78e-6; median variance 1.70). Truncation $\varepsilon\in[0.5,1.2]$ gave a good time/accuracy trade-off (Fig. 17). On a 7x7 grid with bandwidths from 0.1 to 12.8, local and Gaussian kernels gave very similar placements (Gaussian slightly more spread out; Figs 18-19).

## Examples

Count-based illustration: with $n=10^4$ candidate sites and $d=50$ neighbours, $nd^3=1.25\times10^9$ against $kn^4=k\times10^{16}$ for the plain algorithm.

## Connections
- Local support is the same idea as sparse or compactly supported GPs and as HSGP basis truncation ([[Hilbert Space Gaussian Processes]]): trade a controlled approximation error for cost.
- E92's finding that an exact GP "did not earn its price" at $n=23{,}939$ is the large-$n$ end of this trade-off ([[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]]).

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
