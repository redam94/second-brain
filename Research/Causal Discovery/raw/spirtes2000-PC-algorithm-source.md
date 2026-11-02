# Source Record: PC Algorithm and Constraint-Based Causal Discovery

> **Note:** PDF download was blocked by session network policy (arxiv.org and academic domains
> not reachable from this environment). This file documents the source papers' content from
> training knowledge. Content verified against WebSearch results (2026-11-02).

---

## Primary Sources

### 1. Kalisch & Bühlmann (2007) — High-dimensional PC algorithm
**Full citation:** Kalisch, M. & Bühlmann, P. (2007). Estimating High-Dimensional Directed
Acyclic Graphs with the PC-Algorithm. *Journal of Machine Learning Research*, 8(22), 613–636.
**Free URL:** https://arxiv.org/abs/math/0510436 (arXiv preprint math/0510436)
**JMLR URL:** https://jmlr.org/papers/v8/kalisch07a.html

**Abstract (paraphrased from known content):** The paper studies the PC-algorithm for recovering
the skeleton and Markov equivalence class of a DAG under Gaussian assumptions. Assuming
faithfulness and causal sufficiency, the PC-algorithm is shown to be *uniformly consistent* for
sparse DAGs where the number of nodes $p$ can grow with sample size $n$ (specifically, allowing
$p = O(n^a)$ for some $a > 0$). Fisher's z-test is used for conditional independence testing.
Extensive simulations validate the method on graphs with hundreds of variables.

**Key contributions:**
1. Consistency of PC-algorithm in the high-dimensional ($p \gg n$) sparse regime.
2. An efficient implementation that avoids testing all $\binom{p}{2} \cdot 2^{p-2}$ conditional
   independence tests by exploiting the *order-independence* property.
3. Bounds on the size of conditioning sets required for the skeleton algorithm.
4. Application to gene expression data (Maathuis et al. 2010 follow-up uses this result for
   IDA — Intervention-calculus when DAG is Absent).

---

### 2. Chickering (2002) — GES / Greedy Equivalence Search
**Full citation:** Chickering, D. M. (2002). Optimal Structure Identification With Greedy Search.
*Journal of Machine Learning Research*, 3, 507–554.
**JMLR URL:** https://jmlr.org/papers/v3/chickering02b.html
**Companion paper:** Chickering, D. M. (2002). Learning Equivalence Classes of
Bayesian-Network Structures. *JMLR*, 2, 445–498.

**Abstract (paraphrased):** The paper proves the "Meek Conjecture" — that any DAG in a given
Markov equivalence class (MEC) can be reached from any other DAG in that MEC by a sequence of
*covered edge reversals*, where a covered edge $X \to Y$ is one where $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$.
This result is fundamental to the correctness of GES: it justifies the use of equivalence classes
as the search space. The paper also introduces Greedy Equivalence Search (GES) — a two-phase
algorithm that (1) adds edges (Forward Phase) and (2) removes edges (Backward Phase) in the space
of CPDAGs, and proves that GES finds the global optimum as $n \to \infty$ when the score is
locally consistent, decomposable, and score-equivalent.

**Key contributions:**
1. **Meek Conjecture proof:** Any two MECs can be connected by covered edge reversals.
2. **GES Forward Phase:** Greedily adds edges (equivalently, inserts edges into the CPDAG) so
   long as the BIC score improves.
3. **GES Backward Phase:** Greedily removes edges so long as the BIC score improves; guaranteed
   to find a local optimum of the score.
4. **Consistency of GES:** With probability converging to 1, GES returns the correct MEC
   as $n \to \infty$, assuming (a) the score is locally consistent, (b) the generating distribution
   is faithful to the true DAG $G^*$, and (c) causal sufficiency.

---

### 3. Spirtes, Glymour & Scheines (2000) — SGS Book / PC Algorithm Origin
**Full citation:** Spirtes, P., Glymour, C. N., & Scheines, R. (2000). *Causation, Prediction,
and Search* (2nd ed.). MIT Press. (First edition 1993, MIT Press.)
**Open access:** Full text of 2nd ed. available free via MIT Press (chapter PDFs).
**Key URL:** https://www.cs.cmu.edu/~spirtes/pubs.html

**Key contributions:**
1. The SGS algorithm — the precursor to PC; tests ALL conditional independence relations.
2. The PC algorithm — named after Peter Spirtes and Clark Glymour; improves SGS by exploiting
   the *adjacency* structure discovered so far to limit the conditioning sets.
3. Formal proof of *completeness*: PC identifies the correct MEC under faithfulness + causal
   sufficiency + acyclicity.
4. The FCI algorithm (Fast Causal Inference) — extends PC to handle latent confounders and
   selection bias; returns a PAG (Partial Ancestral Graph) rather than a CPDAG.
5. Meek's orientation rules (Meek 1995) — four rules for propagating edge orientations after
   v-structure detection.

---

### 4. Meek (1995) — Orientation Rules
**Full citation:** Meek, C. (1995). Causal inference and causal explanation with background
knowledge. *Proceedings of the 11th Conference on Uncertainty in Artificial Intelligence (UAI)*,
pp. 403–410.

**Content:** Meek's four orientation rules (R1–R4) for completing the CPDAG after v-structure
orientation. These rules are *complete*: they orient all edges that can be oriented without making
assumptions beyond the Markov and faithfulness conditions.

- **R1 (Orient away from v-structure):** If $Z - X \to Y$ and $Z \not - Y$, orient $Z \to X$.
- **R2 (Avoid directed cycle):** If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$.
- **R3 (Avoid new v-structure):** If $X - Z \to Y$, $X - W \to Y$, $Z - W$ (no edge), and $X - Y$,
  orient $X \to Y$.
- **R4 (Orient to avoid ambiguity):** Additional rule for more complex patterns.

---

## Software Implementations
- **pcalg** (R package): Kalisch, Maechler, Colombo, Maathuis, Bühlmann — implements PC, FCI, 
  RFCI, GIES (generalized IDA-based ES). CRAN: https://cran.r-project.org/package=pcalg
- **causal-learn** (Python, pywhy): Python implementation of PC, FCI, GES, NOTEARS, and others.
  https://causal-learn.readthedocs.io/
- **bnlearn** (R): Scutari's package; implements several variants of hill-climbing and tabu search
  (score-based) plus PC and variants (constraint-based).
  https://www.bnlearn.com/
