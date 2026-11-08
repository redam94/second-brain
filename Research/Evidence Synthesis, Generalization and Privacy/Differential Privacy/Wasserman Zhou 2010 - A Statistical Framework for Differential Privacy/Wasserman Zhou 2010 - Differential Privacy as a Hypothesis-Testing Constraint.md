---
title: "Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 2, Thm. 2.4 and the Bayes-factor remark (pp. 6-7); Proof of Thm. 2.4, Sec. 9.1 (p. 20)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]"
aliases:
  - Theorem 2.4 testing power bound
  - DP bounds power of tests
  - Hypothesis testing interpretation of differential privacy
---

# Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint

> [!summary]
> If $Q_n$ is $\alpha$-DP, then *any* level-$\gamma$ test of $H_0:X_i=s$ versus $H_1:X_i=t$ based on the released $Z$ (even one that knows $P$ and $Q_n$) has power at most $\gamma e^{\alpha}$. So for small $\alpha$ the test is barely better than a coin with rejection probability $\gamma$: an adversary cannot tell whether a given individual's record is $s$ or $t$. This is the statistical reading of DP and the form cited in Dwork et al.'s 2016 reprint as Eq. (3).

## Overview

The paper motivates the DP definition with a statistical scenario: "suppose that two subjects each believe that one of them is in the original database. Given $Z$ and full knowledge of $P$ and $Q_n$ can they test who is in $X$?" (Here the standing assumption that the user does not know $Q_n$ is dropped.) The answer is Theorem 2.4, proved by the Neyman-Pearson lemma and the definition of DP.

## Main Content

> [!theorem] Theorem 2.4 (p. 6)
> Suppose $Z$ is obtained from a data release mechanism that satisfies $\alpha$-differential privacy. Any level-$\gamma$ test which is a function of $Z$, $P$ and $Q_n$ of $H_0:X_i=s$ versus $H_1:X_i=t$ has power bounded above by $\gamma e^{\alpha}$.
^thm-wz-testing-power

> [!proof]- Proof (Sec. 9.1, p. 20)
> Without loss of generality take $i=1$. Define the marginal laws of $Z$ under the two hypotheses by averaging over the other entries, which are i.i.d. from $P$ and independent of the test:
> $$M_0(B)=\int Q(B\mid s,x_2,\dots,x_n)\,dP(x_2,\dots,x_n),\qquad M_1(B)=\int Q(B\mid t,x_2,\dots,x_n)\,dP(x_2,\dots,x_n).$$
> By the Neyman-Pearson lemma the most powerful test rejects $H_0$ when $U>u$, where $U(z)=\frac{dM_1}{dM_0}(z)$ and $u$ is chosen so that $\int I(U(z)>u)\,dM_0(z)\le\gamma$. Since $(s,x_2,\dots,x_n)$ and $(t,x_2,\dots,x_n)$ differ in only one coordinate, DP gives $M_1(B)\le e^{\alpha}M_0(B)$ for every $B$ (integrate the pointwise bound over $dP$). Hence the power is $M_1(U>u)\le e^{\alpha}M_0(U>u)\le\gamma e^{\alpha}$.

**Bayes factors (p. 7).** "A similar calculation shows that if one does a Bayes test between $H_0$ and $H_1$ then the Bayes factor is always between $e^{-2\alpha}$ and $e^{2\alpha}$." (Own check: the same argument gives $M_1(B)\le e^{\alpha}M_0(B)$ and $M_0(B)\le e^{\alpha}M_1(B)$ for replace-one neighbours, so $\frac{dM_1}{dM_0}\in[e^{-\alpha},e^{\alpha}]$ and the Bayes factor lies in $[e^{-\alpha},e^{\alpha}]$ for a pair $s\to t$; the printed $e^{\pm2\alpha}$ is a valid but looser statement.) The paper points to Dwork et al. (2006), Dwork (2006), Ganta et al. (2008) and Rastogi et al. (2009) for more on motivation and consequences.

**Reading the bound.** With level $\gamma=0.05$ and $\alpha=0.1$, power $\le0.05\,e^{0.1}\approx0.0553$: a test that rejects a false hypothesis only 5.5% of the time versus 5% of the time when it is true. With $\alpha=1$ the bound is $0.136$; with $\alpha=3$ it is $1.0$ (vacuous for $\gamma\ge e^{-3}\approx0.05$). In ROC terms DP forces the whole ROC curve for distinguishing neighbouring inputs below the line $\text{TPR}\le e^{\alpha}\,\text{FPR}$ (and, by symmetry in the proof, $1-\text{FPR}\le e^{\alpha}(1-\text{TPR})$).

**Tightness (derived example).** Randomized response with $\Pr(\text{truth})=q=e^{\alpha}/(e^{\alpha}+1)$ on a single bit: the optimal test of $X_i=0$ vs $X_i=1$ given $Z_i$ rejects when $Z_i=1$, with $\gamma=1-q$ and power $q$. Then $q/(1-q)=e^{\alpha}$ exactly, so $\text{power}=\gamma e^{\alpha}$: the bound cannot be improved. For $\alpha=\ln3$: $\gamma=0.25$ and power $=0.75$.

**Link to the original paper.** Dwork, McSherry, Nissim and Smith (2016 reprint, Sec. 2.2) restate this result: for $\varepsilon$-DP, i.i.d. data, index $i$ and disjoint sets $S,T$ of values of $x_i$, every test of $x_i\in S$ against $x_i\in T$ satisfies $1-\beta\le e^{\varepsilon}\alpha$, "the test rejects the hypothesis with approximately the same probability regardless of whether the hypothesis is true" ([[Dwork 2006 - Postprocessing, Composition and Group Privacy]]). In the textbook, the same content appears as the bound on privacy loss and $D_\infty$ ([[Dwork Roth 2014 - Basic Composition and Divergence Tools]]).

## Examples

```python
import numpy as np
alpha = np.log(3)
q = np.exp(alpha) / (np.exp(alpha) + 1)            # randomized response keep probability = 0.75
rng = np.random.default_rng(0)
n = 400_000
x = rng.random(n) < 0.5                            # secret bit; H0: x=0, H1: x=1
z = np.where(rng.random(n) < q, x, ~x)
reject = z                                         # NP test: reject H0 when Z=1
gamma_hat = reject[~x].mean()                      # level (type-I error) ~ 0.25
power_hat = reject[x].mean()                       # power ~ 0.75
print(gamma_hat, power_hat, gamma_hat * np.exp(alpha))   # power ~ gamma * e^alpha
```

**Likelihood-ratio view of a Bayesian adversary.** With prior odds $\omega$ for $H_1$ the posterior odds after observing $Z$ lie in $[\omega e^{-\alpha},\omega e^{\alpha}]$ pointwise; for a prior probability of $50\%$ and $\alpha=0.5$ the posterior probability lies in $[0.38,0.62]$.

## Connections

- **Marketing measurement.** This is the correct language for explaining a stated $\varepsilon$ to stakeholders: "any attempt to infer whether a given user converted (or was exposed) from the privatised report has power at most $e^{\varepsilon}$ times its false-positive rate". It also ties to experimentation vocabulary (size, power, Neyman-Pearson) in [[Power Analysis and Sample Size]]. The Bayes-factor reading parallels the positive-predictive-value arguments in [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]].
- The bound is about *one* record; multiple records or repeated releases compose ([[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]).

## See Also

- [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]
- [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]
- [[Dwork 2006 - Postprocessing, Composition and Group Privacy]]
