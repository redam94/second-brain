---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/chickering2002-GES-JMLR.md]]"
source_location: "Chickering (2002), JMLR 3:507-554"
date_ingested: 2026-09-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES causal discovery"
  - "Chickering 2002"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** causal
> discovery algorithm. It searches directly over **CPDAGs** (equivalence classes of DAGs) rather
> than individual DAGs, using a decomposable score like BIC or BDe. GES has two phases: a
> **forward** phase that greedily adds edges until no single addition improves the score, and a
> **backward** phase that greedily removes edges. Chickering proved (via the **Meek Conjecture**)
> that GES identifies the **correct CPDAG** in the large-sample limit — making it the first
> provably consistent score-based algorithm. It is generally considered more accurate than PC
> in finite samples.

## Overview

The problem of causal structure learning from observational data is NP-hard (Chickering 1996).
GES tackles this by restricting the search space: instead of searching over all $\binom{p}{2}$
edges one at a time in the full DAG space, it searches over **equivalence classes** of DAGs —
CPDAGs — using **local operators** (Insert and Delete) that guarantee moves within the
equivalence class space remain valid.

The score GES maximizes must be **Markov** (depends on the DAG through its Markov properties)
and **locally consistent** (the score prefers the true model over any submodel or supermodel).
The BIC and BDe scores satisfy these properties — making GES provably correct in the limit.

## Main Content

### Score: BIC and BDe

> [!definition] Definition: BIC Score (Score Equivalence + Decomposability)
> The **Bayesian Information Criterion** score for a DAG $G$ given data $\mathbf{X}$ is:
> $$\mathrm{BIC}(G) = \ell(G; \mathbf{X}) - \frac{\log n}{2} \cdot |G|$$
> where $\ell$ is the log-likelihood and $|G|$ is the number of free parameters.
>
> For a Gaussian linear SEM, the BIC score **decomposes** as:
> $$\mathrm{BIC}(G) = \sum_{j=1}^p \mathrm{BIC}(X_j \mid \mathrm{pa}_G(X_j))$$
> where each local term $\mathrm{BIC}(X_j \mid \mathrm{pa}_G(X_j))$ depends only on node $j$
> and its parents.
>
> **Score equivalence**: Markov-equivalent DAGs receive exactly the same BIC score — so the score
> is well-defined on equivalence classes (CPDAGs). The BDe score (Bayesian Dirichlet equivalent,
> for discrete data) shares this property.
^def-bic-ges

### Phase 1: Forward (Insert) Phase

> [!definition] Definition: GES Forward Phase (Chickering 2002, §4)
> **Input:** Start from the empty CPDAG $C_0 = $ (no edges).
>
> **Repeat until convergence:**
> - Find the edge insertion $\mathrm{Insert}(X, Y, T)$ that **maximally increases the BIC score**:
>   - $X \not\sim Y$ in current CPDAG $C$  
>   - $T \subseteq \mathrm{adj}(Y) \setminus \mathrm{adj}(X)$ is a subset of $Y$'s neighbors
>     that are adjacent to $Y$ but not $X$  
>   - The operator adds edge $X \to Y$ and orients $T \to Y$ (makes edges in $T$ toward $Y$)  
>   - A validity check ensures the resulting graph is still a CPDAG
> - If any such insertion increases the score: apply it, update $C$; else stop.
>
> **Output:** $C^*$ — a local maximum of the BIC score in the forward direction.
^algo-ges-forward

> [!note] Why search over CPDAGs rather than DAGs?
> The Insert operator is **closed** under the CPDAG space: applying Insert to a valid CPDAG
> yields another valid CPDAG. This means GES can guarantee it stays in the space of valid
> equivalence classes throughout — a key property that makes Chickering's correctness proof work.
> Direct DAG search (e.g., greedy hill-climbing) does not have this guarantee.

### Phase 2: Backward (Delete) Phase

> [!definition] Definition: GES Backward Phase (Chickering 2002, §5)
> **Input:** CPDAG $C^*$ from the forward phase.
>
> **Repeat until convergence:**
> - Find the edge deletion $\mathrm{Delete}(X, Y, H)$ that **maximally increases the BIC score**:
>   - $X \sim Y$ in current CPDAG (directed or undirected edge)  
>   - $H \subseteq \mathrm{adj}(X) \cap \mathrm{adj}(Y)$ is a subset of nodes adjacent to both  
>   - The operator removes edge $X - Y$ and orients $H \to Y$ (turns previously undirected
>     edges toward $Y$)  
>   - A validity check ensures the result is still a CPDAG
> - If any such deletion increases the score: apply it, update $C$; else stop.
>
> **Output:** $\widehat{C}$ — a CPDAG that is a local maximum in both directions.
^algo-ges-backward

