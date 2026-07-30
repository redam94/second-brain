---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-survey.md]]"
source_location: "§3, Chickering (2002) JMLR 3:507–554"
date_ingested: 2026-07-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGS"
  - "Fast GES"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the foundational **score-based**
> method for causal structure learning. Rather than testing conditional independence (as
> [[PC Algorithm]] does), GES optimizes a **decomposable score** (BIC or BGe) over the
> space of Markov equivalence classes (**CPDAGs**) using a greedy two-phase search:
> a forward phase that adds edges (FES) and a backward phase that removes them (BES).
> Chickering proves the **Meek Conjecture** — that the forward greedy path through CPDAG
> space is not trapped in bad local optima — making GES **provably consistent** under
> faithfulness in the limit $n \to \infty$. **FGS** (Fast GES, Ramsey et al. 2017)
> extends it to thousands of variables.

## Overview

GES occupies the "score-based / local search" row in the [[DAG Structure Learning Problem]]
landscape. While [[PC Algorithm]] reads off the structure from CI tests, GES optimizes a
BIC-type criterion: it asks "which CPDAG maximizes the penalized likelihood?" Unlike
naive score-based search over DAGs (which would require visiting a superexponential number
of graphs), GES searches the *CPDAG space* — a much smaller quotient space where each
node represents an equivalence class — using carefully defined local operators.

The output is a **CPDAG** (see [[Markov Equivalence and CPDAGs]]) — GES does not and
cannot identify a single DAG from observational Gaussian data.

## Main Content

### Score function

> [!definition] Definition: Decomposable score (Chickering 2002, §3)
> A score $S$ is **decomposable** if it factors over nodes:
> $$S(G; \mathbf{X}) = \sum_{i=1}^{d} S_i\bigl(X_i,\, \mathrm{Pa}_i(G);\, \mathbf{X}\bigr),$$
> where $S_i(X_i, \mathrm{Pa}_i(G); \mathbf{X})$ depends only on node $X_i$ and its parent
> set in $G$.
>
> Decomposability enables **local** score updates: when adding or removing a single edge,
> only the scores of the affected nodes need to be recomputed.
^def-decomposable-score

**BIC score** (standard choice for Gaussian data):
$$S_{\mathrm{BIC}}(G; \mathbf{X}) = -2 \log L(\hat\theta_{G}; \mathbf{X}) + |\mathrm{Pa}(G)|\, \log n,$$
where $|\mathrm{Pa}(G)|$ is the total number of edges (parameters). Maximizing $S_{\mathrm{BIC}}$
(or equivalently minimizing the negative BIC) balances fit against complexity.

**BGe score** (Bayesian Gaussian equivalent; Geiger & Heckerman 2002): assigns a marginal
likelihood to each DAG under a conjugate normal-Wishart prior, then normalizes. The BGe
score is score-equivalent (equal score for all DAGs in the same equivalence class), which
is required for correctness in GES.

### CPDAG space and local operators

GES moves through CPDAG space via two operators on edges. Each operator corresponds to a
local structural change that keeps the graph in the space of valid CPDAGs.

> [!definition] Definition: Insert and Delete operators (Chickering 2002, Definitions 12–15)
> - **Insert$(X, Y, T)$**: Add edge $X \to Y$, plus edges $T_i \to Y$ for each $T_i \in T \subseteq \mathrm{Ne}(Y)$
>   (where $\mathrm{Ne}(Y)$ is the set of neighbors — undirected adjacencies — of $Y$ in the current CPDAG).
>   This corresponds to inserting $X \to Y$ while preserving the CPDAG property.
>
> - **Delete$(X, Y, H)$**: Remove the edge between $X$ and $Y$, and direct $H_i \to Y$ for each $H_i \in H \subseteq \mathrm{Ne}(Y)$.
>   This corresponds to deleting $X \to Y$ (or $X - Y$) while preserving the CPDAG property.
^def-operators

Each valid Insert/Delete choice produces another valid CPDAG. The score change for each
move can be computed in $O(d)$ time using the decomposability of $S$.

### The three phases of GES

