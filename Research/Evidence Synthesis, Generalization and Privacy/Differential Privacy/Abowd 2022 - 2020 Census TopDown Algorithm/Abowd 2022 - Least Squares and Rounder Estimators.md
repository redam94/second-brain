---
title: "Abowd 2022 - Least Squares and Rounder Estimators"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 7.1-7.3 (Eqs. 7.1-7.7), pp. 21-26"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]"
used_by:
  - "[[Abowd 2022 - Utility Experiments]]"
aliases:
  - census least squares estimator
  - census controlled rounding
  - multi-pass least squares TDA
  - total unimodularity census
---

# Abowd 2022 - Least Squares and Rounder Estimators

> [!summary]
> TDA's estimation phase is post-processing of noisy measurements. Per parent node it solves (1) an inverse-variance **weighted non-negative least squares** with invariants and aggregation constraints, then (2) a **controlled rounder** that finds the nearest non-negative integer solution, feasible and tractable when the constraints are **totally unimodular**. Basic single-pass versions showed bias on totals and non-monotone accuracy in $\rho$; **multi-pass** least squares (estimate and then freeze margins in order) and a **multi-query multi-pass rounder** fixed these.

## Overview

The goal is a non-negative integer $\hat x$ consistent with all constraints. Integer programming at the natural scale is too large, so each parent subproblem is split into two: least squares ("L2") then rounding ("L1" objective). Sections 7.1-7.3 give the estimators and improvements, which were driven by observed bias.

## Main Content

### Basic least squares (7.1.1)

$W$ is the diagonal matrix of inverse variances of the DP noise. For a single node $\gamma$:
$$\tilde x_\gamma\leftarrow\arg\min_{x_\gamma}(Qx_\gamma-\tilde M_\gamma)^\top W(Qx_\gamma-\tilde M_\gamma)\quad\text{s.t. }x_\gamma\ge0,\ C^{\text{eq}}x_\gamma=c^{\text{eq}},\ C^ux_\gamma\le c^u.\tag{7.1}$$
For the joint solution over the children of $\gamma$ (with $I_{c^*}$ the identity of size $c^*$):
$$\tilde x_{\text{children}(\gamma)}\leftarrow\arg\min(Qx_{\text{ch}}-\tilde M_{\text{ch}})^\top W(Qx_{\text{ch}}-\tilde M_{\text{ch}})\ \text{s.t. }x_{\text{ch}}\ge0,\ C^{\text{eq}}x_{\text{ch}}=c^{\text{eq}},\ C^ux_{\text{ch}}\le c^u,\ [I_{c^*}\ \cdots\ I_{c^*}]\,x_{\text{ch}}=\hat x_\gamma.\tag{7.2}$$
Weights other than inverse variance (constant, square-root of variance) were explored; inverse variance performed best overall, as weighted least squares theory predicts. The constraint matrices differ by node.

### Basic rounder (7.1.2)

With $\lfloor\cdot\rfloor$ the element-wise floor:
$$\hat x_\gamma\leftarrow\lfloor\tilde x_\gamma\rfloor+\hat y,\quad\hat y=\arg\min_y\mathbf 1^\top|\tilde x_\gamma-(\lfloor\tilde x_\gamma\rfloor+y)|\ \text{s.t. }y_i\in\{0,1\},\ C^{\text{eq}}(\lfloor\tilde x_\gamma\rfloor+y)=c^{\text{eq}},\ C^u(\lfloor\tilde x_\gamma\rfloor+y)\le c^u.\tag{7.3}$$
and for the children jointly, with the additional aggregation constraint $[I\cdots I](\lfloor\tilde x_{\text{ch}}\rfloor+y)=\hat x_\gamma$ (7.4). The implementation subtracts the floor and minimizes distance over the fractional part. The problem is feasible and efficiently solvable if it has the **total unimodularity (TUM)** property.

### Problem found: bias on totals, and the multi-pass least squares (7.2)

Even when geographic totals are asked with very high precision, combining them in one optimization with a query with many components (the detailed query) makes the estimate less accurate on the target than expected. This is caused by the **non-negativity constraint**: an "inherent uncertainty principle" limits inequality-constrained least squares. The maximum expected error in either the detailed query or its total depends on the budget allocation and the number of queries (Abowd et al. 2021); the trade-off is entirely due to the microdata requirement, **not to the DP mechanism** (related to Balcer-Vadhan).

> [!definition] Multi-pass least squares (Eqs. 7.5-7.6)
> Pass $k\in\{1,\dots,K\}$ uses stacked query groups $Q^{(k)}$ with measurements $\tilde M^{(k)}$; $B^{(k)}$ stacks the query groups used as constraints in later passes. Pass $k$ solves
> $$\tilde x^{(k)}_{\text{ch}}\leftarrow\arg\min\big(Q^{(k)}x_{\text{ch}}-\tilde M^{(k)}_{\text{ch}}\big)^\top W\big(Q^{(k)}x_{\text{ch}}-\tilde M^{(k)}_{\text{ch}}\big)$$
> s.t. $x_{\text{ch}}\ge0$, $C^{\text{eq}}x_{\text{ch}}=c^{\text{eq}}$, $C^ux_{\text{ch}}\le c^u$, $[I\cdots I]x_{\text{ch}}=\hat x_\gamma$, and for $k>1$: $\big|B^{(j)}x_{\text{ch}}-\tilde x^{(j)}_{\text{ch}}\big|\le\hat\tau^{(j)}\mathbf 1\ \ \forall j<k$ (7.5). The slack $\hat\tau^{(k)}$ (a small positive constant for feasibility) is estimated at the end of each pass by $\hat\tau^{(k)}\leftarrow\min_{\tau,x_{\text{ch}}}\tau$ s.t. $|B^{(j)}x_{\text{ch}}-\tilde x^{(j)}_{\text{ch}}|\le\tau\mathbf 1\ \forall j\le k$ plus the same constraints (7.6).
^def-multipass-ls

