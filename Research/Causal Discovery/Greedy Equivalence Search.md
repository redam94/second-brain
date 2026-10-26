---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.txt]]"
source_location: "Full paper: Chickering (2002) JMLR 3:507-554"
date_ingested: 2026-10-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FES"
  - "BES"
  - "Chickering 2002"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** approach
> to causal structure learning. Rather than searching over individual DAGs, GES searches over
> **Markov equivalence classes** (represented as CPDAGs), using a decomposable score (e.g. BIC).
> It proceeds in two greedy phases: **Forward Equivalence Search (FES)** adds edges to
> maximize score; **Backward Equivalence Search (BES)** removes edges to maximize score.
> Under Faithfulness and a consistent scoring function, GES is **provably consistent** —
> it returns the true CPDAG in the limit. Its proof rests on Chickering's proof of the
> **Meek Conjecture**, which establishes that the CPDAG space is connected under the
> Insert/Delete operators.

## Overview

The **score-based** paradigm for structure learning optimizes a global goodness-of-fit
score $Q(G, \mathbf{X})$ over DAGs or equivalence classes. The canonical score is
**BIC** (Bayesian Information Criterion):
$$\mathrm{BIC}(G, \mathbf{X}) = \ell(\hat\theta_G; \mathbf{X}) - \frac{\log n}{2} |G|,$$
where $\ell$ is the log-likelihood under the MLE parameters, and $|G|$ is the number of
parameters (edges for a linear Gaussian model). BIC is **consistent**: it identifies the
true model with high probability as $n \to \infty$.

The key challenge is that there are $O(2^{d^2})$ DAGs — exponential in $d^2$. GES avoids
explicit search over individual DAGs by working directly in **equivalence class space**,
using the structural characterization from [[Markov Equivalence Classes and CPDAGs]].

## Main Content

### Scoring Functions

GES requires a **decomposable** (or local) score: a score that factors over nodes as
$$Q(G, \mathbf{X}) = \sum_{j=1}^{d} s(X_j, \mathrm{pa}_G(X_j), \mathbf{X}),$$
where $s(X_j, \mathrm{pa}_G(X_j), \mathbf{X})$ is the local score for $X_j$ given its
parents in $G$.

