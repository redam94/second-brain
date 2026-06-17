---
title: "Smooth Characterization of Acyclicity"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/theorem
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§3 A new characterization of acyclicity, pp. 5-7"
date_ingested: 2026-06-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Algorithm]]"
aliases:
  - "Trace exponential acyclicity"
  - "h(W) acyclicity constraint"
  - "NOTEARS Theorem 1"
  - "Matrix exponential DAG characterization"
---

# Smooth Characterization of Acyclicity

> [!summary]
> The **central technical contribution** of NOTEARS. It constructs a function
> $h : \mathbb{R}^{d\times d} \to \mathbb{R}$ whose zero level set **exactly** characterizes
> acyclic graphs and which is **smooth** with an easily computed gradient:
> $$h(W) = \mathrm{tr}\!\big(e^{W\circ W}\big) - d = 0 \iff W \text{ is a DAG}.$$
> The construction proceeds in two steps — first for binary matrices via the **matrix
> exponential** (Prop. 2), then extended to real weighted matrices via the **Hadamard
> product** $W\circ W$ (Theorem 1). This replaces the combinatorial DAG constraint with a
> single smooth equality constraint, making program (3) amenable to black-box optimization.

## Overview

To make program (3) (see [[DAG Structure Learning Problem]]) solvable by standard optimizers,
NOTEARS replaces the combinatorial constraint $\mathsf{G}(W)\in\mathbb{D}$ with one smooth
equality constraint $h(W)=0$. The function $h$ must satisfy four **desiderata**:

> [!definition] Desiderata for the acyclicity function $h$ (NOTEARS §3)
> (a) $h(W) = 0$ **if and only if** $W$ is acyclic ($\mathsf{G}(W) \in \mathbb{D}$);
> (b) the values of $h$ **quantify the "DAG-ness"** of the graph (how far from acyclic);
> (c) $h$ is **smooth**;
> (d) $h$ and its derivatives are **easy to compute**.
>
> Property (b) is useful for diagnostics. Naïve "distance to $\mathbb{D}$" notions (e.g. min
> $\ell_2$ distance, or sum of edge weights on cyclic paths) violate (c) [non-smooth] or (d) [hard].
^def-desiderata

The build-up: **Prop. 1** (infinite series, conceptually clean but needs spectral radius $<1$)
→ **Prop. 2** (matrix exponential, numerically stable, but binary/discrete domain) → **Theorem 1**
(real matrices, satisfies all of (a)–(d)).

## Main Content

### Step 1 — Binary adjacency matrices

> [!theorem] Proposition 1: Infinite-series characterization (NOTEARS §3.1, Eq. 5)
> Suppose $B \in \{0,1\}^{d\times d}$ and its **spectral radius** $r(B) < 1$. Then $B$ is a DAG
> if and only if
> $$\mathrm{tr}\,(I-B)^{-1} = d.$$
>
> **Proof.** The fact that $\mathrm{tr}\,B^k$ counts the number of **length-$k$ closed walks** in
> the directed graph. An acyclic graph has $\mathrm{tr}\,B^k = 0$ for all $k = 1,\dots,\infty$.
> So $B$ has no cycles iff $f(B)=\sum_{k=1}^{\infty}\sum_{i=1}^{d}(B^k)_{ii} = 0$. Then since
> $r(B)<1$ the Neumann series converges:
> $$\mathrm{tr}\,(I-B)^{-1} = \mathrm{tr}\sum_{k=0}^{\infty} B^k = \mathrm{tr}\,I + \sum_{k=1}^{\infty}\mathrm{tr}\,B^k = d + \sum_{k=1}^{\infty}\sum_{i=1}^{d}(B^k)_{ii} = d + f(B).$$
> The result follows. $\square$
^thm-prop1

> [!warning] Why Prop. 1 is impractical
> The condition $r(B)<1$ is **strong** — automatically true for DAGs but false in general, and
> projecting onto it is nontrivial. Using a *finite* series $\sum_{k=1}^{d}\mathrm{tr}\,B^k = 0$
> avoids the spectral-radius condition but is **numerically unstable**: entries of $B^k$ can
> exceed machine precision for even small $d$. A characterization that is *both* universally valid
> *and* numerically stable is needed.

> [!theorem] Proposition 2: Matrix-exponential characterization (NOTEARS §3.1, Eq. 6)
> A binary matrix $B \in \{0,1\}^{d\times d}$ is a DAG **if and only if**
> $$\mathrm{tr}\,e^{B} = d.$$
>
> **Proof.** As in Prop. 1, $B$ has no cycles iff $(B^k)_{ii}=0$ for all $k\ge 1$ and all $i$,
> which holds iff $\sum_{k=1}^{\infty}\sum_{i=1}^{d}(B^k)_{ii}/k! = \mathrm{tr}\,e^{B} - d = 0$. $\square$
^thm-prop2