The basic estimator is $K=1$ with all query groups. The practice is to first estimate query groups unlikely to be zero (e.g. total, voting age) with negligible bias, then constrain later passes to those marginals, which also reduces positive bias on cells whose true count is zero. Early passes omit query groups likely to have many true zeros. The choice of query groups does not depend on confidential data; measurements omitted from the objective mean not all information is used.

### Problem found: non-monotone accuracy, and the multi-query multi-pass rounder (7.3)

The basic rounder minimizes distance of individual cells while sums of many cells (e.g. voting-age population) could still move far. And as $\rho$ grew, many least-squares cells came out as 0.999 rather than 1, so the rounder, which is responsible for the **sum of fractional parts**, became increasingly important to quality: an intermediate region appeared in which *more* privacy loss produced *poorer* utility. The fix is a rounder whose objective is the distance to the real-valued solution **in the queries** used by least squares (with multiple passes of increasing detail).

> [!definition] Multi-query multi-pass rounder (Eq. 7.7)
> Pass $k\in\{1..K\}$ (the number of rounder passes may differ from the least-squares passes):
> $$\hat x^{(k)}_{\text{ch}}\leftarrow\lfloor\tilde x_{\text{ch}}\rfloor+\hat y^{(k)},\quad\hat y^{(k)}=\arg\min_y\mathbf 1^\top\big|Q^{(k)}\tilde x_{\text{ch}}-Q^{(k)}(\lfloor\tilde x_{\text{ch}}\rfloor+y)\big|$$
> s.t. $y_i\in\{0,1\}$, $C^{\text{eq}}(\lfloor\tilde x_{\text{ch}}\rfloor+y)=c^{\text{eq}}$, $C^u(\lfloor\tilde x_{\text{ch}}\rfloor+y)\le c^u$, $[I\cdots I](\lfloor\tilde x_{\text{ch}}\rfloor+y)=\hat x_\gamma$, and for $k>1$: $Q^{(j)}(\lfloor\tilde x_{\text{ch}}\rfloor+y)=Q^{(j)}\hat x^{(j)}_{\text{ch}}$ for all $j<k$.
^def-multiquery-rounder

A solution is not always guaranteed and depends on query groups per pass and ordering. Polynomial-time solvability requires **total unimodularity** (every square non-singular submatrix is unimodular, i.e. integer with determinant $\pm1$). TUM does two things: if a continuous solution exists to the non-negative least squares problem, an integer solution exists to the rounder problem; and finding it is tractable. It does **not** guarantee that the continuous problem has a solution. Because constraints combine invariants, edit constraints and hierarchical consistency, ensuring TUM requires limiting invariants and edit constraints as much as possible. Without violating TUM, one extra set of hierarchically related queries (a "tree of queries") was inserted into the rounder objective, which solved the non-monotonicity.

## Examples

> [!example] A toy two-child TopDown step with non-negativity
> Setup: parent estimate $\hat x_P=10$ (fixed from above). Two children with noisy measurements $m=(-2,13)$ (true counts maybe $(1,9)$), equal noise variance.
> Solution: minimize $\sum(x_i-m_i)^2$ s.t. $x_1+x_2=10$, $x\ge0$. Without non-negativity the solution is $x_i=m_i+(10-\sum m)/2=m_i-0.5$, i.e. $(-2.5,12.5)$. With $x\ge0$ the solution clips to $(0,10)$.
> Interpretation: the zero-count child is estimated at 0 where the true value was 1 and the other child absorbs the mass: this is the positive bias for true zeros and its mirror negative bias on larger cells that Section 9 documents. Rounding here is trivial because the continuous solution is integral. This toy is the note's illustration, not a case from the paper.
^ex-toy-topdown

```python
import numpy as np
from scipy.optimize import minimize

def child_step(m, parent_total, w=None):
    """Weighted non-negative least squares with sum constraint (cf. Eq. 7.2, single query)."""
    m = np.asarray(m, float); w = np.ones_like(m) if w is None else np.asarray(w, float)
    obj = lambda x: np.sum(w * (x - m) ** 2)
    cons = [{"type": "eq", "fun": lambda x: x.sum() - parent_total}]
    res = minimize(obj, np.maximum(m, 0), bounds=[(0, None)] * len(m), constraints=cons, method="SLSQP")
    return res.x

x_tilde = child_step([-2, 13], 10)
print(np.round(x_tilde, 3))                       # ~[0, 10]

def round_to_sum(x, total):
    """Controlled rounding for a single sum constraint: floor then give +1 to the largest fractions."""
    base = np.floor(x + 1e-9); k = int(round(total - base.sum()))
    order = np.argsort(-(x - base))
    y = np.zeros_like(x); y[order[:k]] = 1
    return (base + y).astype(int)

print(round_to_sum(np.array([3.4, 2.9, 3.7]), 10))   # [3, 3, 4] sums to 10
```

(The rounding helper solves the single-sum special case; the production rounder is a multi-constraint integer program that is tractable only under TUM.)

## Connections

- Inverse-variance weighted reconciliation of noisy hierarchical estimates with constraints is the DP counterpart of forecast reconciliation: [[Hierarchical Forecast Reconciliation (MinT)]]; shrinkage of noisy small-area estimates toward aggregates is the Bayesian analogue: [[Hierarchical Models]].
- Why post-processing is "free": zCDP post-processing property, [[Mironov 2017 - RDP Properties and Composition]].
- Bias from non-negativity feeds directly into the experiments: [[Abowd 2022 - Utility Experiments]] (the one-pass vs multi-pass run).

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]
