---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "Spirtes & Glymour (1991) Soc. Sci. Comput. Rev.; Spirtes, Glymour & Scheines (2000) §5.4; Kalisch & Bühlmann (2007) JMLR §3–4; Meek (1995) UAI (orientation rules)"
date_ingested: 2026-07-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "skeleton learning"
  - "Meek orientation rules"
  - "PC-stable"
  - "pcalg"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991) is the canonical **constraint-based** method
> for causal structure learning. Starting from a complete undirected graph, it removes edges
> whenever a conditional independence is found, then orients edges using v-structures and
> Meek's four propagation rules, outputting a **CPDAG** (Markov equivalence class). Under
> faithfulness + Causal Markov Condition, PC is sound and complete. Kalisch & Bühlmann (2007)
> show it is consistent even when $d = O(n^a)$ for any $a > 0$ under sparsity.

## Overview

PC is named after its inventors, **P**eter Spirtes and **C**lark Glymour. It implements the
principle from [[Constraint-Based Causal Discovery]]: edges exist iff no conditional
independence separates their endpoints. The algorithm has three phases with very different
computational profiles:

1. **Skeleton learning** — the computational bottleneck: $O(d^q)$ CI tests where $q$ is the
   maximum adjacency size.
2. **V-structure orientation** — $O(d^3)$ unshielded triple checks.
3. **Meek rule propagation** — $O(d^4)$ in the worst case, negligible in practice.

The algorithm avoids specifying a parametric model beyond the CI test — making it applicable
to Gaussian, discrete, or non-parametric settings by swapping the test.

## Main Content

### Phase 1: Skeleton Learning

