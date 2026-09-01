---
title: "Source Reference: Constraint-Based and Score-Based Causal Structure Learning"
type: literature-reference
date_compiled: 2026-09-01
note: "PDF downloads unavailable due to egress policy restrictions. This file documents the key papers and their content for the vault. Direct PDF links are provided for manual retrieval."
---

# Source Reference: Constraint-Based and Score-Based Causal Discovery

> This source reference documents the foundational literature on the PC algorithm and GES
> (Greedy Equivalence Search) — the two classical approaches to causal structure learning
> that complement NOTEARS (already in vault as `1803.01422-NOTEARS.pdf`).
> Note: external PDF repositories (arXiv.org, jmlr.org) are blocked by the session's
> egress policy; notes were authored from training knowledge with citations below.

---

## Primary Sources

### 1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed.

- **Full citation**: Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction,
  and Search* (2nd ed.). MIT Press. (1st ed. 1993, Springer.)
- **Free PDF**: https://www.cs.cmu.edu/~scheines/publications.html (CMU author homepage)
- **Key content**: Introduces the PC algorithm (named after Peter Spirtes and Clark Glymour),
  along with the FCI algorithm (for latent confounders) and formal causal inference via DAGs.
- **Chapter coverage**: Ch. 5 (Constraint-Based Learning), Ch. 6 (PC algorithm formal proof),
  Ch. 7 (FCI for non-causally-sufficient systems)

**PC algorithm key steps (from Ch. 5–6):**
1. Start with a complete undirected graph over all d variables.
2. **Skeleton recovery**: For each adjacent pair (Xi, Xj), test Xi ⊥ Xj | S for subsets S of
   neighbors with |S| = 0, 1, 2, ... in increasing order. Remove edge if conditionally
   independent; store the separating set Sep(i,j) = S.
3. **V-structure orientation**: For each unshielded triple Xi — Xk — Xj (Xi and Xj
   non-adjacent), orient as Xi → Xk ← Xj iff Xk ∉ Sep(i,j).
4. **Meek orientation rules (R1–R4)**: Propagate orientations without creating new
   v-structures or cycles.
5. **Output**: CPDAG (Completed Partially Directed Acyclic Graph).

**Key assumptions**: Causal Markov condition, Faithfulness (every conditional independence in
the distribution is entailed by the DAG), Causal Sufficiency (no hidden common causes).

---

### 2. Kalisch & Bühlmann (2007) — "Estimating High-Dimensional DAGs with the PC-Algorithm"

- **Full citation**: Kalisch, M., & Bühlmann, P. (2007). Estimating high-dimensional directed
  acyclic graphs with the PC-algorithm. *Journal of Machine Learning Research*, 8, 613–636.
- **arXiv preprint**: https://arxiv.org/abs/math/0510436
- **Key content**: Proves uniform consistency of the PC algorithm in high-dimensional sparse
  settings where d grows as fast as O(n^a) for any a > 0.

**Main theorem (Theorem 3.1):**
Under the Gaussian faithfulness assumption and assuming the true DAG has bounded neighborhood
size q (sparsity), if the conditional independence oracle uses partial correlations with a
significance level α_n → 0 such that n^(1/2) * α_n → ∞ and n^(-1/2) * log(d/α_n) → 0:
- The estimated skeleton converges to the true skeleton (both edge-presence and
  edge-absence are estimated consistently).
- The estimated v-structures converge to the true v-structures.
- The output CPDAG converges to the true equivalence class.

**High-dimensional interpretation**: The PC algorithm can handle d >> n settings if the
true graph is sparse (bounded maximum neighborhood size q). The key parameter is q:
for fixed q, the test uses at most q conditioning variables, making the algorithm polynomial
in d.

---

### 3. Chickering (2002) — "Optimal Structure Identification with Greedy Search"

- **Full citation**: Chickering, D. M. (2002). Optimal structure identification with greedy
  search. *Journal of Machine Learning Research*, 3, 507–554.