> [!note] Why the matrix exponential is the right tool
> The matrix exponential $e^B = \sum_{k=0}^\infty B^k/k!$ is **well-defined for all square matrices**
> (everywhere convergent). The added bonus over $\mathrm{tr}(I-B)^{-1}$: the factor $1/k!$
> **re-weights** the count of length-$k$ closed walks, taming the rapid (ill-conditioned) growth
> of $\mathrm{tr}(I-B)^{-1}$ as the number of edges grows with $d$. Still, Prop. 2 is defined on a
> **discrete** domain $\{0,1\}^{d\times d}$, so it is not yet smooth.

### Step 2 — Real weighted matrices (the main result)

The characterization $\mathrm{tr}\,e^{B}=d$ fails for an arbitrary real $W$, but **holds for any
nonnegative weighted matrix** (the same proof goes through). To handle both signs, replace $W$ by
the **Hadamard product** $W \circ W$ (entrywise $w_{ij}^2 \ge 0$):

> [!theorem] Theorem 1: Smooth acyclicity characterization (NOTEARS §3.2, Eqs. 7-8)
> A matrix $W \in \mathbb{R}^{d\times d}$ is a DAG **if and only if**
> $$h(W) = \mathrm{tr}\!\big(e^{W\circ W}\big) - d = 0,$$
> where $\circ$ is the Hadamard (entrywise) product and $e^{A}$ is the matrix exponential.
> Moreover, $h$ has the **simple gradient**
> $$\nabla h(W) = \big(e^{W\circ W}\big)^{T} \circ 2W,$$
> and **satisfies all desiderata (a)–(d)**.
^thm-theorem1

> [!note] Proof idea & interpretation
> The proof of (7) mirrors (6); desiderata (c)–(d) follow from the gradient (8). For (b): the power
> series of $\mathrm{tr}(B + B^2 + \cdots)$ counts closed walks in $B$; replacing $B$ with $W\circ W$
> counts **weighted** closed walks where each edge has weight $w_{ij}^2$. Thus larger
> $h(W) > h(W')$ means either (a) $W$ has more cycles than $W'$, or (b) the cycles in $W$ are more
> heavily weighted. Also $h(W) \ge 0$ for all $W$ (every series term is nonnegative), so the space
> of DAGs is exactly the set of **global minima** of $h$.

### Computational and theoretical takeaways

- **Cost**: evaluating $h$ and $\nabla h$ only requires a **matrix exponential**, computable in
  $O(d^3)$ via well-studied scaling-and-squaring algorithms ([Al-Mohy & Higham, 2009]), available
  in any scientific-computing library. This $O(d^3)$ cost is the main computational bottleneck of NOTEARS.
- **Stationarity caveat**: because $h$ is nonconvex, $h(W)=0$ is **not** equivalent to the
  first-order condition $\nabla h(W) = 0$ — so a black-box solver finds *stationary points*, not
  guaranteed global minima.
- **Novelty**: the link between traces of matrix powers and graph cycles is classical
  ([Harary & Manvel, 1971]), but the authors note this *smooth* characterization of acyclicity had
  **not appeared in the DAG-learning literature** before.

## Examples

> [!example] Why $W\circ W$ and not $W$ (sign cancellation)
> **Setup.** Consider a 2-cycle $1\to 2 \to 1$ with weights $w_{12}=+1$, $w_{21}=-1$.
>
> **Problem with raw $W$.** A length-2 closed walk contributes $w_{12}\,w_{21} = (+1)(-1) = -1$ to
> $\mathrm{tr}\,W^2$. Negative and positive cycle contributions can **cancel**, so $\mathrm{tr}\,e^{W}=d$
> could hold even when a cycle exists — the characterization breaks for signed matrices.
>
> **Fix.** Using $W\circ W$ the same walk contributes $w_{12}^2\,w_{21}^2 = (1)(1) = 1 > 0$. All
> cyclic contributions are **strictly positive**, so $h(W)=\mathrm{tr}\,e^{W\circ W}-d > 0$ exactly
> when a cycle is present and $=0$ exactly when acyclic.
>
> **Interpretation.** Squaring the entries makes the "weighted closed-walk count" a faithful, sign-
> insensitive cycle detector — recovering desideratum (a) over all of $\mathbb{R}^{d\times d}$.

## Connections

- **Enables the optimization**: with $h$ smooth, the DAG constraint becomes the equality-constrained
  program (ECP) solved in [[NOTEARS Algorithm]].
- **Quantifies DAG-ness**: property (b) underwrites the **thresholding** step in the algorithm —
  near-machine-precision $h(\widetilde W)\le\epsilon$ leaves only tiny cycle-inducing edges, removable
  by a small threshold.
- **Foundational influence**: this trace-exponential trick seeded a family of later "differentiable
  DAG learning" methods (DAG-GNN, GraN-DAG, GOLEM) — see [[NOTEARS - Overview]].

## See Also
- [[DAG Structure Learning Problem]] — the constraint $\mathsf{G}(W)\in\mathbb{D}$ this note smooths
- [[NOTEARS Algorithm]] — uses $h(W)$ and $\nabla h(W)$ inside an augmented Lagrangian
- [[NOTEARS - Overview]] — paper-level context
