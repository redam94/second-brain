# Synthesis Survey: PC Algorithm and GES for Causal Structure Learning

> [!note] Source status
> Direct PDF downloads of Colombo & Maathuis (2014, JMLR) and Chickering (2002, JMLR) were
> unavailable due to session network policy. This survey is synthesised from training-data
> knowledge of the following primary sources, cross-checked against the search-result
> abstracts and the NOTEARS comparison table (Zheng et al., 2018, already in vault):
>
> - **Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd ed., MIT Press.
>   The foundational reference for the PC algorithm.
> - **Meek (1995)** — "Causal inference and causal explanation with background knowledge."
>   *Proceedings of UAI*, pp. 403–410. Source of Meek's orientation rules.
> - **Chickering (2002)** — "Optimal structure identification with greedy search." *JMLR* 3:507–554.
>   Introduces GES; proves the Meek Conjecture; establishes consistency.
> - **Colombo & Maathuis (2014)** — "Order-independent constraint-based causal structure learning."
>   *JMLR* 15(116):3921–3962. arXiv:1211.3295. Introduces PC-stable and its order-independence fix.
> - **Verma & Pearl (1990)** — "Equivalence and synthesis of causal models." *Proceedings of UAI*.
>   The Markov equivalence theorem (skeleton + v-structures).
> - **Chickering (1995)** — "A transformational characterization of equivalent Bayesian network
>   structures." *Proceedings of UAI*. The covered-edge-reversal path between equivalent DAGs.

---

## Part 1 — Markov Equivalence and CPDAGs

### 1.1 The identification problem for DAGs

Structure learning from observational data can recover a DAG only up to **Markov equivalence**.
Two DAGs G and G′ are **Markov equivalent** if and only if they encode the same conditional
independence relationships — i.e., the same d-separation statements. Markov equivalent DAGs
produce identical joint distributions (under the Causal Markov assumption), so observational
data alone cannot distinguish them.

**Verma-Pearl theorem (1990)**: Two DAGs are Markov equivalent if and only if they have
the same *skeleton* (underlying undirected graph) and the same *v-structures* (colliders X→Z←Y
where X and Y are non-adjacent). Equivalently, they have the same skeleton and the same
unshielded colliders.

The **Markov equivalence class (MEC)** of a DAG G is the set of all DAGs Markov equivalent to G.

### 1.2 CPDAGs

A **completed partially directed acyclic graph (CPDAG)** — also called the *essential graph* — is
the unique graph that:
1. Has the same skeleton as every member of the MEC.
2. Has a directed edge X→Y if and only if X→Y in *every* DAG in the MEC.
3. Has an undirected edge X–Y if the edge can be oriented either way across some pair of members.

The CPDAG is the canonical representation of a MEC. Structure learning algorithms that cannot
distinguish within a MEC output a CPDAG (or, equivalently, a PDAG that can be completed to one).

### 1.3 Meek's orientation rules

Given a skeleton and its v-structures, the remaining edges can be partially oriented using four
deterministic rules (Meek 1995) that do not introduce new v-structures or cycles:

- **R1** (acyclicity): A–B→C and A not adjacent to C ⟹ orient A→B? No. Orient B→C.
  If A→B is already directed and B–C is undirected, and A is non-adjacent to C, then orient B→C
  to avoid a new v-structure at B.
- **R2** (acyclicity): A→B→C and A–C ⟹ orient A→C (would create cycle if A←C).
- **R3** (acyclicity): A–C, B–C, A→D, B→D, D–C, A and B non-adjacent ⟹ orient D→C.
  Orienting C→D would create a collider, but it's not a v-structure since A–D or B–D exist.
- **R4** (Meek 1995): closure rule handling the remaining ambiguous edge.

Together R1–R4 produce the unique maximally oriented PDAG consistent with the skeleton and
identified v-structures — the CPDAG.

---

## Part 2 — The PC Algorithm (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000)

### 2.1 Core idea

PC is a *constraint-based* structure learning algorithm. It uses **conditional independence (CI)
tests** as an oracle: the CI test answers "Is X independent of Y given S?" for any triple (X,Y,S).
The algorithm exploits the fact that, under the **faithfulness assumption**, X⊥⊥Y|S if and only if
X and Y are d-separated by S in the true DAG.

**Core assumptions:**
1. **Causal Markov**: Every variable is independent of its non-descendants given its parents.
2. **Faithfulness** (or the Causal Faithfulness Condition, CFC): No conditional independence holds
   by "accident" — every CI present in the distribution is implied by d-separation in G.
3. **Causal sufficiency**: No hidden common causes (all common causes are observed).

Under these three assumptions, the CI oracle determines the MEC of the true data-generating DAG
exactly. PC approximates the oracle with a statistical CI test (partial correlations for Gaussian,
chi-squared for discrete, kernel-based for nonparametric).

