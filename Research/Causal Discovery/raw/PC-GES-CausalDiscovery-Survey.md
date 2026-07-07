# Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning (PC and GES)

**Compiled:** 2026-07-07  
**Covers:** Spirtes, Glymour & Scheines (1993/2000), Chickering (2002), Colombo & Maathuis (2014)

---

## Source Overview

### Primary Source 1 — Chickering (2002)
**Title:** "Optimal structure identification with greedy search"  
**Venue:** Journal of Machine Learning Research, Vol. 3, pp. 507–554  
**URL:** https://jmlr.org/papers/v3/chickering02b.html (open access)  
**Key contributions:**  
- Defines the GES (Greedy Equivalence Search) algorithm
- Proves that GES is consistent in the large-sample limit under a decomposable, locally consistent scoring criterion
- Introduces the Insert and Delete operators on MECs
- Proves that GES finds the global optimum of the score asymptotically

### Primary Source 2 — Spirtes, Glymour & Scheines (2000)
**Title:** *Causation, Prediction, and Search*, 2nd Ed., MIT Press  
**URL:** Available via authors' CMU page  
**Key contributions:**  
- Introduces the PC algorithm (named after Peter Spirtes and Clark Glymour)
- Defines the framework of constraint-based causal discovery
- Proves soundness and completeness of PC under faithfulness + Markov + causal sufficiency
- Covers the FCI algorithm for settings with hidden confounders (PAGs)

### Primary Source 3 — Colombo & Maathuis (2014)
**Title:** "Order-independent constraint-based causal structure learning"  
**Venue:** Journal of Machine Learning Research, Vol. 15, pp. 3741–3782  
**URL:** https://jmlr.org/papers/v15/colombo14a.html (open access)  
**Key contributions:**  
- Identifies order-dependence bugs in the original PC algorithm (different variable orderings yield different results)
- Proposes PC-stable: a simple modification that makes skeleton learning and v-structure orientation order-independent
- Proves that PC-stable produces the same skeleton for every variable ordering in the oracle (population) setting
- Evaluates PC-stable vs PC on multiple datasets showing improved consistency

---

## Part 1: Markov Equivalence and CPDAGs

### 1.1 Markov Condition and Faithfulness

**Markov condition (Causal Markov Condition):** Given a DAG G over variables V and a joint distribution P, every node X ∈ V is conditionally independent of its non-descendants given its parents:
$$X \perp\!\!\!\perp \mathrm{NonDesc}(X) \mid \mathrm{Pa}(X)$$

**Faithfulness condition:** P is faithful to G if *every* conditional independence in P is entailed by the Markov condition applied to G (d-separation in G). That is, there are no "accidental" conditional independencies — only those that the graph implies.

Together: Markov + Faithfulness allow reading off all conditional independencies from d-separation, and conversely, all d-separations from conditional independence tests.

### 1.2 Markov Equivalence

**Definition:** Two DAGs G₁ and G₂ over the same vertex set are **Markov equivalent** if they entail exactly the same set of conditional independence relations — i.e., they have the same d-separation statements. Equivalently, they represent the same observational distribution family.

**Verma-Pearl Theorem (1990):** Two DAGs are Markov equivalent if and only if they have:
1. The same **skeleton** (same undirected edges, ignoring orientation)
2. The same **v-structures** (unshielded colliders: X → Z ← Y where X and Y are non-adjacent)

This means: two DAGs that look very different (different edge orientations) can encode the same statistical model if their v-structures match.

**Markov Equivalence Class (MEC):** The set of all DAGs Markov equivalent to a given DAG G, denoted [G].

### 1.3 CPDAGs (Completed Partially Directed Acyclic Graphs)

**Definition:** A CPDAG (also called *essential graph*) is the unique graphical representative of a MEC. In a CPDAG:
- **Directed edges X → Y**: this orientation is the same in *every* DAG in the MEC
- **Undirected edges X — Y**: this edge is directed differently in different DAGs of the MEC

