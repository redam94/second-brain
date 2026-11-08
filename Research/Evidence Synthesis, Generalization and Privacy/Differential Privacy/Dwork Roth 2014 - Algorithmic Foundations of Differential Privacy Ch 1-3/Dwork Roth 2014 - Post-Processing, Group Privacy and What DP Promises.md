---
title: "Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 2.3: Prop. 2.1, Thm. 2.2 (pp. 18-20); 2.3.1 What DP promises (pp. 20-22); 2.3.2 What DP does not promise (pp. 22-23); 2.3.3 Final remarks, granularity and small epsilons (pp. 23-25)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]"
used_by:
  - "[[Dwork Roth 2014 - Basic Composition and Divergence Tools]]"
aliases:
  - Post-processing immunity (Dwork Roth)
  - Group privacy theorem (Dwork Roth)
  - What differential privacy promises
  - Granularity of privacy
---

# Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises

> [!summary]
> $(\varepsilon,\delta)$-DP is closed under arbitrary post-processing (Prop. 2.1); $(\varepsilon,0)$-DP degrades linearly for groups, $(k\varepsilon,0)$ for size $k$ (Thm. 2.2). The section then states carefully what the definition promises (no one is more than a factor $e^{\varepsilon}$ worse off in expected utility by participating) and what it does not (secrets that statistics reveal, protection at a finer granularity than the data unit).

## Overview

These are the first structural properties derived from Definition 2.4. Together with composition they are the reason DP mechanisms can be designed modularly.

## Main Content

> [!theorem] Proposition 2.1 - Post-processing (p. 19)
> Let $\mathcal{M}:\mathbb{N}^{|\mathcal{X}|}\to R$ be a randomized algorithm that is $(\varepsilon,\delta)$-differentially private. Let $f:R\to R'$ be an arbitrary randomized mapping. Then $f\circ\mathcal{M}:\mathbb{N}^{|\mathcal{X}|}\to R'$ is $(\varepsilon,\delta)$-differentially private.
^thm-post-processing

> [!proof]- Proof (p. 19)
> For deterministic $f$: fix neighbours $x,y$ and an event $S\subseteq R'$; let $T=\{r\in R:f(r)\in S\}$. Then
> $$\Pr[f(\mathcal{M}(x))\in S]=\Pr[\mathcal{M}(x)\in T]\le\exp(\varepsilon)\Pr[\mathcal{M}(y)\in T]+\delta=\exp(\varepsilon)\Pr[f(\mathcal{M}(y))\in S]+\delta.$$
> A randomized mapping is a convex combination of deterministic functions, and a convex combination of $(\varepsilon,\delta)$-DP mechanisms is $(\varepsilon,\delta)$-DP.

"A data analyst, without additional knowledge about the private database, cannot compute a function of the output of a private algorithm $\mathcal{M}$ and make it less differentially private... simply by sitting in a corner and thinking about the output." (The proviso: no further access to the data.)

Composition preview (p. 19): the composition of two $(\varepsilon,0)$ mechanisms is $(2\varepsilon,0)$; more generally (Thm. 3.16) "the epsilons and the deltas add up".

> [!theorem] Theorem 2.2 - Group privacy for $(\varepsilon,0)$-DP (p. 20)
> Any $(\varepsilon,0)$-differentially private mechanism $\mathcal{M}$ is $(k\varepsilon,0)$-differentially private for groups of size $k$. That is, for all $\|x-y\|_1\le k$ and all $S\subseteq\mathrm{Range}(\mathcal{M})$: $\Pr[\mathcal{M}(x)\in S]\le\exp(k\varepsilon)\Pr[\mathcal{M}(y)\in S]$.
^thm-group-privacy

Proof idea: chain $k$ single-record changes; each multiplies by at most $e^{\varepsilon}$.

- Composition and group privacy are *not* the same: the improved bounds of Thm. 3.20 do not, and cannot, yield the same gains for group privacy, even when $\delta=0$.
- Footnote 1 (p. 20): for $(\varepsilon,\delta)$-DP, groups of size $k$ get only $\big(k\varepsilon,\ k e^{(k-1)\varepsilon}\delta\big)$: "the approximation term $\delta$ takes a big hit". As the group grows the guarantee should deteriorate (replacing a whole surveyed population of cancer patients by healthy teenagers should change answers).

### What DP promises (Sec. 2.3.1, pp. 20-22)

**Economic view.** DP "promises to protect individuals from any additional harm that they might face due to their data being in the private database $x$ that they would not have faced had their data not been part of $x$." Participation changes the probability of harm by at most a factor $e^{\varepsilon}$.

