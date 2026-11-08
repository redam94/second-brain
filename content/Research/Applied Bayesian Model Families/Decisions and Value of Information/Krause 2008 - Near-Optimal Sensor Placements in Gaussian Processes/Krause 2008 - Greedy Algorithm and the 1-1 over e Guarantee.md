---
title: "Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 244-247; Appendix A"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Entropy versus Mutual Information Criteria]]"
  - "[[Krause 2008 - GP Model and Posterior Variance]]"
used_by:
  - "[[Krause 2008 - Costs, Online Bounds and Exact Optimisation]]"
  - "[[Krause 2008 - Lazy Evaluation and Local Kernels]]"
  - "[[Krause 2008 - Robust Placements]]"
aliases:
  - Greedy submodular sensor selection
  - Nemhauser guarantee for mutual information
---

# Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee

> [!summary]
> The greedy rule adds the location maximising $\delta_y=\sigma^2_{y\mid A}/\sigma^2_{y\mid\bar A}$ (Eq. 6, Algorithm 1). Mutual information is submodular (Lemma 3) and, once the grid is fine enough and sensor noise is positive, approximately monotone for sets up to size $2k$ (Lemma 5, Corollary 6). Nemhauser et al.'s argument then gives $MI(A_{\text{greedy}})\ge(1-1/e)(\text{OPT}-k\varepsilon)$ (Theorem 7).

## Overview

Plain greedy adds the single best next sensor. For a monotone submodular $F$ with $F(\emptyset)=0$ this is within $1-1/e\approx63\%$ of optimal. MI is *not* monotone globally ($MI(V)=0$, Fig. 6), so the paper proves approximate monotonicity for $|A|\le2k$, which is all the proof needs.

## Main Content

> [!definition] Greedy marginal gain (Eq. 6)
> With $\bar A=V\setminus(A\cup\{y\})$,
> $$
> MI(A\cup y)-MI(A)=H(y\mid A)-H(y\mid\bar A).
> $$
> By Eq. (5) maximising this is maximising the ratio $\delta_y=\dfrac{\sigma_y^2-\Sigma_{yA}\Sigma_{AA}^{-1}\Sigma_{Ay}}{\sigma_y^2-\Sigma_{y\bar A}\Sigma_{\bar A\bar A}^{-1}\Sigma_{\bar Ay}}$. Entropy keeps only the numerator; the denominator forces a "central" $y$ whose variance is small given everything not selected.
^def-greedy-gain

**Algorithm 1.** $A\leftarrow\emptyset$; for $j=1..k$: for each $y\in S\setminus A$ compute $\delta_y$; $y^*\leftarrow\arg\max\delta_y$; $A\leftarrow A\cup y^*$. Complexity $O(kn^4)$ for $n=|V|$ ($O(n^3)$ per conditional-variance computation, recomputed for all $y$, $k$ times).

> [!definition] Submodular set function
> $F$ is submodular if $F(A\cup B)+F(A\cap B)\le F(A)+F(B)$; equivalently for $A\subseteq A'$ and $y\notin A'$, $F(A\cup y)-F(A)\ge F(A'\cup y)-F(A')$ (diminishing returns).
^def-submodular

> [!theorem] Lemma 3
> $A\mapsto MI(A)$ is submodular.
^thm-mi-submodular

*Proof.* "Information never hurts": $H(y\mid A)\ge H(y\mid A\cup B)$, and similarly the term $H(y\mid\bar A)$ increases with the conditioning set shrinking, so $MI(A'\cup y)-MI(A')\le MI(A\cup y)-MI(A)$ whenever $A\subseteq A'$, for arbitrary sets (not only those the greedy algorithm visits).

> [!theorem] Theorem 4 (Nemhauser, Wolsey, Fisher, 1978)
> For monotone submodular $F$ over a finite $V$ with $F(\emptyset)=0$, greedy picks $A_G$ with $|A_G|=k$ and
> $$
> F(A_G)\ge\Big(1-\big(\tfrac{k-1}{k}\big)^k\Big)\text{OPT}\ge(1-1/e)\,\text{OPT}.
> $$
^thm-nemhauser

> [!theorem] Lemma 5 (approximate monotonicity)
> Let $X$ be a GP on a compact $C\subset\mathbb{R}^m$ with positive-definite continuous kernel $K:C\times C\to\mathbb{R}_0^+$ and sensor noise variance at least $\sigma^2$. For any $\varepsilon>0$ and any maximum number $k$ of sensors there is a discretisation $V=S\cup U$ of mesh width $\delta$ such that for all $A\subseteq S$, $|A|\le2k$, and all $y\in V\setminus A$: $MI(A\cup y)\ge MI(A)-\varepsilon$.
^thm-approx-monotone

