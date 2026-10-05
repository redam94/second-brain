---
title: "Causal Discovery Methods - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/CITATIONS-constraint-score-based-discovery.md]]"
source_location: "Spirtes et al. 2000 Ch. 1-2; Chickering 2002; Kalisch & Bühlmann 2007"
date_ingested: 2026-10-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
aliases:
  - "causal structure learning overview"
  - "causal discovery landscape"
---

# Causal Discovery Methods - Overview

> [!summary]
> **Causal discovery** (a.k.a. causal structure learning) asks: given observational (and
> sometimes experimental) data, can we recover the causal DAG that generated it?
> Three major paradigms have emerged — **constraint-based** (use conditional independence
> tests; flagship: **PC algorithm**), **score-based** (optimize a goodness-of-fit score
> over DAG space; flagship: **GES**), and **continuous-optimization** (embed the DAG
> constraint into a smooth program; flagship: **NOTEARS**). Each rests on the same
> three core assumptions: the Causal Markov Condition, Faithfulness, and Causal
> Sufficiency. Under these, all three paradigms are provably consistent.

## Overview

Learning causal structure from passive observational data faces a fundamental
**identifiability ceiling**: without additional assumptions, observational data can
only identify the **Markov equivalence class (MEC)** of the generating DAG — not
the DAG itself. An MEC groups together all DAGs that imply the same conditional
independence relations. The best any algorithm can do from observational data alone
(absent interventions or special noise structure) is recover the **CPDAG** —
the graphical summary of the MEC, with undirected edges where the direction is
not identifiable and directed edges where it is.

See [[Markov Equivalence Classes and CPDAGs]] for the formal definition and
[[Causal Discovery Assumptions]] for the three core identifying assumptions.

## Main Content

### The three paradigms

| Paradigm | Core idea | Flagship | Output | Key reference |
|----------|-----------|---------|--------|--------------|
| **Constraint-based** | Test conditional independences; remove edges and orient colliders | PC algorithm | CPDAG | Spirtes et al. (2000) |
| **Score-based** | Search DAG space to optimize BIC/BDeu | GES | CPDAG | Chickering (2002) |
| **Continuous optimization** | Replace DAG constraint $\mathsf{G}(W)\in\mathbb{D}$ with $h(W)=0$ | NOTEARS | DAG + weights | Zheng et al. (2018) |

**Constraint-based** methods such as [[PC Algorithm]] construct the skeleton by
asking: "Is $X \perp Y \mid S$ for some set $S$?" If yes, the edge $X-Y$ is removed.
They are fully nonparametric and depend only on the faithfulness assumption for
consistency. The output is a **CPDAG** whose undirected edges represent
unresolvable directions given observational data.

**Score-based** methods such as [[GES - Greedy Equivalence Search]] optimize a
scoring criterion (BIC, BDeu, BGe) directly over the space of Markov equivalence
classes. The key insight of Chickering (2002) is that this search space has
an elegant move-set (Insert/Delete/Turn operators) that allows greedy hill-climbing
to provably find the global optimum under faithfulness.

**Continuous-optimization** methods such as [[NOTEARS Algorithm]] bypass the
combinatorial structure entirely by converting the DAG constraint into a smooth
equality constraint $h(W)=0$. They output a **weighted DAG** (edge coefficients
included) rather than just a CPDAG, but require a parametric form for the SEM.
See [[DAG Structure Learning Problem]] and [[Smooth Characterization of Acyclicity]].

### Identifiability: what data alone can determine

> [!definition] Definition: Markov Equivalence Class
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** iff they share:
> (i) the same **skeleton** (same undirected edges), and
> (ii) the same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ with $X,Y$ non-adjacent).
>
> Observational data cannot distinguish DAGs within the same Markov equivalence class —
> they imply the same joint distribution. Structure learning from observational data
> thus identifies the MEC, not a unique DAG.

To identify a unique DAG from observational data one needs additional structure:
- **Non-Gaussian noise** (LiNGAM; Shimizu et al. 2006) — asymmetry of distributions
  reveals direction.
- **Equal error variances** (Peters & Bühlmann 2014) — identifies DAG in Gaussian linear case.
- **Interventional data** — interventions break symmetry and may orient undirected edges.
- **Additive noise models** (Peters et al. 2014) — for nonlinear SEMs.

### When causal sufficiency fails: FCI and MAGs

The PC algorithm and GES assume **causal sufficiency** — no unmeasured common causes.
When this fails, the correct target is a **Maximal Ancestral Graph (MAG)**, and the
appropriate algorithms are:
- **FCI** (Fast Causal Inference; Spirtes et al. 1995) — constraint-based, outputs PAG
  (Partial Ancestral Graph), the MEC of MAGs.
- **RFCI** (Really Fast Causal Inference; Colombo et al. 2012) — faster FCI variant.
- **GFCI** (Greedy FCI; Ogarrio et al. 2016) — hybrid using GES-forward phase first.

See [[Causal Discovery Assumptions]] for a full treatment.

### Empirical comparison (from NOTEARS experiments)

From [[NOTEARS Experiments]], the empirical ranking on Erdős–Rényi and scale-free
graphs (SHD metric, Gaussian/non-Gaussian noise):

> NOTEARS ≈ GES > PC >> random on most configurations. GES and NOTEARS often
> achieve near-identical structural Hamming distance on sparse graphs; PC is faster
> when conditioning-set order is small but degrades on denser graphs.

## Connections

- [[DAG Structure Learning Problem]] — formalizes the score-based program that both GES
  and NOTEARS solve
- [[Directed Acyclic Graphs]] — DAG reasoning (d-separation, back-door) from the
  causal inference side
- [[Summary Causal DAGs]] — causal DAGs for ABM outputs; structure learning is the
  step *before* summarization (Zeng 2025)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge construction as
  alternative to data-driven discovery
- [[Approximate Bayesian Computation for ABMs]] — ABM outputs as observational data
  that could feed structure learning

## See Also
- [[PC Algorithm]] — the constraint-based flagship
- [[GES - Greedy Equivalence Search]] — the score-based flagship
- [[NOTEARS - Overview]] — the continuous-optimization approach
- [[Markov Equivalence Classes and CPDAGs]] — the target representation
- [[Causal Discovery Assumptions]] — Markov condition, Faithfulness, Causal Sufficiency
