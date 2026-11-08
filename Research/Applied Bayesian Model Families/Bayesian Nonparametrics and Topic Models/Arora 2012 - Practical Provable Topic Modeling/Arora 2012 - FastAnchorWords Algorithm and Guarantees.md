---
title: "Arora 2012 - FastAnchorWords Algorithm and Guarantees"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Sec. 4 (Defs 4.1-4.2, Thm 4.3, Alg. 4, Lemmas 4.4-4.6), Appendix A-B (Lemmas A.1-A.5, Thm A.6, Lemma B.1, Thm B.2), pp. 5-6, 10-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
depends_on:
  - "[[Arora 2012 - Separability and Anchor Words]]"
used_by:
  - "[[Arora 2012 - Experiments and Evaluation Metrics]]"
aliases:
  - "FastAnchorWords"
  - "gamma-robust simplex"
  - "anchor selection farthest point"
---

# Arora 2012 - FastAnchorWords Algorithm and Guarantees

> [!summary]
> FastAnchorWords greedily picks the point farthest from the span of those already chosen (after a random projection to $4\log V/\epsilon^2$ dimensions), then runs a clean-up pass. For a $\gamma$-robust simplex perturbed by at most $\epsilon$, it outputs $K$ points that $O(\epsilon/\gamma)$-cover the vertices in $\tilde O(V^2+VK/\epsilon^2)$ time, avoiding all linear programs.

## Main Content

> [!definition] $\gamma$-robust simplex and $\epsilon$-covering (Defs 4.1-4.2)
> A simplex $P$ is **$\gamma$-robust** if for every vertex $v$ the $\ell_2$ distance from $v$ to the convex hull of the other vertices is at least $\gamma$. A point $a_i$ **$\epsilon$-covers** vertex $v_j$ if writing $a_i=\sum_jc_jv_j$ (convex combination), $c_j\ge1-\epsilon$; a set of $K$ points $\epsilon$-covers the vertices if each vertex is $\epsilon$-covered by some point.

^def-gamma-robust

> [!theorem] Anchor finding (Thm 4.3)
> Let $A=\{a_1,\dots,a_V\}$ have convex hull a $\gamma$-robust simplex with vertices $v_1,\dots,v_K\in A$, and let $d_i$ satisfy $\Vert a_i-d_i\Vert\le\epsilon$. If $20K\epsilon/\gamma^2<\gamma$, FastAnchorWords runs in $\tilde O(V^2+VK/\epsilon^2)$ and outputs a subset of $\{d_i\}$ of size $K$ that $O(\epsilon/\gamma)$-covers the vertices.

^thm-fast-anchor

**Algorithm 4.** (1) Project points to a random $4\log V/\epsilon^2$-dimensional subspace (in practice dimension 1000 is used: runtime $O(V^2+1000VK)$). (2) $S\leftarrow\{d_i$ farthest from the origin$\}$. (3) For $i=1..K-1$: add the point with the largest distance to $\text{span}(S)$ (distance = norm of projection onto the orthogonal complement). (4) Clean-up: for each $i$, replace $v_i'$ by the point farthest from $\text{span}(\{v'\}\setminus v_i')$. This greedily maximises simplex volume; the larger the volume the more words per document the model can explain.

**Lemmas (proof ideas).** Suppose $S$ contains $k$ points, each $\delta$-close to distinct vertices, $\delta<\gamma/20K$.
- *Lemma 4.4 (A.1)*: some vertex is at distance at least $\gamma/2$ from $\text{span}(S)$ - a volume argument; simplex volume is proportional to a determinant of edge vectors, and Lemma A.3 gives $\text{vol}(S)(1-2\delta/\gamma)^{K-1}\le\text{vol}(S')\le\text{vol}(S)(1+4\delta/\gamma)^{K-1}$ for perturbations $\Vert v_i'-v_i\Vert\le\delta$ with $10\sqrt K\delta<\gamma$ (via Claim A.4: $\det(A+E)/\det(A)\ge(1-\delta/\gamma)^K$).
- *Lemma 4.5 (A.2)*: the point found is $\delta=O(\epsilon/\gamma^2)$-close to a vertex; the new $\delta$ depends on $\epsilon,\gamma$ only, not the previous $\delta$, so errors do not compound exponentially.
- *Lemma 4.6*: after $K-1$ points, the cleanup finds the missing vertex within $1-O(\epsilon/\gamma)$.

**Recovery guarantee (App. B).** *Lemma B.1*: for a $\gamma$-robust simplex with perturbed vertices (error $\delta_1$) and point (error $\delta_2$), representation coefficients change by at most $4(\delta_1+\delta_2)/\gamma$ when $10\sqrt K\delta_1\le\gamma$.

> [!theorem] Sample complexity of FastAnchorWords + RecoverL2 (Thm B.2)
> With $M\ge\max\{O(aK^3\log V/D(\gamma p)^6),\ O((aK)^3\log V/D^3(\gamma p)^4)\}$ documents (up to $\epsilon$-dependent factors that are garbled in the text extraction of the PDF; check the appendix of the PDF for exact exponents) the algorithm learns $A$ with entry-wise error at most $\epsilon$.

^thm-sample-complexity

Related work: separability = "pure pixel" assumption in hyperspectral unmixing; VCA (no cleanup) and N-FINDR (greedy volume) are similar but only proven in the infinite-data case; Thurau et al. 2010 and Kumar et al. 2012 use NMF under separability but need the term-document matrix to approximate its expectation, which fails for short documents - working with the Gram matrix $Q$ avoids this.

## Examples
> [!example] Greedy farthest-point on a triangle
> $K=3$ vertices at $(0,0),(1,0),(0,1)$ with 20 interior points. Start: farthest from the origin in the projected rows is a vertex; the second step picks the point farthest from that vertex's span (another vertex); the third picks the point farthest from the plane/line spanned by the two (the remaining vertex). Interior points are never farthest because distances from a subspace are convex in the point. See code in [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]].

^ex-farthest-point

## Connections
[[Arora 2012 - Separability and Anchor Words]], [[Concept - Topic Model Evaluation and Stability]] (stability across restarts: anchors are deterministic).

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]]
