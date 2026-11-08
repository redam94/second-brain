---
title: "Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 3 Informative Mechanisms (Def. 3.1, Thm. 3.2, pp. 8-9); Proof of Thm. 3.2, Sec. 9.3 (p. 21)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]"
used_by:
  - "[[Wasserman Zhou 2010 - Histogram Release Mechanisms]]"
  - "[[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]"
aliases:
  - epsilon_n-informative mechanism
  - Consistency of a data release mechanism
  - Inconsistency for point-mass distributions under differential privacy
---

# Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem

> [!summary]
> A mechanism is *consistent* if the empirical cdf of the released data $\hat F_Z$ converges in probability to the true cdf $F$ in a chosen distance $\rho$, and *$\epsilon_n$-informative* if $\rho(F,\hat F_Z)=O_P(\epsilon_n)$. Theorem 3.2 shows no $\alpha$-DP mechanism can be consistent in KS distance uniformly over all $F$: for a point-mass $F$ the mechanism cannot "move" to a different point mass without violating DP. Hence assumptions on $F$ (Lipschitz or bounded density) are needed, and the paper imposes them.

## Overview

"A challenge in privacy theory is to find $Q_n$ that satisfies differential privacy and yet yields datasets $Z$ that preserve information. Informally, a mechanism is informative if it is possible to make precise inferences from the released data $Z_1,\dots,Z_k$." The analyst has access to $Z$ but not the mechanism (how to exploit knowledge of $Q_n$ is left to future work). From a statistical angle we want to infer $P$ or functionals of $P$.

## Main Content

Notation. $F$ is the cdf of $P$: $F(x)=P\big(X\in(-\infty,x_1]\times\dots\times(-\infty,x_r]\big)$. $\hat F\equiv\hat F_X$ is the empirical cdf of $X$, $\hat F_Z$ of $Z$. $\rho$ is any distance on distribution functions. $\mathbb{E}_{P,Q_n}$ (or $\mathbb{E}$) is expectation under the joint law of $P^n$ and $Q_n$; $\mathbb{P}(A)=\int_A dQ_n(z_1,\dots,z_k\mid x_1,\dots,x_n)\,dP(x_1)\cdots dP(x_n)$.

> [!definition] Definition 3.1 - Consistency and $\epsilon_n$-informativeness (p. 8)
> $Q_n$ is **consistent** with respect to $\rho$ if $\rho(F,\hat F_Z)\xrightarrow{P}0$. $Q_n$ is **$\epsilon_n$-informative** if $\rho(F,\hat F_Z)=O_P(\epsilon_n)$.
^def-wz-informative

**Choices of $\rho$ (pp. 8-9).** The main distances are the Kolmogorov-Smirnov distance $\rho(F,G)=\sup_x|F(x)-G(x)|$ and the squared $L_2$ distance $\rho(F,G)=\int(f(x)-g(x))^2dx$ with $f=dF/d\mu$, $g=dG/d\mu$ (other distances carry over). **Alternative target.** Instead of $\rho(F,\hat F_Z)$ one could require $\rho(\hat F,\hat F_Z)$ small, or $Q_n(\rho(\hat F,\hat F_Z)>\epsilon\mid X=x)$ small for all $x$ as in Blum et al. (2008). These are equivalent for $\rho$ obeying the triangle inequality when $\rho(\hat F,F)=O_P(\epsilon_n)$: $\rho(\hat F,\hat F_Z)\le\rho(\hat F,F)+\rho(F,\hat F_Z)$, and symmetrically.

> [!theorem] Theorem 3.2 - inconsistency without assumptions (p. 9; essentially Blum, Ligett, Roth 2008)
> Suppose $Q_n$ satisfies differential privacy and $\rho(F,G)=\sup_x|F(x)-G(x)|$. Let $F$ be a point-mass distribution, $F(y)=I(y\ge x)$ for some $x\in[0,1]$. Then $\hat F_Z$ is inconsistent: there is $\delta>0$ such that $\liminf_{n\to\infty}P^n\big(\rho(F,\hat F_Z)>\delta\big)>0$.
^thm-wz-inconsistency