- **Direct PDF**: https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
- **Key content**: Proves that a two-phase greedy search (forward edge addition, backward
  edge deletion) over the space of equivalence classes is asymptotically optimal under
  the faithfulness assumption. Proves the "Meek Conjecture" as Theorem 15.

**GES algorithm outline:**
- **Phase 1 (Forward Equivalence Search, FES)**: Starting from the empty CPDAG, repeatedly
  apply the Insert operator that adds an edge and yields the highest-scoring CPDAG.
  Continue until no Insert improves the score.
- **Phase 2 (Backward Equivalence Search, BES)**: Starting from the FES result, repeatedly
  apply the Delete operator that removes an edge and yields the highest-scoring CPDAG.
  Continue until no Delete improves the score.
- **Score**: BIC (Bayesian Information Criterion) or BDeu (for discrete data).

**Consistency theorem (Theorem 15):**
Under faithfulness, causal sufficiency, and a decomposable (locally consistent) scoring
criterion, GES (with sufficient data) returns the CPDAG of the I-optimal model —
i.e., the true equivalence class, if the true distribution is faithful to a DAG.

**The Meek Conjecture (proved as Lemma 12):**
If G and H are DAGs in different Markov equivalence classes, and G ≠ H, then there exists a
sequence of covered edge reversals transforming G into a DAG in H's equivalence class, where
each reversal strictly improves the score. This is the key step enabling the backward phase
to "undo" mistakes from the forward phase via single-edge operators.

---

### 4. Meek (1995) — Orientation Rules

- **Full citation**: Meek, C. (1995). Causal inference and causal explanation with background
  knowledge. In *Proceedings of UAI*, 403–411.
- **Key content**: Proves the four orientation rules (R1–R4) sufficient to complete the CPDAG
  from a skeleton + v-structures. Also proves the characterization of CPDAGs.

**Meek's orientation rules (applied after v-structure identification):**
- **R1 (Non-v-structure)**: If α → β — γ and α, γ non-adjacent, then orient β → γ
  (otherwise α → β ← γ creates an unshielded collider).
- **R2 (Acyclicity)**: If α → β → γ and α — γ, then orient α → γ
  (otherwise α ← γ creates a directed cycle).
- **R3 (Ambiguity)**: If α — γ, α — β₁ → γ, α — β₂ → γ, and β₁, β₂ non-adjacent,
  orient α → γ.
- **R4**: If α — β → γ → δ, α — δ, α,γ non-adjacent, orient α → δ.
Apply R1–R4 until no more orientations possible.

---

### 5. Verma & Pearl (1990) — Markov Equivalence

- **Full citation**: Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models.
  In *Proceedings of UAI*, 220–227.
- **Key content**: Theorem characterizing Markov equivalence: two DAGs G₁ and G₂ are Markov
  equivalent iff they have the same **skeleton** and the same set of **unshielded colliders**
  (v-structures: X→Z←Y with X, Y non-adjacent).

---

### 6. Colombo & Maathuis (2014) — Order-Independent PC

- **Full citation**: Colombo, D., & Maathuis, M. H. (2014). Order-independent constraint-based
  causal structure learning. *Journal of Machine Learning Research*, 15, 3921–3962.
- **Key content**: Shows that the original PC algorithm's output is **order-dependent**
  (the variable ordering in the skeleton phase affects the result). Proposes **PC-stable**
  variant that makes skeleton recovery order-independent by storing all candidate separating
  sets before removing edges in each adjacency level.

---

## Related Resources in Vault

- [[raw/1803.01422-NOTEARS.pdf]] — NOTEARS paper (score-based continuous optimization, covers
  PC and GES as prior work in §2.2 Table 1 and §4)
- [[NOTEARS - Overview]] — the NOTEARS note (explicitly mentions PC and FGS as baselines)
- [[DAG Structure Learning Problem]] — the landscape table covering PC, GES, and exact methods
- [[Directed Acyclic Graphs]] — DAG causal reasoning in the econometrics section
- [[Summary Causal DAGs]] — macro-level DAG summarization (Zeng 2025)