> [!theorem] Utility-theoretic guarantee (p. 21)
> Let individual $i$ have a utility function $u_i:A\to\mathbb{R}_{\ge0}$ over future events $A$; let $x$ contain $i$'s data and $y$ be identical but without it ($\|x-y\|_1=1$); let $f:\mathrm{Range}(\mathcal{M})\to\Delta(A)$ be the arbitrary function giving the distribution over future events conditioned on the output. If $\mathcal{M}$ is $\varepsilon$-DP then
> $$\exp(-\varepsilon)\,\mathbb{E}_{a\sim f(\mathcal{M}(y))}[u_i(a)]\ \le\ \mathbb{E}_{a\sim f(\mathcal{M}(x))}[u_i(a)]\ \le\ \exp(\varepsilon)\,\mathbb{E}_{a\sim f(\mathcal{M}(y))}[u_i(a)].$$
^thm-utility-guarantee

> [!proof]- Proof (p. 21)
> By DP plus post-processing: $\mathbb{E}_{a\sim f(\mathcal{M}(x))}[u_i(a)]=\sum_au_i(a)\Pr_{f(\mathcal{M}(x))}[a]\le\sum_au_i(a)\exp(\varepsilon)\Pr_{f(\mathcal{M}(y))}[a]=\exp(\varepsilon)\mathbb{E}_{a\sim f(\mathcal{M}(y))}[u_i(a)]$; the lower bound is symmetric.

So expected future utility is not harmed by more than an $\exp(\varepsilon)\approx1+\varepsilon$ factor, independent of the individual's utility function and simultaneously for multiple individuals with different utilities.

### What DP does not promise (Sec. 2.3.2, pp. 22-23)

DP does not guarantee unconditional freedom from harm, nor create privacy where none exists, nor that "what one believes to be one's secrets will remain secret". It ensures participation is not disclosed and that participation does not lead to disclosure of specifics contributed. Conclusions drawn (a strong correlation between private and public attributes) may reflect statistical information about an individual who did not even participate; that is not a DP violation.

**Six qualitative properties (pp. 22-23).**
1. Protection against arbitrary risks, beyond re-identification.
2. Automatic neutralisation of linkage attacks (past, present, future auxiliary datasets).
3. Quantification of privacy loss: a measure, not a binary concept, permitting comparisons at fixed loss or fixed accuracy.
4. Composition: cumulative loss over multiple computations can be analysed and controlled.
5. Group privacy (families).
6. Closure under post-processing.

Open questions posed: do these attributes (or a subset) imply DP? Can DP be weakened in these respects and remain meaningful?

### Granularity and size of epsilon (Sec. 2.3.3, pp. 23-25)

> [!example] The granularity of privacy: vertices vs edges (pp. 23-24)
> **Setup.** A social-network graph with individuals as vertices, friendships as edges. **Vertex-level DP** (insensitive to adding or removing a vertex, up to $n$ edges) is strongest but may be impossible to achieve with useful accuracy. **Edge-level DP** is weaker: if $\varepsilon$-DP holds at the level of a single edge, no analyst should conclude anything about the existence of any subset of $1/\varepsilon$ edges. Edge privacy protects an individual with fewer than $1/\varepsilon$ sensitive contacts.
> **Another example.** A DP movie recommender can protect at the "event" level (a single movie rating) or the "user" level (an individual's entire history), which hides enthusiasm for a genre only at the second level.
^ex-granularity

> [!remark] All small epsilons are alike (pp. 24-25)
> For small $\varepsilon$, $(\varepsilon,0)$-DP says an adversary cannot tell from output $o$ which neighbour was the true database. Failing to be $(\varepsilon,0)$-DP for small $\varepsilon$ is not alarming (it may be $(2\varepsilon,0)$). But failing $(15,0)$-DP "merely says there exist neighboring databases and an output $o$ for which the ratio is large". The output may be very unlikely (addressed by $\delta$), the databases contrived, the adversary lacking the right auxiliary information. Failure to be DP "may range from effectively meaningless privacy breaches to complete revelation of the entire database. A large epsilon is large after its own fashion."
^rem-small-epsilons

## Examples

**Group privacy numbers (derived).** A household of $k=4$ under an $\varepsilon=0.5$ mechanism is protected at $4\times0.5=2$, i.e. likelihood ratios up to $e^{2}\approx7.4$. For $(\varepsilon,\delta)=(0.5,10^{-8})$ and $k=4$: $\varepsilon_{\text{group}}=2$, $\delta_{\text{group}}=4e^{1.5}\cdot10^{-8}\approx1.8\times10^{-7}$.

```python
import math
k, eps, delta = 4, 0.5, 1e-8
print(k*eps, k*math.exp((k-1)*eps)*delta)   # (2.0, ~1.79e-07), footnote-1 group bound for (eps, delta)-DP
```

## Connections

- **Marketing measurement.** Granularity is the core question for user-level vs household vs device-level data: if one person appears under several IDs (see [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]), event- or ID-level DP protects only a fraction of that person's data, and the effective $\varepsilon$ for the person is multiplied by the number of IDs (group privacy).
- **Post-processing is what licenses downstream modelling.** Fitting an MMM, a lift model or a calibration step to a DP-released table (without returning to raw data) does not weaken the guarantee ([[Bayesian Media Mix Modeling - Overview]]).

## See Also

- [[Dwork Roth 2014 - Basic Composition and Divergence Tools]]
- [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] (original proofs of the same properties for $\varepsilon$-DP)
