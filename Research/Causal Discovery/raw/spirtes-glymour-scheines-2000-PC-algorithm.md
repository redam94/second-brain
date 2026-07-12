# Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search (2nd Ed.)

**Source:** MIT Press. 2nd edition freely available from the authors' Carnegie Mellon page.
**Network policy:** Direct PDF download blocked by session network policy (403 from proxy).
**Synthesis:** This file documents key material from the PC algorithm chapters based on training knowledge of the published text, supplemented by Spirtes & Glymour (1991) "An algorithm for fast recovery of sparse causal graphs" (*Social Science Computer Review* 9(1):62–72) and Meek (1995) "Causal inference and causal explanation with background knowledge" (*UAI 1995*, pp. 403–410).

---

## Book Structure (Chapters relevant to PC algorithm)

**Chapter 3 — Causation and Prediction:** Introduces the directed acyclic graph (DAG) framework, the Markov condition, and the faithfulness assumption.

**Chapter 5 — Discovery Algorithms for Causally Sufficient Systems:** The main chapter on the PC algorithm. Covers the skeleton phase, v-structure orientation, and Meek's orientation propagation rules.

**Chapter 6 — Limitations of Algorithms:** Identifiability, equivalence classes, and when causal structure is not recoverable.

---

## Key Definitions

### Markov Condition (Markov Assumption)
A DAG $G$ and probability distribution $P$ satisfy the **Markov condition** if every variable $X_i$ is conditionally independent of its non-descendants given its parents in $G$:
$$X_i \perp_P \text{NonDesc}(X_i) \mid \text{Pa}(X_i)$$
This is equivalent to $P$ factoring as $P(X_1,\ldots,X_d) = \prod_{i=1}^{d} P(X_i \mid \text{Pa}(X_i))$.

### Faithfulness Assumption
$P$ and $G$ satisfy **faithfulness** (Spirtes et al. call it the "stability condition") if *every* conditional independence in $P$ is a consequence of the Markov condition applied to $G$. Formally: $X \perp_P Y \mid Z \Rightarrow X \perp_G Y \mid Z$ (d-separation). Faithfulness rules out "accidental" cancellations of path coefficients that would create extra independencies not entailed by the graph structure.

### Markov Equivalence and CPDAG
Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if they encode exactly the same set of conditional independencies (d-separation statements). Verma & Pearl (1990) showed: $G_1 \sim G_2$ iff they have (1) the same skeleton (undirected graph) and (2) the same v-structures (unshielded colliders $X \to Z \leftarrow Y$ where $X$–$Y$ have no edge). The **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique mixed graph (some edges directed, some undirected) representing the entire Markov equivalence class.

---

## The PC Algorithm

The **PC algorithm** (named after Peter Spirtes and Clark Glymour) is a constraint-based causal discovery algorithm that recovers the CPDAG of the data-generating DAG under the Markov and faithfulness assumptions.

### Phase 1: Skeleton Discovery (Adjacency Phase)

**Start:** Complete undirected graph on $d$ variables.

**Iterate over all pairs $(X_i, X_j)$:**
- Begin with $\ell = 0$ (zero conditioning variables).
- For each $\ell = 0, 1, 2, \ldots$:
  - For each adjacent pair $(X_i, X_j)$ with $|\text{Adj}(X_i) \setminus \{X_j\}| \geq \ell$:
    - For each subset $\mathbf{S} \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with $|\mathbf{S}| = \ell$:
      - Test $H_0: X_i \perp X_j \mid \mathbf{S}$ at significance level $\alpha$.
      - If the test **fails to reject** $H_0$: remove edge $X_i$–$X_j$ from the skeleton, record $\text{SepSet}(X_i, X_j) = \mathbf{S}$, and break the inner loop.
  - Increment $\ell$.
- Stop when no adjacent pair has $|\text{Adj}(X_i) \setminus \{X_j\}| \geq \ell$.

The **Separation Set** $\text{SepSet}(X_i, X_j)$ is the conditioning set that renders $X_i$ and $X_j$ independent. It is used in Phase 2.

