---
title: "Arora 2012 - Recover Algorithms RecoverKL and RecoverL2"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Sec. 3 (Algs 1-3), Appendix B and D, pp. 3-5, 12-13"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
depends_on:
  - "[[Arora 2012 - Separability and Anchor Words]]"
used_by:
  - "[[Arora 2012 - Experiments and Evaluation Metrics]]"
aliases:
  - "RecoverKL"
  - "RecoverL2"
  - "anchor-word topic recovery"
  - "exponentiated gradient topic recovery"
---

# Arora 2012 - Recover Algorithms RecoverKL and RecoverL2

> [!summary]
> With anchors $S$ known, every row of the row-normalised co-occurrence matrix $\bar Q$ lies in the convex hull of the anchor rows, and the mixing weights equal $p(z_1\mid w_1=i)$. Solving a K-dimensional simplex-constrained regression per word, then applying Bayes' rule, yields $A$ without matrix inversion.

## Main Content
**Input.** $Q\in\mathbb R^{V\times V}$ of word-word co-occurrence, normalised to sum 1: in the population limit $Q_{ij}=p(w_1=i,w_2=j)$ and $Q=E[AWW^TA^T]=ARA^T$. Row-normalised $\bar Q_{ij}=p(w_2=j\mid w_1=i)$. Construction (Appendix D.1): for each document with counts $H_d$ and length $n_d$, use $\frac{1}{n_d(n_d-1)}(H_dH_d^T-\text{Diag}(H_d))$, which has expectation $AW_dW_d^TA^T$ (removes the diagonal word-with-itself terms), averaged over documents.

> [!theorem] Convex-hull structure
> For an anchor word $s_k$: $\bar Q_{s_k,j}=p(w_2=j\mid z_1=k)$, since $p(z_1=k\mid w_1=s_k)=1$ and $w_2\perp w_1\mid z_1$ in an admixture. For any word $i$: $\bar Q_{i,j}=\sum_kC_{ik}\bar Q_{s_k,j}$ with $C_{ik}=p(z_1=k\mid w_1=i)\ge0$, $\sum_kC_{ik}=1$. Hence every row of $\bar Q$ lies in the convex hull of the anchor rows.

^thm-convex-hull

> [!definition] Original Recover (Alg. 2) and RecoverKL (Alg. 3)
> Alg. 2 (Arora et al. 2012b): permute $Q$ so anchors come first, compute $\vec p_S=Q_S\vec 1$, solve $Q_{S,S}\vec z=\vec p_S$, then $A^T=(Q_{S,S}\text{Diag}(\vec z))^{-1}Q_S^T$ and $R=\text{Diag}(\vec z)Q_{S,S}\text{Diag}(\vec z)$ - matrix inversion; can return negative values.
> **RecoverKL**: for each word $i$, $C_{i\cdot}=\arg\min_{C_i}D_{KL}\big(\bar Q_i\,\Vert\,\sum_{k\in S}C_{ik}\bar Q_{s_k}\big)$ subject to $\sum_kC_{ik}=1$, $C_{ik}\ge0$ (tolerance $\epsilon$); then $A'=\text{diag}(\vec p_w)C$ with $\vec p_w=Q\vec1$ and columns of $A'$ normalised to give $A$ (Bayes: $p(w=i\mid z=k)\propto p(z=k\mid w=i)p(w=i)$); $R=A^\dagger QA^{\dagger T}$.
> **RecoverL2**: same with squared loss; objective $\Vert Q_i-C_i^TQ_S\Vert^2=\Vert Q_i\Vert^2-2C_i^T(Q_SQ_i^T)+C_i^T(Q_SQ_S^T)C_i$ where $Q_SQ_S^T$ is $K\times K$ and computed once, so the optimisation is independent of $V$.

^def-recover-algorithms

Details: the per-word problems are independent (parallel) and solved by **exponentiated gradient** (Alg. 5, Kivinen and Warmuth 1995) with a KKT-based convergence test (stationarity, primal/dual feasibility, complementary slackness $\lambda^Tx<\epsilon$, equivalent to a small primal-dual gap). RecoverL2 runtime $O(KV^2+K^2VT)$ with $T\approx100$-$1000$ iterations. KL form is maximum likelihood on the co-occurrence counts but does not force the admixture constraint. For LDA, $p(z)=\sum_ip(z\mid w=i)p(w=i)$ gives the Dirichlet hyperparameters up to scale; the scale is chosen by grid search on training likelihood (more reliable than reading it from $R$).

## Examples
> [!example] Population-level recovery (runnable)
> Synthetic $V=40$, $K=3$ with exact anchors; exact $Q=ARA^T$; anchors via FastAnchorWords; recovery with simplex-constrained least squares gives L1 error 0 (to numerical precision) per topic.

^ex-recover-population

```python
import numpy as np
from scipy.optimize import nnls
rng = np.random.default_rng(0)
V, K = 40, 3
A = rng.dirichlet(np.ones(V) * 0.2, K).T
A[:K, :] = 0; A[np.arange(K), np.arange(K)] = 0.05; A /= A.sum(0)   # words 0..K-1 are anchors
R = 0.6 * np.eye(K) + 0.4 / K
Q = A @ R @ A.T; Q /= Q.sum(); Qb = Q / Q.sum(1, keepdims=True)

def fast_anchor_words(Qb, K):
    S = [int(np.argmax((Qb**2).sum(1)))]
    for _ in range(K - 1):
        B, _ = np.linalg.qr(Qb[S].T)
        resid = Qb.T - B @ (B.T @ Qb.T)
        S.append(int(np.argmax((resid**2).sum(0))))
    return S

def recover_l2(Q, Qb, S, lam=1e3):
    pw = Q.sum(1); T = Qb[S].T; K = len(S)
    C = np.array([nnls(np.vstack([T, lam*np.ones(K)]), np.append(Qb[i], lam))[0] for i in range(Q.shape[0])])
    C /= C.sum(1, keepdims=True)
    A_hat = C * pw[:, None]
    return A_hat / A_hat.sum(0)

S = fast_anchor_words(Qb, K)
print(sorted(S), np.abs(recover_l2(Q, Qb, S) - A[:, S]).sum(0).round(3))   # anchors found; ~0 error
```

## Connections
Why it works: [[Arora 2012 - Separability and Anchor Words]]. Anchor selection: [[Arora 2012 - FastAnchorWords Algorithm and Guarantees]]. Compare to likelihood-based fitting: [[Blei 2003 - Variational Inference and Parameter Estimation]].

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]]