*Proof sketch (App. A).* Fix $\varepsilon_1$ and use uniform continuity of $K$ to choose a mesh with $|K(x,y)-K(x',y')|\le\varepsilon_1$ whenever points move by at most $\delta_1$. Compare the grid $C_1$ with its translate $C_2$. Because sensor noise gives smallest eigenvalue at least $\sigma^2$, $\|\Sigma_{AA}^{-1}\|_2\le\sigma^{-2}$; bounding $\|\Sigma_{AA}^{-1}-\Sigma_{\tilde A\tilde A}^{-1}\|\le\sigma^{-4}k^2\varepsilon_1$ and $\|\Sigma_{XA}-\Sigma_{X\tilde A}\|\le\varepsilon_1\sqrt k$ yields $|\sigma^2_{X\mid A}-\sigma^2_{X\mid\tilde A}|\le\varepsilon_1(k\sigma^{-2}M^2+\sigma^{-2}k^2M)+O(\varepsilon_1^2)$ with $M=\max_xK(x,x)$. Picking $\delta$ so this is at most $\sigma^2\varepsilon$ bounds the entropy difference $H(X\mid A)-H(X\mid\tilde A)=\tfrac12\log(\sigma^2_{X\mid A}/\sigma^2_{X\mid\tilde A})$ by at most $\varepsilon$, which is what approximate monotonicity needs.

> [!theorem] Corollary 6 (Lipschitz kernels)
> If $K$ is Lipschitz with constant $L$, the required mesh width is
> $$
> \delta\le\frac{\varepsilon\sigma^6}{4kLM(\sigma^2+2k^2M+6k^2\sigma^2)},\qquad M=\max_xK(x,x),\ \varepsilon<\min(M,1).
> $$
> A polynomial discretisation suffices; the bound is worst-case (sensors arbitrarily close) and loose for spread-out placements.
^thm-lipschitz-mesh

> [!theorem] Theorem 7 (main guarantee)
> Under the assumptions of Lemma 5, Algorithm 1 selects $A$ with $|A|=k$ and
> $$
> MI(A)\ge(1-1/e)\,(\text{OPT}-k\varepsilon).
> $$
> It also gives an upper bound on OPT usable to judge other heuristics.
^thm-krause-main

*Proof sketch.* Nemhauser's proof, simplified by Jon Kleinberg: with $A_i$ the first $i$ greedy picks, $\delta_i=MI(A_i)-MI(A_{i-1})$ and $A^*$ optimal, Lemma 5 gives $MI(A_i\cup A^*)\ge MI(A^*)-k\varepsilon$, and submodularity gives $MI(A_i\cup A^*)\le MI(A_i)+k\delta_{i+1}$; the resulting recursion gives the bound.

## Examples

Verified 1-D comparison (60 points, SE kernel length 0.1, noise 0.1, $k=5$):

```python
import numpy as np
n = 60; x = np.linspace(0, 1, n); S = np.arange(n)
K = np.exp(-0.5*((x[:, None] - x[None, :])/0.1)**2); s2 = 0.1
Sig = K + s2*np.eye(n)                      # covariance of noisy observations
def cv(y, A):
    A = list(A)
    return Sig[y, y] if not A else Sig[y, y] - Sig[y, A] @ np.linalg.solve(Sig[np.ix_(A, A)], Sig[A, y])
def greedy(k, mi=True):
    A = []
    for _ in range(k):
        best = max(((cv(y, A)/cv(y, [j for j in S if j not in A and j != y]) if mi else cv(y, A)), y)
                   for y in S if y not in A)
        A.append(best[1])
    return sorted(int(a) for a in A)
print(greedy(5, True), greedy(5, False))
```

Output: MI `[2, 13, 29, 46, 57]`, entropy `[0, 11, 23, 41, 59]` (the latter includes both borders, 0 and 59). This illustrates Figure 4. (This implementation treats every grid point as both a candidate and a target, so $S=U=V$; the paper allows distinct $S$ and $U$.)

## Connections
- The same diminishing-returns structure is why **lazy greedy** is exact: [[Krause 2008 - Lazy Evaluation and Local Kernels]].
- A knowledge-gradient or entropy-search acquisition ([[Acquisition Functions]], [[Bayesian Optimisation]]) is a one-step cousin; MI placement is non-adaptive because variance does not depend on data.

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
