---
title: "Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 6 Discussion and Appendix B (Propositions B.1, B.4, B.5, B.7, Corollary B.6, Lemma B.2), pp. 28-29 and 42-47"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
  - "[[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]]"
  - "[[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]"
used_by:
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]"
aliases:
  - f-DP to Renyi DP conversion
  - f-DP future work and limitations
  - GDP marketing privacy communication
---

# Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations

> [!summary]
> Any $f$-DP guarantee converts losslessly to every divergence-based guarantee: $f$-DP implies $(\alpha,l_\alpha^{\text{R\'enyi}}(f))$-RDP, and in particular $\mu$-GDP implies $(\alpha,\mu^2\alpha/2)$-RDP. The reverse is lossy: the collection of Renyi divergences still does not induce the Blackwell order (Proposition B.7). The Discussion lists open problems: inhomogeneous Berry-Esseen, tightness of $C_p$, local $f$-DP, adversary-specific error targets, minimax estimation under $f$-DP. This note also gives a grounded marketing-measurement reading.

## Overview

Appendix B backs up the claim in Section 2.3 that $f$-DP is more informative than divergence-based notions, and supplies general tools to convert $f$-DP into any divergence-based guarantee. Section 6 closes the paper.

## Main Content

### Conversion from trade-off functions to divergences (Appendix B)

> [!theorem] Proposition B.1 and Lemma B.2 (lossless conversion)
> If a divergence $D(\cdot\Vert\cdot)$ satisfies the data-processing inequality, there is a functional $l_D$ on trade-off functions such that $D(P\Vert Q)=l_D(T(P,Q))$. Equivalently (Lemma B.2), if $T(P',Q')\ge T(P,Q)$ then $D(P'\Vert Q')\le D(P\Vert Q)$. Corollary B.3: if $f\ge g$ then $l_D(f)\le l_D(g)$.
^thm-divergence-functional

Conversion from trade-off to divergence is lossless and unimprovable; conversion in the other direction, or between divergences, usually requires case-by-case analysis and it is often unclear whether a conversion is improvable (for $F$-divergences, the joint-range technique of Harremoes-Vajda is far more complicated). Proposition B.4 gives an explicit formula for the functional for $F$-divergences, with $\text{kl}(T(P,Q))=D_{\text{KL}}(P\Vert Q)$ as a special case (this explains the name $\text{kl}$ in Section 3.2) and $\chi^2_+$ as another (used in Appendix G for SGD).

> [!theorem] Proposition B.5 and Corollary B.6 (to Renyi DP)
> If a mechanism is $f$-DP then it is $\big(\alpha,l_\alpha^{\text{R\'enyi}}(f)\big)$-RDP for every $\alpha>1$. In particular, if a mechanism is $\mu$-GDP then it is $\big(\alpha,\tfrac12\mu^2\alpha\big)$-RDP for every $\alpha>1$, because $l_\alpha^{\text{R\'enyi}}(G_\mu)=D_\alpha(\mathcal N(0,1)\Vert\mathcal N(\mu,1))=\tfrac12\mu^2\alpha$ (Mironov's Proposition 7).
^thm-fdp-to-rdp

zCDP and tCDP are defined by bounding these Renyi quantities for particular collections of $\alpha$, so they are obtained from the same conversion. Note $\mu^2\alpha/2=\rho\alpha$ with $\rho=\mu^2/2$.

> [!theorem] Proposition B.7 (Renyi order is strictly coarser than Blackwell)
> Let $P_\varepsilon,Q_\varepsilon$ be Bernoulli distributions with success probabilities $\frac1{1+e^\varepsilon}$ and $\frac{e^\varepsilon}{1+e^\varepsilon}$. There exists $\varepsilon>0$ such that both hold: (a) for all $\alpha>1$, $D_\alpha(P_\varepsilon\Vert Q_\varepsilon)\le D_\alpha(\mathcal N(0,1)\Vert\mathcal N(\varepsilon,1))$; (b) $\text{TV}(P_\varepsilon,Q_\varepsilon)>\text{TV}(\mathcal N(0,1),\mathcal N(\varepsilon,1))$.
^thm-renyi-not-blackwell

So although the whole family of Renyi divergences says $(\mathcal N(0,1),\mathcal N(\varepsilon,1))$ is easier to distinguish than $(P_\varepsilon,Q_\varepsilon)$, one can achieve a smaller summed error when testing $P_\varepsilon$ vs $Q_\varepsilon$; (b) rules out a Blackwell relation since data-processing for total variation would then force $\text{TV}(P_\varepsilon,Q_\varepsilon)\le\text{TV}(\mathcal N,\mathcal N)$. Hence $\text{Ineq}(\preceq_{\text{R\'enyi}})\supsetneq\text{Ineq}(\preceq_{\text{Blackwell}})$. Part (a) in fact holds for all $\varepsilon\ge0$ (Bun-Steinke, partly numerical); the paper's proof here is entirely analytic.

### Discussion and future directions (Sec. 6)

> [!definition] What the paper says remains open
> 1. Extending Theorem 3.7 ($O(1/n)$ error) to the inhomogeneous case where trade-off functions differ.
> 2. Whether the subsampling guarantee $C_p(f)$ (Theorem 4.2) can be improved for some $f$. It is tight when $f=0$ (original mechanism blatantly non-private), shown in Appendix F.
> 3. A *local* realization of $f$-DP (obfuscation at the individual-record level): what are the fundamental limits of estimation with local $f$-DP, and is Fisher information still the right complexity measure (Duchi-Ruan)?
> 4. Adversaries with different target type I / type II errors (for example 10%/10% vs 0.1%/99%): trade-offs between privacy, statistical efficiency and target errors in the $f$-DP framework.
> 5. Minimax estimation under privacy constraints: replace an $(\varepsilon,\delta)$ constraint by the tightest $f$-DP constraint. The upper bound is unchanged (the estimator still satisfies the stronger constraint) while the lower bound may improve, shrinking the gap.
> 6. Proving $s=\sqrt{2K}$ in general (Section 3.2) or finding a counterexample.
^def-fdp-open-problems

The paper's closing statement is that the test of a privacy definition lies in its power, semantics and ability to usefully analyze diverse algorithms; it leaves practical evaluation to future work.

### Limitations visible in the paper

- Corollary 5.4 is an **asymptotic** approximation; Corollary 5.6 gives an explicit error $\gamma=O(1/\sqrt T)$ and is evaluated numerically, so there is no simple closed-form certified bound for realistic $T$.
- The CLT approximation is not a one-sided bound (see [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]]); a certified $f$-DP guarantee must use Theorem 3.4's $\gamma$ or exact computation.
- Neighbor definition is replace-one; add/remove conventions differ by constants (see [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]).
- Appendices D-E (full proofs of the CLT constants) were summarized, not re-derived, in this vault.

## Examples

> [!example] Communicating privacy to non-technical partners (marketing reading, inference)
> The testing interpretation allows statements like: "if an adversary tries to decide whether a given person's conversion is in the released report, then at a 5% false-alarm rate, with a $\mu=0.5$ guarantee the adversary's chance of correctly flagging a present person (its power) is at most $1-G_{0.5}(0.05)$."
> Computation: $G_{0.5}(0.05)=\Phi(\Phi^{-1}(0.95)-0.5)=\Phi(1.1449)=0.874$, so power at most $12.6\%$ at 5% false alarms; at $\mu=1$ it is $26.0\%$; at $\mu=3$ it is $91.2\%$ ($G_3(0.05)=0.0877$).
> Interpretation: this reads naturally to non-specialists and shows why $\mu\approx3$ is "basically non-private". The reading of a release as a hypothesis test is the paper's; applying it to ad-conversion reporting is this note's illustration (values recomputed, not from the paper).
^ex-attacker-power

```python
import numpy as np
from scipy.stats import norm

def attacker_power(mu, alpha):          # best-test power at type I error alpha for mu-GDP
    return 1 - norm.cdf(norm.ppf(1 - alpha) - mu)

for mu in (0.5, 1.0, 3.0):
    print(mu, round(attacker_power(mu, 0.05), 3))   # 0.126, 0.260, 0.912
```

> [!example] Checking Proposition B.7 (a)-(b) numerically at one $\varepsilon$
> At $\varepsilon=0.5$: $\text{TV}(P_\varepsilon,Q_\varepsilon)=\tanh(\varepsilon/2)=0.245$ versus $\text{TV}(\mathcal N(0,1),\mathcal N(0.5,1))=2\Phi(0.25)-1=0.197$, so (b) holds; and $D_\alpha(P_\varepsilon\Vert Q_\varepsilon)\le\alpha\varepsilon^2/2$ for all tested $\alpha\in(1,200]$, so (a) holds (recomputed).
^ex-b7-check

## Connections

- Renyi DP definition and Gaussian curve: [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]; the paper's argument is that RDP is a coarser summary: [[Mironov 2017 - Renyi Differential Privacy - Overview]].
- zCDP in practice: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].
- Power as a concept in experimentation: [[Power Analysis and Sample Size]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Trade-off Functions and f-DP]]
