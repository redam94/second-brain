---
title: "Constraint-Based Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2 Prior Approaches, p. 3; Spirtes, Glymour & Scheines (2000)"
date_ingested: 2026-09-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI-based structure learning"
  - "conditional independence testing for DAGs"
  - "constraint-based causal discovery"
  - "faithfulness assumption"
  - "causal sufficiency"
---

# Constraint-Based Structure Learning

> [!summary]
> Constraint-based structure learning recovers a DAG's Markov equivalence class by treating
> **conditional independence (CI) relations** as constraints on the graph structure.
> The foundation is the **global Markov property**: every CI relation implied by
> d-separation in the true DAG holds in the data. Under **faithfulness** (the converse),
> every CI in the data comes from a d-separation — allowing the algorithm to *read off*
> the graph from the CI pattern. The flagship method is the **PC algorithm** (Spirtes &
> Glymour, 1991), which recovers the CPDAG of the true DAG in the large-sample limit.

## Overview

Two complementary paradigms dominate causal structure learning from data
(see [[DAG Structure Learning Problem]] for the full landscape):

| Paradigm | Core idea | Main algorithm | Output |
|---|---|---|---|
| **Constraint-based** | Use CI tests as constraints on $G$ | PC, FCI | CPDAG or PAG |
| **Score-based** | Optimize a score over graphs | GES, NOTEARS | CPDAG or DAG |

Constraint-based methods are conceptually clean: they use the *statistical evidence*
(CI tests) to directly constrain which adjacencies and orientations are plausible.
They do not require specifying a full generative model for the score, making them
applicable when the distributional family is unknown — provided a suitable CI test exists.

## Main Content

### The Global Markov Property

> [!definition] Definition: Global Markov Property
> A joint distribution $\mathbb{P}(X_1,\dots,X_d)$ satisfies the **global Markov property**
> with respect to DAG $G$ if, for any disjoint sets $A, B, C \subseteq V$:
> $$A \perp\!\!\!\perp_{G} B \mid C \implies X_A \perp\!\!\!\perp_{\mathbb{P}} X_B \mid X_C,$$
> where $A \perp\!\!\!\perp_{G} B \mid C$ denotes **d-separation** of $A$ and $B$ given $C$ in $G$.
>
> Equivalently, $\mathbb{P}$ **factorises** as
> $$p(x_1,\dots,x_d) = \prod_{j=1}^{d} p\!\left(x_j \mid x_{\mathrm{pa}_G(j)}\right).$$
^def-global-markov

> [!definition] Definition: Faithfulness (Causal Faithfulness Assumption, CFA)
> $\mathbb{P}$ is **faithful** to $G$ if the converse of the Markov property also holds:
> $$X_A \perp\!\!\!\perp_{\mathbb{P}} X_B \mid X_C \implies A \perp\!\!\!\perp_{G} B \mid C.$$
> Under faithfulness, every CI relation in $\mathbb{P}$ corresponds to a d-separation in $G$,
> so the CI structure of $\mathbb{P}$ *uniquely determines* the MEC $[G]$.
>
> **Intuition**: no two path effects "cancel exactly" in the data. Violations are
> measure-zero in the space of DAG parameters, so faithfulness fails only on
> sets of parameter values of Lebesgue measure zero (for linear-Gaussian models).
^def-faithfulness

> [!note] Faithfulness failures in practice
> Faithfulness fails when two paths carry exactly canceling effects
> (e.g. a direct effect $X \to Y$ and a mediated path $X \to Z \to Y$ with
> opposite signs and equal magnitudes). While measure-zero, such cancellations
> do arise in structural economic models with equilibrium constraints. The
> **strong faithfulness** assumption (Kalisch & Bühlmann, 2007) additionally
> requires CI evidence to be bounded away from zero, enabling high-dimensional
> consistency results.

### Causal Sufficiency

