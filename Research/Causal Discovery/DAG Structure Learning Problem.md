---
title: "DAG Structure Learning Problem"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2 Background, pp. 2-5"
date_ingested: 2026-06-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Confirmatory Factor Analysis and SEM]]"
used_by:
  - "[[Smooth Characterization of Acyclicity]]"
  - "[[NOTEARS Algorithm]]"
aliases:
  - "Score-based DAG learning"
  - "Linear SEM structure learning"
  - "Bayesian network structure learning"
---

# DAG Structure Learning Problem

> [!summary]
> Sets up the problem NOTEARS solves: given $n$ i.i.d. observations of a $d$-dimensional
> random vector, learn a DAG (Bayesian network) over the variables. NOTEARS models the
> data with a **linear structural equation model (SEM)** whose weighted adjacency matrix
> $W \in \mathbb{R}^{d\times d}$ *is* the graph, and frames learning as minimizing a
> **regularized least-squares score** subject to acyclicity. The crux: although the score
> $F(W)$ is continuous, the discrete DAG constraint $\mathsf{G}(W)\in\mathbb{D}$ is the hard part.

## Overview

The vault distinguishes two equivalent views of score-based DAG learning. The traditional
**combinatorial** view optimizes a discrete score over the set of DAGs $\mathbb{D}$. NOTEARS's
view optimizes a **continuous** least-squares score over the real matrices $\mathbb{R}^{d\times d}$,
identifying each matrix with the SEM it parameterizes. This note formalizes both and the SEM
machinery linking them.

## Main Content

### Setup and notation

> [!definition] Definition: Data, DAGs, and SEM (NOTEARS §2)
> Let $\mathbf{X} \in \mathbb{R}^{n\times d}$ be a data matrix of $n$ i.i.d. observations of the
> random vector $X = (X_1,\dots,X_d)$. Let $\mathbb{D}$ denote the discrete space of DAGs
> $\mathsf{G}=(\mathsf{V},\mathsf{E})$ on $d$ nodes. We model $X$ via a **structural equation
> model (SEM)** defined by a **weighted adjacency matrix** $W \in \mathbb{R}^{d\times d}$.
> Learning a Bayesian network = learning $\mathsf{G}$ for the joint distribution $\mathbb{P}(X)$.
^def-setup

### From matrices to graphs

Any $W \in \mathbb{R}^{d\times d}$ defines a graph as follows.

> [!definition] Definition: Induced graph $\mathsf{G}(W)$ (NOTEARS §2.1)
> Let $\mathcal{A}(W) \in \{0,1\}^{d\times d}$ be the binary matrix with
> $$[\mathcal{A}(W)]_{ij} = 1 \iff w_{ij} \neq 0,$$
> and $0$ otherwise. Then $\mathcal{A}(W)$ is the adjacency matrix of a directed graph
> $\mathsf{G}(W)$. By a slight abuse of notation, $W$ itself is treated as a (weighted) graph.
^def-induced-graph

### The linear SEM

Writing $W = [\,w_1 \mid \cdots \mid w_d\,]$ in columns, $W$ defines a linear SEM:

> [!definition] Definition: Linear SEM (NOTEARS §2.1)
> $$X_j = w_j^T X + z_j, \qquad j = 1,\dots,d,$$
> where $X=(X_1,\dots,X_d)$ is the random vector and $z = (z_1,\dots,z_d)$ is a random **noise
> vector**. Crucially, $z$ is **not** assumed Gaussian. More generally one can use a GLM
> $\mathbb{E}(X_j \mid X_{\mathrm{pa}(X_j)}) = f(w_j^T X)$ — e.g. logistic regression for binary $X_j$.
^def-linear-sem

### The least-squares score

NOTEARS focuses on the **least-squares (LS) loss**, though everything applies to any smooth loss $\ell$.

> [!definition] Definition: Regularized LS score $F(W)$ (NOTEARS §2.1, Eq. 2)
> With LS loss $\ell(W;\mathbf{X}) = \frac{1}{2n}\lVert \mathbf{X} - \mathbf{X}W \rVert_F^2$ and
> $\ell_1$-regularization $\lVert W \rVert_1 = \lVert \mathrm{vec}(W) \rVert_1$ to encourage sparsity:
> $$F(W) = \ell(W;\mathbf{X}) + \lambda\lVert W \rVert_1 = \frac{1}{2n}\lVert \mathbf{X} - \mathbf{X}W \rVert_F^2 + \lambda\lVert W \rVert_1.$$
^def-score

