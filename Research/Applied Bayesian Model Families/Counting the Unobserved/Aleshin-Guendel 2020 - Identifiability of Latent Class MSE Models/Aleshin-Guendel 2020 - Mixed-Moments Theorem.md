---
title: "Aleshin-Guendel 2020 - Mixed-Moments Theorem"
tags:
  - source/ingested
  - topic/population-estimation
  - type/theorem
  - doc/paper
source: "[[raw/Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation.pdf]]"
source_location: "Sec. 3, Lemma 1 and Theorem 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models"
doc_type: paper
depends_on:
  - "[[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]"
used_by:
  - "[[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]"
aliases:
  - mixed moments identifiability criterion
  - Lemma 1 cell probabilities as moments
---

# Aleshin-Guendel 2020 - Mixed-Moments Theorem

> [!summary]
> Cell probabilities of any $M_{th}$ model depend on the mixing distribution only through its mixed moments (Lemma 1), and equality of conditional cell probabilities is equivalent to the moment vectors being proportional (Theorem 1). So identifiability can be checked by asking whether proportional moments force equal missing-cell probabilities.

## Overview

The theorem converts Definition 1 (a statement about probabilities) into an algebraic statement about moment vectors, which is easier to attack by linear algebra.

## Main Content

> [!theorem] Lemma 1 (cell probabilities are mixtures of moments)
> For $h\in H^*$,
> $$\pi_{Q,h}=\sum_{h'\in H^*}c_{h,h'}\,m_{Q,h'},\quad c_{h,h'}=(-1)^{\sum_k h'_k-h_k}\prod_{k=1}^{K}I(h_k\le h'_k),\quad m_{Q,h'}=E_Q\Big(\prod_{k=1}^{K}\lambda_k^{h'_k}\Big).$$
> *Proof.* By the multibinomial theorem $\prod_k\lambda_k^{h_k}(1-\lambda_k)^{1-h_k}=\sum_{h'\in H^*}c_{h,h'}\prod_k\lambda_k^{h'_k}$ (the empty-product term cancels for $h\ne0$). Take expectations under $Q$.
^thm-lemma1-moments

In matrix form $\boldsymbol\pi^*_Q=C\,\mathbf m_Q$, where $\boldsymbol\pi^*_Q=(\pi_{Q,h})_{h\in H^*}$, $\mathbf m_Q=(m_{Q,h})_{h\in H^*}$ and $C=(c_{h,h'})$. $C$ is upper triangular (patterns ordered as binary digits) with non-zero diagonal, hence invertible.

> [!theorem] Theorem 1
> For any two distributions $Q,R$ on $(0,1]^K$, $\tilde\pi_Q=\tilde\pi_R$ is equivalent to $\mathbf m_Q=A\,\mathbf m_R$ for some $A>0$.
> *Proof.* $\tilde\pi_Q=\tilde\pi_R\iff\boldsymbol\pi^*_Q/(1-\pi_{Q,0})=\boldsymbol\pi^*_R/(1-\pi_{R,0})\iff\boldsymbol\pi^*_Q=A\boldsymbol\pi^*_R$ with $A=(1-\pi_{Q,0})/(1-\pi_{R,0})>0$. By Lemma 1 this is $C\mathbf m_Q=AC\mathbf m_R$, and invertibility of $C$ gives $\mathbf m_Q=A\mathbf m_R$.
^thm-theorem1-proportional-moments

> [!remark] Consequence
> To show a family $\mathcal Q$ is identifiable: show that $\mathbf m_Q=A\mathbf m_R$ (some $Q,R\in\mathcal Q$, $A>0$) implies $\pi_{Q,0}=\pi_{R,0}$. Equivalent to $A=1$, because $A=(1-\pi_{Q,0})/(1-\pi_{R,0})$. To show non-identifiability: construct $Q,R$ with $\mathbf m_Q=A\mathbf m_R$ and $A\ne1$.
^thm-identifiability-criterion

## Examples

> [!example] $K=2$ check of Lemma 1
> $H^*=\{01,10,11\}$. $\pi_{Q,11}=E[\lambda_1\lambda_2]=m_{11}$; $\pi_{Q,10}=E[\lambda_1(1-\lambda_2)]=m_{10}-m_{11}$; $\pi_{Q,01}=m_{01}-m_{11}$. The sign pattern $(-1)^{\sum h'-\sum h}$ matches. Then $\pi_{Q,0}=1-m_{10}-m_{01}+m_{11}$.

```python
import numpy as np, itertools
K = 2
H = [h for h in itertools.product([0,1], repeat=K) if any(h)]
C = np.array([[ (-1)**(sum(hp)-sum(h)) * all(h[k] <= hp[k] for k in range(K)) for hp in H] for h in H], float)
print(C, np.linalg.det(C))   # triangular, det = +-1
```

## Connections

- The multiplicative factor $A$ is exactly the ratio of observed-mass $(1-\pi_0)$ between the two models; it is the quantity a conditional likelihood cannot pin down.
- Same logic as the Poisson non-identifiability of $N$ in [[Barker 2018 - Poisson Alternative and Model Discrimination]]: only a product (here $A\cdot$moments) is estimable.

## See Also

- [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]
- [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]