**CPDAG characterization (Andersson, Madigan & Perlman 1997):** A PDAG is a valid CPDAG iff:
1. Every undirected connected component forms a chordal graph
2. Every edge is either invariantly directed or part of a clique that allows both orientations

**Consequence for identifiability:** From purely observational data under the faithfulness assumption, we can at best identify the MEC (CPDAG), not the specific DAG. Edge orientations that differ across the MEC are not identifiable from observational data alone.

**Notation convention:**
- G: a specific DAG
- [G] or MEC(G): the Markov equivalence class
- CPDAG(G): the CPDAG representing [G]
- A → B: compelled (invariant) orientation
- A — B: reversible (free) orientation

### 1.4 Meek's Orientation Rules

After orienting v-structures, the following four rules (Meek 1995) propagate additional orientations to edges that remain undirected in the PDAG, based on consistency requirements:

**Rule 1 (Acyclicity):** If A → B — C and A and C are non-adjacent, orient B → C.  
*(Because orienting B ← C would create the new v-structure A→B←C, but there is no existing v-structure here; creating one would require an edge A-C which does not exist. More precisely: orienting C→B would create a cycle A→B→...→A or a new v-structure, both forbidden.)*

**Rule 2 (Acyclicity):** If A → B → C and A — C, orient A → C.  
*(Because orienting C→A would create a cycle.)*

**Rule 3 (Conflict):** If A — B, A — C, B → D, C → D, B and C non-adjacent, orient A → D.  
*(Because orienting D→A would create either a cycle or a new v-structure B→D←A given B-A is undirected.)*

**Rule 4 (Hybrid):** If A — B, B → C → D, A — D, B and D non-adjacent, orient A → B.  

These rules are sound (every orientation produced is invariant across the MEC) and complete (they orient every edge that can be oriented).

---

## Part 2: PC Algorithm

### 2.1 Algorithm Overview

**Input:** n × d data matrix X; significance level α; conditional independence oracle CI(·,·|·)  
**Output:** CPDAG over d variables  
**Assumptions:** Causal Markov condition, Faithfulness, Causal Sufficiency (no unmeasured common causes)

**High-level:** PC works in two phases:
1. **Skeleton learning:** recover the undirected skeleton by removing edges between conditionally independent pairs
2. **Orientation:** orient v-structures, then apply Meek's rules

### 2.2 Phase 1: Skeleton Learning

```
Initialization: Start with the complete undirected graph G on d nodes; sep(X,Y) = ∅ for all X,Y
l = 0   # conditioning set size

WHILE some edge X—Y remains with |Adj(G,X)\{Y}| ≥ l:
    FOR each edge X—Y in G:
        FOR each subset S ⊆ Adj(G,X)\{Y} with |S| = l:
            IF CI_test(X ⊥ Y | S):
                Remove edge X—Y from G
                sep(X,Y) = sep(Y,X) = S
                BREAK (move to next pair)
    l = l + 1
RETURN G, sep
```

Key properties:
- Conditioning sets only include adjacents of X (or Y in PC-stable), keeping |S| small for sparse graphs
- Tests use Gaussian CI tests (partial correlation, Fisher Z-test) for continuous data; χ² for discrete
- With faithful distributions, every CI test finding X⊥Y|S eventually fires for some S ⊆ Pa(X)∪Pa(Y)

**Complexity:** O(d² · p^(max-degree)) CI tests, where p = number of variables. Works well for sparse graphs (low max-degree), but degrades for dense graphs.

### 2.3 Phase 2: V-Structure Orientation

```
FOR each triple X—Z—Y where X and Y are non-adjacent:
    IF Z ∉ sep(X,Y):
        Orient X → Z ← Y  (v-structure / unshielded collider)
```

Intuition: if Z is not in any conditioning set that makes X⊥Y, then conditioning on Z would *create* dependence (collider), suggesting Z is a common effect.

### 2.4 Phase 3: Meek's Rules

Apply Meek's 4 orientation rules repeatedly until no new orientation can be made (see §1.4 above).