> [!note] Statistical justification
> The minimizer of the LS loss **provably recovers a true DAG with high probability** in
> finite samples and high dimensions ($d \gg n$), consistent for *both* Gaussian SEM
> ([van de Geer & Bühlmann, 2013; Aragam et al., 2016]) and **non-Gaussian** SEM
> ([Loh & Bühlmann, 2014]). These results do **not** require the faithfulness assumption.
> Given this prior work on statistical issues, NOTEARS focuses **entirely on the computational
> problem** of finding the SEM that minimizes the LS loss.

### The continuous program (NOTEARS's target)

> [!theorem] Program (3): Continuous score-based DAG learning (NOTEARS §2.1)
> $$\min_{W\in\mathbb{R}^{d\times d}} F(W) \quad \text{subject to} \quad \mathsf{G}(W) \in \mathbb{D}.$$
> $F(W)$ is continuous, but the DAG constraint $\mathsf{G}(W)\in\mathbb{D}$ remains combinatorial
> and is the central obstacle — resolved in [[Smooth Characterization of Acyclicity]].
^thm-program3

### Contrast: the traditional combinatorial program

> [!theorem] Program (4): Traditional combinatorial score-based learning (NOTEARS §2.2)
> $$\min_{\mathsf{G}} Q(\mathsf{G}) \quad \text{subject to} \quad \mathsf{G} \in \mathbb{D},$$
> where $Q : \mathbb{D} \to \mathbb{R}$ is a **discrete score** (BDe(u), BGe, BIC, MDL). Program (4)
> is NP-hard ([Chickering, 1996; Chickering et al., 2004]) owing to the nonconvex, combinatorial
> acyclicity constraint, whose number of acyclic structures grows superexponentially in $d$
> ([Robinson, 1977]).
^thm-program4

The essential distinction: program (4)'s domain is the discrete set $\mathbb{D}$, whereas program
(3)'s domain is the continuous $\mathbb{R}^{d\times d}$.

## Landscape of prior approaches

| Camp | Idea | Limitation |
|------|------|-----------|
| **Exact** ([Cussens, 2012]; GOBNILP; [Chen et al., 2016]) | Guaranteed globally optimal | Only a few dozen nodes; intractable in general |
| **Local / approximate search** (FGS, GES, hill-climbing, MMHC) | Add edges/parents one node at a time, check acyclicity incrementally | Needs bounded in-degree/treewidth — impossible to verify; real networks are scale-free with hub nodes |
| **Order search** ([Teyssier & Koller, 2005]) | Search over $d!$ topological orderings | Trades acyclicity for an exponential ordering search |
| **Constraint-based** (PC, [Spirtes & Glymour, 1991]) | Conditional-independence tests | Different paradigm; often less accurate |
| **Hybrid / Bayesian** (MMHC; [Zhou, 2011]) | Combine the above | Conceptual complexity |

> [!note] The "conceptual clarity" gap NOTEARS targets
> A recurring drawback the authors emphasize: prior methods are **conceptually complex** — they
> require deep graphical-model knowledge and clever tricks to accelerate. NOTEARS needs none:
> "implementable in just a few lines of code using existing black-box solvers."

## Connections

- **Undirected analogy**: undirected (Markov network) structure learning is a *convex* log-det
  program ([Banerjee et al., 2008]); the directed case resisted such treatment until NOTEARS.
- **Local vs. global**: NOTEARS updates the entire $W$ at each step (global), unlike edge-at-a-time
  local search.
- **SEM grounding**: see [[Confirmatory Factor Analysis and SEM]] for structural equation models in
  the Bayesian setting; the weighted adjacency matrix here is the SEM coefficient matrix.

## See Also
- [[NOTEARS - Overview]] — paper-level summary
- [[Smooth Characterization of Acyclicity]] — how the constraint $\mathsf{G}(W)\in\mathbb{D}$ becomes $h(W)=0$
- [[NOTEARS Algorithm]] — solving program (3)
- [[Spurious Association and Confounds]] — DAG semantics in causal inference
- [[PC Algorithm]] — the constraint-based paradigm listed in the landscape table
- [[Greedy Equivalence Search]] — the score-based paradigm (GES / FGS) listed in the landscape table
- [[Markov Equivalence and CPDAGs]] — the CPDAG that PC and GES identify; the theoretical target
- [[Constraint vs Score-Based Causal Discovery]] — systematic comparison of all three paradigms
