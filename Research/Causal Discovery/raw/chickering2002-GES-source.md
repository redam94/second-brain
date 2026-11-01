---
title: "Source: Chickering (2002) — GES Paper"
type: source-reference
doc_type: paper
authors: "David Maxwell Chickering"
year: 2002
journal: "Journal of Machine Learning Research"
volume: "3"
pages: "507–554"
url: "https://jmlr.org/papers/v3/chickering02b.html"
note: "PDF download blocked by session network policy. Full paper freely available at URL above."
date_retrieved: 2026-11-01
---

# Chickering (2002): Optimal Structure Identification with Greedy Search (GES)

**Full title:** "Optimal Structure Identification With Greedy Search"
**Journal:** Journal of Machine Learning Research 3:507–554, 2002
**URL:** https://jmlr.org/papers/v3/chickering02b.html

## Abstract (paraphrased)

This paper introduces the Greedy Equivalence Search (GES) algorithm for learning the structure
of a Bayesian network (DAG) from observational data. GES operates in the space of **Markov
equivalence classes** (represented as CPDAGs) rather than in the space of individual DAGs, using
a decomposable score (BIC, BDeu). The paper proves: (1) **the Meek conjecture** — any two
independence-equivalent DAGs are connected by a sequence of covered edge reversals, and the score
changes monotonically along covered edge reversals; (2) GES is **asymptotically correct** —
in the large-sample limit, under faithfulness and with a consistent score, GES identifies the
correct Markov equivalence class.

## Key contributions

1. **Proof of the Meek conjecture (Lemma 18):** Any two DAGs in the same Markov equivalence
   class are connected by a finite sequence of covered edge reversals, and a covered edge reversal
   cannot decrease the score in the large-sample limit. This is the key structural theorem that
   justifies the two-phase greedy search.
2. **GES algorithm:** A two-phase greedy search over CPDAG space that is optimal in the
   large-sample limit.
3. **Asymptotic correctness:** Under faithfulness + consistent score, GES recovers the correct
   equivalence class as $n \to \infty$.
4. **Finite-sample performance:** Empirical comparison against local hill-climbing on synthetic
   and real data shows GES is competitive or superior.

## Algorithm: GES

### Decomposable score

GES requires a **decomposable score** — a score that factors over variables and their parents:
$$Q(\mathcal{G}) = \sum_{j=1}^{d} Q_j\bigl(X_j, \text{pa}_\mathcal{G}(X_j)\bigr)$$
Standard choices:
- **BIC** (Bayesian Information Criterion): $Q_j = \ell_j - \frac{k_j}{2}\log n$,
  where $\ell_j$ is the local log-likelihood and $k_j$ is the number of parameters for node $j$
- **BDeu** (Bayesian Dirichlet equivalent uniform): exact marginal likelihood under uniform
  Dirichlet prior; applicable to discrete data

### Phase I: Forward Equivalence Search (FES)

Start with the empty CPDAG (no edges). Greedily insert a single edge at a time by choosing the
**edge insertion operator** $\text{Insert}(X, Y, S)$ that maximally increases the score, where
$S \subseteq \text{adj}(Y) \setminus \{X\}$ is a set of neighbors that become oriented toward
$Y$ upon insertion. Continue until no edge insertion increases the score.

### Phase II: Backward Equivalence Search (BES)

Starting from the CPDAG found by FES, greedily remove a single edge at a time by choosing the
**edge deletion operator** $\text{Delete}(X, Y, H)$ that maximally increases the score. Continue
until no edge deletion increases the score.

### Result

The final CPDAG is the output of GES — a local maximum of the score in CPDAG space. In the
large-sample limit this is the true equivalence class (under faithfulness).

## Key theorem

> **Theorem 15 (GES consistency, Chickering 2002):** Assume the data-generating distribution is
> faithful to some DAG $\mathcal{G}^*$, and the score is consistent (a local maximum of score
> in CPDAG space corresponds to the true equivalence class asymptotically). Then GES identifies
> $[\mathcal{G}^*]$ (the Markov equivalence class of $\mathcal{G}^*$) as $n \to \infty$.

## Key definitions

### Covered edge reversals

An edge $X \to Y$ in a DAG $\mathcal{G}$ is **covered** if $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$.
Reversing a covered edge produces an independence-equivalent DAG. The score changes monotonically
under covered edge reversals in the large-sample limit (Lemma 15).

### Markov equivalence class

Two DAGs are **Markov equivalent** (same equivalence class) iff they have the same skeleton and
the same v-structures. The unique graphical representation of an equivalence class is the
**CPDAG** (see [[CPDAG and Markov Equivalence Classes]]).

## Related algorithms

- **PC algorithm** (Spirtes & Glymour 1991): constraint-based alternative; returns same CPDAG
  but uses CI tests rather than a score
- **FGES** (Fast GES, Ramsey et al. 2017): parallelized GES, scales to thousands of variables
- **SP** (Solus et al. 2021): greedy order-based search, provably faster convergence
- **NOTEARS** (Zheng et al. 2018): continuous-optimization DAG search, does not search in CPDAG space

## Software

- **`pcalg` R package**: `ges()` function implements GES
- **TETRAD** (Java): implements GES and FGES
- **`causal-learn` Python**: `GES` class
- **`gCastle` Python** (Huawei Noah's Ark): includes GES implementation
