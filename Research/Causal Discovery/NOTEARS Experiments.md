---
title: "NOTEARS Experiments"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/example
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§5 Experiments & §6 Discussion, pp. 9-12"
date_ingested: 2026-06-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[NOTEARS Algorithm]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "NOTEARS results"
  - "NOTEARS vs FGS"
  - "NOTEARS benchmarks"
---

# NOTEARS Experiments

> [!summary]
> Empirical evaluation of NOTEARS against state-of-the-art baselines, chiefly **Fast Greedy
> Search (FGS)** ([Ramsey et al., 2016]). Across random graph models (Erdős–Rényi, scale-free),
> noise types (Gaussian, Exponential, Gumbel), node counts $d \in \{10,20,50,100\}$ and sample
> sizes $n \in \{20,1000\}$, NOTEARS matches FGS on sparse graphs and **decisively outperforms**
> it as graphs get denser (SF-4) and larger. NOTEARS's score is also **close to the exact global
> minimizer** (GOBNILP), indicating nonconvexity is a minor issue in practice.

## Overview

The paper's statistical-consistency questions are settled by prior work; these experiments target
the **computational/structural-recovery** question: does the continuous relaxation actually recover
good DAGs? Baselines: FGS (the fast greedy-search implementation, chosen as the strongest scalable
baseline), plus GES, PC, and LiNGAM (PC and LiNGAM were significantly weaker and only reported in the supplement).

## Main Content

### Experimental design

> [!definition] Simulation setup (NOTEARS §5, App. D)
> - **Graph models**: Erdős–Rényi (**ER**) and scale-free (**SF**), with $kd$ expected edges
>   (ER-2 / SF-4 denote $k$). SF graphs have hub nodes — a known hard case for local-search methods.
> - **Weights**: uniformly random edge weights assigned to a random graph $\mathsf{G}$ to form $W$.
> - **SEM sampling**: $X = W^T X + z \in \mathbb{R}^d$ with three **noise models** — Gaussian (`Gauss`),
>   Exponential (`Exp`), Gumbel (`Gumbel`).
> - **Sizes**: $d \in \{10,20,50,100\}$, $n \in \{20, 1000\}$; rows i.i.d.; 10 simulations per cell.
> - **Metrics**: Structural Hamming Distance (**SHD**, lower better) and False Discovery Rate (**FDR**).
> - **Note**: FGS outputs a CPDAG, so comparisons require care (App. D.1).
^def-setup

### Parameter estimation (without thresholding)

NOTEARS run *without* the thresholding step ($\omega = 0$) — i.e. just solving the ECP — already
produces **empirically consistent estimates** of the true weight matrix $W$ on both ER and SF graphs
(Figures 1, 2). Takeaways:

- With **large** $n$ ($=1000$), weights are estimated very well even **without** $\ell_1$-regularization.
- With **small** $n$ ($=20$), $\ell_1$-regularization is essential and keeps estimates accurate.
- The final **thresholding** step is needed only to sharpen *structure* learning, not parameter accuracy.

### Structure learning (SHD / FDR)

> [!example] Result: NOTEARS vs FGS on structure recovery (NOTEARS §5.2, Fig. 3)
> **Setup.** SHD and FDR to the true graph, across ER-2 / SF-4 graphs, three noise types, $d$ up to 100,
> for $n=1000$ and $n=20$. Methods: FGS, NOTEARS, NOTEARS-L1 ($\ell_1$-regularized).
>
> **Findings.**
> - **Sparse graphs (ER-2)**: FGS is very competitive — comparable SHD to NOTEARS.
> - **Denser graphs (SF-4)**: FGS **rapidly deteriorates** as edge count grows; NOTEARS shows large,
>   consistent improvements, and the gap **widens as $d$ increases**.
> - **Uniform across noise**: NOTEARS performs uniformly better for *every* noise model (Exp, Gauss,
>   Gumbel) **without** using any knowledge of the noise type.
> - **Small $n=20$**: the $\ell_1$-regularizer (NOTEARS-L1) helps significantly.
>
> **Interpretation.** Global updates of the full matrix let NOTEARS handle high-in-degree / hub-heavy
> graphs (SF) — precisely where local edge-at-a-time search struggles.

### Comparison to the exact global minimizer

