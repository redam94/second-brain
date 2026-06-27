---
title: "NOTEARS Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/augmented-lagrangian
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§4 Optimization, pp. 7-9"
date_ingested: 2026-06-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Smooth Characterization of Acyclicity]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "NOTEARS optimization"
  - "Equality-constrained program ECP"
  - "Augmented Lagrangian for DAG learning"
---

# NOTEARS Algorithm

> [!summary]
> Given the smooth acyclicity function $h$ (see [[Smooth Characterization of Acyclicity]]),
> learning a DAG becomes the **equality-constrained program (ECP)**
> $\min_W F(W) \text{ s.t. } h(W)=0$, solved by the **augmented Lagrangian** method. The
> algorithm has three pieces: (i) convert the constrained problem into a sequence of
> unconstrained subproblems via a quadratic penalty + dual ascent; (ii) solve each subproblem
> with L-BFGS / proximal quasi-Newton; (iii) **threshold** the solution to round small weights
> to zero. Typically **fewer than 10** augmented-Lagrangian iterations are needed.

## Overview

Theorem 1 turns the combinatorial DAG constraint into a smooth equality constraint. NOTEARS
then treats DAG learning as a classical equality-constrained optimization problem and solves it
to **stationarity** (not global optimality — the program is nonconvex). The whole method is
deliberately built from off-the-shelf solver components.

## Main Content

### The equality-constrained program (ECP)

> [!theorem] Program (9): ECP (NOTEARS §4)
> $$
> (\text{ECP}) \qquad \min_{W\in\mathbb{R}^{d\times d}} F(W) \quad \text{subject to} \quad h(W) = 0.
> $$
> Equivalent to program (3). Its advantage: amenable to classical constrained-optimization
> techniques. But $\{W : h(W)=0\}$ is a **nonconvex** set, so (9) inherits the difficulties of
> nonconvex optimization — NOTEARS settles for **stationary points** of (9).
^thm-ecp

### Augmented Lagrangian

> [!definition] Augmented Lagrangian (NOTEARS §4.1, Eqs. 10-12)
> The augmented Lagrangian augments the objective with a **quadratic penalty** $\frac{\rho}{2}|h(W)|^2$
> ($\rho > 0$) plus the Lagrange-multiplier term:
> $$
> L^{\rho}(W,\alpha) = F(W) + \frac{\rho}{2}\,|h(W)|^2 + \alpha\, h(W).
> $$
> The dual function and dual problem are
> $$
> D(\alpha) = \min_{W\in\mathbb{R}^{d\times d}} L^{\rho}(W,\alpha), \qquad \max_{\alpha\in\mathbb{R}} D(\alpha).
> $$
^def-auglag

> [!note] Why augmented Lagrangian (vs. plain quadratic penalty)
> A key property ([Nemirovski, 1999]): the augmented Lagrangian **approximates the constrained
> solution well without** driving the penalty $\rho\to\infty$ (which would make subproblems
> ill-conditioned). It is essentially a **dual ascent** scheme for the penalized problem.

### Dual ascent update

Let $W_\alpha^\star = \arg\min_W L^\rho(W,\alpha)$ be the local minimizer at $\alpha$, so
$D(\alpha) = L^\rho(W_\alpha^\star, \alpha)$. Since $D(\alpha)$ is **linear in $\alpha$**, its
derivative is simply $\nabla D(\alpha) = h(W_\alpha^\star)$. Hence dual **gradient ascent**:

> [!theorem] Dual update (NOTEARS §4.1, Eq. 14)
> $$
> \alpha \leftarrow \alpha + \rho\, h(W_\alpha^\star).
> $$
^thm-dual-update

> [!theorem] Proposition 3: Convergence rate (NOTEARS §4.1; Cor. 11.2.1, Nemirovski 1999)
> For $\rho$ large enough and starting point $\alpha_0$ near the solution $\alpha^\star$, the
> update (14) converges to $\alpha^\star$ **linearly**. In experiments, typically fewer than
> **10** augmented-Lagrangian steps are required.
^thm-prop3

### Solving the unconstrained subproblem

Each subproblem $\min_W L^\rho(W,\alpha)$ is, writing $w = \mathrm{vec}(W)\in\mathbb{R}^p$ with $p=d^2$:

> [!definition] Subproblem (NOTEARS §4.2, Eqs. 15-16)
> $$
> \min_{w\in\mathbb{R}^p} f(w) + \lambda\lVert w \rVert_1, \qquad
> f(w) = \ell(W;\mathbf{X}) + \frac{\rho}{2}|h(W)|^2 + \alpha\, h(W),
> $$
> where $f$ is the **smooth** part of the objective.
^def-subproblem

Two regimes:

- **$\lambda = 0$** (no sparsity): the problem is a smooth unconstrained minimization, solved by
  **L-BFGS** ([Byrd et al., 1995; Nocedal & Wright, 2006]). A slight modification (Nocedal & Wright,
  Procedure 18.2) handles the nonconvexity.