> [!theorem] GES Algorithm (Chickering 2002, Algorithm 1)
> **Input**: Data $\mathbf{X}$; decomposable score $S$.
> **Output**: Estimated CPDAG $\hat{C}$.
>
> #### Phase 1: Forward Equivalence Search (FES)
> 1. Initialize $\hat{C} \leftarrow$ empty CPDAG (no edges).
> 2. Repeat:
>    a. Find $\mathrm{Insert}^*(X^*, Y^*, T^*)$ maximizing the score improvement $\Delta S > 0$.
>    b. Apply the insert; update $\hat{C}$.
> 3. Until no insert improves $S$. (FES CPDAG)
>
> #### Phase 2: Backward Equivalence Search (BES)
> 4. Starting from FES CPDAG:
> 5. Repeat:
>    a. Find $\mathrm{Delete}^*(X^*, Y^*, H^*)$ maximizing the score improvement $\Delta S > 0$.
>    b. Apply the delete; update $\hat{C}$.
> 6. Until no delete improves $S$.
>
> Return final $\hat{C}$.
^thm-ges

### The Meek Conjecture and consistency

The consistency of GES rests on Chickering's proof of the **Meek Conjecture** — the
deepest theoretical result in this area.

> [!theorem] Meek Conjecture (Proved: Chickering 2002, Theorem 15)
> Let $G$ be any DAG and $H$ be any DAG such that $H$ is an **independence map (I-map)**
> of $G$ (i.e. the independence model of $G$ is a *subset* of the independence model of $H$
> — $H$ is "more independent" than $G$). Then there exists a finite sequence of:
> - **Covered edge reversals** in $G$ (reversing edge $X \to Y$ where $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$), AND
> - **Edge insertions**,
>
> transforming $G$ into a DAG in the equivalence class of $H$, such that each step is a
> valid Insert operator and the score improves at each step (under any consistent scoring
> criterion with $n$ large enough).
^thm-meek-conjecture

**Significance**: The Meek Conjecture guarantees that GES's greedy local search does not
get trapped in local optima. Starting from the empty graph, FES greedily climbs through
CPDAG space, and the Meek Conjecture ensures this path reaches the equivalence class of
the true DAG (or a strict supergraph thereof) as $n \to \infty$.

> [!theorem] GES Consistency (Chickering 2002, Theorems 12–15)
> Under faithfulness, causal sufficiency, and a consistent scoring criterion:
>
> 1. **After FES**: The estimated CPDAG $\hat{C}_{\mathrm{FES}}$ satisfies
>    $G^* \subseteq_{\text{I-map}} \hat{C}_{\mathrm{FES}}$ (the true DAG is a subgraph of the
>    estimated one in the I-map sense — FES may add spurious edges but misses none).
>
> 2. **After BES**: The estimated CPDAG $\hat{C}$ equals the true CPDAG $C^*$ as $n \to \infty$.
>
> The two-phase structure is essential: FES overshoots (adds too many edges), BES prunes
> spurious ones. Both phases are needed for exact recovery.
^thm-consistency

### Why forward then backward?

The intuition for the FES+BES structure:

- **FES from empty graph**: Starting empty ensures no spurious edges survive the initial
  forward search — only edges that genuinely improve the score are added. But under finite
  samples, BIC may not penalize complexity strongly enough, so some false edges slip through.
- **BES from FES output**: BES removes edges that are penalized by BIC once the rest of
  the graph is in place. Under infinite data, BES removes all and only the spurious edges
  added by FES.
- **Alternative starting point**: Some implementations run GES from a non-empty starting
  CPDAG (e.g. output of another algorithm), though theoretical guarantees are weaker there.

### FGS: Fast Greedy Equivalence Search

> [!note] FGS (Ramsey et al. 2017)
> **Fast GES (FGS)** makes GES practical for $d$ up to thousands by:
> 1. **Priority queues** for Insert/Delete candidates — avoids recomputing all $O(d^2)$
>    pairs at each step; only re-evaluates pairs affected by the last move.
> 2. **Parallelization** of the inner loop over candidate operators.
> 3. **Pruning** based on sub-additivity of the score change.
>
> FGS is the primary baseline in the NOTEARS experiments (see [[NOTEARS Experiments]]),
> labeled "FGS" throughout. Implemented in the Tetrad software (CMU) and `causal-learn` (Python).
^note-fgs

## Examples