> [!proof]- Proof (Sec. 9.3, p. 21; $r=1$, adapted from Blum et al. 2008, Thm. 5.1)
> Let $P=\delta_0$ (point mass at $0$), so $P^n(X=X^{(0)})=1$ for $X^{(0)}=\{0,\dots,0\}$. Suppose $Q_n$ is consistent. Since $F(0)=1$, for each $\delta>0$ $\mathbb{P}(\hat F_Z(0)>1-\delta)\to1$, and since $\mathbb{P}(\cdot)=\mathbb{E}_PQ_n(\cdot\mid X)$ with $X=X^{(0)}$ almost surely, $Q_n(\hat F_Z(0)>1-\delta\mid X=X^{(0)})\to1$.
>
> Choose $v\in(0,1]$ such that $Q_n(Z=v\mid X=X^{(0)})=0$ (a value the mechanism essentially never outputs on the all-zeros database). Define $X^{(j)}=\{v,\dots,v,0,\dots,0\}$ with $j$ copies of $v$ ($X^{(n)}=\{v,\dots,v\}$). By assumption $Q_n(Z=X^{(j)}\mid X=X^{(0)})=0$ for all $j\ge1$. Differential privacy ($X^{(0)}$ and $X^{(1)}$ are neighbours) implies $Q_n(Z=X^{(j)}\mid X=X^{(1)})=0$ for all $j\ge1$; applying DP again, the same holds given $X^{(2)}$, and so on. By induction $Q_n(Z=X^{(j)}\mid X=X^{(n)})=0$ for all $j\ge1$.
>
> Now take $P=\delta_v$. Consistency requires $Q_n(\hat F_Z(v)<1-\delta\mid X=X^{(n)})\to0$ and $Q_n(\hat F_Z(v-)>\delta\mid X=X^{(n)})\to0$, where $F(v-)=\lim_iF(v_i)$ for $v_i\uparrow v$. Hence for $j/n>1-\delta$ we must have $Q_n(Z=X^{(j)}\mid X=X^{(n)})>0$ for some such $j$, a contradiction. $\blacksquare$

*Idea in one line.* DP forces the *support* of $Q_n(\cdot\mid x)$ to be essentially the same for every database $x$ (ratios bounded by $e^{\alpha}$ per change, hence $e^{n\alpha}$ across any two databases). A consistent mechanism on the point mass at $0$ would have to put essentially all its mass near $0$, and on the point mass at $v$ near $v$, but DP forbids moving from "never outputs $v$" to "must output $v$" in $n$ steps unless the probabilities are positive throughout. The paper's proof is terse about discrete versus continuous $Z$; the logic above is the core.

*Consequence.* "We will need some assumptions on $F$ otherwise we cannot have a consistent scheme." The paper therefore studies Lipschitz densities (histograms), bounded densities (exponential mechanism) and Sobolev classes. This is a statistical analogue of the worst-case lower-bound arguments in [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]].

## Examples

**Why the smoothed histogram needs the $\delta$ floor (derived).** Releasing samples from the raw histogram $\hat f_m$ on data that is a point mass puts zero density on every bin that contains no data, which is exactly the zero-probability-propagation hazard in the proof. The smoothed histogram of the next note mixes in a uniform floor $\delta$ so that every output has positive density under every database; Theorem 4.1 shows this is what makes it DP ("sampling from the usual histogram corresponding to $\delta=0$ does not preserve differential privacy").

```python
import numpy as np
# Check: raw histogram sampling has unbounded likelihood ratio between neighbouring databases;
# the delta-smoothed histogram keeps it finite.
m, n, k = 10, 100, 1                                    # 10 bins, n points, 1 released draw
cnt_x = np.array([n] + [0]*(m-1))                        # all points in bin 0
cnt_y = np.array([n-1, 1] + [0]*(m-2))                   # one point moved to bin 1 (neighbour)
def dens(cnt, delta): return (1-delta)*(cnt/n)*m + delta # density on a bin (histogram on [0,1], bin width 1/m)
for delta in (0.0, 0.1):
    print(delta, dens(cnt_y,delta)[1] / dens(cnt_x,delta)[1] if delta>0 else "inf (bin 1 has 0 density under x)")
```

## Connections

- **Marketing measurement.** Sparse or highly concentrated data (a campaign with all its conversions in one geo) is the hard case for private release: any DP mechanism must keep positive probability on outputs far from the truth, so a released distribution for a concentrated cell is necessarily noisy. Smoothness assumptions (neighbouring geos or dates behave alike) are what let aggregation recover accuracy, which is also why coarsening categories before release helps.

## See Also

- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]]
- [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]
- [[Dwork 2006 - Proof of the Separation Lemma]] (a different impossibility proof by hybrid argument)