**Complexity:** $O(d^{k+2})$ CI tests where $k$ is the maximum in-degree of the true DAG. This makes PC polynomial in $d$ for sparse graphs (bounded $k$), unlike exhaustive search.

**Key correctness result (Spirtes et al., Thm 5.1 CPS):** Under the Markov and faithfulness assumptions, in the oracle case (exact CI information), PC recovers the true skeleton with the correct separation sets.

### Phase 2: V-Structure Orientation

For each unshielded triple $X_i$–$X_k$–$X_j$ (where $X_i$–$X_j$ edge was removed):
- If $X_k \notin \text{SepSet}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (a **v-structure** / unshielded collider).
- Otherwise: leave $X_i$–$X_k$–$X_j$ undirected for now.

**Why v-structures are identifiable:** The v-structure $X \to Z \leftarrow Y$ (with no $X$–$Y$ edge) is identified because $Z \notin \text{SepSet}(X,Y)$: $X$ and $Y$ are marginally dependent (or become dependent when conditioning on $Z$, a collider). This is the key asymmetry that allows orienting some edges from observational data.

### Phase 3: Edge Orientation Propagation (Meek Rules)

Apply Meek's (1995) four orientation rules repeatedly until no more edges can be oriented:

- **R1** (Acyclicity): If $X \to Y$ – $Z$ and no edge $X$–$Z$, then $Y \to Z$ (to avoid a new v-structure).
- **R2** (Cycle avoidance): If $X \to Y \to Z$ and $X$ – $Z$, then $X \to Z$ (to avoid a cycle).
- **R3** (If applicable): More complex configurations...
- **R4** (Discriminating paths): Handles longer paths for further orientation.

The result is the **CPDAG** representing the Markov equivalence class of the true DAG.

---

## Conditional Independence Tests Used in PC

### Gaussian/Linear Case: Fisher-Z Test
For continuous data with linear Gaussian assumptions, test $X \perp Y \mid \mathbf{Z}$ using the partial correlation:
$$r_{XY|\mathbf{Z}} = \frac{\hat{\sigma}_{XY|\mathbf{Z}}}{\sqrt{\hat{\sigma}_{XX|\mathbf{Z}} \hat{\sigma}_{YY|\mathbf{Z}}}}$$
Fisher's Z-transform: $Z = \frac{1}{2}\ln\frac{1+r}{1-r}$, which under $H_0$ has approximate $N(0, 1/(n-|\mathbf{Z}|-3))$ distribution.

### Discrete/Categorical Case
Use the $G^2$ statistic (log-likelihood ratio) or $\chi^2$ test on the conditional contingency table of $X$ and $Y$ given $\mathbf{Z}=\mathbf{z}$ for each cell $\mathbf{z}$.

### Non-Parametric / Kernel-Based
Kernel-based CI tests (Zhang et al. 2011, KCIT) using the HSIC statistic, for non-linear non-Gaussian data. Computationally expensive: $O(n^3)$ per test.

---

## Identifiability Limitations

In general, only the CPDAG (equivalence class) is identifiable from observational data under Markov + faithfulness. Individual edge directions that are not part of any v-structure and not forced by Meek's rules remain **undetermined** — the data are consistent with both orientations.

**Exceptions where full DAG is identifiable:**
- Linear non-Gaussian SEM (LiNGAM: Shimizu et al. 2006) — non-Gaussianity enables full identification via ICA.
- Nonlinear additive noise models (ANM: Hoyer et al. 2009) — asymmetry of residuals identifies direction.
- NOTEARS-family models (Zheng et al. 2018) — see [[NOTEARS - Overview]].

---

## References

- Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd Ed. MIT Press.
- Spirtes, P., & Glymour, C. (1991). An algorithm for fast recovery of sparse causal graphs. *Social Science Computer Review*, 9(1), 62–72.
- Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI 1995*, pp. 403–410.
- Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI 1990*, pp. 220–227.
- Zhang, K., Peters, J., Janzing, D., & Schölkopf, B. (2011). Kernel-based conditional independence test and application in causal discovery. *UAI 2011*.
