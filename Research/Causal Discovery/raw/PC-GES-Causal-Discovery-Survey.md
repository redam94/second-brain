---
title: "Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning (PC Algorithm and GES)"
type: synthesis-survey
date_created: 2026-07-23
note: "PDF downloads blocked by session network policy (jmlr.org and arxiv.org both returned 403). This survey synthesises the key papers from training knowledge."
---

# Synthesis Survey: PC Algorithm and GES

> Covers Gap #9 in `Dream/_Index.md`: constraint-based (PC algorithm) and score-based
> (GES) causal structure learning. NOTEARS is already covered; this fills the remaining
> half of causal discovery.

---

## Key Papers

### 1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed.
- **Publisher**: MIT Press
- **Relevance**: Foundational book introducing the PC algorithm (PC = Peter [Spirtes] and Clark [Glymour]).
- **Key contributions**: (1) The PC algorithm for constraint-based structure learning from observational data. (2) FCI (Fast Causal Inference) for settings with latent confounders. (3) The faithfulness assumption as a necessary condition for causal identification from observational data.
- **PC algorithm origin**: Chapter 5. The algorithm first learns the skeleton via conditional independence tests, identifies v-structures (immoralities), then applies orientation propagation rules.
- **Faithfulness (Stability) assumption**: Coined here. The distribution is faithful to G if every conditional independence in P is entailed by d-separation in G. This is the converse of the Markov condition.

### 2. Verma & Pearl (1990) — "Equivalence and Synthesis of Causal Models"
- **Venue**: Sixth Conference on Uncertainty in Artificial Intelligence (UAI 1990)
- **Key result**: Two DAGs are Markov equivalent (same d-separation statements, hence same observational distribution in the Gaussian/faithful case) if and only if they share the same **skeleton** (undirected adjacency) and the same set of **v-structures** (immoralities: X→Z←Y where X,Y non-adjacent).
- **Significance**: This characterises exactly what observational data can identify — the Markov Equivalence Class (MEC), not a single DAG. All structure learning algorithms on observational data output the MEC.

### 3. Meek (1995) — "Causal Inference and Causal Explanation with Background Knowledge"
- **Venue**: UAI 1995
- **Key result**: After skeleton learning and v-structure identification, the remaining undirected edges in a PDAG can be oriented (when the orientation is forced by Markov equivalence) by applying four deterministic rules (R1–R4). These Meek rules complete a PDAG into a CPDAG.
- **CPDAG**: Completed Partially Directed Acyclic Graph — the canonical representative of the MEC. Directed edges = shared direction across all DAGs in the MEC. Undirected edges = vary across DAGs.

### 4. Chickering (2002) — "Optimal Structure Identification with Greedy Search"
- **Venue**: Journal of Machine Learning Research 3:507-554
- **Key contribution**: The GES (Greedy Equivalence Search) algorithm. Searches over MECs (not individual DAGs) to maximize a decomposable score (BIC/BDe). Two phases: Forward Equivalence Search (FES, greedily add edges) and Backward Equivalence Search (BES, greedily remove edges).
- **Consistency theorem (Thm. 15)**: GES converges to the true MEC under (1) causal faithfulness, (2) correct/sufficient scoring criterion (BIC is correct when the Gaussian-SEM generates the data), (3) i.i.d. data from the true distribution.
- **Score decomposability**: BIC(G) = Σⱼ [log P(Xⱼ | PAⱼ) data term - (dⱼ/2)log n] where dⱼ = |PAⱼ|. This decomposability allows greedy local updates (insert/delete single edges) without recomputing the entire score.
- **Operators**: INSERT(X,Y,T), DELETE(X,Y,H), TURN(X,Y,C) each move from one CPDAG to an adjacent CPDAG in the MEC lattice.

### 5. Kalisch & Bühlmann (2007) — "Estimating High-Dimensional DAGs with the PC-Algorithm"
- **Venue**: Journal of Machine Learning Research 8:613-636
- **Key contribution**: Rigorous consistency analysis of the PC algorithm in the high-dimensional setting (p >> n). Proves that PC is consistent when the partial correlations decay at appropriate rates (ρ_max = O(n^{-κ}) for κ ∈ (0, 1/2)).
- **Sparsity condition**: Requires the graph to have bounded maximum degree q (number of neighbours). Complexity is O(p^{q+2}) CI tests.
- **Finite-sample analysis**: Under Gaussianity, using Fisher's z-transform for CI tests with α = O(n^{-κ}), PC recovers the skeleton and v-structures with probability → 1.

### 6. Colombo & Maathuis (2014) — "Order-Independent Constraint-Based Causal Structure Learning"
- **Venue**: Journal of Machine Learning Research 15:3921-3962
- **Problem addressed**: The original PC algorithm's skeleton phase is order-dependent — different orderings of variables and tests can produce different skeletons due to finite-sample CI test errors.
- **Solution — PC-stable**: A modified skeleton phase that tests all adjacencies at each level ℓ before removing any edges, making the skeleton independent of variable ordering.
- **Second contribution — Conservative PC (CPC)**: Marks v-structures as "ambiguous" (not oriented) when the CI evidence is conflicting, reducing false-positive v-structures.
- **Software**: pc() and skeleton() in the pcalg R package implement PC-stable.