> [!definition] Definition: Decomposable Score
> A score $Q$ is **decomposable** if it factors node-by-node as above. Common choices:
> - **BIC (Gaussian):** $s(X_j, \mathrm{pa}_G(X_j)) = -\frac{n}{2}\log \hat\sigma_j^2 - \frac{\log n}{2}(|\mathrm{pa}_G(X_j)| + 1)$, where $\hat\sigma_j^2$ is the residual variance of regressing $X_j$ on its parents.
> - **BDe(u) (discrete):** Bayesian Dirichlet score with equivalent sample size $u$; consistent Bayesian score for discrete data (Heckerman et al. 1995).
> - **BGe (Gaussian):** Bayesian Gaussian equivalent score (Geiger & Heckerman 1994); the Bayesian analogue of BIC for continuous data.
>
> Decomposability is crucial: it allows the score change from inserting or deleting an
> edge to be computed *locally* (affecting only the target node's local score), avoiding
> recomputation of the full graph score.
^def-decomposable-score

### Phase 1: Forward Equivalence Search (FES)

> [!theorem] FES Phase (Chickering 2002, §4)
> **Input:** Data $\mathbf{X}$; scoring function $Q$; start from the empty CPDAG $\mathcal{G}^* = \emptyset$.
> **Output:** A CPDAG $\mathcal{G}^*_\mathrm{fwd}$ that is a local maximum of $Q$ under edge insertions.
>
> **Repeat** until no single **Insert** operator improves the score:
> 1. For each valid **Insert$(X, Y, H)$** operator (defined below):
>    - Compute the score change $\Delta(X, Y, H) = Q(\mathcal{G}^*_\mathrm{new}) - Q(\mathcal{G}^*)$.
> 2. Find the operator with the maximum $\Delta$; if $\Delta > 0$, apply it.
>
> The Insert operator adds a directed edge $X \to Y$ and orients a subset $H$ of $Y$'s
> undirected neighbors toward $Y$, then applies Meek rules to complete the CPDAG.
>
> **Invariant:** At each step, the current $\mathcal{G}^*$ is a valid CPDAG (satisfies all
> CPDAG structural constraints).
^alg-fes

### Phase 2: Backward Equivalence Search (BES)

> [!theorem] BES Phase (Chickering 2002, §5)
> **Input:** CPDAG $\mathcal{G}^*_\mathrm{fwd}$ from FES.
> **Output:** A CPDAG $\mathcal{G}^*_\mathrm{final}$ that is a local maximum under both
>   insertions and deletions.
>
> **Repeat** until no single **Delete** operator improves the score:
> 1. For each valid **Delete$(X, Y, H)$** operator:
>    - Compute the score change $\Delta(X, Y, H) = Q(\mathcal{G}^*_\mathrm{new}) - Q(\mathcal{G}^*)$.
> 2. Find the operator with the maximum $\Delta$; if $\Delta > 0$, apply it.
>
> The Delete operator removes an edge (directed or undirected) between $X$ and $Y$,
> undirects a subset $H$ of $Y$'s neighbors that were directed toward $Y$, then applies
> Meek rules.
>
> **Significance:** BES is needed to recover from suboptimal forward choices. Without BES,
> GES would be a pure greedy hill-climb and could get stuck at a CPDAG that is a forward
> local maximum but not a global maximum.
^alg-bes

### The Insert and Delete Operators

Chickering (2002) defines these operators carefully so that they map between valid CPDAGs:

> [!definition] Definition: Insert Operator $(X, Y, H)$
> Given a CPDAG $\mathcal{G}^*$ where $X$ and $Y$ are **not** adjacent, and $H$ is a
> subset of $\mathrm{undirNeighbors}(Y) \cap \mathrm{clique}(X \cup \mathrm{undirNeighbors}(Y))$:
> 1. Insert directed edge $X \to Y$.
> 2. For each $Z \in H$: orient $Z \to Y$ (making $Z$ a non-neighbor parent of $Y$).
> 3. Apply Meek rules to complete the CPDAG.
>
> The score change decomposes locally: $\Delta(X, Y, H) = s(Y, \mathrm{pa}(Y) \cup \{X\} \cup H) - s(Y, \mathrm{pa}(Y) \cup H)$.
^def-insert-operator

> [!definition] Definition: Delete Operator $(X, Y, H)$
> Given a CPDAG $\mathcal{G}^*$ where $X$ and $Y$ **are** adjacent, and $H$ is a subset of
> $\mathrm{undirNeighbors}(Y)$ that are also neighbors of $X$:
> 1. Delete edge between $X$ and $Y$.
> 2. For each $Z \in H$: orient $Z \to Y$.
> 3. Apply Meek rules to complete the CPDAG.
>
> The score change: $\Delta(X, Y, H) = s(Y, \mathrm{pa}(Y) \setminus \{X\} \cup H) - s(Y, \mathrm{pa}(Y) \cup H)$.
^def-delete-operator

### Consistency Theorem

The core theoretical result of Chickering (2002):

> [!theorem] Theorem: GES Consistency (Chickering 2002, Thm. 15)
> Under:
> 1. **Faithfulness** (the true distribution is faithful to the true DAG $G^*$),
> 2. **Causal sufficiency** (no unmeasured confounders),
> 3. A **consistent** scoring function (BIC or BGe satisfy this for large $n$),
>
> GES returns the CPDAG of the true DAG $G^*$ with probability approaching 1 as $n \to \infty$.
>
> **Proof structure:** The Meek Conjecture (proved earlier in the same paper — see
> [[Markov Equivalence Classes and CPDAGs#^thm-meek-conjecture]]) establishes that the
> CPDAG space is connected under Insert/Delete operators. This connectivity, combined with
> the consistency of the score, ensures:
> - FES reaches the true equivalence class's CPDAG (or one with strictly higher score,
>   which the consistent score rules out asymptotically),
> - BES then prunes extraneous edges.
^thm-ges-consistency

### Computational Complexity

> [!note] Complexity
> The per-step cost of evaluating each Insert/Delete operator is dominated by the local
> score computation. For Gaussian BIC with maximum in-degree $q$:
> - Each local score requires a linear regression of $X_j$ on $|\mathrm{pa}(X_j)|$ parents: $O(n q^2)$ per node.
> - Number of candidates per step: $O(d^2 \cdot 2^q)$ in the worst case; in practice much smaller.
>
> GES is substantially faster than exact methods (GOBNILP) and competitive with PC on
> sparse graphs. The **FGES** (Fast GES) variant (Ramsey et al. 2017) uses parallelism and
> caching to scale to thousands of variables.

## Comparison with PC Algorithm

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| **Primitive operation** | Conditional independence test | Local score improvement |
| **Paradigm** | Constraint-based | Score-based |
| **Output** | CPDAG | CPDAG |
| **Assumptions** | Faithfulness + Causal Sufficiency | Faithfulness + Causal Sufficiency + consistent score |
| **Order dependence** | Yes (original); fixed in PC-stable | None (score-based) |
| **Handles nonlinear?** | Yes (with nonlinear CI tests, e.g. KCI) | Limited (requires score for nonlinear models) |
| **High-dimensional** | Yes (sparse faithfulness; Kalisch & Bühlmann 2007) | More difficult without sparsity; FGES helps |
| **Software** | `pcalg::pc()`, `causal-learn` | `pcalg::ges()`, `causal-learn`, TETRAD |

In NOTEARS's experiments ([[NOTEARS Experiments]]), GES (called FGS in the paper) was used
as a primary baseline. NOTEARS outperformed GES on dense graphs because GES's local
search can get stuck; on sparse graphs their performance is comparable.

## Extensions

- **RFCI-GES / GFCI** (Ogarrio et al. 2016): hybrid combining FCI's latent-confounder
  handling with GES's score search for efficiency.
- **FGES** (Ramsey et al. 2017): parallelized GES for $d$ up to thousands; uses score
  caching and multi-threaded operator evaluation.
- **Penalized GES**: Replace BIC with a cross-validated penalized score for tuning.
- **Bayesian GES**: Replace BIC with BGe for full Bayesian structure learning (Geiger &
  Heckerman 1994).

## Software

- **pcalg** (R): `ges()` function; `fges()` for the fast variant. Available on CRAN.
- **causal-learn** (Python): `GES()` class.
- **TETRAD** (Java, CMU): Full GUI with FGES implementation.
- **CausalDiscoveryToolbox** (Python): wraps multiple algorithms including GES.

## Connections

- [[Markov Equivalence Classes and CPDAGs]] — GES operates *in* CPDAG space; the Meek
  Conjecture (proved in Chickering 2002) establishes that this space is connected under
  Insert/Delete operators
- [[PC Algorithm]] — constraint-based counterpart; PC uses CI tests while GES uses a score;
  both return a CPDAG
- [[NOTEARS - Overview]] — continuous-optimization alternative; NOTEARS uses GES
  (as FGS) as a key baseline in its experiments ([[NOTEARS Experiments]])
- [[DAG Structure Learning Problem]] — GES appears in the "local/approximate search" row
  of the landscape table
- [[Method of Simulated Moments]] — [[Structural Estimation of ABMs via SMM]] gap: GES
  could be applied to ABM output data to learn causal structure before or alongside SMM calibration

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — CPDAGs, Meek rules, and the Meek Conjecture
- [[PC Algorithm]] — constraint-based counterpart
- [[DAG Structure Learning Problem]] — problem setup
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
