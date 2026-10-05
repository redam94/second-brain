---
title: "Causal Discovery Assumptions"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/CITATIONS-constraint-score-based-discovery.md]]"
source_location: "Spirtes et al. 2000 Ch. 3-4; Kalisch & Bühlmann 2007 §2"
date_ingested: 2026-10-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "Causal Markov Condition"
  - "Faithfulness assumption"
  - "Causal Sufficiency"
  - "causal discovery identifying assumptions"
---

# Causal Discovery Assumptions

> [!summary]
> All standard causal discovery algorithms rest on three core assumptions about the
> data-generating process: (1) the **Causal Markov Condition** (the graph encodes
> all conditional independencies via d-separation); (2) **Faithfulness** (no
> accidental cancellations — every conditional independence in the distribution is
> d-separation-entailed by the graph); and (3) **Causal Sufficiency** (no unmeasured
> common causes). Under all three, the PC algorithm and GES are provably consistent
> for the true CPDAG. Each assumption can fail and has principled extensions.

## Overview

Causal discovery is a hard identifiability problem: many DAGs can generate the
same observational distribution. To make recovery possible, we impose three
assumptions that together guarantee the distribution "faithfully" reflects the
graph's structure. This note covers all three in depth: their formal statements,
intuitions, failure modes, and the algorithms that handle violations.

## Main Content

### Assumption 1: Causal Markov Condition

> [!definition] Definition: Causal Markov Condition (CMC)
> Let $G = (V, E)$ be a DAG over variables $V = \{X_1,\ldots,X_d\}$, and let
> $P(X_1,\ldots,X_d)$ be a joint distribution over $V$. The pair $(G, P)$
> satisfies the **Causal Markov Condition** if, for every $X_i \in V$:
> $$X_i \perp \mathrm{NonDesc}_G(X_i) \mid \mathrm{Pa}_G(X_i),$$
> where $\mathrm{Pa}_G(X_i)$ are the parents and $\mathrm{NonDesc}_G(X_i)$ are
> the non-descendants of $X_i$ in $G$.
>
> Equivalently: $P$ **factorizes** according to $G$ —
> $$P(X_1,\ldots,X_d) = \prod_{i=1}^{d} P(X_i \mid \mathrm{Pa}_G(X_i)).$$
^def-cmc

The CMC is the bridge between graph and distribution. It says: "The DAG tells
you which conditional independencies the distribution has — at least those
entailed by d-separation."

**Intuition**: Once you condition on a variable's direct causes (parents), it
becomes independent of all variables that don't causally descend from it. This
is the "local" statement; the global equivalent is the factorization.

**When CMC holds**: Always true when $G$ is the true generating graph of a
structural equation model (SEM) with independent noise terms.

**When CMC fails**: Cyclic graphs (feedback loops), or if the "DAG" is only
an approximation to a true cyclic generating process. Most algorithms assume
acyclicity.

### Assumption 2: Faithfulness

> [!definition] Definition: Faithfulness (Spirtes et al. 2000)
> The distribution $P$ is **faithful** to the DAG $G$ if every conditional
> independence in $P$ is entailed by d-separation in $G$:
> $$X \perp_P Y \mid S \quad \Longrightarrow \quad X \perp_G Y \mid S \quad (\text{d-separated in } G).$$
> Equivalently: **no accidental cancellations** — every CI in $P$ has a graphical
> explanation (d-separation), not just an algebraic accident.
^def-faithfulness

Together, CMC + Faithfulness give the equivalence:
$$X \perp_P Y \mid S \quad \Longleftrightarrow \quad X \perp_G Y \mid S.$$
This biconditional is what lets CI tests uniquely recover the CPDAG.

**Why faithfulness can fail:**

> [!example] Example: Faithfulness Violation (Path Cancellation)
> Consider a linear SEM: $Z = \alpha X + \varepsilon_Z$, $Y = \beta Z + \gamma X + \varepsilon_Y$.
> The true DAG is $X \to Z \to Y$ and $X \to Y$ (a cycle-free triangle).
> If $\beta \gamma + \alpha = 0$ (path coefficients cancel), then $X \perp Y \mid \varnothing$
> even though there is no d-separating set in $G$.
>
> A CI test would (correctly for the distribution) remove the $X - Y$ edge, producing
> the wrong skeleton. This is a faithfulness violation.
^example-faithfulness-violation

**How common are violations?**
Violations form a **measure-zero set** in parameter space for linear Gaussian SEMs —
the set of coefficient vectors where cancellations occur has zero Lebesgue measure.
They can arise from:
- Structural near-cancellations in high dimensions (more likely as $d$ grows)
- Deterministic structural constraints (a design feature, not an accident)
- Feedback loops that have been "closed" incorrectly