### 7. Chickering (1995) — "A Transformational Characterization of Equivalent Bayesian Network Structures"
- **Venue**: UAI 1995
- **Key result**: Complementary to Verma & Pearl (1990). Proves that any two Markov-equivalent DAGs can be transformed into each other by a sequence of covered-edge reversals (reversing X→Y where the parent sets satisfy PA(X) = PA(Y)\{X}). This transformation structure underlies the GES INSERT/DELETE/TURN operators.

---

## Key Concepts Covered

### Markov Equivalence Class (MEC)
Two DAGs G₁, G₂ are Markov equivalent iff they share the same skeleton and v-structures. Notation: [G] = MEC of G. MEC size can be exponential in the number of nodes.

### CPDAG
The unique partially directed graph that represents the MEC. Has directed edge A→B iff A→B is in all DAGs in the MEC. Has undirected edge A-B iff A→B is in some but not all.

### Faithfulness Assumption
P is faithful to G iff: X ⊥ Y | S in P ⟹ X is d-separated from Y by S in G.
Combined with the Markov condition (G implies P's d-separations), gives:
X ⊥ Y | S in P ⟺ d-sep(X, Y | S) in G.
This allows reading all d-separations from CI tests.

### Conditional Independence Tests
- **Gaussian data**: Fisher's z-transform of partial correlation r_{XY·S}. Statistic: z = (1/2) log[(1+r)/(1-r)], asymptotically N(0, 1/(n-|S|-3)) under H₀.
- **Discrete data**: G² = 2Σ O log(O/E) or Pearson χ². Degrees of freedom = (|X|-1)(|Y|-1)∏_{s∈S}|s|.
- **Nonparametric**: Kernel HSIC (Hilbert-Schmidt Independence Criterion) — does not assume Gaussian or linear relationships. Used in kernel PC algorithm.

### PC Algorithm Step-by-Step
1. **Skeleton (ℓ=0,1,2,...)**: Start with complete graph. Test X ⊥ Y | S for all adjacent (X,Y) and |S|=ℓ subsets of adj(X)\{Y}. Remove edge (X,Y) if independence found; store sep(X,Y)=S. Increment ℓ. Stop when no pair has adjacency set large enough for ℓ.
2. **V-structures**: For each unshielded triple X-Z-Y (X,Y non-adjacent): orient X→Z←Y iff Z ∉ sep(X,Y).
3. **Meek rules** (repeat until fixed point):
   - R1: A→B-C, A not adj C → orient B→C
   - R2: A→B→C, A-C undirected → orient A→C
   - R3: A-C undirected, B₁→C, B₂→C, A-B₁, A-B₂, B₁ not adj B₂ → orient A→C
   - R4: A-C undirected, B-C→D, A→D, A not adj C → orient A→C (for interventional extensions)

### GES Algorithm Step-by-Step
1. **FES (Forward Equivalence Search)**: Start with empty CPDAG.
   - Greedily apply INSERT(X,Y,T) if it increases Score(CPDAG). INSERT adds X→Y and makes the nodes in T (a clique in adj(X)∩adj(Y) that becomes a new v-structure's front nodes) into parents of Y.
   - Repeat until no INSERT improves the score.
2. **BES (Backward Equivalence Search)**: From the FES output.
   - Greedily apply DELETE(X,Y,H) if it increases Score(CPDAG). DELETE removes X→Y or X-Y and re-orients edges in H.
   - Repeat until no DELETE improves the score.

### Comparison: PC vs GES

| Aspect | PC Algorithm | GES |
|--------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (maximize BIC) |
| Search space | - | MEC lattice (via CPDAG operations) |
| Distributional assumption | Faithfulness + Markov; CI test choice determines rest | Faithfulness + correct score |
| Output | CPDAG | CPDAG |
| Consistency | Yes, under faithfulness + oracle CI | Yes, under faithfulness + BIC |
| High-dim (p>>n) | PC: yes (Kalisch & Bühlmann 2007) | FGES extension (Ramsey et al. 2017) |
| R package | pcalg: pc(), pc_stable() | pcalg: ges(); TETRAD's FGES |
| Python | causal-learn: PC() | causal-learn: GES() |
| Sensitivity | CI test α level | BIC penalty parameter |

---

## Connections to Vault Notes

- [[DAG Structure Learning Problem]] — Problem setup (SEM, score functions) that both PC and GES operate within
- [[NOTEARS - Overview]] — NOTEARS lists PC and GES as baseline methods (comparisons in experiments section)
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, back-door criterion) that underpins faithfulness
- [[Spurious Association and Confounds]] — Fork/pipe/collider patterns that structure learning algorithms recover
- [[Conditional Independence Assumption]] — The core assumption in causal identification that CI tests operationalize
- [[LLM Expert Elicitation for Bayesian Networks]] — Expert-based structure learning as alternative to algorithmic discovery
- [[BN Construction Methods Comparison]] — Comparison of structure learning approaches
- [[Summary Causal DAGs]] — Downstream application where structure learning is the preprocessing step