> [!definition] Definition: Causal Sufficiency
> The observed variables $\{X_1,\dots,X_d\}$ are **causally sufficient** if there
> are no unmeasured common causes (hidden confounders) among them.
>
> Causal sufficiency is required by the PC algorithm. Without it:
> - The true graph over observed variables is not a DAG but a **ADMG**
>   (Acyclic Directed Mixed Graph) or equivalently an SWIG.
> - The correct output is a **PAG** (Partial Ancestral Graph), recovered by
>   the **FCI algorithm** (Fast Causal Inference; Spirtes et al., 2000) — an
>   extension of PC that handles latent confounders.
^def-causal-sufficiency

### Conditional Independence Tests

The skeleton of the true DAG is recovered by performing CI tests.  For a pair
$(X_i, X_j)$, the key question is: **does there exist a set $S \subseteq V \setminus \{i,j\}$
such that $X_i \perp\!\!\!\perp X_j \mid X_S$?**  If yes, there is no direct causal link
between $X_i$ and $X_j$.

> [!definition] Definition: Separation Set (sep-set)
> The **separation set** $\mathrm{sep}(i,j)$ is the conditioning set $S$ that renders
> $X_i$ and $X_j$ conditionally independent:
> $$X_i \perp\!\!\!\perp X_j \mid X_S.$$
> The sep-set is recorded during skeleton discovery and used in Phase 2 of the PC
> algorithm to orient v-structures.
^def-sepset

**Common CI tests by data type:**

| Data type | Standard CI test | Notes |
|---|---|---|
| Continuous Gaussian | Partial correlation: $\rho_{ij\mid S} = 0$, Fisher's $z$-transform | Fast; requires large $n$ in high $d$ |
| Non-Gaussian continuous | Kernel-based CI tests (HSIC, KCI; Zhang et al., 2012) | More powerful but slower |
| Discrete / categorical | $\chi^2$ test or $G^2$ (log-likelihood ratio) | Standard for tabular data |
| Mixed | Conditional distance covariance, Liu et al. (2018) | — |

The significance level $\alpha$ of the CI test is a hyperparameter that controls
the false positive/negative trade-off for edge inclusion.

### Score-equivalent and constraint-based approaches compared

> [!note] Key difference from score-based methods
> Constraint-based methods (PC, FCI) test CI relations *one pair at a time* and
> use the results as constraints. Score-based methods (GES, NOTEARS) evaluate a global
> score for each candidate CPDAG or DAG. The two approaches are complementary:
>
> - **Constraint-based**: correct in large samples under Markov + faithfulness; can be
>   applied without specifying a distributional family; output is always a CPDAG.
> - **Score-based**: require a scoring criterion (BIC, BDeu); can achieve super-consistent
>   rates under sparsity (FGS); output is a CPDAG (GES) or a DAG (NOTEARS).
>
> Both recover the same population limit object: the MEC of the true DAG.

## Assumptions Summary

| Assumption | What it means | If violated |
|---|---|---|
| **Acyclicity** | $G$ is a DAG (no directed cycles) | Use cyclic causal models |
| **Causal Markov** | $\mathbb{P}$ is Markov to $G$ | Always assumed |
| **Faithfulness** | CI ⟺ d-separation | Algorithm may produce extra/missing edges |
| **Causal sufficiency** | No hidden confounders | Use FCI instead |
| **Correct CI test** | CI test is consistent | Use appropriate test for data type |

## Connections

- **d-separation**: the graph-theoretic CI concept — see [[Directed Acyclic Graphs]]
- **Output**: constraint-based methods return a CPDAG — see [[Markov Equivalence and CPDAGs]]
- **PC algorithm**: the main constraint-based algorithm — see [[PC Algorithm]]
- **FCI algorithm**: the extension to settings with hidden confounders (not yet in vault)
- **Comparison**: NOTEARS (score-based, no faithfulness needed, outputs a DAG) vs
  PC (CI-based, faithfulness needed, outputs a CPDAG) — see [[DAG Structure Learning Problem]]

## See Also
- [[PC Algorithm]] — how constraint-based learning is implemented algorithmically
- [[Markov Equivalence and CPDAGs]] — the identifiable output of any observational method
- [[Greedy Equivalence Search]] — the score-based alternative
- [[Directed Acyclic Graphs]] — d-separation, Markov property, do-calculus
- [[Conditional Independence Assumption]] — the selection-on-observables analogue in econometrics