### 2.5 PC-Stable (Colombo & Maathuis 2014)

The original PC algorithm's skeleton is **order-dependent**: testing edges X—Y in different orders leads to different adjacency sets (since removing edges changes the conditioning sets considered for subsequent tests). PC-stable fixes this:

```
WHILE some edge X—Y remains with |Adj(G,X)\{Y}| ≥ l:
    FOR each edge X—Y in G:
        Compute C(X,Y) = {subsets S ⊆ Adj(G,X)\{Y} with |S|=l : CI_test(X ⊥ Y | S)}
        Compute C(Y,X) = {subsets S ⊆ Adj(G,Y)\{X} with |S|=l : CI_test(X ⊥ Y | S)}
    # After ALL edges have been tested at level l, THEN update the skeleton
    Remove all X—Y for which C(X,Y) ∪ C(Y,X) ≠ ∅
    sep(X,Y) = sep(Y,X) = first S found in C(X,Y) ∪ C(Y,X)
    l = l + 1
```

The key change: **update the graph only after all pairs have been tested at each level** (not after each individual CI test). This ensures the adjacency sets Adj(G,X) used to form conditioning sets are the same regardless of the order in which edges are tested.

### 2.6 Consistency and Limitations

**Consistency (SGS 2000, Theorem 5.1):** Under Markov, Faithfulness, Causal Sufficiency, and an oracle CI tester, PC is correct and outputs CPDAG(G_true).

**Limitations:**
- Requires causal sufficiency: no hidden common causes. The FCI algorithm (Spirtes et al.) handles latent variables, producing a PAG (Partial Ancestral Graph).
- Faithfulness can fail when edge coefficients cancel (linear cancellation), creating "accidental" CIs.
- Finite-sample CI tests introduce Type I/II errors that cascade through the skeleton. These errors compound with dimensionality.
- PC is conservative: it retains edges unless explicitly found independent; GES is aggressive: it adds edges only if they improve the score.

---

## Part 3: GES — Greedy Equivalence Search

### 3.1 The GES Framework

**Input:** n × d data; decomposable, locally consistent scoring function S(G, data) (e.g., BIC = log-likelihood − (d_f/2)log(n))  
**Output:** CPDAG  
**Key insight:** Rather than searching over individual DAGs, GES searches over **MECs (CPDAGs)** using graph-theoretic operators that move from one MEC to an adjacent one.

### 3.2 Scoring Functions

**BIC (Bayesian Information Criterion):**
$$\text{BIC}(G, \mathbf{X}) = \ell(\hat{\theta}_G; \mathbf{X}) - \frac{d_f(G)}{2} \log n$$
where $d_f(G)$ = number of free parameters (edge weights + noise variances for Gaussian SEMs).

**Decomposability:** The score decomposes over nodes:
$$S(G, \mathbf{X}) = \sum_{j=1}^{d} S_j(\mathrm{Pa}_G(j), \mathbf{X})$$
This allows local updates: when adding/removing an edge, only recompute the affected node's local score.

**Locally consistent:** The score assigns higher values to DAGs with more correct d-separations (penalizes missing edges and spurious edges).

### 3.3 Insert and Delete Operators

**Insert(X,Y,T):** Adds edge X → Y in the current MEC. Here T ⊆ Ne_H(Y) \ {X} is a subset of undirected neighbors of Y that get oriented to point at Y. Validity conditions ensure the resulting PDAG is a valid CPDAG.

**Delete(X,Y,H):** Removes edge X → Y (or X — Y) from the current MEC. H ⊆ Ne_H(Y) ∩ Ad_H(X) is a subset that gets reoriented.

**PDAG representation:** At each step, GES maintains the current MEC as a CPDAG and applies operators that move to an adjacent MEC (one that differs in a minimal way).

### 3.4 The Two Phases

**Forward phase (Insert operators):**
```
Start with CPDAG C = empty graph
WHILE ∃ valid Insert(X,Y,T) with ΔS > 0:
    Apply the Insert(X,Y,T) with largest ΔS
RETURN C_forward
```

