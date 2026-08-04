# Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning

**Prepared:** 2026-08-04  
**Purpose:** Source survey for Dream gap #9 (Causal Structure Learning from Data — PC algorithm and GES).

## Source Acquisition Attempt

The following sources were identified as the primary references for this gap:

| Source | URL Tried | Outcome |
|--------|-----------|---------|
| Chickering (2002), JMLR v3 | `jmlr.org` | Blocked — proxy egress policy denies `jmlr.org:443` |
| Kalisch & Bühlmann (2007), JMLR v8 / arXiv:math/0510436 | `arxiv.org` | Blocked — proxy egress policy denies `arxiv.org:443` |
| Spirtes, Glymour & Scheines (2000), CPS Book (MIT Press) | — | Book; no free PDF accessible |
| Causal Structure Learning survey, arXiv:1706.09141 | `arxiv.org` | Blocked |

**Resolution:** Notes synthesised from training knowledge of the papers (same approach used for Gap #1, PSM notes, 2026-06-28). Citations are included inline in each note.

---

## Key Sources Synthesised

### 1. Spirtes & Glymour (1991) — The PC Algorithm

"An Algorithm for Fast Recovery of Sparse Causal Graphs." *Social Science Computer Review* 9(1):62–72.

The original PC algorithm. Three phases: (1) skeleton recovery via CI tests on conditioning sets of increasing size, (2) v-structure orientation by checking separating sets, (3) orientation propagation via Meek-style rules. Output is the CPDAG of the Markov equivalence class.

**Key results:**
- Under Markov condition + faithfulness + correct CI tests: PC recovers the true CPDAG asymptotically.
- Time complexity: exponential in the maximum node degree (max conditioning set size $k$) but polynomial in $d$ for sparse graphs.

### 2. Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search (2nd Ed.)

MIT Press. The foundational causal discovery textbook. Extends the PC algorithm, introduces the FCI (Fast Causal Inference) algorithm for hidden variables, establishes the CPDAG framework, and proves the Markov + faithfulness conditions yield identifiability of the equivalence class. The "CPS" text is the standard reference for constraint-based causal discovery.

**Key results:**
- The PC algorithm provably recovers the CPDAG under Markov condition, faithfulness, and causal sufficiency.
- The FCI algorithm handles hidden confounders (produces PAGs, not CPDAGs).
- Meek rules (R1–R4) are sufficient for completing PDAG orientation.

### 3. Chickering (2002) — Optimal Structure Identification With Greedy Search

*Journal of Machine Learning Research* 3:507–554.

The GES (Greedy Equivalence Search) paper. Proves the "Meek Conjecture" as a theorem. GES operates in CPDAG space with two phases: Forward Equivalence Search (FES, adds edges) and Backward Equivalence Search (BES, removes edges). Requires a decomposable BIC/BGe score.

**Key results:**
- Theorem (GES consistency): With a consistent, decomposable score and a faithful distribution, GES finds the CPDAG of the true DAG.
- Proven Meek Conjecture: if H is an independence-map of G, there exists a sequence of covered edge reversals transforming G into H while maintaining the I-map property. This is what GES's forward phase exploits.
- Forward phase: starts at empty graph, adds score-improving insertions until convergence.
- Backward phase: starts at forward-phase output, applies score-improving deletions until convergence.

### 4. Kalisch & Bühlmann (2007) — Estimating High-Dimensional DAGs with the PC-Algorithm

*Journal of Machine Learning Research* 8:613–636. arXiv:math/0510436.

High-dimensional consistency of the PC algorithm. Under faithfulness and sparse graph (bounded neighborhood size = $q$), proves that PC consistently recovers the skeleton and v-structures even when $d \gg n$, provided $q = O(n^{1-b})$ for some $b \in (0,1)$. Introduces PC-stable (order-independent skeleton), and the `pcalg` R package.

**Key results:**
- PC is consistent in high dimensions: $d$ can grow as fast as $O(n^a)$ for any $a > 0$ if the neighborhood size stays bounded.
- Uses Fisher's Z-transform CI test for Gaussian data with level $\alpha_n \to 0$ at rate $\alpha_n = O(1/n^{1/2-b/2})$.

### 5. Colombo & Maathuis (2014) — Order-Independent Constraint-Based Causal Structure Learning

*Journal of Machine Learning Research* 15:3921–3962.

Introduces PC-stable: a variant of PC that produces the same output regardless of the variable ordering. The standard PC is order-dependent — the skeleton recovery loop depends on which edges are considered first. PC-stable fixes this by applying all edge removals at the end of each conditioning-set-size level. Standard in all modern `pcalg` implementations.

---

## Gap Coverage Plan

**New notes created:**
1. `CPDAG and Markov Equivalence.md` — Background: what a CPDAG is, Markov equivalence, why it's the target
2. `PC Algorithm.md` — Full algorithmic description with all phases, conditions, complexity
3. `GES - Greedy Equivalence Search.md` — GES with both phases, score requirements, consistency theorem

**Updated:**
- `_Index.md` — expanded routing summary, concept map, notes list