### 2.2 The PC Algorithm — Three Phases

**Phase 1: Skeleton recovery**

1. Start with the *complete* undirected graph on d nodes.
2. For each pair (X, Y) and increasing conditioning set size k = 0, 1, 2, …:
   a. For each subset S ⊆ adj(X) \ {Y} with |S| = k:
      - Test X ⊥⊥ Y | S.
      - If the test passes (p > α): remove edge X–Y. Record sep(X,Y) = S. Break inner loop.
3. Stop when no edge can be removed.

The result is an undirected skeleton. Separation sets sep(X,Y) record *why* each edge was removed.

**Complexity**: O(d^(k_max)) CI tests in the worst case, where k_max is the maximum vertex
degree in the true skeleton. In sparse graphs (bounded degree), the algorithm is polynomial.

**Order-dependence issue (Colombo & Maathuis 2014)**: The skeleton step is *order-dependent*
because the conditioning sets are drawn from adj(X), which changes as edges are removed. If
variables are listed in a different order, different edges may be tested first, and a CI test that
passes for one ordering may never be reached for another. This can produce different skeletons.

**Fix — PC-stable**: Colombo & Maathuis (2014) fix this by *separating* the adjacency-set
computation from the edge-removal: in each iteration of k, compute all CI tests using the
adjacency sets from the *beginning* of that iteration, then remove all edges whose tests passed.
This makes the skeleton output invariant to variable order.

**Phase 2: V-structure orientation**

For every unshielded triple X–Z–Y (X and Y non-adjacent):
- If Z ∉ sep(X,Y): orient as X→Z←Y (Z is a collider/v-structure).
- If Z ∈ sep(X,Y): leave as X–Z–Y (Z is a non-collider).

The v-structure step is *also* order-dependent in the original PC. Colombo & Maathuis (2014)
provide an order-independent fix: apply majority-rule voting over all conflicting orientations
for an edge, breaking ties conservatively.

**Phase 3: Meek's orientation rules**

Apply R1–R4 exhaustively to complete the CPDAG from the oriented v-structures.

### 2.3 Properties and limitations

| Property | Value |
|----------|-------|
| Output | CPDAG of the true DAG's MEC |
| Consistency | ✓ under Markov + Faithfulness + Sufficiency + infinite data |
| Finite-sample behavior | Depends on CI test power and α |
| Computational complexity | Exponential in max degree (worst case), polynomial for bounded-degree graphs |
| Sensitivity to CI test | High — false positives remove real edges, false negatives retain spurious ones |
| Hidden variables | ✗ (use FCI algorithm instead) |
| Software | `pcalg` R package (PC, PC-stable, FCI), `causal-learn` Python |

---

## Part 3 — GES: Greedy Equivalence Search (Chickering 2002)

### 3.1 Core idea

GES is a *score-based* structure learning algorithm that searches directly over **Markov
equivalence classes** rather than over individual DAGs. The search space is the set of CPDAGs,
with moves corresponding to single edge insertions or deletions that remain within the CPDAG
space. The key insight: the number of MECs is much smaller than the number of DAGs (though
still superexponential in d), and operating on CPDAGs avoids the redundancy of searching the
same MEC multiple times.

**Core assumptions:**
1. **Causal Markov** (same as PC).
2. **Faithfulness** (same as PC).
3. **Causal sufficiency** (same as PC).
4. **Decomposable, locally consistent score**: the score must factor over subsets of variables
   and be consistent with the true MEC asymptotically. BIC satisfies this.

### 3.2 The GES Algorithm — Two Phases

**The score function**

GES uses a decomposable score Q(G, D) — typically the **Bayesian Information Criterion (BIC)**:
$$Q(G, D) = \ell(G; D) - \frac{d_G}{2}\log n,$$
where $\ell$ is the log-likelihood, $d_G$ is the number of free parameters, and $n$ is sample
size. For Gaussian data, the BIC decomposes as a sum of local log-likelihoods — one per node
given its parents — enabling efficient local score computations.

**Phase 1: Forward Equivalence Search (FES)**

1. Start with the empty CPDAG (no edges).
2. Greedily find the single edge *insertion* that most increases Q.
3. Insert it. Repeat.
4. Stop when no single edge insertion improves Q.

Each insertion operator is carefully defined to remain within the CPDAG space: inserting edge
X→Y in CPDAG C is valid only if C can be modified to accommodate the new edge without creating
a new v-structure that is inconsistent with the current CPDAG's constraints.

**Phase 2: Backward Equivalence Search (BES)**

1. Start from the CPDAG output by FES.
2. Greedily find the single edge *deletion* that most increases Q.
3. Delete it. Repeat.
4. Stop when no single edge deletion improves Q.