**Weaker assumptions:**
- **Adjacency-Faithfulness**: Only the marginal (not conditional) independence relations
  need to match. Weaker and more plausible. Assumed by some conservative algorithms.
- **Orientation-Faithfulness**: The orientation information is faithful even if
  adjacency-faithfulness is only approximately true.

### Assumption 3: Causal Sufficiency

> [!definition] Definition: Causal Sufficiency
> A set of observed variables $V$ is **causally sufficient** (with respect to a
> system) if there are **no unmeasured common causes** of two or more variables in $V$.
> Equivalently, every common cause of any pair $(X_i, X_j) \in V \times V$ is itself
> in $V$.
^def-causal-sufficiency

**Why it matters for PC/GES**: Both algorithms try to explain all associations by
paths in the observed DAG. If an unmeasured variable $H$ causes both $X$ and $Y$,
they appear dependent even conditioning on all observed variables — no observed
separating set exists for $X$ and $Y$, and the algorithms will add a false edge.

**When causal sufficiency fails**: Essentially all observational social-science
data. Unmeasured confounders (ability in education, unobserved preferences in
marketing) are the rule, not the exception.

**Extensions for non-sufficient settings:**

> [!theorem] Theorem: FCI Algorithm (Spirtes et al. 1995)
> When causal sufficiency fails, the correct target is a **Maximal Ancestral Graph
> (MAG)** — a graph that represents all observable and latent-variable entailed
> conditional independencies. The **Partial Ancestral Graph (PAG)** is the MEC
> summary of a MAG (analogous to CPDAG for DAGs).
>
> The **FCI** (Fast Causal Inference) algorithm is the constraint-based analogue
> of PC for non-sufficient settings. It outputs a PAG using:
> - Edges: $X \to Y$ (X is an ancestor of Y with no latent common cause), $X \leftarrow Y$ (reverse), $X \leftrightarrow Y$ (latent common cause), $X \circ \! \to Y$ (ancestry uncertain).
> - O-marks ($\circ$) represent uncertainty about whether an endpoint is a tail or arrowhead.
^thm-fci

### Joint implications: what PC/GES guarantee

Under CMC + Faithfulness + Causal Sufficiency, with an **oracle** (perfect CI tests):

> [!theorem] Theorem: Consistency of PC and GES (Spirtes et al. 2000; Chickering 2002)
> Let $G^*$ be the true DAG and $P$ be faithful to $G^*$ and satisfying CMC.
> Assume causal sufficiency. Then:
> - **PC algorithm** with oracle CI tests returns the unique CPDAG of $[G^*]$.
> - **GES** with a consistent scoring criterion (BIC/BDeu/BGe) returns the unique CPDAG of $[G^*]$.
>
> For **finite samples**, consistency requires additional conditions:
> - PC: Consistent CI tests (Fisher's Z for Gaussian; kernel-based for non-parametric).
>   Kalisch & Bühlmann (2007) prove uniform consistency in high dimensions ($d = O(n^a)$) under sparsity.
> - GES: Consistent score (BIC is consistent under standard regularity conditions).
^thm-consistency-pc-ges

### Summary table

| Assumption | What it buys | When it fails | Extension |
|-----------|-------------|--------------|-----------|
| Causal Markov Condition | CI structure = d-separation | Cyclic graphs, latent cycles | Acyclic SEMs always satisfy it |
| Faithfulness | CI tests identify skeleton | Measure-zero cancellations; structural constraints | Adjacency-faithfulness (weaker) |
| Causal Sufficiency | No hidden confounders | Most observational data | FCI algorithm → PAG |

## Connections

- [[Conditional Independence Assumption]] — the selection-on-observables assumption
  in causal inference; related but distinct (that's about estimating effects, not
  recovering structure)
- [[Directed Acyclic Graphs]] — d-separation is the graphical tool CMC and Faithfulness
  appeal to
- [[NOTEARS - Overview]] — the NOTEARS paper explicitly notes it requires faithfulness
  only for the statistical recovery results, not the computational contributions
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns that faithfulness
  must correctly capture

## See Also
- [[PC Algorithm]] — uses CMC + Faithfulness + Causal Sufficiency
- [[GES - Greedy Equivalence Search]] — same three assumptions
- [[Markov Equivalence Classes and CPDAGs]] — what these assumptions let us identify
- [[Causal Discovery Methods - Overview]] — full landscape