> [!example] Result: NOTEARS vs GOBNILP global optimum (NOTEARS §5.3, Table 1)
> **Setup.** Using GOBNILP ([Cussens, 2012]) — which enumerates all parent sets, limited to small DAGs
> ($d=10$) — compute the exact global minimizer $W_{\mathsf{G}}$ of program (3). Compare NOTEARS's
> score $F(\widehat W)$ and parameters to the global optimum, over 10 datasets, $n\in\{20,1000\}$.
>
> **Findings (Table 1, selected rows).**
>
> | $n$ | $\lambda$ | Graph | $F(\widehat W)$ | $F(W_{\mathsf{G}})$ | $\lVert \widehat W - W_{\mathsf{G}}\rVert$ |
> |----|-----------|-------|-----------------|---------------------|---------------------------------------------|
> | 1000 | 0 | ER2 | 5.02 | 4.97 | **0.02** |
> | 1000 | 0 | SF4 | 5.05 | 4.94 | **0.04** |
> | 20 | 0 | ER2 | 5.36 | 3.85 | 0.07 |
> | 20 | 0 | SF4 | 4.70 | 3.77 | 0.08 |
>
> **Interpretation.** Although NOTEARS only **guarantees** a stationary point, in many cases the
> obtained solution is **very close to the global minimizer** (tiny $\lVert\widehat W - W_{\mathsf{G}}\rVert$),
> especially at large $n$. Encouraging evidence that the nonconvexity of (9) is a **minor issue in practice**
> for ER and SF graphs (worst-case graphs may still be hard).

### Real data

> [!example] Result: Sachs protein-signaling network (NOTEARS §5.4)
> **Dataset.** [Sachs et al., 2005] — continuous measurements of protein/phospholipid expression in
> human immune-system cells ($n = 7466$, $d = 11$, 20 edges), a standard graphical-models benchmark
> with a known **consensus network** (experimentally validated gold standard).
>
> **Result.** FGS estimated 17 total edges with **SHD = 22**; NOTEARS estimated 16 edges with **SHD = 22**
> — competitive with the established baseline on real data.

## Discussion: limitations & future work

> [!note] Limitations the authors flag (NOTEARS §6)
> 1. **Nonconvexity.** Program (9) is still nonconvex; black-box solvers find *stationary points*. (Note:
>    even GES only finds the global minimizer in the limit $n\to\infty$ under assumptions, not for finite $n$.)
> 2. **Smoothness requirement.** The method relies on a *smooth* score to use gradient-based solvers.
>    Non-smooth / discrete scores (e.g. BDe) would need techniques like Nesterov smoothing — left to future work.
> 3. **$O(d^3)$ cost.** The matrix exponential is cubic in the number of nodes (small for sparse matrices);
>    this motivates second-order methods to cut the number of evaluations. No worst-case iteration-complexity
>    bound is established, though typically only $t\sim 10$ iterations occur.
> 4. **Fixed threshold $\omega$.** A data-driven, adaptive choice of $\omega$ (vs. the fixed suboptimal value
>    used) would be preferable across different noise-to-signal ratios and graph types.

> [!note] The headline strength
> NOTEARS's main advantage is **smooth, global** search delegated to standard numerical solvers — as
> opposed to **combinatorial, local** search. It already **outperforms existing methods when the in-degree
> is large**, a known hard spot for prior approaches.

## Connections

- **Validates** the design choices in [[NOTEARS Algorithm]] (global updates, thresholding,
  $\ell_1$-regularization in small $n$).
- **Empirically supports** the practical relevance of [[Smooth Characterization of Acyclicity]] — the
  continuous relaxation recovers true DAGs.
- **Benchmark family**: the Sachs dataset and ER/SF/noise simulation protocol became standard for the
  later differentiable-DAG-learning literature.

## See Also
- [[GES - Greedy Equivalence Search]] — score-based baseline NOTEARS benchmarks against; outperformed on dense/large graphs
- [[PC Algorithm]] — constraint-based baseline; NOTEARS also compares to PC in the benchmark table
- [[Markov Equivalence and CPDAGs]] — CPDAGs, which GES/PC output and NOTEARS bypasses

## See Also
- [[NOTEARS Algorithm]] — the method being evaluated
- [[NOTEARS - Overview]] — paper-level context
- [[DAG Structure Learning Problem]] — baselines (FGS, GES, PC, LiNGAM) situated in the landscape