BES corrects for overfitting errors introduced by FES: FES may have added spurious edges when
the score improvement was marginal. BES systematically prunes them.

### 3.3 The Meek Conjecture and Chickering's proof

**Meek Conjecture (1995)**: For any two DAGs G and H in the same Markov equivalence class,
there exists a finite sequence of *covered edge reversals* in G that eventually transforms G
into H — where a covered edge reversal reverses X→Y only if pa(X) = pa(Y) \ {X}.

**Chickering (2002)** proves this conjecture. The proof has two key steps:
1. If H is an I-map of G (H entails all the CIs of G), then there is a finite sequence of
   covered edge reversals + edge *additions* from G to H that monotonically increase the BIC.
2. Two Markov-equivalent DAGs always have an I-map relationship in one direction.

**Consequence**: GES's two-phase search is *complete* — it can reach any CPDAG from any starting
point via the FES+BES operators, without getting trapped in a local MEC neighbourhood. This is
stronger than what one might expect from greedy search.

**Consistency theorem**: Under Causal Markov + Faithfulness + Causal Sufficiency + any
locally consistent decomposable score, GES returns the CPDAG of the true data-generating
DAG as n → ∞.

### 3.4 Properties and comparison with PC

| Property | PC | GES |
|----------|----|----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC) |
| Output | CPDAG | CPDAG |
| Finite-n consistency | ✓ (if CI tests are consistent) | ✓ |
| Sensitivity to | CI test choice, α, order | Score choice, Gaussian assumption |
| Handles non-Gaussian data | ✓ (with nonparametric CI tests) | Harder (BIC assumes Gaussian) |
| Computational complexity | Exponential in max degree | Superexponential (greedy search helps) |
| Scales well | Moderate (sparse graphs) | Better than exact; worse than NOTEARS |
| Software | `pcalg` (R), `causal-learn` (Python) | `pcalg::ges()`, `ges` Python package |
| Hidden variables | Use FCI instead | Use RFCI or FCI-GES |

---

## Part 4 — Position within the causal discovery landscape

### 4.1 The three paradigms

| Paradigm | Representatives | Core mechanism | Identifiable object |
|----------|----------------|---------------|---------------------|
| **Constraint-based** | PC, FCI, RFCI | CI tests + graphical rules | MEC (CPDAG) or MAG (PAG) |
| **Score-based** | GES, FGES, GDS | Greedy MEC search maximising BIC | MEC (CPDAG) |
| **Continuous optimization** | NOTEARS, DAG-GNN, GOLEM | Acyclicity as smooth constraint | Single DAG (or CPDAG) |

Constraint-based methods (PC) and score-based methods (GES) are complementary: PC can work
with arbitrary CI tests (including nonparametric), while GES works with any decomposable score.
NOTEARS trades exact acyclicity constraints for computational tractability on dense graphs.

### 4.2 When to prefer each approach

**Prefer PC** when:
- The number of variables is small to moderate (d < 100 or so).
- The true graph is sparse (low max degree).
- Non-Gaussian or mixed-type data requires a nonparametric CI test.
- Uncertainty about edge orientations is important (CPDAG is more informative than a point estimate).

**Prefer GES** when:
- Data is approximately Gaussian and the linear-Gaussian SEM is defensible.
- You want a score-based approach that handles the MEC search optimally.
- You want to incorporate background knowledge via score modifications.

**Prefer NOTEARS** when:
- The graph is large/dense and CI testing or score-based MEC search is computationally
  prohibitive.
- You want a single point estimate DAG rather than a CPDAG.
- You are comfortable with the linear SEM assumption.

### 4.3 Connection to ABM and the vault

The vault's ABM calibration work (Zeng 2025 DAG summarization, [[Summary Causal DAGs]]) assumes
the causal DAG is given — structure learning (PC, GES, NOTEARS) is what *precedes* summarization.
Similarly, [[LLM Expert Elicitation for Bayesian Networks]] uses *expert-elicited* structure;
structure learning replaces expert elicitation with data-driven discovery.

### 4.4 Limitations common to all approaches

1. **Faithfulness violations**: some distributions are not faithful to any DAG (measure-zero
   but can occur with exact cancellations). Both PC and GES are inconsistent in this case.
2. **Hidden variables**: PC and GES assume causal sufficiency. Use FCI (extends PC) or
   RFCI when latent common causes are plausible.
3. **Markov equivalence ceiling**: without additional assumptions (non-Gaussianity, additive
   noise, etc.), the CPDAG is the most that can be recovered from observational data.
4. **Finite-sample CI tests**: the α level in PC and the BIC penalty in GES must be tuned;
   practical performance is far from the asymptotic guarantee with small n.