> [!definition] Definition: Skeleton learning phase (Spirtes et al. 2000 §5.4.2)
> **Input.** Variables $V = \{X_1,\ldots,X_d\}$; CI oracle (or test at level $\alpha$).
>
> **Procedure.**
> 1. Initialize the **complete undirected graph** $C_0 = K_d$ on $V$.
> 2. Set $\ell = 0$. Repeat:
>    - For each **adjacent pair** $(X_i, X_j)$ in current graph $C_\ell$:
>      - For each $S \subseteq \mathrm{Adj}_{C_\ell}(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - Perform CI test: if $X_i \perp\!\!\!\perp X_j \mid X_S$, then:
>          - Remove edge $X_i - X_j$ from the graph.
>          - Record $\mathrm{sep}(i,j) = \mathrm{sep}(j,i) := S$.
>          - Break (move to next pair).
>    - Set $\ell \leftarrow \ell + 1$.
>    - **Stop** when for every adjacent pair $(X_i, X_j)$: $|\mathrm{Adj}(X_i)| - 1 < \ell$.
>
> **Output.** Skeleton $\widehat{S}$ and separation sets $\{\mathrm{sep}(i,j)\}$.
^def-skeleton

> [!note] Why increasing conditioning set size?
> In the true DAG, if $X_i \perp\!\!\!\perp X_j \mid X_{S^*}$ for some $S^*$, then $S^*$
> is a subset of the adjacency of $X_i$ or $X_j$ in the true DAG (by faithfulness). The
> algorithm starts with small conditioning sets (easier to estimate, more power) and increases
> the size only as edges are removed, keeping $\mathrm{Adj}(X_i)$ manageable. This gives the
> algorithm its polynomial-time character for sparse graphs (bounded degree $q$): the number
> of CI tests per pair is $\binom{d}{q}$, i.e. $O(d^q)$ total.

> [!example] Example: Skeleton learning on 4 variables
> **Setup.** Variables $\{A, B, C, D\}$; true DAG: $A \to B \to C$, $A \to C$, $B \to D$.
>
> **Level $\ell=0$ (unconditional independence):**
> - Test all $\binom{4}{2}=6$ pairs. Suppose $A \not\perp D$ (they share path $A\to B\to D$).
> - Only $C \perp D \mid \emptyset$? No — $C$ and $D$ share $B$ as a parent: $C \not\perp D$.
> - Suppose the only pair that is marginally independent is $(A,D)$? In this example no pair
>   is marginally independent, so no edges removed at $\ell=0$.
>
> **Level $\ell=1$ (conditioning on one variable):**
> - Test $C \perp D \mid B$: since $B$ is the only path between them $A\to B\to D$ / $B\to C$
>   and separates, $C \perp D \mid B$ → remove edge $C-D$, record $\mathrm{sep}(C,D)=\{B\}$.
> - Similarly test other pairs with conditioning sets of size 1 to remove spurious edges.
>
> **Result.** Skeleton reveals adjacencies consistent with the true graph.

### Phase 2: V-Structure Orientation

> [!definition] Definition: V-structure detection (Spirtes et al. 2000 §5.4.3)
> **Input.** Skeleton $\widehat{S}$ and separation sets $\mathrm{sep}(i,j)$.
>
> **Procedure.** For each **unshielded triple** $(X_i, X_j, X_k)$ in the skeleton (i.e.,
> $X_i \sim X_j$, $X_j \sim X_k$, but $X_i \not\sim X_k$):
> - If $X_j \notin \mathrm{sep}(i,k)$: orient as the **v-structure** $X_i \to X_j \leftarrow X_k$.
> - If $X_j \in \mathrm{sep}(i,k)$: leave both edges undirected.
>
> **Output.** Partially directed graph $\widehat{P}$ with v-structures oriented.
^def-vstruct

> [!theorem] Theorem: Correctness of v-structure detection (Spirtes et al. 2000)
> Under faithfulness + CMC, the v-structure detection rule is **sound**: if $X_j \notin
> \mathrm{sep}(i,k)$, then $X_i \to X_j \leftarrow X_k$ is a collider in **every** DAG
> in the true MEC.
>
> **Proof sketch.** The path $X_i - X_j - X_k$ exists in the skeleton (not removed).
> $X_i \perp\!\!\!\perp X_k \mid X_S$ for $S = \mathrm{sep}(i,k)$. If $X_j \notin S$, then
> $X_j$ is *not* in the separating set, meaning conditioning on $X_j$ would open the path
> $X_i - X_j - X_k$ — this is the signature of a collider (v-structure). By faithfulness,
> this must be a v-structure in the true DAG.
^thm-vstruct-correct

### Phase 3: Meek Orientation Rules

After v-structures are fixed, additional edges can be oriented to preserve the equivalence
class without creating new v-structures or cycles. Meek (1995) proved that exactly four rules
are sound and complete for this task.

> [!definition] Definition: Meek orientation rules (Meek 1995)
> Apply each rule repeatedly until no new edges can be oriented:
>
> **R1** (Avoid new v-structure):
> If $\alpha \to \beta - \gamma$ and $\alpha \not\sim \gamma$:
> orient $\beta \to \gamma$.
> *Reason:* If $\beta \leftarrow \gamma$ were instead, it would create v-structure $\alpha \to \beta \leftarrow \gamma$, contradicting that $\alpha \to \beta$ was already compelled.
>
> **R2** (Avoid directed cycle):
> If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$:
> orient $\alpha \to \gamma$.
> *Reason:* If $\alpha \leftarrow \gamma$ were instead, a directed cycle $\alpha \to \beta \to \gamma \to \alpha$ would form.
>
> **R3** (Fork into v-structure via two paths):
> If $\alpha - \beta \to \gamma$, $\alpha - \delta \to \gamma$, $\alpha - \gamma$, and $\beta \not\sim \delta$:
> orient $\alpha \to \gamma$.
> *Reason:* Both $\beta$ and $\delta$ point into $\gamma$; if $\gamma \to \alpha$ it creates unshielded v-structures $\alpha \leftarrow \gamma - \beta$ or similar.
>
> **R4** (Double-chained inference):
> If $\alpha - \beta \to \gamma \to \delta$, $\alpha - \delta$, $\alpha \not\sim \gamma$, and $\beta \sim \delta$:
> orient $\alpha \to \delta$.
>
> **Completeness (Meek 1995, Th. 2).** The four rules R1–R4 are complete: every edge that
> can be oriented without changing the Markov equivalence class will be oriented by repeated
> application of these rules.
^def-meek-rules

### Consistency: High-Dimensional Setting

> [!theorem] Theorem: Consistency of PC (Kalisch & Bühlmann 2007, Th. 3.1)
> Assume:
> - Causal Markov Condition and Faithfulness for the true DAG $G^*$.
> - Gaussian distribution (for Fisher's z-test).
> - Maximum adjacency size $q$ satisfies $q = o(\log n / \log p)$ (sparsity).
> - Significance level $\alpha_n$ satisfies $\alpha_n \to 0$ and $n^{1/3}\alpha_n \to \infty$
>   (e.g. $\alpha_n = 1/\log n$).
>
> Let $p = O(n^a)$ for any fixed $a > 0$. Then:
> $$\Pr[\widehat{H}_n = H^{*}] \to 1 \quad \text{as } n \to \infty,$$
> where $H^*$ is the CPDAG of $G^*$.
>
> **Significance.** This allows $p \gg n$ (high-dimensional setting), provided the graph is
> sparse. The number of variables can grow **polynomially** in sample size.
^thm-pc-consistent

### The Stable PC Variant

> [!definition] Definition: Stable PC (Colombo & Maathuis 2014)
> The original PC algorithm is **order-dependent**: the set $\mathrm{Adj}(X_i)$ used to
> form conditioning sets changes mid-level as edges are removed, so a different ordering of
> pairs produces a different skeleton.
>
> **Stable PC fix**: at the start of each level $\ell$, fix the adjacency list $A^{(\ell)}$
> from the *beginning* of that level. All CI tests at level $\ell$ use $A^{(\ell)}$, even as
> edges are removed. This makes the output **order-independent**.
>
> In practice: `pc(suffStat, indepTest, alpha, p, maj.rule=TRUE)` in `pcalg` R package
> implements the stable, majority-rule variant by default.
^def-stable-pc

### Computational Complexity

| Phase | Complexity | Bottleneck |
|-------|-----------|------------|
| Skeleton learning | $O(d^{q+2})$ CI tests, each costing $O(n q^2)$ for Gaussian | Number of conditioning sets |
| V-structure orientation | $O(d^3)$ triple checks | Number of unshielded triples |
| Meek rules | $O(d^4)$ in worst case | Propagation steps |

For sparse graphs ($q$ small), the algorithm is polynomial. Dense graphs (large $q$) make
the skeleton phase exponential — this is PC's fundamental weakness vs. NOTEARS.

### Software

| Package | Call | Notes |
|---------|------|-------|
| `pcalg` (R) | `pc(suffStat, indepTest, alpha, p)` | Reference implementation; supports Gaussian, discrete, non-parametric tests |
| `causal-learn` (Python) | `pc(data, alpha, indep_test)` | Supports `fisherz`, `kci`, `gsq`, `chisq` |
| TETRAD (Java) | PC algorithm GUI | Also available via `py-tetrad` Python wrapper |

## Examples

> [!example] Example: PC on the Sachs protein-signaling network
> **Setting.** Sachs et al. (2005): $d=11$ proteins/phospholipids, $n=7466$ observations,
> known gold-standard network with 20 edges. Also used by NOTEARS.
>
> **PC result (from literature).** PC is reported as "significantly weaker" than FGS and
> NOTEARS in the NOTEARS supplement. On the Sachs data:
> - SHD = 22–25 (vs. FGS/NOTEARS: SHD = 22).
> - Sensitivity to $\alpha$: small $\alpha$ gives fewer edges (conservative), larger $\alpha$
>   adds spurious edges. Optimal $\alpha \approx 0.01$–$0.05$.
>
> **Lesson.** On a well-studied low-dimensional ($d=11$) problem, PC performs comparably to
> score-based methods. Performance degrades on large, dense graphs (see [[NOTEARS Experiments]]).

> [!example] Example: PC on Gaussian linear SEM (worked trace)
> **Setup.** True DAG: $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to X_3$ (chain with shortcut).
> Linear SEM: $X_2 = \beta_1 X_1 + \varepsilon_2$, $X_3 = \beta_2 X_2 + \beta_3 X_1 + \varepsilon_3$.
>
> **Skeleton learning:**
> - $\ell=0$: Test all pairs. $X_1 \not\perp X_2$, $X_1 \not\perp X_3$, $X_2 \not\perp X_3$.
>   No edges removed.
> - $\ell=1$: Test $X_1 \perp X_3 \mid X_2$? No — the direct edge $X_1 \to X_3$ means
>   $X_1 \not\perp X_3 \mid X_2$ (faithfulness). All three edges survive.
> - Skeleton: $1-2-3$ with also $1-3$.
>
> **V-structures:** No unshielded triple exists (all pairs are adjacent). No v-structures.
>
> **Output CPDAG:** $1-2-3$ with $1-3$ — all edges undirected (fully equivalent chain/fork/DAG).
>
> **Lesson.** When all pairs are adjacent, PC cannot orient any edges — the equivalence class
> contains many DAGs. The direct $X_1 \to X_3$ edge is not distinguishable from $X_1 \leftarrow X_3$.

## Connections

- **Relation to FCI:** The **FCI** algorithm (Fast Causal Inference, Spirtes et al. 2000) is a
  sound-and-complete extension of PC to settings with latent confounders. FCI outputs a PAG
  (Partial Ancestral Graph) using circle edge-marks to encode uncertainty.
- **Comparison with GES:** [[Greedy Equivalence Search (GES)]] scores-based approach is
  consistent under the same assumptions but avoids explicit CI testing. In practice, GES
  (and FGES) tends to outperform PC on dense graphs by using global score information.
- **NOTEARS comparison:** [[NOTEARS - Overview]] is fundamentally different — it optimises a
  continuous score without CI tests. NOTEARS "decisively outperforms" PC on dense/large graphs;
  see [[NOTEARS Experiments]].
- **pcalg ecosystem:** The `pcalg` R package also implements GES (`ges()`), FCI (`fci()`),
  RFCI, LINGAM, and IDA (intervention calculus when the DAG is known up to MEC).

## See Also
- [[Constraint-Based Causal Discovery]] — foundations: d-separation, CMC, faithfulness
- [[Markov Equivalence and CPDAGs]] — what the algorithm outputs and why
- [[Greedy Equivalence Search (GES)]] — score-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[NOTEARS Experiments]] — PC as a (weaker) baseline
- [[DAG Structure Learning Problem]] — landscape of all methods
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation
