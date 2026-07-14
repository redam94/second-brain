---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Chs. 3–5; Kalisch & Bühlmann (2007) JMLR §2; Pearl (1988) Ch. 3 (d-separation)"
date_ingested: 2026-07-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Constraint-based structure learning"
  - "CI-test causal discovery"
  - "d-separation faithfulness"
  - "causal Markov condition"
  - "faithfulness assumption"
---

# Constraint-Based Causal Discovery

> [!summary]
> Constraint-based methods learn causal DAG structure by **testing conditional independences**
> in data and reading off the graph: edges removed when a separating set is found, v-structures
> fixed when a node is absent from the separating set. The paradigm rests on two foundational
> assumptions — the **Causal Markov Condition** (the DAG encodes the independences of $P$) and
> **Faithfulness** (no extra independences beyond those implied by d-separation) — and on the
> **d-separation** criterion due to Pearl (1988). The canonical algorithm is [[PC Algorithm]].

## Overview

Score-based methods (like [[Greedy Equivalence Search (GES)]]) pick the graph that best fits
the data according to a score. Constraint-based methods take a complementary approach: they
directly test which conditional independences hold in $P$ and reconstruct the graph that would
imply exactly those independences. Crucially, constraint-based methods do not need to specify
a parametric model — only a conditional independence test. This makes them applicable to
non-Gaussian, non-linear data (with appropriate tests) without assuming a structural equation
model.

This note provides the theoretical foundations: d-separation, the Causal Markov Condition,
Faithfulness, and the key implication for identifiability. [[PC Algorithm]] describes the
algorithm that implements these foundations.

## Main Content

### d-Separation: the Graphical CI Oracle

> [!definition] Definition: d-separation (Pearl 1988)
> A path $\pi$ between $X$ and $Y$ in a DAG $G$ is **blocked** by a set $Z$ if it contains:
> 1. A **non-collider** $X_i \in Z$ on the path (i.e. the path traverses $\to X_i \to$ or
>    $\leftarrow X_i \to$ or $\to X_i \leftarrow$ **and** $X_i \in Z$), OR
> 2. A **collider** $X_i \notin Z$ (path traverses $\to X_i \leftarrow$) **and** no descendant
>    of $X_i$ is in $Z$.
>
> $X$ and $Y$ are **d-separated** given $Z$ in $G$, written $X \perp_G Y \mid Z$, if **every**
> path between $X$ and $Y$ is blocked by $Z$. Otherwise they are **d-connected** given $Z$.
^def-d-sep

> [!note] Intuition: colliders vs non-colliders
> **Non-colliders** behave like "pipes" or "forks": if you condition on them, you block the
> flow of information along the path.
> **Colliders** behave like "common effects" (v-structures): they *block* by default (the
> two causes are independent), but *open* when conditioned on (knowing the effect makes the
> causes dependent — "explaining away"). This is why conditioning on $X_j$ in $X_i \to X_j
> \leftarrow X_k$ makes $X_i$ and $X_k$ dependent.

### The Causal Markov Condition

> [!definition] Definition: Causal Markov Condition (CMC)
> A distribution $P$ and DAG $G$ satisfy the **Causal Markov Condition** if, in $G$:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}_G(X_i) \mid \mathrm{Pa}_G(X_i) \quad \text{for all } i.$$
> Each variable is conditionally independent of all non-descendants given its parents.
>
> **Equivalent formulation (global Markov property).** $P$ and $G$ satisfy the CMC iff
> every d-separation in $G$ implies the corresponding conditional independence in $P$:
> $$X \perp_G Y \mid Z \;\Rightarrow\; X \perp\!\!\!\perp Y \mid Z \text{ in } P.$$
>
> **Factorisation form.** CMC $\iff$ $P$ factorises as
> $$P(X_1,\ldots,X_d) = \prod_{i=1}^{d} P(X_i \mid \mathrm{Pa}_G(X_i)).$$
^def-cmc

> [!note] CMC and causality
> The CMC is the foundational link between graphical models and causal models. It states that
> the DAG captures *all* the relevant conditional independence structure: if $X$ is not caused
> by $Y$ or common causes of both, then $X$ and $Y$ should be conditionally independent given
> the appropriate set. The CMC fails when there are **hidden common causes** (latent confounders)
> — in that case, the full FCI algorithm (Spirtes et al. 2000) handles the extension.

### Faithfulness

> [!definition] Definition: Faithfulness (Spirtes et al. 2000; Meek 1995)
> A distribution $P$ is **faithful** to DAG $G$ if every conditional independence in $P$ is
> entailed by d-separation in $G$. Formally, for all disjoint sets $A, B, C \subseteq V$:
> $$A \perp\!\!\!\perp B \mid C \text{ in } P \;\Rightarrow\; A \perp_G B \mid C.$$
>
> Equivalently, $P$ has **no** conditional independences beyond those implied by the graph's
> d-separation statements.
^def-faithfulness

> [!theorem] Theorem: Faithfulness holds generically (Meek 1995)
> In a linear SEM with continuous noise, the set of parameter vectors $\theta$ for which
> faithfulness fails has **Lebesgue measure zero**. That is, "almost all" parameterisations
> of a given DAG produce faithful distributions.
>
> **Intuition.** Faithfulness can fail when structural coefficients exactly cancel — e.g. two
> paths $X \to Y \to Z$ and $X \to Z$ with coefficients $\beta_1 \beta_2 = -\beta_3$ so
> $X$ and $Z$ appear independent. This requires exact numerical coincidence and has probability
> zero under continuous parameter distributions.
^thm-faithfulness-generic

> [!warning] Near-faithfulness violations in finite samples
> While exact faithfulness violations are measure-zero, *near-faithfulness* (very small but
> nonzero partial correlations) causes practical problems in finite samples: a small partial
> correlation may fail to reject the CI test, incorrectly removing an edge. Kalisch & Bühlmann
> (2007) address this by making the test threshold $\alpha_n \to 0$ as $n \to \infty$.

### The Fundamental Theorem

> [!theorem] Theorem: Constraint-based identifiability (Spirtes et al. 2000, Th. 3.4)
> Under the Causal Markov Condition and Faithfulness, the **CPDAG** (Markov equivalence class)
> of the true DAG is **identifiable** from the conditional independence structure of $P$.
> Specifically, there exists a unique CPDAG $H^*$ such that:
> - Every d-separation in $H^*$ corresponds to a CI in $P$, and vice versa.
>
> **Corollary.** No constraint-based algorithm can do better than identifying the CPDAG —
> the full DAG is not identifiable from observational CIs alone (two Markov equivalent DAGs
> entail identical CIs for all faithful distributions).
^thm-identifiability

### Conditional Independence Tests

In practice, the CI oracle is replaced by a statistical test at level $\alpha$:

| Data type | Test | Key parameter |
|-----------|------|---------------|
| Continuous Gaussian | **Fisher's z-test** on partial correlations | $z = \tanh^{-1}(\hat\rho_{ij\cdot S}) \cdot \sqrt{n-|S|-3}$ |
| Continuous non-Gaussian | **Kernel CI test** (HSIC, KCI) | Bandwidth, permutation test |
| Discrete | **$G^2$ test** (log-likelihood ratio) | Degrees of freedom $= (r_i-1)(r_j-1)\prod_{s\in S}r_s$ |
| Binary | **Conditional mutual information** | Estimated via maximum likelihood |

**Fisher's z-test in detail.** For Gaussian data, $X_i \perp\!\!\!\perp X_j \mid X_S$ iff the
partial correlation $\rho_{ij\cdot S} = 0$. The test statistic
$$z_{ij\cdot S} = \frac{1}{2}\ln\!\left(\frac{1+\hat\rho_{ij\cdot S}}{1-\hat\rho_{ij\cdot S}}\right)\sqrt{n - |S| - 3}$$
is asymptotically $\mathcal{N}(0,1)$ under the null $\rho_{ij\cdot S}=0$.

### FCI: Extension to Hidden Confounders

The **Fast Causal Inference (FCI)** algorithm extends constraint-based methods to allow
**hidden common causes** (latent variables). Its output is a **PAG** (Partial Ancestral
Graph) using additional edge marks (circle, arrowhead, tail) to encode uncertainty about
whether arrows reflect direct causes or confounding. FCI is more conservative than PC —
it makes fewer orientation commitments — but applies when the no-hidden-variables assumption
is implausible. In the vault context, the CMC without FCI corresponds to the DAGs in
[[Directed Acyclic Graphs]] and [[Spurious Association and Confounds]] (full-data d-separation).

## Connections

- **d-separation and the back-door criterion:** [[Directed Acyclic Graphs]] formalises
  d-separation and the back-door criterion; Constraint-Based Causal Discovery inverts
  this relationship — given data, it *recovers* the d-separation structure.
- **vs. score-based methods:** [[Greedy Equivalence Search (GES)]] avoids specifying an
  explicit CI test (uses BIC instead) and is consistent without specifying the noise model.
  Constraint-based methods are more transparent about what they test but are sensitive to
  test-level choices.
- **vs. NOTEARS:** [[NOTEARS - Overview]] assumes a linear SEM and Gaussian/non-Gaussian
  noise; it bypasses CI testing entirely, optimising a continuous score. On dense graphs
  (many parents), NOTEARS outperforms PC significantly (see [[NOTEARS Experiments]]).
- **Connection to Bayesian networks:** The CMC and faithfulness justify the use of DAGs as
  probabilistic graphical models; see [[LLM Expert Elicitation for Bayesian Networks]] and
  [[BN Construction Methods Comparison]] for BN construction in the vault's applied work.

## See Also
- [[PC Algorithm]] — the canonical constraint-based algorithm
- [[Markov Equivalence and CPDAGs]] — the output target and its graphical representation
- [[Greedy Equivalence Search (GES)]] — score-based alternative
- [[Directed Acyclic Graphs]] — d-separation, DAG semantics, do-calculus
- [[DAG Structure Learning Problem]] — problem formulation and landscape of methods
- [[Spurious Association and Confounds]] — applied DAG reasoning in causal inference