> [!note] Why is the backward phase necessary?
> The forward phase adds edges greedily and may end up at an incorrect local maximum — a CPDAG
> that has too many edges (a *supermodel*) but scores well because the data is finite. The backward
> phase trims edges to remove superfluous ones. Together, the two phases implement a **two-pass
> greedy search** over the CPDAG space.

### Correctness: the Meek Conjecture

The central theoretical result that makes GES provably consistent is Chickering's proof of
the **Meek Conjecture** (conjectured by Meek 1997):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> Let $G$ and $H$ be DAGs on the same vertex set. If $H$ is an **independence map** of $G$
> (i.e., every d-separation in $H$ is also a d-separation in $G$), then there exists a finite
> sequence of **covered-edge reversals** transforming $G$ into some $G'$ where $G' \sim H$
> (i.e., $G'$ and $H$ are Markov equivalent).
>
> A **covered edge** $X \to Y$ is one where $\mathrm{pa}(Y) = \mathrm{pa}(X) \cup \{X\}$ (the
> parents of $Y$ are exactly the parents of $X$ plus $X$ itself).
^thm-meek-conjecture

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 17)
> Assume the data is generated by a faithful Gaussian distribution on a DAG $G^*$.
> As $n \to \infty$ (with the BIC penalty $\log n / 2$), GES returns the **true CPDAG**
> of $G^*$ with probability 1 — i.e., GES identifies the Markov equivalence class of the
> data-generating DAG.
>
> **Proof sketch:** The Meek Conjecture ensures the CPDAG space is "connected" in a precise
> sense: the forward and backward passes can navigate from any starting CPDAG to the truth via
> local Insert/Delete operators. The Markov + locally consistent score guarantees that each
> step toward the truth increases the score (in the population limit).
^thm-ges-consistency

### Complexity

> [!definition] GES Computational Complexity
> Let $p$ = number of nodes, $q$ = maximum degree of the true DAG, $n$ = sample size.
>
> - **Per Insert/Delete move**: score update takes $O(q^3)$ (matrix operations for the Gaussian
>   BIC, involving regressions of dimension $\leq q$). The score **decomposes** by node, so
>   only the changed local scores need recomputing.
> - **Number of moves per phase**: $O(p^2)$ candidate edges × $O(p^q)$ subsets $T$/$H$ —
>   exponential in $q$ in the worst case.
> - **For sparse graphs** ($q = O(\log p)$): polynomial in $p$.
> - **In practice**: GES with BIC runs in minutes on graphs with $p \leq 1000$ and sparse structure.
^def-ges-complexity

### Fges: the fast/parallel extension

> [!note] FGES (Fast GES)
> Ramsey et al. (2017) introduced **FGES** (Fast GES), a parallelized implementation in the
> TETRAD software that scales to $p = 1000$+ nodes. FGES exploits the decomposability of the
> score to update only affected local scores after each move, and parallelizes the search over
> candidate edges. `py-tetrad` (Python interface) and `causal-learn` implement FGES.

## Comparison with PC

| Aspect | PC | GES |
|--------|-----|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| Input | CI oracle or test | Decomposable score |
| Starting point | Complete graph, removes edges | Empty graph, adds then removes edges |
| Output | CPDAG | CPDAG |
| Consistency | Yes (Kalisch & Bühlmann 2007) | Yes (Chickering 2002) |
| Finite-sample accuracy | Lower (CI tests have error) | Higher (score avoids multiple testing) |
| Sensitivity to | Type I/II error rate $\alpha$ | Score penalty $\lambda = \frac{\log n}{2}$ |
| Sparse graphs | Scales well ($O(p^{q+2})$) | Scales well with FGES |
| Software | `pcalg::pc()`, `causal-learn` | `pcalg::ges()`, TETRAD/py-tetrad |

See [[Causal Structure Learning - Comparison]] for a fuller comparison including NOTEARS.

## Connections

- **NOTEARS (Zheng et al. 2018)** benchmarks against GES as one of the main baselines — see
  [[NOTEARS Experiments]] for the empirical comparison (GES is called "FGS" in that paper,
  referring to the TETRAD implementation).
- **Markov equivalence class**: GES outputs a CPDAG, not a DAG — the identifiability limit
  is the same as for PC. See [[Markov Equivalence Classes and CPDAGs]].
- **Score-based framing**: the BIC score is also used in [[DAG Structure Learning Problem]]
  as program (4) — GES is the leading practical solver for that combinatorial program.
- **Relation to model selection**: BIC score connects to [[Overfitting and Information Criteria]]
  — the penalty $\frac{\log n}{2}$ is the standard BIC complexity penalty.

## See Also
- [[PC Algorithm]] — constraint-based counterpart with the same CPDAG output
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG that GES returns
- [[Causal Structure Learning - Comparison]] — PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — the combinatorial program GES approximately solves
- [[NOTEARS Experiments]] — empirical benchmark comparing GES (FGS) and NOTEARS