> [!example] Comparing GES and PC on the same data
> **Setup**: $d = 5$ nodes, true DAG $G^* = \{X_1 \to X_3, X_2 \to X_3, X_3 \to X_4, X_3 \to X_5\}$
> (a v-structure at $X_3$ plus two children). $n = 500$, Gaussian noise.
>
> **PC output**: Recovers skeleton and v-structure $X_1 \to X_3 \leftarrow X_2$ via CI tests.
> Remaining edges $X_3 - X_4$ and $X_3 - X_5$ are undirected (reversible — no Meek rule fires).
>
> **GES output**: FES starts from empty graph, adds edges greedily. BIC penalizes spurious
> edges so no false edges are added. BES removes nothing (no spurious edges). Final CPDAG
> matches PC: v-structure $X_1 \to X_3 \leftarrow X_2$; undirected $X_3 - X_4$, $X_3 - X_5$.
>
> **Takeaway**: Both algorithms output the same CPDAG. In this case PC's CI tests and GES's
> score optimization agree. They can diverge in high dimensions or when the CI test level is
> poorly calibrated.

## PC vs. GES: comparison

| Dimension | PC Algorithm | GES |
|-----------|-------------|-----|
| Paradigm | Constraint-based: CI tests | Score-based: optimize BIC/BGe |
| Input | CI test + significance level $\alpha$ | Decomposable score function |
| Output | CPDAG | CPDAG |
| Consistency | Yes (faithfulness + sufficiency) | Yes (faithfulness + sufficiency) |
| Order dependence | Original: yes; PC-stable: no | No (GES is order-independent) |
| Gaussian setting | Partial correlation test | BIC or BGe score |
| High-dim scaling | Consistent (Kalisch & Bühlmann 2007) | Consistent (Meek Conjecture); FGS for $d\sim10^3$ |
| Nonparametric | Yes (kernel CI tests: HSIC, KCI) | Harder — score must be decomposable |
| Hidden confounders | No (use FCI extension) | No (score-based FCI variants exist but complex) |
| Software (R) | `pcalg::pc()` | `pcalg::ges()` |
| Software (Python) | `causal-learn` PC | `causal-learn` GES; `ges` package |

See [[PC Algorithm]] for the full PC description. The algorithms are complementary:
PC is more flexible (any CI test, any distribution), GES is theoretically cleaner and
order-independent by construction.

## GES vs. NOTEARS

| Dimension | GES | NOTEARS |
|-----------|-----|---------|
| Search space | CPDAG space (equiv. classes) | Continuous $\mathbb{R}^{d\times d}$ (DAG space) |
| Output | CPDAG | Specific DAG |
| Model assumption | Faithfulness; any distribution with decomposable score | Linear SEM with additive noise |
| Acyclicity | Maintained by CPDAG operators | Soft constraint $h(W) = 0$ |
| Optimization | Discrete greedy (local) | Continuous (L-BFGS, global updates) |
| Scalability | FGS: $d \sim 10^3$–$10^4$ | NOTEARS: $d \sim 10^2$; differentiable DAG variants go higher |
| NOTEARS finding | FGS (≈GES) competitive on sparse graphs; outperformed on dense/large | Outperforms FGS on dense SF-4 graphs |

See [[NOTEARS - Overview]] and [[NOTEARS Experiments]] for the benchmark context.

## Connections

- **Score-based vs. constraint-based**: GES (score) and PC (constraint) are the two classical
  paradigms; both output CPDAGs. NOTEARS (continuous-optimization) is a third, outputting DAGs.
- **Bayesian network learning**: GES's BIC/BGe score is closely related to Bayesian marginal
  likelihood for BN structure learning. See [[BN Construction Methods Comparison]] for the
  expert-based perspective and [[LLM Expert Elicitation for Bayesian Networks]] for LLM-assisted
  approaches.
- **Connection to ABM calibration**: ABM output can be treated as observational data for
  structure learning. See [[Summary Causal DAGs]] for how learned DAGs are used downstream.
- **Meek Conjecture and covered edges**: The covered edge reversal concept in the Meek Conjecture
  proof is the same as Chickering's (1995) transformational characterization — GES's FES phase
  traces paths through the space of DAGs reachable by covered reversals.
- **Empirical Bayes connection**: GES with BGe score is equivalent to maximizing posterior
  probability of the graph structure under a normal-Wishart prior — connecting to the empirical
  Bayes perspective in [[Hierarchical Models]].

## See Also
- [[Markov Equivalence and CPDAGs]] — what CPDAGs are; Meek rules; the identifiability limit
- [[PC Algorithm]] — constraint-based alternative; detailed comparison table
- [[DAG Structure Learning Problem]] — the landscape of structure-learning methods
- [[NOTEARS - Overview]] — continuous-optimization approach
- [[NOTEARS Experiments]] — GES (via FGS) appears as the primary baseline
- [[BN Construction Methods Comparison]] — expert-based structure learning
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, causal DAG foundations