- **$\lambda > 0$**: a composite (smooth + $\ell_1$) problem solved by **proximal quasi-Newton (PQN)**
  ([Zhong et al., 2014]). At step $k$, find a descent direction via a quadratic model of the smooth part:
  $$
  d_k = \arg\min_{d\in\mathbb{R}^p}\; g_k^T d + \tfrac{1}{2}d^T B_k d + \lambda\lVert w_k + d\rVert_1,
  $$
  where $g_k = \nabla f(w_k)$ and $B_k$ is the **L-BFGS approximation of the Hessian**. Each coordinate
  $j$ has a **closed-form** update $d \leftarrow d + z^\star e_j$ via soft-thresholding $S(\cdot)$:
  $$
  z^\star = \arg\min_z \tfrac{1}{2}\underbrace{B_{jj}}_{a} z^2 + \underbrace{(g_j + (Bd)_j)}_{b} z + \lambda\underbrace{|w_j + d_j + z|}_{c} = -d + S\!\Big(c - \tfrac{b}{a}, \tfrac{\lambda}{a}\Big).
  $$

> [!note] Efficiency from low-rank structure
> The low-rank structure of the L-BFGS Hessian $B_k$ enables fast coordinate updates: precomputation
> is $O(m^2 p + m^3)$ where $m \ll p$ is the L-BFGS memory size, and each coordinate update is $O(m)$.
> Aggressively shrinking the **active set** $\mathcal{S}$ of coordinates by subgradient makes all
> $O(p)$ dependencies become $O(|\mathcal{S}|)$. Overall L-BFGS update cost:
> $O(m^2|\mathcal{S}| + m^3 + m|\mathcal{S}|T)$, with inner iterations $T \approx 10$.

### Thresholding

> [!definition] Hard thresholding (NOTEARS §4.3)
> After obtaining a stationary point $\widetilde W_{\text{ECP}}$ of (10), given a threshold
> $\omega > 0$, set any weight smaller than $\omega$ in absolute value to zero:
> $$
> \widehat W := \widetilde W_{\text{ECP}} \circ \mathbb{1}\big(|\widetilde W_{\text{ECP}}| > \omega\big).
> $$
^def-threshold

> [!note] Why thresholding works here
> Numerically, the solution satisfies $h(\widetilde W_{\text{ECP}}) \le \epsilon$ for a small
> tolerance (e.g. $\epsilon = 10^{-8}$) rather than $=0$ exactly. Because $h$ **quantifies DAG-ness**
> (desideratum (b)), a small threshold $\omega$ suffices to remove the tiny residual cycle-inducing
> edges and "round" the solution to an exact DAG. Hard thresholding also **provably reduces false
> discoveries** in regression ([Zhou, 2009; Wang et al., 2016]).

### The full algorithm

> [!example] Algorithm 1: NOTEARS (NOTEARS §4)
> **Input:** initial guess $(W_0, \alpha_0)$, progress rate $c \in (0,1)$, tolerance $\epsilon > 0$,
> threshold $\omega > 0$.
>
> **For** $t = 0, 1, 2, \dots$:
> 1. **(Primal)** $W_{t+1} \leftarrow \arg\min_W L^\rho(W, \alpha_t)$ with $\rho$ chosen so that
>    $h(W_{t+1}) < c\,h(W_t)$ (i.e. force a $c$-factor reduction in the constraint violation).
> 2. **(Dual ascent)** $\alpha_{t+1} \leftarrow \alpha_t + \rho\, h(W_{t+1})$.
> 3. **(Stop)** If $h(W_{t+1}) < \epsilon$, set $\widetilde W_{\text{ECP}} = W_{t+1}$ and **break**.
>
> **Return** the thresholded matrix $\widehat W := \widetilde W_{\text{ECP}} \circ \mathbb{1}(|\widetilde W_{\text{ECP}}| > \omega)$.
^algo-notears

## Connections

- **Depends on** the gradient $\nabla h(W) = (e^{W\circ W})^T \circ 2W$ from
  [[Smooth Characterization of Acyclicity]] — fed into L-BFGS/PQN.
- **Global vs. local search**: each primal step updates the *entire* matrix $W$, avoiding the
  edge-at-a-time assumptions of local search (see [[DAG Structure Learning Problem]]).
- **Nonconvexity**: the method finds stationary points; [[NOTEARS Experiments]] empirically checks how
  close these are to the global minimizer.
- **Matrix-exponential cost** $O(d^3)$ per evaluation motivates the use of **second-order** methods
  (L-BFGS/PQN) to reduce the number of $h$ evaluations.

## See Also
- [[Smooth Characterization of Acyclicity]] — supplies $h$ and $\nabla h$
- [[NOTEARS Experiments]] — empirical validation of the algorithm
- [[NOTEARS - Overview]] — paper-level context