**Backward phase (Delete operators):**
```
Start from C_forward
WHILE ∃ valid Delete(X,Y,H) with ΔS > 0:
    Apply the Delete(X,Y,H) with largest ΔS
RETURN C_final
```

**Why two phases?** The forward phase can add too many edges (gets trapped in a MEC with spurious edges). The backward phase removes spurious edges. Together, they approximate the global optimum.

### 3.5 Chickering (2002) Consistency Theorem

**Theorem (Chickering 2002, Theorem 15):** Let P be a distribution over variables V that satisfies the Markov condition and faithfulness with respect to a DAG G. Let S be a locally consistent scoring criterion. Then in the large-sample limit (n → ∞), the CPDAG output by GES is CPDAG(G) — the true MEC.

**Proof strategy:**
1. Show that Insert/Delete operators correspond to single-edge additions/removals in the MEC space.
2. Show that with a locally consistent score, the greedy forward phase always moves toward DAGs with higher score, and the backward phase removes all spurious edges.
3. Conclude that at convergence, the output MEC is the one maximizing the score — which equals CPDAG(G_true) in the population.

**Key implication:** Unlike NOTEARS (which has no consistency guarantees from the local-to-global perspective) and unlike PC (whose consistency requires an oracle CI tester), GES is provably consistent with any locally consistent decomposable score. In practice with BIC and Gaussian models, GES is consistent for linear Gaussian SEMs.

### 3.6 Greedy SP (GSP) and Extensions

Modern variants:
- **Greedy SP (Solus, Wang, Uhler 2021):** Operates on permutation space rather than MEC space; stronger guarantees under weaker faithfulness assumptions.
- **BOSS (Bryan, Drton & Richardson 2023):** Further improvement combining GES-type scoring with permutation search.
- **FGES (Ramsey et al. 2017):** Parallel/distributed GES implementation in the TETRAD software package; scales to thousands of variables.

---

## Part 4: PC vs GES vs NOTEARS — Summary Comparison

| Dimension | PC / PC-stable | GES | NOTEARS |
|-----------|---------------|-----|---------|
| **Paradigm** | Constraint-based (CI tests) | Score-based (MEC search) | Score-based (continuous optimization) |
| **Output** | CPDAG | CPDAG | DAG (thresholded matrix) |
| **Consistency** | Oracle CI tester required | Locally consistent score sufficient | No global consistency guarantee |
| **Key assumption** | Faithfulness + causal sufficiency | Faithfulness + causal sufficiency | Linear SEM + faithful distribution |
| **Scalability** | O(d² p^k) CI tests (k = max-degree) | O(d² p^k) score evaluations | O(d³) per iteration (matrix exp) |
| **Hidden confounders** | No (use FCI for PAGs) | No (use RFCI/FCI) | No |
| **Non-Gaussian data** | Any CI test (HSIC, KCI) | Score must match distribution | Non-Gaussian exploitable via LiNGAM |
| **Software** | `pcalg` (R), `causal-learn` (Python) | `pcalg::ges()`, `causal-learn` | `notears` (Python, GitHub) |
| **When to prefer** | Small to medium n, good CI tests, sparse graph | Large n, Gaussian data, need consistency proof | Large d, fast computation, willing to tune threshold |

---

## References

1. Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search* (2nd ed.). MIT Press.
2. Chickering, D. M. (2002). Optimal structure identification with greedy search. *Journal of Machine Learning Research*, 3, 507–554.
3. Colombo, D., & Maathuis, M. H. (2014). Order-independent constraint-based causal structure learning. *Journal of Machine Learning Research*, 15, 3741–3782.
4. Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI Proceedings*.
5. Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI Proceedings*.
6. Zheng, X., Aragam, B., Ravikumar, P., & Xing, E. P. (2018). DAGs with NO TEARS: Continuous optimization for structure learning. *NeurIPS*.
