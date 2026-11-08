---
title: "Krause 2008 - Costs, Online Bounds and Exact Optimisation"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 4.3-4.5, pp. 247-250"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
used_by:
  - "[[Krause 2008 - Experiments and Empirical Findings]]"
aliases:
  - Budgeted sensor placement
  - Online bound on greedy
---

# Krause 2008 - Costs, Online Bounds and Exact Optimisation

> [!summary]
> Three extensions of the greedy guarantee: non-uniform sensor costs under a budget (a benefit-cost greedy with enumeration of triples, still $(1-1/e)$ up to a cost-dependent error), a data-dependent **online bound** on how far any placement can be from optimal (Proposition 8), and a mixed integer program with constraint generation that can compute the exact optimum on small problems.

## Overview

The $(1-1/e)$ a priori bound of Theorem 7 is loose in practice. Sections 4.3-4.5 show how to spend a little extra computation to (a) respect location costs, (b) certify a given solution, and (c) solve small cases exactly.

## Main Content

> [!definition] Budgeted greedy (Sec. 4.3, after Sviridenko 2004 and Krause and Guestrin 2005)
> With modular cost $c(A)=\sum_ic(X_i)$ and budget $L$: enumerate all subsets of size at most three; for each, run greedy adding $y^*=\arg\max_{y\in S\setminus A}\dfrac{H(y\mid A)-H(y\mid\bar A)}{c(y)}$ until the budget is exhausted; return the best. Guarantee: $(1-1/e)\,\text{OPT}-\dfrac{2L\varepsilon}{c_{\min}}$, provided MI is $\varepsilon$-monotone up to sets of size $2L/c_{\min}$ (mesh as in Corollary 6 with $k$ replaced by $2L/c_{\min}$).
^def-budgeted-greedy

> [!theorem] Proposition 8 (online bound)
> Assume the discretisation guarantees $\varepsilon$-monotonicity and greedy (or any method) returns $A_k$ with $|A_k|=k$. For each $y\in S$ let $\delta_y=MI(A_k\cup y)-MI(A_k)$; sort decreasingly to $\delta_{(1)}\ge\dots\ge\delta_{(k)}$. Then
> $$\text{OPT}\le MI(A_k)+\sum_{i=1}^k\delta_{(i)}+k\varepsilon.$$
^thm-online-bound

*Proof.* Follows from submodularity (adding $A^*$ to $A_k$ gains at most the sum of the $k$ best marginal gains) and $\varepsilon$-monotonicity. Fig. 7 shows the online bound is much tighter than the a priori $1-1/e$ and $1-(1-1/k)^k$ bounds on both datasets; and since it holds for the output of *any* algorithm, it certifies heuristics such as local search.

> [!definition] Mixed integer program (Sec. 4.5, Nemhauser and Wolsey 1981)
> $\max\eta$ subject to $\eta\le MI(B)+\sum_{y_i\in S\setminus B}\alpha_i\,[MI(B\cup y_i)-MI(B)]$ for all $B\subseteq S$ (Eq. 7), $\sum_i\alpha_i\le k$ (Eq. 8), $\alpha_i\in\{0,1\}$ ($\alpha_i=1$ iff $y_i$ selected). Replace Eq. 8 by $\sum\alpha_ic_i\le L$ for costs. Exponentially many constraints are generated lazily: solve, test whether the incumbent violates $\eta\le MI(B)$ for some $B$, add that constraint; each subproblem is NP-hard so branch and bound/cut is used. Because MI is only approximately monotone, any feasible $A$ has $(\hat\eta,\alpha_A)$ with $\hat\eta\le MI(A)-k\varepsilon$ feasible, so the MIP optimum satisfies $MI(A^*)\ge\text{OPT}-k\varepsilon$. A general-submodular MIP without the monotonicity requirement exists but gave looser bounds and slower convergence.
^def-mip-sensor

## Examples

For the 16-node subsample (Fig. 5) the MIP bound shows greedy is never more than 5 percent from optimal, much tighter than the 37 percent worst case from $1-1/e$.

Online-bound sketch (untested): with the `Sig` matrix from [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]], compute the vector of marginal gains $\delta_y=\text{MI}(A_k\cup y)-\text{MI}(A_k)$ for all candidates, sort, and add the top $k$ to $MI(A_k)$ for the certificate.

## Connections
- Marketing: costs differ across geos or measurement vendors, so a benefit-cost ratio greedy is the natural rule when measurement budgets differ by market.
- Decision-value version: replacing MI by an EVSI objective keeps the diminishing-returns story but not necessarily the submodularity proof; E89 tests this by comparing simulated joint value with summed gains ([[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]).

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
